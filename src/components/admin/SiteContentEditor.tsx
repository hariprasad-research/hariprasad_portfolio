import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useHeroRoles, useMetrics, useHonors, useAreasOfExpertise, saveSetting, useInvalidateSiteData, SettingKey } from '@/hooks/useSiteData';
import { Metric, Honor, honorIconNames } from '@/data/siteContent';
import { iconMap } from '@/lib/honorIcons';

const move = <T,>(arr: T[], i: number, d: number) => {
  const j = i + d;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

const useSaver = () => {
  const { toast } = useToast();
  const invalidate = useInvalidateSiteData();
  const [saving, setSaving] = useState<SettingKey | null>(null);
  const save = async (key: SettingKey, value: unknown, name: string) => {
    setSaving(key);
    try {
      await saveSetting(key, value);
      await invalidate();
      toast({ title: `${name} saved`, description: 'Your homepage is updated.' });
    } catch (e) {
      toast({ title: 'Save failed', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(null);
    }
  };
  return { save, saving };
};

const RowControls = ({ onUp, onDown, onDelete }: { onUp: () => void; onDown: () => void; onDelete: () => void }) => (
  <div className="flex gap-1 shrink-0">
    <Button type="button" size="icon" variant="ghost" onClick={onUp} aria-label="Move up"><ArrowUp className="h-4 w-4" /></Button>
    <Button type="button" size="icon" variant="ghost" onClick={onDown} aria-label="Move down"><ArrowDown className="h-4 w-4" /></Button>
    <Button type="button" size="icon" variant="ghost" onClick={onDelete} aria-label="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>
  </div>
);

const SiteContentEditor = () => {
  const { data: rolesData } = useHeroRoles();
  const { data: metricsData } = useMetrics();
  const { data: honorsData } = useHonors();
  const { data: expertiseData } = useAreasOfExpertise();
  const [roles, setRoles] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [honors, setHonors] = useState<Honor[]>([]);
  const [expertise, setExpertise] = useState<string[]>([]);
  const { save, saving } = useSaver();

  useEffect(() => { if (rolesData) setRoles(rolesData); }, [rolesData]);
  useEffect(() => { if (metricsData) setMetrics(metricsData); }, [metricsData]);
  useEffect(() => { if (honorsData) setHonors(honorsData); }, [honorsData]);
  useEffect(() => { if (expertiseData) setExpertise(expertiseData); }, [expertiseData]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Typing titles */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Typing Titles (Homepage)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {roles.map((r, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input value={r} onChange={(e) => setRoles(roles.map((x, k) => (k === i ? e.target.value : x)))} />
              <RowControls
                onUp={() => setRoles(move(roles, i, -1))}
                onDown={() => setRoles(move(roles, i, 1))}
                onDelete={() => setRoles(roles.filter((_, k) => k !== i))}
              />
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => setRoles([...roles, ''])}><Plus className="h-4 w-4 mr-1" /> Add title</Button>
            <Button
              disabled={saving === 'hero_roles'}
              onClick={() => save('hero_roles', roles.map((r) => r.trim()).filter(Boolean), 'Titles')}
            ><Save className="h-4 w-4 mr-1" /> Save</Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Research Metrics (Numbers)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {metrics.map((m, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input
                type="number" min={0} className="w-24"
                value={m.value}
                onChange={(e) => setMetrics(metrics.map((x, k) => (k === i ? { ...x, value: Number(e.target.value) || 0 } : x)))}
              />
              <span className="text-muted-foreground">+</span>
              <Input
                value={m.label} placeholder="Label"
                onChange={(e) => setMetrics(metrics.map((x, k) => (k === i ? { ...x, label: e.target.value } : x)))}
              />
              <RowControls
                onUp={() => setMetrics(move(metrics, i, -1))}
                onDown={() => setMetrics(move(metrics, i, 1))}
                onDelete={() => setMetrics(metrics.filter((_, k) => k !== i))}
              />
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => setMetrics([...metrics, { value: 0, label: '' }])}><Plus className="h-4 w-4 mr-1" /> Add metric</Button>
            <Button
              disabled={saving === 'metrics'}
              onClick={() => save('metrics', metrics.filter((m) => m.label.trim()).map((m) => ({ ...m, label: m.label.trim() })), 'Metrics')}
            ><Save className="h-4 w-4 mr-1" /> Save</Button>
          </div>
        </CardContent>
      </Card>

      {/* Honors */}
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle className="text-lg">Honors & Badges</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {honors.map((h, i) => {
            const Icon = iconMap[h.icon] ?? iconMap.Trophy;
            return (
              <div key={i} className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
                <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <select
                  className="h-10 rounded-md border border-input bg-background px-2 text-sm"
                  value={h.icon}
                  onChange={(e) => setHonors(honors.map((x, k) => (k === i ? { ...x, icon: e.target.value } : x)))}
                  aria-label="Icon"
                >
                  {honorIconNames.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
                <Input
                  value={h.title} placeholder="Title (e.g. World Record Holder)"
                  onChange={(e) => setHonors(honors.map((x, k) => (k === i ? { ...x, title: e.target.value } : x)))}
                />
                <Input
                  value={h.subtitle} placeholder="Subtitle (e.g. Distinction)" className="sm:w-48"
                  onChange={(e) => setHonors(honors.map((x, k) => (k === i ? { ...x, subtitle: e.target.value } : x)))}
                />
                <RowControls
                  onUp={() => setHonors(move(honors, i, -1))}
                  onDown={() => setHonors(move(honors, i, 1))}
                  onDelete={() => setHonors(honors.filter((_, k) => k !== i))}
                />
              </div>
            );
          })}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => setHonors([...honors, { icon: 'Award', title: '', subtitle: '' }])}><Plus className="h-4 w-4 mr-1" /> Add badge</Button>
            <Button
              disabled={saving === 'honors'}
              onClick={() => save('honors', honors.filter((h) => h.title.trim()), 'Badges')}
            ><Save className="h-4 w-4 mr-1" /> Save</Button>
          </div>
        </CardContent>
      </Card>

      {/* Areas of expertise */}
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle className="text-lg">Areas of Expertise</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {expertise.map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input
                value={item}
                aria-label={`Area of expertise ${i + 1}`}
                placeholder="Area of expertise"
                onChange={(e) => setExpertise(expertise.map((x, k) => (k === i ? e.target.value : x)))}
              />
              <RowControls
                onUp={() => setExpertise(move(expertise, i, -1))}
                onDown={() => setExpertise(move(expertise, i, 1))}
                onDelete={() => setExpertise(expertise.filter((_, k) => k !== i))}
              />
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" onClick={() => setExpertise([...expertise, ''])}>
              <Plus className="h-4 w-4 mr-1" /> Add area
            </Button>
            <Button
              disabled={saving === 'areas_of_expertise'}
              onClick={() => save('areas_of_expertise', expertise.map((item) => item.trim()).filter(Boolean), 'Areas of expertise')}
            >
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteContentEditor;
