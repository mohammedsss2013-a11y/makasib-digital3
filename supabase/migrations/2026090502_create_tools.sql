CREATE TABLE IF NOT EXISTS public.tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sector TEXT NOT NULL CHECK (sector IN ('finance', 'tech', 'media', 'digital-lifestyle')),
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Wrench',
  is_interactive BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX IF NOT EXISTS idx_tools_status_sector
  ON public.tools(status, sector);

ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'tools'
      AND policyname = 'Active tools are viewable by everyone'
  ) THEN
    CREATE POLICY "Active tools are viewable by everyone"
      ON public.tools FOR SELECT TO anon, authenticated
      USING (status = 'active');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'tools'
      AND policyname = 'Admins can manage tools'
  ) THEN
    CREATE POLICY "Admins can manage tools"
      ON public.tools FOR ALL TO authenticated
      USING (
        auth.email() = 'mohammed.sss2013@gmail.com'
        OR EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin')
        )
      )
      WITH CHECK (
        auth.email() = 'mohammed.sss2013@gmail.com'
        OR EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_id = auth.uid() AND role IN ('super_admin', 'admin')
        )
      );
  END IF;
END
$$;