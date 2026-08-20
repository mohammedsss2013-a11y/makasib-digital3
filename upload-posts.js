require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// استخدام رابط الاتصال المباشر بالقاعدة أو تجميعه
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.error('❌ لم يتم العثور على DATABASE_URL في ملف .env.local');
  process.exit(1);
}

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

const POSTS_DIR = path.join(__dirname, 'posts_test');

async function setupAndUpload() {
  try {
    await client.connect();
    console.log('⚡ تم الاتصال بقاعدة البيانات بنجاح!');

    // 1. إنشاء الجدول تلقائياً إن لم يكن موجوداً
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ تم تجهيز/إنشاء جدول posts بنجاح!');

    if (!fs.existsSync(POSTS_DIR)) {
      console.error('❌ مجلد posts_test غير موجود!');
      return;
    }

    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.html'));
    console.log(`🚀 جاري رفع ${files.length} مقالاً...`);

    let count = 0;
    for (const file of files) {
      const filePath = path.join(POSTS_DIR, file);
      const htmlContent = fs.readFileSync(filePath, 'utf-8');

      const titleMatch = htmlContent.match(/<h1>(.*?)<\/h1>/);
      const title = titleMatch ? titleMatch[1] : `مقال تجريبي ${file}`;

      await client.query(
        'INSERT INTO public.posts (title, content) VALUES ($1, $2)',
        [title, htmlContent]
      );

      count++;
      console.log(`✅ [${count}/${files.length}] تم رفع: ${title}`);
    }

    console.log(`\n🎉 اكتمل رفع جميع المقالات الـ ${count} بنجاح!`);
  } catch (err) {
    console.error('❌ حدث خطأ:', err.message);
  } finally {
    await client.end();
  }
}

setupAndUpload();