require('dotenv').config({ path: require('node:path').join(__dirname, '..', '.env.local') });
const fs = require('node:fs');
const path = require('node:path');
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const articlesPath = path.join(__dirname, 'posts_test', 'articles.json');
const allowedCategories = new Set([
  'التكنولوجيا والابتكار',
  'المال والأعمال',
  'الإعلام الجديد',
  'رقميون - أسلوب الحياة',
]);

function loadArticles() {
  if (!fs.existsSync(articlesPath)) {
    throw new Error('ملف المقالات غير موجود. شغّل node scripts/generate-posts.js أولاً.');
  }

  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
  if (!Array.isArray(articles) || articles.length === 0) {
    throw new Error('ملف المقالات فارغ أو بنيته غير صحيحة.');
  }

  const slugs = new Set();
  const imageUrls = new Set();
  for (const article of articles) {
    if (!article.title || !article.slug || !article.content || !article.description) {
      throw new Error('يوجد مقال ينقصه العنوان أو الرابط أو المحتوى أو الوصف.');
    }
    if (!allowedCategories.has(article.category) || !article.subcategory) {
      throw new Error(`تصنيف غير معروف للمقال: ${article.title}`);
    }
    if (!article.image_url?.startsWith('https://images.unsplash.com/')) {
      throw new Error(`رابط صورة غير صالح للمقال: ${article.title}`);
    }
    if (!article.content.includes('<h1>') || !article.content.includes('<h2>') || !article.content.includes('<h3>')) {
      throw new Error(`محتوى المقال لا يتضمن بنية العناوين المطلوبة: ${article.title}`);
    }
    if (slugs.has(article.slug) || imageUrls.has(article.image_url)) {
      throw new Error(`عنوان أو صورة مكررة في المقالات: ${article.title}`);
    }
    slugs.add(article.slug);
    imageUrls.add(article.image_url);
  }

  return articles;
}

async function uploadArticles() {
  if (!connectionString) {
    throw new Error('لم يتم العثور على DATABASE_URL أو POSTGRES_URL في .env.local.');
  }

  const articles = loadArticles();
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
  let transactionStarted = false;

  try {
    await client.connect();
    await client.query('BEGIN');
    transactionStarted = true;

    for (const article of articles) {
      await client.query(
        `INSERT INTO public.posts
          (title, slug, content, category, subcategory, topic, description, image_url, image_alt, article_type, status, published_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'guide', 'published', NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          content = EXCLUDED.content,
          category = EXCLUDED.category,
          subcategory = EXCLUDED.subcategory,
          topic = EXCLUDED.topic,
          description = EXCLUDED.description,
          image_url = EXCLUDED.image_url,
          image_alt = EXCLUDED.image_alt,
          article_type = EXCLUDED.article_type,
          status = EXCLUDED.status,
          published_at = EXCLUDED.published_at,
          updated_at = NOW()`,
        [
          article.title,
          article.slug,
          article.content,
          article.category,
          article.subcategory,
          article.topic,
          article.description,
          article.image_url,
          article.image_alt,
        ],
      );
    }

    await client.query('COMMIT');
    transactionStarted = false;
    console.log(`تم إدراج أو تحديث ${articles.length} مقالات تحريرية بصورها وتصنيفاتها.`);
  } catch (error) {
    if (transactionStarted) await client.query('ROLLBACK');
    throw error;
  } finally {
    await client.end();
  }
}

uploadArticles().catch((error) => {
  console.error(`تعذر رفع المقالات: ${error.message}`);
  process.exitCode = 1;
});