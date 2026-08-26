require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function checkDatabase() {
  try {
    await client.connect();
    console.log('⚡ الاتصال بقاعدة البيانات ناجح!\n');

    // فحص عدد المقالات ونماذج منها
    const res = await client.query('SELECT id, title, category, subcategory FROM public.posts LIMIT 5;');
    const totalCount = await client.query('SELECT COUNT(*) FROM public.posts;');

    console.log(`📊 إجمالي عدد المقالات في القاعدة: ${totalCount.rows[0].count}`);
    console.log('📋 عينة من المقالات المتاحة:');
    console.table(res.rows);

  } catch (err) {
    console.error('❌ خطأ في الاتصال:', err.message);
  } finally {
    await client.end();
  }
}

checkDatabase();