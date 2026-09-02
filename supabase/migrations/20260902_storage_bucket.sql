-- 1. إنشاء Bucket باسم article-images واجعله Public
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. إتاحة القراءة للجميع (Public Read)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

-- 3. إتاحة الرفع للمستخدمين المسجلين فقط (أو غير الجميع حسب حاجتك)
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'article-images');
