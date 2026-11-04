CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'Independent Research',
  status text NOT NULL DEFAULT 'In Development',
  tags text[] NOT NULL DEFAULT '{}',
  problem_statement text NOT NULL DEFAULT '',
  objective text NOT NULL DEFAULT '',
  approach text[] NOT NULL DEFAULT '{}',
  results text[] NOT NULL DEFAULT '{}',
  images text[] NOT NULL DEFAULT '{}',
  video_url text NOT NULL DEFAULT '',
  report_url text NOT NULL DEFAULT '',
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  size text NOT NULL DEFAULT 'md',
  kind text NOT NULL CHECK (kind IN ('technical','soft')),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.skills TO anon, authenticated;
GRANT ALL ON public.projects TO service_role;
GRANT ALL ON public.skills TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
-- TEMPORARY: open writes until admin sign-in is added (next step)
CREATE POLICY "Temp open write projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Temp open write skills" ON public.skills FOR ALL USING (true) WITH CHECK (true);
CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER projects_touch BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();