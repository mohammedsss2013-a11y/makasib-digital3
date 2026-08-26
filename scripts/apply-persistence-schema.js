require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error('لم يتم العثور على DATABASE_URL أو POSTGRES_URL');
  process.exit(1);
}

const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

const sql = `
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
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'community_post_likes' AND policyname = 'Community likes are viewable by everyone') THEN
    CREATE POLICY "Community likes are viewable by everyone" ON public.community_post_likes FOR SELECT TO anon, authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'community_post_likes' AND policyname = 'Users can like posts once') THEN
    CREATE POLICY "Users can like posts once" ON public.community_post_likes FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'community_post_likes' AND policyname = 'Users can remove own likes') THEN
    CREATE POLICY "Users can remove own likes" ON public.community_post_likes FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);
  END IF;
END
$$;
`;

(async () => {
  try {
    await client.connect();
    await client.query(sql);
    const result = await client.query(`
      SELECT tablename, rowsecurity
      FROM pg_tables
      WHERE schemaname = 'public' AND tablename = 'community_post_likes'
    `);
    const policies = await client.query(`
      SELECT policyname, cmd
      FROM pg_policies
      WHERE schemaname = 'public' AND tablename = 'community_post_likes'
      ORDER BY policyname
    `);
    console.log(JSON.stringify({ table: result.rows, policies: policies.rows }, null, 2));
  } catch (error) {
    console.error('تعذر تطبيق مخطط الحفظ والإعجابات:', error.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
})();
