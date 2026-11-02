-- migration: community_post_likes
-- extracted from scripts/apply-persistence-schema.js
-- إعجابات منشورات المجتمع مع سياسات الوصول (RLS)

CREATE TABLE IF NOT EXISTS public.community_post_likes (
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (post_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_community_post_likes_post_id ON public.community_post_likes(post_id);

ALTER TABLE public.community_post_likes ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'community_post_likes'
      AND policyname = 'Community likes are viewable by everyone'
  ) THEN
    CREATE POLICY "Community likes are viewable by everyone"
      ON public.community_post_likes
      FOR SELECT TO anon, authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'community_post_likes'
      AND policyname = 'Users can like posts once'
  ) THEN
    CREATE POLICY "Users can like posts once"
      ON public.community_post_likes
      FOR INSERT TO authenticated
      WITH CHECK ((select auth.uid()) = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'community_post_likes'
      AND policyname = 'Users can remove own likes'
  ) THEN
    CREATE POLICY "Users can remove own likes"
      ON public.community_post_likes
      FOR DELETE TO authenticated
      USING ((select auth.uid()) = user_id);
  END IF;
END
$$;
