-- Allow only administrators to inspect support data and remove article media.
DROP POLICY IF EXISTS "Admins can read support tickets" ON public.support_tickets;
CREATE POLICY "Admins can read support tickets"
  ON public.support_tickets FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = (SELECT auth.uid())
        AND role IN ('admin', 'super_admin')
    )
  );

DROP POLICY IF EXISTS "Admins can delete article images" ON storage.objects;
CREATE POLICY "Admins can delete article images"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'article-images'
    AND EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = (SELECT auth.uid())
        AND role IN ('admin', 'super_admin')
    )
  );

REVOKE EXECUTE ON FUNCTION public.notify_community_comment() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.notify_support_ticket_update() FROM PUBLIC;
