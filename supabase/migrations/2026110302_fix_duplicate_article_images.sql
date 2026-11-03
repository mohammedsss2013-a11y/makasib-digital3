-- migration: fix_duplicate_and_missing_article_images
-- يصحّح صور المقالات المكررة أو المفقودة الناتجة عن السكربتات القديمة
-- المقالات المتأثرة: IDs 31, 32, 33, 53, 55, 56, 57, 58, 59, 60, 61, 62

-- ===================================================================
-- المجموعة 1: مقالات بدون صورة (جاءت من insert-posts.js القديم)
-- ===================================================================

-- id=31: كيف تبدأ مسيرتك في البرمجة (تكنولوجيا - تطبيقات ناشئة)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'شاشة تحتوي على شيفرة برمجية',
    updated_at = NOW()
WHERE id = 31 AND status = 'published' AND (image_url IS NULL OR image_url = '');

-- id=32: مقدمة في التسويق بالعمولة (مال وأعمال - التسويق الرقمي)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'شخص يعمل على جهاز كمبيوتر في مجال التسويق الرقمي',
    updated_at = NOW()
WHERE id = 32 AND status = 'published' AND (image_url IS NULL OR image_url = '');

-- id=33: أهمية الأمن السيبراني للأعمال الناشئة (تكنولوجيا - أمن سيبراني)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'تصور بصري لحماية البيانات والأمن السيبراني',
    updated_at = NOW()
WHERE id = 33 AND status = 'published' AND (image_url IS NULL OR image_url = '');

-- ===================================================================
-- المجموعة 2: مقالات جديدة من seed القديم تتعارض مع seed-articles.ts
-- القاعدة: نُعدّل المقالات القديمة (بالـ slugs العربية أو القديمة)
--          ونُبقي صور seed-articles.ts (slugs إنجليزية نظيفة) كما هي
-- ===================================================================

-- id=57: calculate-freelance-service-pricing | تكرار مع photo-1554224155-8d04cb21cd6c
-- (freelancing-and-micro-projects-guide يحتفظ بالصورة الأصلية)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'حاسبة وأوراق لتخطيط التسعير وإدارة المشاريع المستقلة',
    updated_at = NOW()
WHERE slug = 'calculate-freelance-service-pricing'
  AND status = 'published'
  AND image_url = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80';

-- id=58: ecommerce-store-profitability-metrics | تكرار مع photo-1556742049-0a67d577c4d3
-- (e-commerce-and-digital-sales-guide يحتفظ بالصورة الأصلية)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'إحصاءات وأرقام مبيعات متجر إلكتروني على شاشة',
    updated_at = NOW()
WHERE slug = 'ecommerce-store-profitability-metrics'
  AND status = 'published'
  AND image_url = 'https://images.unsplash.com/photo-1556742049-0a67d577c4d3?auto=format&fit=crop&w=1200&q=80';

-- id=55: choosing-ai-tools-for-your-team | تكرار مع photo-1677442136019
-- (ai-applications-and-systems-guide يحتفظ بالصورة الأصلية)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1655720406788-f8d7bf9ea2a8?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'فريق يناقش تطبيقات الذكاء الاصطناعي المناسبة للعمل',
    updated_at = NOW()
WHERE slug = 'choosing-ai-tools-for-your-team'
  AND status = 'published'
  AND image_url = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80';

-- id=56: cybersecurity-plan-for-startups | تكرار مع photo-1563013544
-- (cybersecurity-and-digital-privacy-guide يحتفظ بالصورة الأصلية)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'شاشة تعرض رموز برمجية وشبكة حماية سيبرانية',
    updated_at = NOW()
WHERE slug = 'cybersecurity-plan-for-startups'
  AND status = 'published'
  AND image_url = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80';

-- id=53: future-digital-culture-and-self-building | تكرار مع photo-1451187580459
-- (cloud-computing-remote-tools-guide يحتفظ بالصورة الأصلية)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'أشخاص يتفاعلون مع التقنية الرقمية في بيئة العمل المستقبلية',
    updated_at = NOW()
WHERE slug = 'future-digital-culture-and-self-building'
  AND status = 'published'
  AND image_url = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

-- id=59: editorial-calendar-that-builds-audience | تكرار مع photo-1611162617474
-- (visual-and-written-content-creation-guide يحتفظ بالصورة الأصلية)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'تقويم تحريري وخطة نشر محتوى رقمي',
    updated_at = NOW()
WHERE slug = 'editorial-calendar-that-builds-audience'
  AND status = 'published'
  AND image_url = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80';

-- id=60: verify-digital-news-before-sharing | تكرار مع photo-1504711434969
-- (digital-industry-news-and-analysis يحتفظ بالصورة الأصلية)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'شخص يراجع مصادر الأخبار الرقمية على جهازه',
    updated_at = NOW()
WHERE slug = 'verify-digital-news-before-sharing'
  AND status = 'published'
  AND image_url = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';

-- id=61: weekly-system-for-digital-organization | تكرار مع photo-1484480974693
-- (digital-life-management-and-organization يحتفظ بالصورة الأصلية)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'شخص ينظّم مهامه الأسبوعية على تطبيق رقمي',
    updated_at = NOW()
WHERE slug = 'weekly-system-for-digital-organization'
  AND status = 'published'
  AND image_url = 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80';

-- id=62: healthy-screen-boundaries-remote-work | تكرار مع photo-1506126613408
-- (digital-health-and-burnout-prevention يحتفظ بالصورة الأصلية)
UPDATE public.posts
SET image_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    image_alt = 'شخص يمارس الاسترخاء بعيداً عن الشاشات للحفاظ على صحته الرقمية',
    updated_at = NOW()
WHERE slug = 'healthy-screen-boundaries-remote-work'
  AND status = 'published'
  AND image_url = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80';

-- ===================================================================
-- التحقق: عرض ملخص الصور بعد التصحيح
-- ===================================================================
SELECT
  COUNT(*) AS total_posts,
  COUNT(image_url) AS posts_with_image,
  COUNT(*) - COUNT(image_url) AS posts_missing_image,
  COUNT(DISTINCT image_url) AS unique_images,
  COUNT(*) - COUNT(DISTINCT image_url) AS potential_duplicates
FROM public.posts
WHERE status = 'published';
