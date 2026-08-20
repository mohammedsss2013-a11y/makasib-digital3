require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const title = 'كيف تبدأ مسيرتك في البرمجة وتبني أول مشروع رقمي؟';
const category = 'التكنولوجيا والابتكار';
const subcategory = 'تطوير البنية وتقنيات المستقبل';
const content = `
<article dir="rtl">
  <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=85" alt="شاشة تحتوي على شيفرة برمجية" style="width:100%; height:auto; border-radius:16px; margin-bottom:24px;" />
  <p>أصبحت البرمجة من أهم المهارات لبناء المنتجات الرقمية وحل المشكلات بطريقة عملية. ولا تحتاج البداية إلى معرفة كل لغات البرمجة، بل إلى مسار واضح وتدريب مستمر.</p>
  <h2>اختر نقطة بداية مناسبة</h2>
  <p>ابدأ بلغة سهلة وواسعة الاستخدام مثل JavaScript لتطوير واجهات الويب، أو Python للتطبيقات والبيانات والأتمتة. ركز على فهم المتغيرات والشروط والدوال وهياكل البيانات قبل الانتقال إلى الأدوات المتقدمة.</p>
  <h2>حوّل المعرفة إلى مشروع</h2>
  <p>أفضل طريقة للتعلم هي بناء مشروع صغير، مثل صفحة شخصية أو قائمة مهام أو لوحة متابعة. قسّم الفكرة إلى خطوات، واستخدم Git لحفظ التغييرات ومراجعة تقدمك.</p>
  <h2>خطة عملية للتطور</h2>
  <ul>
    <li>خصص وقتًا ثابتًا للتعلم والتطبيق كل يوم.</li>
    <li>اقرأ توثيق الأدوات الرسمية بدل الاعتماد على نسخ الحلول فقط.</li>
    <li>اطلب مراجعة شيفرتك وحسّنها تدريجيًا.</li>
    <li>انشر مشاريعك في معرض أعمال يوضح ما بنيته وما تعلمته.</li>
  </ul>
  <p>البرمجة رحلة تراكمية؛ كل مشروع مكتمل يمنحك خبرة أوضح وثقة أكبر في بناء حلول رقمية مفيدة.</p>
</article>
`.trim();

if (!connectionString) {
  console.error('لم يتم العثور على DATABASE_URL أو POSTGRES_URL في .env.local');
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function createArticle() {
  try {
    await client.connect();
    const existing = await client.query('SELECT id FROM public.posts WHERE title = $1 LIMIT 1', [title]);

    if (existing.rowCount) {
      console.log(`المقال موجود مسبقًا برقم ${existing.rows[0].id}`);
      return;
    }

    const result = await client.query(
      'INSERT INTO public.posts (title, content, category, subcategory) VALUES ($1, $2, $3, $4) RETURNING id, title, category, subcategory',
      [title, content, category, subcategory]
    );

    console.log('تم إنشاء المقال بنجاح:');
    console.table(result.rows);
  } catch (error) {
    console.error('تعذر إنشاء المقال:', error.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

createArticle();
