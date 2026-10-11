require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.error('لم يتم العثور على DATABASE_URL في .env.local');
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const categoryMap = {
  "المال والأعمال": "finance",
  "قطاع المال والأعمال": "finance",
  finance: "finance",
  "التكنولوجيا والابتكار": "tech",
  "التكنولوجيا": "tech",
  "قطاع التكنولوجيا": "tech",
  tech: "tech",
  "الإعلام الجديد": "media",
  "قطاع الإعلام": "media",
  media: "media",
  "رقميون - أسلوب الحياة": "digital-lifestyle",
  "رقميون - أسلوب الحياة الرقمي": "digital-lifestyle",
  "أسلوب الحياة الرقمي": "digital-lifestyle",
  "digital-lifestyle": "digital-lifestyle",
};

async function fixAllArticleSlugs() {
  try {
    await client.connect();
    console.log("تحديث وتنسيق جميع عناوين ومسارات المقالات في قاعدة البيانات...");

    const res = await client.query('SELECT id, title, slug, category, subcategory FROM public.posts ORDER BY id ASC');

    for (const post of res.rows) {
      const catNormalized = categoryMap[post.category] || post.category || "finance";
      
      let newSlug = post.slug;
      // إذا كان الـ slug يبدأ بـ post- أو رقمي، أو إذا كان مقال القيمة
      if (post.id === 54) {
        newSlug = "from-hourly-to-value-based-pricing";
      } else if (!newSlug || newSlug.startsWith("post-")) {
        // تحويل العنوان إلى slug نظيف
        const slugified = post.title
          .trim()
          .toLowerCase()
          .replace(/[^\w\s\u0600-\u06FF-]/g, "")
          .replace(/\s+/g, "-")
          .slice(0, 60);

        newSlug = slugified ? `article-${post.id}-${slugified}` : `article-${post.id}`;
      }

      await client.query(
        'UPDATE public.posts SET category = $1, slug = $2 WHERE id = $3',
        [catNormalized, newSlug, post.id]
      );
    }

    console.log("✅ تم تحديث وتوحيد جميع المقالات في قاعدة البيانات بنجاح!");
  } catch (error) {
    console.error("❌ حدث خطأ:", error);
  } finally {
    await client.end();
  }
}

fixAllArticleSlugs();
