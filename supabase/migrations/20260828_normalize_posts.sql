ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS image_alt TEXT,
  ADD COLUMN IF NOT EXISTS article_type TEXT NOT NULL DEFAULT 'guide',
  ADD COLUMN IF NOT EXISTS tool_slug TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW());

UPDATE public.posts
SET slug = COALESCE(NULLIF(slug, ''), 'post-' || id::text),
    description = COALESCE(NULLIF(description, ''), LEFT(regexp_replace(content, '<[^>]+>', ' ', 'g'), 155)),
    image_alt = COALESCE(NULLIF(image_alt, ''), title),
    published_at = COALESCE(published_at, created_at),
    updated_at = COALESCE(updated_at, created_at)
WHERE slug IS NULL OR slug = '' OR description IS NULL OR image_alt IS NULL OR published_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_posts_slug_unique ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status_published_at ON public.posts(status, published_at DESC);

COMMENT ON COLUMN public.posts.slug IS 'Canonical public article slug';
COMMENT ON COLUMN public.posts.status IS 'Publication state, currently published or draft';
