ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS image_url TEXT;

COMMENT ON COLUMN public.posts.image_url IS 'Optional cover image URL for the article card and detail page';
