-- Ensure role assignments are keyed by the auth.users UUID.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.user_roles'::regclass
      AND conname = 'user_roles_user_id_unique'
  ) THEN
    ALTER TABLE public.user_roles
      ADD CONSTRAINT user_roles_user_id_unique UNIQUE (user_id);
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION public.assign_admin_role_by_id(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.is_admin_user() THEN
    RAISE EXCEPTION 'only administrators can assign admin roles';
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id)
  DO UPDATE SET role = 'admin';
END;
$$;

REVOKE ALL ON FUNCTION public.assign_admin_role_by_id(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.assign_admin_role_by_id(uuid) TO authenticated;
