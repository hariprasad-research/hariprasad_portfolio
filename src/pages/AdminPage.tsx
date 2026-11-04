import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Pencil, Trash2, LogOut, Lock, Search, X, Save, FolderOpen, Tags as TagsIcon, Database
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AdminGuard, lockAdmin } from '@/hooks/useAdminAccess';
import { categories } from '@/data/projects';
import { SkillTag } from '@/data/skills';
import { supabase } from '@/integrations/supabase/client';
import { useProjects, useSkills, toRow, saveSkillList, useInvalidateSiteData, DbProject } from '@/hooks/useSiteData';
import { ProjectDetails } from '@/components/ProjectFlashcard';

const STATUSES = ["Published", "Completed", "Open Source", "In Development", "Patent Pending", "Prototype"];
const TAG_SIZES = ["sm", "md", "lg"];

type AdminProject = DbProject;

interface Draft {
  id?: string;
  title: string;
  description: string;
  category: string;
  type: string;
  status: string;
  tags: string[];
  problemStatement: string;
  objective: string;
  approach: string[];
  results: string[];
  images: string[];
  videoUrl: string;
  reportUrl: string;
}

const emptyDraft = (): Draft => ({
  title: "",
  description: "",
  category: categories[0],
  type: "Experimental Research",
  status: "In Development",
  tags: [],
  problemStatement: "",
  objective: "",
  approach: [""],
  results: [""],
  images: ["", ""],
  videoUrl: "",
  reportUrl: ""
});

/* ───────────────────────── Helper editors ───────────────────────── */

const StringListEditor = ({
  label, items, onChange, placeholder
}: { label: string; items: string[]; onChange: (next: string[]) => void; placeholder: string }) => (
  <div className="space-y-2">
    <Label className="text-sm font-semibold">{label}</Label>
    {items.map((item, i) => (
      <div key={i} className="flex gap-2">
        <Input
          value={item}
          onChange={(e) => {
            const next = [...items];
            next[i] = e.target.value;
            onChange(next);
          }}
          placeholder={placeholder}
          className="text-sm"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-destructive"
          onClick={() => onChange(items.filter((_, j) => j !== i))}
          aria-label={`Remove ${label} item ${i + 1}`}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    ))}
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => onChange([...items, ""])}
      className="gap-1.5"
    >
      <Plus className="h-3.5 w-3.5" /> Add {label.replace(/s$/, "")}
    </Button>
  </div>
);

