-- Keep the primary administrator recognized by both the database and the app.
INSERT INTO public.user_roles (user_id, email, role, updated_at)
SELECT id, email, 'super_admin', timezone('utc'::text, now())
FROM auth.users
WHERE lower(email) = lower('mohammed.sss2013@gmail.com')
ON CONFLICT (user_id) DO UPDATE
SET email = EXCLUDED.email,
    role = 'super_admin',
    updated_at = timezone('utc'::text, now());