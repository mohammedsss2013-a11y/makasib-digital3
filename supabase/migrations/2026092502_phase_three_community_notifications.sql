CREATE TABLE IF NOT EXISTS public.community_post_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.community_post_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(trim(content)) BETWEEN 1 AND 2000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_community_comments_post_created
  ON public.community_post_comments(post_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_community_comments_parent
  ON public.community_post_comments(parent_id);

ALTER TABLE public.community_post_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Community comments are viewable by everyone" ON public.community_post_comments;
CREATE POLICY "Community comments are viewable by everyone"
  ON public.community_post_comments FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.community_post_comments;
CREATE POLICY "Authenticated users can create comments"
  ON public.community_post_comments FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own comments" ON public.community_post_comments;
CREATE POLICY "Users can update own comments"
  ON public.community_post_comments FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own comments" ON public.community_post_comments;
CREATE POLICY "Users can delete own comments"
  ON public.community_post_comments FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('comment', 'reply', 'support_update', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  href TEXT,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_created
  ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_unread
  ON public.notifications(user_id, read_at) WHERE read_at IS NULL;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own notifications" ON public.notifications;
CREATE POLICY "Users can read own notifications"
  ON public.notifications FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can mark own notifications read" ON public.notifications;
CREATE POLICY "Users can mark own notifications read"
  ON public.notifications FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE OR REPLACE FUNCTION public.notify_community_comment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  post_owner UUID;
  recipient UUID;
BEGIN
  SELECT user_id INTO post_owner FROM public.community_posts WHERE id = NEW.post_id;
  recipient := COALESCE((SELECT user_id FROM public.community_post_comments WHERE id = NEW.parent_id), post_owner);

  IF recipient IS NOT NULL AND recipient <> NEW.user_id THEN
    INSERT INTO public.notifications (user_id, actor_id, type, title, message, href)
    VALUES (
      recipient,
      NEW.user_id,
      CASE WHEN NEW.parent_id IS NULL THEN 'comment' ELSE 'reply' END,
      CASE WHEN NEW.parent_id IS NULL THEN 'تعليق جديد على منشورك' ELSE 'رد جديد على تعليقك' END,
      left(NEW.content, 140),
      '/community'
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS community_comment_notification ON public.community_post_comments;
CREATE TRIGGER community_comment_notification
  AFTER INSERT ON public.community_post_comments
  FOR EACH ROW EXECUTE FUNCTION public.notify_community_comment();

CREATE OR REPLACE FUNCTION public.notify_support_ticket_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.notifications (user_id, type, title, message, href)
    VALUES (NEW.user_id, 'support_update', 'تحديث على تذكرة الدعم', 'تم تحديث حالة تذكرة الدعم الخاصة بك إلى: ' || NEW.status, '/dashboard/support');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS support_ticket_notification ON public.support_tickets;
CREATE TRIGGER support_ticket_notification
  AFTER UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.notify_support_ticket_update();