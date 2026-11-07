ALTER TABLE public.posts
  ADD CONSTRAINT posts_published_cover_image_check
  CHECK (
    status <> 'published'
    OR (
      image_url IS NOT NULL
      AND btrim(image_url) <> ''
      AND btrim(image_url) ~ '^https://'
    )
  );

CREATE UNIQUE INDEX posts_published_cover_image_unique
  ON public.posts ((split_part(split_part(btrim(image_url), '?', 1), '#', 1)))
  WHERE status = 'published';