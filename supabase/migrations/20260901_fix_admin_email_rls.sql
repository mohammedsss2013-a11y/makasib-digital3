-- Fix admin email typo in RLS policies: mohammd → mohammed

-- 1. Fix policy on user_roles
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
CREATE POLICY "Admins can manage user roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() AND ur.role IN ('super_admin', 'admin')
    )
    OR auth.email() = 'mohammed.sss2013@gmail.com'
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() AND ur.role IN ('super_admin', 'admin')
    )
    OR auth.email() = 'mohammed.sss2013@gmail.com'
  );

-- 2. Fix policy on audit_logs
DROP POLICY IF EXISTS "Admins can read audit logs" ON public.audit_logs;
CREATE POLICY "Admins can read audit logs"
  ON public.audit_logs FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid() AND ur.role IN ('super_admin', 'admin')
    )
    OR auth.email() = 'mohammed.sss2013@gmail.com'
  );