const TagChipEditor = ({
  tags, onChange
}: { tags: string[]; onChange: (next: string[]) => void }) => {
  const [value, setValue] = useState("");

  const add = () => {
    const v = value.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setValue("");
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold">Tags</Label>
      <div className="flex flex-wrap gap-2 min-h-6">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1 pr-1">
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              className="rounded-full hover:bg-foreground/10 p-0.5"
              aria-label={`Remove tag ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {tags.length === 0 && <span className="text-xs text-muted-foreground">No tags yet</span>}
      </div>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Type a tag and press Enter"
          className="text-sm"
        />
        <Button type="button" variant="outline" size="sm" onClick={add} className="shrink-0 gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Add
        </Button>
      </div>
    </div>
  );
};

/* ───────────────────────── Project editor dialog ───────────────────────── */

const ProjectEditor = ({
  draft, setDraft, onSave, onCancel, isNew
}: {
  draft: Draft;
  setDraft: (d: Draft) => void;
  onSave: () => void;
  onCancel: () => void;
  isNew: boolean;
}) => {
  const update = (patch: Partial<Draft>) => setDraft({ ...draft, ...patch });
  const allCategories = useMemo(() => {
    const set = new Set(categories);
    if (draft.category) set.add(draft.category);
    return Array.from(set);
  }, [draft.category]);

  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          {isNew ? "Add New Project" : "Edit Project"}
        </DialogTitle>
        <DialogDescription>
          Every field shown on the public project flashcard is editable here.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="p-title">Project Title</Label>
            <Input
              id="p-title"
              value={draft.title}
              onChange={(e) => update({ title: e.target.value })}
              placeholder="e.g. Invisible Paper Circuit System"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-category">Category</Label>
            <Select value={draft.category} onValueChange={(v) => update({ category: v })}>
              <SelectTrigger id="p-category"><SelectValue /></SelectTrigger>
              <SelectContent>
                {allCategories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="p-type">Type</Label>
            <Input
              id="p-type"
              value={draft.type}
              onChange={(e) => update({ type: e.target.value })}
              placeholder="e.g. Experimental Research"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-status">Status</Label>
            <Select value={draft.status} onValueChange={(v) => update({ status: v })}>
              <SelectTrigger id="p-status"><SelectValue /></SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="p-desc">Short Description (card preview)</Label>
          <Textarea
            id="p-desc"
            value={draft.description}
            onChange={(e) => update({ description: e.target.value })}
            rows={2}
            placeholder="One or two lines shown on the project card"
          />
        </div>

        <TagChipEditor tags={draft.tags} onChange={(tags) => update({ tags })} />

        <div className="space-y-2">
          <Label htmlFor="p-problem">Problem Statement</Label>
          <Textarea
            id="p-problem"
            value={draft.problemStatement}
            onChange={(e) => update({ problemStatement: e.target.value })}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="p-objective">Objective / Goal</Label>
          <Textarea
            id="p-objective"
            value={draft.objective}
            onChange={(e) => update({ objective: e.target.value })}
            rows={2}
          />
        </div>

        <StringListEditor
          label="Approach"
          items={draft.approach}
          onChange={(approach) => update({ approach })}
          placeholder="How you worked on it"
        />

        <StringListEditor
          label="Key Results"
          items={draft.results}
          onChange={(results) => update({ results })}
          placeholder="What you achieved"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="p-img1">Preview Image 1 (URL)</Label>
            <Input
              id="p-img1"
              value={draft.images[0] ?? ""}
              onChange={(e) => {
                const images = [...draft.images];
                images[0] = e.target.value;
                update({ images });
              }}
              placeholder="https://…"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-img2">Preview Image 2 (URL)</Label>
            <Input
              id="p-img2"
              value={draft.images[1] ?? ""}
              onChange={(e) => {
                const images = [...draft.images];
                images[1] = e.target.value;
                update({ images });
              }}
              placeholder="https://…"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="p-video">Testing Video (YouTube URL)</Label>
            <Input
              id="p-video"
              value={draft.videoUrl}
              onChange={(e) => update({ videoUrl: e.target.value })}
              placeholder="https://youtube.com/…"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-report">Report URL</Label>
            <Input
              id="p-report"
              value={draft.reportUrl}
              onChange={(e) => update({ reportUrl: e.target.value })}
              placeholder="#"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={onSave} className="gap-2" disabled={!draft.title.trim()}>
            <Save className="h-4 w-4" /> Save Project
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

/* ───────────────────────── Skills tab ───────────────────────── */

const SkillTagEditor = ({
  title, tags, onChange
}: { title: string; tags: SkillTag[]; onChange: (next: SkillTag[]) => void }) => {
  const [newLabel, setNewLabel] = useState("");
  const [newSize, setNewSize] = useState("md");

  const add = () => {
    const v = newLabel.trim();
    if (!v) return;
    if (tags.some((t) => t.label === v)) { setNewLabel(""); return; }
    onChange([...tags, { label: v, size: newSize }]);
    setNewLabel("");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TagsIcon className="h-4 w-4 text-primary" /> {title}
          <Badge variant="secondary" className="ml-auto">{tags.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {tags.map((tag, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input
              value={tag.label}
              onChange={(e) => {
                const next = [...tags];
                next[i] = { ...tag, label: e.target.value };
                onChange(next);
              }}
              className="text-sm"
            />
            <Select value={tag.size} onValueChange={(v) => {
              const next = [...tags];
              next[i] = { ...tag, size: v };
              onChange(next);
            }}>
              <SelectTrigger className="w-24 shrink-0"><SelectValue /></SelectTrigger>
              <SelectContent>
                {TAG_SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => onChange(tags.filter((_, j) => j !== i))}
              aria-label={`Remove ${tag.label}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="flex gap-2 items-center pt-2">
          <Input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
            placeholder="New skill name"
            className="text-sm"
          />
          <Select value={newSize} onValueChange={setNewSize}>
            <SelectTrigger className="w-24 shrink-0"><SelectValue /></SelectTrigger>
            <SelectContent>
              {TAG_SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={add} className="shrink-0 gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

/* ───────────────────────── Main admin page ───────────────────────── */

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: projects = [], isPlaceholderData } = useProjects();
  const { data: skillData, isPlaceholderData: skillsPlaceholder } = useSkills();
  const invalidate = useInvalidateSiteData();
  const [tech, setTech] = useState<SkillTag[]>([]);
  const [soft, setSoft] = useState<SkillTag[]>([]);
  const [skillsDirty, setSkillsDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (skillData && !skillsPlaceholder && !skillsDirty) {
      setTech(skillData.technical);
      setSoft(skillData.soft);
    }
  }, [skillData, skillsPlaceholder, skillsDirty]);
  const [search, setSearch] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [isNew, setIsNew] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminProject | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [projects, search]);

  const grouped = useMemo(() => {
    return categories
      .map((category) => ({
        category,
        items: filtered.filter((p) => p.category === category)
      }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const openNew = () => {
    setDraft(emptyDraft());
    setIsNew(true);
    setEditorOpen(true);
  };

  const openEdit = (p: AdminProject) => {
    setDraft({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category ?? categories[0],
      type: p.type,
      status: p.status,
      tags: [...p.tags],
      problemStatement: p.problemStatement,
      objective: p.objective,
      approach: [...p.approach],
      results: [...p.results],
      images: [...(p.images ?? [])],
      videoUrl: p.videoUrl ?? "",
      reportUrl: p.reportUrl ?? ""
    });
    setIsNew(false);
    setEditorOpen(true);
  };

  const saveProject = async () => {
    const clean = {
      title: draft.title.trim(),
      description: draft.description.trim(),
      category: draft.category,
      type: draft.type.trim(),
      status: draft.status,
      tags: draft.tags.map((t) => t.trim()).filter(Boolean),
      problemStatement: draft.problemStatement.trim(),
      objective: draft.objective.trim(),
      approach: draft.approach.map((s) => s.trim()).filter(Boolean),
      results: draft.results.map((s) => s.trim()).filter(Boolean),
      images: draft.images.map((s) => s.trim()).filter(Boolean),
      videoUrl: draft.videoUrl.trim(),
      reportUrl: draft.reportUrl.trim()
    };

    setBusy(true);
    const existing = projects.find((p) => p.id === draft.id);
    const row = toRow({
      ...clean,
      isFeatured: existing?.isFeatured ?? false,
      sortOrder: existing?.sortOrder ?? projects.reduce((m, p) => Math.max(m, p.sortOrder), -1) + 1,
    });
    const { error } = isNew
      ? await supabase.from('projects').insert(row)
      : await supabase.from('projects').update(row).eq('id', draft.id!);
    setBusy(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    await invalidate();
    toast({ title: isNew ? "Project added" : "Project saved", description: "“" + clean.title + "” is live on the site." });
    setEditorOpen(false);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from('projects').delete().eq('id', deleteTarget.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    await invalidate();
    toast({
      title: "Project deleted",
      description: "“" + deleteTarget.title + "” removed.",
      variant: "destructive"
    });
    setDeleteTarget(null);
  };

  const saveSkills = async () => {
    setBusy(true);
    try {
      await saveSkillList('technical', tech);
      await saveSkillList('soft', soft);
      setSkillsDirty(false);
      await invalidate();
      toast({ title: "Skills saved", description: "Your skills are live on the site." });
    } catch (e) {
      toast({ title: "Save failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const exitAdmin = () => {
    lockAdmin();
    navigate('/');
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        {/* Top bar */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground leading-tight">Admin Console</h1>
                <p className="text-xs text-muted-foreground">Changes save to the database and appear on the live site</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden sm:flex gap-1.5 text-xs">
                <Database className="h-3 w-3" /> Connected
              </Badge>
              <Button variant="outline" size="sm" onClick={exitAdmin} className="gap-1.5">
                <LogOut className="h-4 w-4" /> Exit & Lock
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <Tabs defaultValue="projects">
            <TabsList className="mb-6">
              <TabsTrigger value="projects" className="gap-1.5">
                <FolderOpen className="h-4 w-4" /> Projects ({projects.length})
              </TabsTrigger>
              <TabsTrigger value="skills" className="gap-1.5">
                <TagsIcon className="h-4 w-4" /> Skills ({tech.length + soft.length})
              </TabsTrigger>
            </TabsList>

            {/* ── Projects tab ── */}
            <TabsContent value="projects" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title, category, status or tag…"
                    className="pl-9"
                  />
                </div>
                <Button onClick={openNew} className="gap-2">
                  <Plus className="h-4 w-4" /> Add Project
                </Button>
              </div>

              {grouped.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No projects match “{search}”.</p>
              )}

              {grouped.map((group) => (
                <div key={group.category}>
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    {group.category}
                    <span className="ml-2 normal-case font-normal">({group.items.length})</span>
                  </h2>
                  <div className="space-y-3">
                    {group.items.map((p) => (
                      <Card key={p.id}>
                        <CardContent className="py-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="font-semibold text-foreground truncate">{p.title}</span>
                                <Badge variant="outline" className="text-xs">{p.type}</Badge>
                                <Badge className="text-xs bg-secondary text-secondary-foreground">{p.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-1">{p.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {p.tags.slice(0, 5).map((t) => (
                                  <Badge key={t} variant="secondary" className="text-[10px] px-1.5 py-0">{t}</Badge>
                                ))}
                                {p.tags.length > 5 && (
                                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">+{p.tags.length - 5}</Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <Button variant="outline" size="sm" onClick={() => openEdit(p)} className="gap-1.5">
                                <Pencil className="h-3.5 w-3.5" /> Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDeleteTarget(p)}
                                className="gap-1.5 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* ── Skills tab ── */}
            <TabsContent value="skills" className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  {skillsDirty ? "You have unsaved skill changes." : "All skill changes are saved."}
                </p>
                <Button onClick={saveSkills} disabled={!skillsDirty || busy} className="gap-2">
                  <Save className="h-4 w-4" /> Save Skills
                </Button>
              </div>
              <SkillTagEditor title="Technical Proficiency" tags={tech} onChange={(t) => { setTech(t); setSkillsDirty(true); }} />
              <SkillTagEditor title="Soft Skills & Mindset" tags={soft} onChange={(t) => { setSoft(t); setSkillsDirty(true); }} />
            </TabsContent>
          </Tabs>
        </main>

        {/* Project editor modal */}
        <Dialog open={editorOpen} onOpenChange={(open) => !open && setEditorOpen(false)}>
          {editorOpen && (
            <ProjectEditor
              draft={draft}
              setDraft={setDraft}
              onSave={saveProject}
              onCancel={() => setEditorOpen(false)}
              isNew={isNew}
            />
          )}
        </Dialog>

        {/* Delete confirmation */}
        <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this project?</AlertDialogTitle>
              <AlertDialogDescription>
                “{deleteTarget?.title}” will be removed from the list. In Step 1 this affects
                the current session only — the public site keeps its data until the database is connected.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminGuard>
  );
};

export default AdminPage;
