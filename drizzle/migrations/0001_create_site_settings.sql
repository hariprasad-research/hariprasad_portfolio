CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
-- TEMPORARY: open writes until admin sign-in is added
CREATE POLICY "Temp open write site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER site_settings_touch BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();