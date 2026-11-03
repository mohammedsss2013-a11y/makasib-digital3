/* DEV-ONLY: هذا السكربت مخصص لإصلاح صور المقالات المنشورة في قاعدة التطوير. */
require('dotenv').config({ path: require('node:path').join(__dirname, '..', '..', '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('يلزم ضبط NEXT_PUBLIC_SUPABASE_URL وSUPABASE_SERVICE_ROLE_KEY في .env.local');
}

const supabase = createClient(supabaseUrl, supabaseKey);
const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const fixes = [
  {
    id: 31,
    image_url: image('photo-1461749280684-dccba630e2f6'),
    image_alt: 'شاشة تحتوي على شيفرة برمجية',
    missingOnly: true,
  },
  {
    id: 32,
    image_url: image('photo-1432888498266-38ffec3eaf0a'),
    image_alt: 'شخص يعمل على جهاز كمبيوتر في مجال التسويق الرقمي',
    missingOnly: true,
  },
  {
    id: 33,
    image_url: image('photo-1550751827-4bd374c3f58b'),
    image_alt: 'تصور بصري لحماية البيانات والأمن السيبراني',
    missingOnly: true,
  },
];

const slugFixes = [
  {
    slug: 'calculate-freelance-service-pricing',
    previousImage: image('photo-1554224155-8d04cb21cd6c'),
    image_url: image('photo-1579621970563-ebec7560ff3e'),
    image_alt: 'حاسبة وأوراق لتخطيط التسعير وإدارة المشاريع المستقلة',
  },
  {
    slug: 'ecommerce-store-profitability-metrics',
    previousImage: image('photo-1556742049-0a67d577c4d3'),
    image_url: image('photo-1563986768609-322da13575f3'),
    image_alt: 'إحصاءات وأرقام مبيعات متجر إلكتروني على شاشة',
  },
  {
    slug: 'choosing-ai-tools-for-your-team',
    previousImage: image('photo-1677442136019-21780ecad995'),
    image_url: image('photo-1655720406788-f8d7bf9ea2a8'),
    image_alt: 'فريق يناقش تطبيقات الذكاء الاصطناعي المناسبة للعمل',
  },
  {
    slug: 'cybersecurity-plan-for-startups',
    previousImage: image('photo-1563013544-824ae1b704d3'),
    image_url: image('photo-1526374965328-7f61d4dc18c5'),
    image_alt: 'شاشة تعرض رموزاً برمجية وشبكة حماية سيبرانية',
  },
  {
    slug: 'future-digital-culture-and-self-building',
    previousImage: image('photo-1451187580459-43490279c0fa'),
    image_url: image('photo-1519389950473-47ba0277781c'),
    image_alt: 'أشخاص يتفاعلون مع التقنية الرقمية في بيئة العمل المستقبلية',
  },
  {
    slug: 'editorial-calendar-that-builds-audience',
    previousImage: image('photo-1611162617474-5b21e879e113'),
    image_url: image('photo-1499750310107-5fef28a66643'),
    image_alt: 'تقويم تحريري وخطة نشر محتوى رقمي',
  },
  {
    slug: 'verify-digital-news-before-sharing',
    previousImage: image('photo-1504711434969-e33886168f5c'),
    image_url: image('photo-1588681664899-f142ff2dc9b1'),
    image_alt: 'شخص يراجع مصادر الأخبار الرقمية على جهازه',
  },
  {
    slug: 'weekly-system-for-digital-organization',
    previousImage: image('photo-1484480974693-6ca0a78fb36b'),
    image_url: image('photo-1512314889357-e157c22f938d'),
    image_alt: 'شخص ينظّم مهامه الأسبوعية على تطبيق رقمي',
  },
  {
    slug: 'healthy-screen-boundaries-remote-work',
    previousImage: image('photo-1506126613408-eca07ce68773'),
    image_url: image('photo-1571019613454-1cb2f99b2d8b'),
    image_alt: 'شخص يمارس الاسترخاء بعيداً عن الشاشات للحفاظ على صحته الرقمية',
  },
];

async function updateArticle(fix, identity) {
  const { data: current, error: readError } = await supabase
    .from('posts')
    .select('id, slug, image_url')
    .eq(identity.column, identity.value)
    .eq('status', 'published')
    .maybeSingle();

  if (readError) throw new Error(`تعذر فحص المقال ${identity.value}: ${readError.message}`);
  if (!current) throw new Error(`لم يُعثر على المقال المنشور ${identity.value}`);
  if (current.image_url === fix.image_url) {
    console.log(`⏭️ ${current.slug}: الصورة محدثة مسبقاً`);
    return;
  }

  const update = supabase
    .from('posts')
    .update({ image_url: fix.image_url, image_alt: fix.image_alt })
    .eq('id', current.id)
    .eq('status', 'published');

  const guardedUpdate = fix.missingOnly
    ? update.or('image_url.is.null,image_url.eq.')
    : update.eq('image_url', fix.previousImage);

  const { data: updated, error: updateError } = await guardedUpdate
    .select('id, slug, image_url')
    .maybeSingle();

  if (updateError) throw new Error(`فشل تحديث ${current.slug}: ${updateError.message}`);
  if (!updated) {
    throw new Error(`تغيرت صورة ${current.slug} بعد الفحص؛ أوقف التحديث لتجنب استبدال صورة غير متوقعة.`);
  }

  console.log(`✅ ${updated.slug}: تم تحديث الصورة`);
}

async function main() {
  for (const fix of fixes) {
    await updateArticle(fix, { column: 'id', value: fix.id });
  }

  for (const fix of slugFixes) {
    await updateArticle(fix, { column: 'slug', value: fix.slug });
  }

  const { data: published, error } = await supabase
    .from('posts')
    .select('id, slug, image_url')
    .eq('status', 'published');

  if (error) throw new Error(`تعذر التحقق النهائي: ${error.message}`);

  const missing = published.filter((post) => !post.image_url);
  const imageCounts = new Map();
  for (const post of published) {
    if (post.image_url) imageCounts.set(post.image_url, (imageCounts.get(post.image_url) || 0) + 1);
  }
  const duplicates = [...imageCounts.entries()].filter(([, count]) => count > 1);

  console.log(
    `\nفحص المقالات المنشورة: ${published.length} إجمالي، ${published.length - missing.length} بصورة، ` +
    `${missing.length} بلا صورة، ${imageCounts.size} صورة فريدة، ${duplicates.length} صور مكررة.`,
  );

  if (missing.length || duplicates.length) {
    throw new Error('بقيت صور مفقودة أو مكررة؛ راجع نتائج الفحص قبل إعلان اكتمال الإصلاح.');
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
