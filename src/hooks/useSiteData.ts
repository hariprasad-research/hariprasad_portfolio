import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProjectDetails } from '@/components/ProjectFlashcard';
import allProjects, { categories, getFeaturedProjects } from '@/data/projects';
import { technicalTags, softSkillTags, SkillTag } from '@/data/skills';
import { defaultRoles, defaultMetrics, defaultHonors, Metric, Honor } from '@/data/siteContent';

export interface DbProject extends ProjectDetails {
  id: string;
  isFeatured: boolean;
  sortOrder: number;
}

type Row = {
  id: string; title: string; description: string; category: string; type: string; status: string;
  tags: string[]; problem_statement: string; objective: string; approach: string[]; results: string[];
  images: string[]; video_url: string; report_url: string; is_featured: boolean; sort_order: number;
};

export const fromRow = (r: Row): DbProject => ({
  id: r.id, title: r.title, description: r.description, category: r.category, type: r.type,
  status: r.status, tags: r.tags ?? [], problemStatement: r.problem_statement, objective: r.objective,
  approach: r.approach ?? [], results: r.results ?? [], images: r.images ?? [],
  videoUrl: r.video_url, reportUrl: r.report_url, isFeatured: r.is_featured, sortOrder: r.sort_order,
});

export const toRow = (p: Omit<DbProject, 'id'>) => ({
  title: p.title, description: p.description, category: p.category ?? '', type: p.type, status: p.status,
  tags: p.tags, problem_statement: p.problemStatement, objective: p.objective, approach: p.approach,
  results: p.results, images: p.images, video_url: p.videoUrl ?? '', report_url: p.reportUrl ?? '',
  is_featured: p.isFeatured, sort_order: p.sortOrder,
});

const featuredFallback = new Set(getFeaturedProjects().map((p) => p.title));
const fallbackProjects: DbProject[] = allProjects.map((p, i) => ({
  ...p, id: `static-${i}`, isFeatured: featuredFallback.has(p.title), sortOrder: i,
}));

export const useProjects = () =>
  useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').order('sort_order');
      if (error) throw error;
      return (data as Row[]).map(fromRow);
    },
    placeholderData: fallbackProjects,
  });

export const groupByCategory = (projects: ProjectDetails[]) => {
  const extra = Array.from(new Set(projects.map((p) => p.category ?? ''))).filter(
    (c) => c && !categories.includes(c)
  );
  return [...categories, ...extra]
    .map((category) => ({ category, projects: projects.filter((p) => p.category === category) }))
    .filter((g) => g.projects.length > 0);
};

export interface DbSkill extends SkillTag { kind: 'technical' | 'soft'; }

export const useSkills = () =>
  useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase.from('skills').select('label,size,kind').order('sort_order');
      if (error) throw error;
      const rows = data as DbSkill[];
      return {
        technical: rows.filter((r) => r.kind === 'technical').map(({ label, size }) => ({ label, size })),
        soft: rows.filter((r) => r.kind === 'soft').map(({ label, size }) => ({ label, size })),
      };
    },
    placeholderData: { technical: technicalTags, soft: softSkillTags },
  });

export const saveSkillList = async (kind: 'technical' | 'soft', tags: SkillTag[]) => {
  const del = await supabase.from('skills').delete().eq('kind', kind);
  if (del.error) throw del.error;
  const rows = tags.filter((t) => t.label.trim()).map((t, i) => ({ label: t.label.trim(), size: t.size, kind, sort_order: i }));
  if (rows.length) {
    const ins = await supabase.from('skills').insert(rows);
    if (ins.error) throw ins.error;
  }
};

export type SettingKey = 'hero_roles' | 'metrics' | 'honors';

const useSetting = <T extends object>(key: SettingKey, fallback: T) =>
  useQuery({
    queryKey: ['site_settings', key],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('value').eq('key', key).maybeSingle();
      if (error) throw error;
      return (data?.value as T | undefined) ?? fallback;
    },
    placeholderData: fallback,
  });

export const useHeroRoles = () => useSetting<string[]>('hero_roles', defaultRoles);
export const useMetrics = () => useSetting<Metric[]>('metrics', defaultMetrics);
export const useHonors = () => useSetting<Honor[]>('honors', defaultHonors);

export const saveSetting = async (key: SettingKey, value: unknown) => {
  const { error } = await supabase.from('site_settings').upsert({ key, value: value as never });
  if (error) throw error;
};

export const useInvalidateSiteData = () => {
  const qc = useQueryClient();
  return () => Promise.all([
    qc.invalidateQueries({ queryKey: ['site_settings'] }),
    qc.invalidateQueries({ queryKey: ['projects'] }),
    qc.invalidateQueries({ queryKey: ['skills'] }),
  ]);
};
