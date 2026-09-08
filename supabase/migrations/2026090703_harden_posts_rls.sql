-- Restrict public article reads to published content and protect admin mutations.
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = (SELECT auth.uid())
      AND role = 'admin'
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin_user() TO authenticated;

DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;
DROP POLICY IF EXISTS "Allow public read access" ON public.posts;
DROP POLICY IF EXISTS "Allow public read published posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can manage posts" ON public.posts;
DROP POLICY IF EXISTS "Allow admins full access to posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can read posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can insert posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.posts;

CREATE POLICY "Public can read published posts"
  ON public.posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins can read posts"
  ON public.posts
  FOR SELECT
  TO authenticated
  USING ((SELECT public.is_admin_user()));

CREATE POLICY "Admins can insert posts"
  ON public.posts
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT public.is_admin_user()));

CREATE POLICY "Admins can update posts"
  ON public.posts
  FOR UPDATE
  TO authenticated
  USING ((SELECT public.is_admin_user()))
  WITH CHECK ((SELECT public.is_admin_user()));

CREATE POLICY "Admins can delete posts"
  ON public.posts
  FOR DELETE
  TO authenticated
  USING ((SELECT public.is_admin_user()));
