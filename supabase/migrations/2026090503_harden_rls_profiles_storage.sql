-- Centralize admin checks outside user_roles RLS to avoid recursive policies.
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = (SELECT auth.uid())
      AND role IN ('admin', 'super_admin')
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin_user() TO authenticated;

DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
CREATE POLICY "Admins can manage user roles"
  ON public.user_roles FOR ALL TO authenticated
  USING ((SELECT public.is_admin_user()))
  WITH CHECK ((SELECT public.is_admin_user()));

DROP POLICY IF EXISTS "Admins can read audit logs" ON public.audit_logs;
CREATE POLICY "Admins can read audit logs"
  ON public.audit_logs FOR SELECT TO authenticated
  USING ((SELECT public.is_admin_user()));

DROP POLICY IF EXISTS "Admins can insert audit logs" ON public.audit_logs;
CREATE POLICY "Admins can insert audit logs"
  ON public.audit_logs FOR INSERT TO authenticated
  WITH CHECK (
    user_id = (SELECT auth.uid())
    AND (SELECT public.is_admin_user())
  );

DROP POLICY IF EXISTS "Admins can manage tools" ON public.tools;
CREATE POLICY "Admins can manage tools"
  ON public.tools FOR ALL TO authenticated
  USING ((SELECT public.is_admin_user()))
  WITH CHECK ((SELECT public.is_admin_user()));

DROP POLICY IF EXISTS "Admins can manage tool definitions" ON public.tool_definitions;
CREATE POLICY "Admins can manage tool definitions"
  ON public.tool_definitions FOR ALL TO authenticated
  USING ((SELECT public.is_admin_user()))
  WITH CHECK ((SELECT public.is_admin_user()));

-- The base table is private. Public profile data is exposed through a narrow view.
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = id OR (SELECT public.is_admin_user()));

CREATE OR REPLACE VIEW public.public_profiles
WITH (security_invoker = false)
AS
SELECT id, full_name, avatar_url, bio
FROM public.profiles;

REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.public_profiles FROM PUBLIC;
GRANT SELECT ON public.public_profiles TO anon, authenticated;

-- Keep public reads, but require new uploads to be owned, typed, and <= 5 MiB.
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public article image access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'article-images');

DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Users upload owned article images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'article-images'
    AND (SELECT (storage.foldername(name))[1]) = (SELECT auth.uid()::text)
    AND metadata->>'mimetype' IN ('image/jpeg', 'image/png', 'image/webp', 'image/gif')
    AND CASE
      WHEN metadata->>'size' ~ '^[0-9]+$' THEN (metadata->>'size')::bigint
      ELSE 0
    END BETWEEN 1 AND 5242880
  );