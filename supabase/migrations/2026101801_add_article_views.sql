ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS views_count integer NOT NULL DEFAULT 0;

UPDATE public.posts
SET views_count = 0
WHERE views_count IS NULL;

ALTER TABLE public.posts
  ALTER COLUMN views_count SET DEFAULT 0,
  ALTER COLUMN views_count SET NOT NULL;

CREATE OR REPLACE FUNCTION public.increment_article_views(p_article_id bigint, p_article_slug text)
RETURNS integer
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = pg_catalog, public
AS $$
DECLARE
  updated_count integer;
BEGIN
  UPDATE public.posts
  SET views_count = views_count + 1
  WHERE id = p_article_id
    AND status = 'published'
    AND views_count < 2147483647
    AND (
      COALESCE(NULLIF(slug, ''), 'post-' || id::text) = p_article_slug
      OR p_article_slug = 'post-' || id::text || '-' || slug
    )
  RETURNING views_count INTO updated_count;

  RETURN updated_count;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_article_views(bigint, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_article_views(bigint, text) TO service_role;
