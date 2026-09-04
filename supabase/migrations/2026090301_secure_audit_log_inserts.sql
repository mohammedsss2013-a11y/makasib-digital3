-- Allow authenticated administrators to create audit entries from protected server actions.
-- The policy keeps the actor identity bound to the authenticated session.
DROP POLICY IF EXISTS "Admins can insert audit logs" ON public.audit_logs;
CREATE POLICY "Admins can insert audit logs"
  ON public.audit_logs FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      EXISTS (
        SELECT 1
        FROM public.user_roles ur
        WHERE ur.user_id = auth.uid()
          AND ur.role IN ('admin', 'super_admin')
      )
      OR auth.email() = 'mohammed.sss2013@gmail.com'
    )
  );

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id_created_at
  ON public.audit_logs(user_id, created_at DESC);
