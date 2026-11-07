require('dotenv').config({ path: require('node:path').resolve(__dirname, '..', '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const pageSize = 500;
const requestTimeoutMs = 10000;
const imageCache = new Map();
const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('يلزم ضبط NEXT_PUBLIC_SUPABASE_URL وSUPABASE_SERVICE_ROLE_KEY في .env.local');
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const coverImages = [
  { id: 'photo-1554224155-8d04cb21cd6c', alt: 'أوراق وآلة حاسبة للتخطيط المالي', tags: ['المال', 'الأعمال', 'تسعير', 'تمويل', 'finance', 'business'] },
  { id: 'photo-1556742049-0a67d577c4d3', alt: 'دفع إلكتروني لمتجر عبر الإنترنت', tags: ['متجر', 'تجارة', 'مبيعات', 'دفع', 'ecommerce', 'commerce'] },
  { id: 'photo-1460925895917-afdab827c52f', alt: 'تحليلات وأداء حملة تسويق رقمية', tags: ['تسويق', 'إعلانات', 'تحليلات', 'marketing', 'analytics'] },
  { id: 'photo-1553729459-efe14ef6055d', alt: 'تخطيط مالي ونمو الأعمال', tags: ['المال', 'الأعمال', 'استثمار', 'finance', 'business'] },
  { id: 'photo-1621416894569-0f39ed31d247', alt: 'تمثيل بصري للأصول الرقمية وتقنية البلوكشين', tags: ['عملات', 'بلوكشين', 'crypto', 'blockchain'] },
  { id: 'photo-1517245386807-bb43f82c33c4', alt: 'فريق يعمل معًا في بيئة مهنية', tags: ['فريق', 'عمل', 'إدارة', 'team', 'work'] },
  { id: 'photo-1677442136019-21780ecad995', alt: 'تصور بصري لتقنيات الذكاء الاصطناعي', tags: ['ذكاء اصطناعي', 'ai', 'تقنية', 'technology'] },
  { id: 'photo-1563013544-824ae1b704d3', alt: 'قفل رقمي لحماية الحسابات والبيانات', tags: ['أمن', 'سيبراني', 'خصوصية', 'security', 'cybersecurity'] },
  { id: 'photo-1451187580459-43490279c0fa', alt: 'شبكة عالمية وبنية تحتية رقمية', tags: ['سحابة', 'شبكات', 'بنية', 'cloud', 'network', 'infrastructure'] },
  { id: 'photo-1558494949-ef010cbdcc31', alt: 'خوادم ومراكز بيانات للبنية الرقمية', tags: ['خوادم', 'سحابة', 'بنية', 'servers', 'cloud'] },
  { id: 'photo-1518770660439-4636190af475', alt: 'لوحة إلكترونية ومكونات تقنية', tags: ['أجهزة', 'إنترنت الأشياء', 'iot', 'hardware', 'technology'] },
  { id: 'photo-1611162617474-5b21e879e113', alt: 'صناعة محتوى رقمي لمنصات التواصل', tags: ['محتوى', 'إعلام', 'منصات', 'content', 'media'] },
  { id: 'photo-1504711434969-e33886168f5c', alt: 'صحيفة وأخبار لمتابعة الأحداث', tags: ['أخبار', 'صحافة', 'إعلام', 'news', 'journalism'] },
  { id: 'photo-1590602847861-f357a9332bbc', alt: 'ميكروفون لتسجيل بودكاست', tags: ['بودكاست', 'صوت', 'تسجيل', 'podcast', 'audio'] },
  { id: 'photo-1492619375914-88005aa9e8fb', alt: 'كاميرا لإنتاج الفيديو والمحتوى المرئي', tags: ['فيديو', 'تصوير', 'مرئي', 'video', 'camera'] },
  { id: 'photo-1538481199705-c710c4e965fc', alt: 'وحدة تحكم لألعاب الفيديو والترفيه الرقمي', tags: ['ألعاب', 'ترفيه', 'gaming', 'games'] },
  { id: 'photo-1484480974693-6ca0a78fb36b', alt: 'مفكرة لتنظيم المهام والوقت', tags: ['تنظيم', 'إنتاجية', 'إدارة الوقت', 'organization', 'productivity'] },
  { id: 'photo-1506126613408-eca07ce68773', alt: 'تأمل ورفاهية في بيئة هادئة', tags: ['صحة', 'رفاهية', 'توازن', 'health', 'wellbeing'] },
  { id: 'photo-1516321318423-f06f85e504b3', alt: 'تعلم رقمي باستخدام الحاسوب', tags: ['تعلم', 'تعليم', 'مهارات', 'learning', 'education'] },
  { id: 'photo-1498050108023-c5249f4df085', alt: 'مطور يعمل على حاسوب في بيئة تقنية', tags: ['برمجة', 'تقنية', 'تطوير', 'coding', 'technology'] },
  { id: 'photo-1461749280684-dccba630e2f6', alt: 'شاشة تحتوي على شيفرة برمجية', tags: ['برمجة', 'تطوير', 'code', 'coding'] },
  { id: 'photo-1432888498266-38ffec3eaf0a', alt: 'عمل على الحاسوب في مجال التسويق الرقمي', tags: ['تسويق', 'محتوى', 'marketing', 'digital'] },
  { id: 'photo-1550751827-4bd374c3f58b', alt: 'تصور بصري للأمن السيبراني وحماية البيانات', tags: ['أمن', 'سيبراني', 'خصوصية', 'security', 'cyber'] },
  { id: 'photo-1579621970563-ebec7560ff3e', alt: 'تخطيط الميزانية والأهداف المالية', tags: ['المال', 'تسعير', 'ميزانية', 'finance', 'budget'] },
  { id: 'photo-1563986768609-322da13575f3', alt: 'بيانات ومبيعات التجارة الإلكترونية', tags: ['متجر', 'تجارة', 'مبيعات', 'ecommerce', 'sales'] },
  { id: 'photo-1655720406788-f8d7bf9ea2a8', alt: 'فريق يناقش أدوات الذكاء الاصطناعي للعمل', tags: ['ذكاء اصطناعي', 'فريق', 'ai', 'team'] },
  { id: 'photo-1526374965328-7f61d4dc18c5', alt: 'شيفرة برمجية وحماية سيبرانية', tags: ['أمن', 'سيبراني', 'برمجة', 'security', 'cyber'] },
  { id: 'photo-1519389950473-47ba0277781c', alt: 'فريق يتعاون على مشروع رقمي', tags: ['فريق', 'تعاون', 'عمل', 'team', 'collaboration'] },
  { id: 'photo-1499750310107-5fef28a66643', alt: 'تخطيط تحريري ومحتوى رقمي', tags: ['محتوى', 'كتابة', 'تخطيط', 'content', 'writing'] },
  { id: 'photo-1588681664899-f142ff2dc9b1', alt: 'قراءة ومراجعة الأخبار والمصادر', tags: ['أخبار', 'صحافة', 'مصادر', 'news', 'journalism'] },
  { id: 'photo-1512314889357-e157c22f938d', alt: 'تنظيم المهام والخطة الأسبوعية', tags: ['تنظيم', 'مهام', 'إنتاجية', 'organization', 'productivity'] },
  { id: 'photo-1571019613454-1cb2f99b2d8b', alt: 'نشاط بدني وصحة في نمط حياة متوازن', tags: ['صحة', 'لياقة', 'رفاهية', 'health', 'wellbeing'] },
  { id: 'photo-1551288049-bebda4e38f71', alt: 'لوحة بيانات وتحليلات للأعمال', tags: ['تحليلات', 'بيانات', 'أعمال', 'analytics', 'data'] },
  { id: 'photo-1521737711867-e3b97375f902', alt: 'فريق يناقش خطة عمل مشتركة', tags: ['فريق', 'تعاون', 'إدارة', 'team', 'collaboration'] },
  { id: 'photo-1522071820081-009f0129c71c', alt: 'فريق يعمل معًا على مشروع', tags: ['فريق', 'عمل', 'إدارة', 'team', 'business'] },
  { id: 'photo-1553877522-43269d4ea984', alt: 'اجتماع فريق لمناقشة استراتيجية العمل', tags: ['فريق', 'إدارة', 'تخطيط', 'team', 'strategy'] },
  { id: 'photo-1552664730-d307ca884978', alt: 'جلسة تخطيط وتعاون بين أعضاء الفريق', tags: ['فريق', 'تخطيط', 'تعاون', 'team', 'planning'] },
  { id: 'photo-1522542550221-31fd19575a2d', alt: 'تصميم واجهة وتجربة رقمية', tags: ['تصميم', 'ويب', 'تجربة المستخدم', 'design', 'web'] },
  { id: 'photo-1558655146-d09347e92766', alt: 'تصميم إبداعي لحملة تسويقية', tags: ['تسويق', 'تصميم', 'إبداع', 'marketing', 'design'] },
  { id: 'photo-1497366216548-37526070297c', alt: 'مساحة عمل مكتبية حديثة', tags: ['عمل', 'إدارة', 'مكتب', 'work', 'business'] },
  { id: 'photo-1523726491678-bf852e717f6a', alt: 'عمل إبداعي على تصميم رقمي', tags: ['تصميم', 'محتوى', 'ويب', 'design', 'digital'] },
  { id: 'photo-1516321497487-e288fb19713f', alt: 'تعلم وتدريب عبر الإنترنت', tags: ['تعلم', 'تعليم', 'مهارات', 'learning', 'education'] },
];

function getImagePath(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname !== 'images.unsplash.com') return null;
    return url.pathname;
  } catch {
    return null;
  }
}

function checkImage(value) {
  if (!imageCache.has(value)) imageCache.set(value, checkImageRequest(value));
  return imageCache.get(value);
}

async function checkImageRequest(value) {
  const imagePath = getImagePath(value);
  if (!imagePath) return { valid: false, reason: 'رابط غير آمن أو ليس من images.unsplash.com' };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
  try {
    let response = await fetch(value, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
    });

    if (response.status === 405 || response.status === 501) {
      response = await fetch(value, {
        method: 'GET',
        headers: { Range: 'bytes=0-0' },
        redirect: 'follow',
        signal: controller.signal,
      });
    }

    const finalUrl = new URL(response.url);
    const contentType = response.headers.get('content-type') || '';
    const valid = response.ok &&
      finalUrl.protocol === 'https:' &&
      finalUrl.hostname === 'images.unsplash.com' &&
      contentType.toLowerCase().startsWith('image/');
    return { valid, reason: valid ? null : `استجابة HTTP ${response.status} أو نوع محتوى غير صوري` };
  } catch (error) {
    return { valid: false, reason: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchAllPosts() {
  const posts = [];
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabase
      .from('posts')
      .select('id, slug, title, category, subcategory, status, image_url, image_alt')
      .order('id', { ascending: true })
      .range(offset, offset + pageSize - 1);

    if (error) throw new Error(`تعذر فحص المقالات المنشورة: ${error.message}`);
    const page = data || [];
    posts.push(...page);
    if (page.length < pageSize) return posts;
  }
}

async function checkImagesInBatches(urls) {
  for (let index = 0; index < urls.length; index += 8) {
    await Promise.all(urls.slice(index, index + 8).map(checkImage));
  }
}

function getCandidateScore(post, candidate) {
  const articleText = `${post.title || ''} ${post.category || ''} ${post.subcategory || ''}`.toLowerCase();
  return candidate.tags.reduce((score, tag) => score + (articleText.includes(tag.toLowerCase()) ? 1 : 0), 0);
}

async function planRepairs(posts) {
  await checkImagesInBatches([...new Set(posts.map((post) => post.image_url).filter(Boolean))]);

  const usedPaths = new Set();
  const repairs = [];
  for (const post of posts) {
    const currentPath = getImagePath(post.image_url);
    const health = post.image_url ? await checkImage(post.image_url) : { valid: false, reason: 'رابط الصورة فارغ' };

    if (!health.valid) {
      repairs.push({ post, reason: health.reason });
      continue;
    }
    if (usedPaths.has(currentPath)) {
      repairs.push({ post, reason: 'الصورة مستخدمة بالفعل في مقال آخر' });
      continue;
    }
    usedPaths.add(currentPath);
  }

  const plans = [];
  for (const repair of repairs) {
    const candidates = coverImages
      .map((candidate, index) => ({ candidate, index, score: getCandidateScore(repair.post, candidate) }))
      .sort((left, right) => right.score - left.score || left.index - right.index);
    let selected = null;

    for (const { candidate } of candidates) {
      const url = image(candidate.id);
      const imagePath = getImagePath(url);
      if (usedPaths.has(imagePath)) continue;

      const health = await checkImage(url);
      if (!health.valid) continue;

      selected = { ...candidate, url, imagePath };
      break;
    }

    if (!selected) {
      throw new Error(
        `تعذر إعداد صورة فريدة وصالحة للمقال "${repair.post.title}". ` +
        'أضف صورًا معتمدة متاحة إلى قائمة coverImages قبل إجراء أي تحديث.',
      );
    }

    usedPaths.add(selected.imagePath);
    plans.push({ ...repair, selected });
  }

  return plans;
}

async function applyRepair({ post, selected }) {
  let query = supabase
    .from('posts')
    .update({
      image_url: selected.url,
      image_alt: selected.alt,
      updated_at: new Date().toISOString(),
    })
    .eq('id', post.id)
    .eq('status', post.status);

  query = post.image_url === null
    ? query.is('image_url', null)
    : query.eq('image_url', post.image_url);

  const { data, error } = await query.select('id, slug, image_url').maybeSingle();
  if (error) throw new Error(`فشل إصلاح صورة المقال "${post.title}": ${error.message}`);
  if (!data) {
    throw new Error(`تغيرت بيانات المقال "${post.title}" أثناء الإصلاح؛ أوقف التحديث لتجنب استبدال صورة حديثة.`);
  }

  console.log(`تم إصلاح صورة: ${data.slug || data.id}`);
}

async function main() {
  const posts = await fetchAllPosts();
  const plans = await planRepairs(posts);
  console.log(`تم فحص ${posts.length} مقالًا بكل الحالات؛ يحتاج ${plans.length} منها إلى إصلاح.`);

  for (const plan of plans) await applyRepair(plan);

  const finalPosts = await fetchAllPosts();
  await checkImagesInBatches([...new Set(finalPosts.map((post) => post.image_url).filter(Boolean))]);

  const publishedCount = finalPosts.filter((post) => post.status === 'published').length;
  const invalid = [];
  const paths = new Set();
  const duplicates = [];
  for (const post of finalPosts) {
    const imagePath = getImagePath(post.image_url);
    const health = post.image_url ? await checkImage(post.image_url) : { valid: false };
    if (!health.valid) invalid.push(post);
    if (imagePath && paths.has(imagePath)) duplicates.push(post);
    if (imagePath) paths.add(imagePath);
  }

  console.log(
    `التحقق النهائي: ${publishedCount} مقالًا منشورًا من أصل ${finalPosts.length}، ` +
    `${finalPosts.length - invalid.length} صورة صالحة، ${invalid.length} صور غير صالحة، ` +
    `${paths.size} صورة فريدة، ${duplicates.length} صور مكررة.`,
  );

  if (invalid.length || duplicates.length || paths.size !== finalPosts.length) {
    const affected = [...new Set([...invalid, ...duplicates])];
    for (const post of affected) console.error(`بحاجة إلى مراجعة: ${post.slug || post.id}`);
    throw new Error('لم يجتز جميع المقالات المنشورة فحص الصور؛ راجع الأخطاء أعلاه.');
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
