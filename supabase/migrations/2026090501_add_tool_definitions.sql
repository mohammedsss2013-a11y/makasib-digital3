CREATE TABLE IF NOT EXISTS public.tool_definitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('finance', 'tech', 'media', 'digital-lifestyle')),
  icon_name TEXT NOT NULL DEFAULT 'Wrench',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tool_definitions_status_category
  ON public.tool_definitions(status, category);

ALTER TABLE public.tool_definitions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'tool_definitions'
      AND policyname = 'Published tool definitions are viewable by everyone'
  ) THEN
    CREATE POLICY "Published tool definitions are viewable by everyone"
      ON public.tool_definitions FOR SELECT TO anon, authenticated
      USING (status = 'published');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'tool_definitions'
      AND policyname = 'Admins can manage tool definitions'
  ) THEN
    CREATE POLICY "Admins can manage tool definitions"
      ON public.tool_definitions FOR ALL TO authenticated
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
