require('dotenv').config({ path: require('node:path').join(__dirname, '..', '.env.local') });
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const applyChanges = process.argv.includes('--apply');

async function cleanupGeneratedPosts() {
  if (!connectionString) {
    throw new Error('لم يتم العثور على DATABASE_URL أو POSTGRES_URL في .env.local.');
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
  let transactionStarted = false;

  try {
    await client.connect();
    const { rows } = await client.query(
      `SELECT id, title, status
       FROM public.posts
       WHERE content ILIKE $1
         AND content ILIKE $2
         AND status = 'published'
       ORDER BY id`,
      ['%picsum.photos/800/400?random=%', '%<h2>تفاصيل إضافية</h2>%'],
    );

    console.log(`المقالات المطابقة لبصمة المولّد القديم: ${rows.length}`);
    for (const row of rows) {
      console.log(`- id=${row.id} status=${row.status} title=${row.title}`);
    }

    if (!applyChanges || rows.length === 0) {
      console.log(applyChanges ? 'لا توجد صفوف تحتاج إلى تحديث.' : 'معاينة فقط؛ لم يتم تعديل قاعدة البيانات. أضف --apply لتحويل المطابقات إلى مسودات.');
      return;
    }

    await client.query('BEGIN');
  transactionStarted = true;
    const { rowCount } = await client.query(
      `UPDATE public.posts
       SET status = 'draft', published_at = NULL, updated_at = NOW()
       WHERE id = ANY($1::bigint[])
         AND content ILIKE $2
         AND content ILIKE $3
         AND status = 'published'`,
      [rows.map((row) => row.id), '%picsum.photos/800/400?random=%', '%<h2>تفاصيل إضافية</h2>%'],
    );
    await client.query('COMMIT');
    transactionStarted = false;
    console.log(`تم تحويل ${rowCount} مقالًا مطابقًا إلى مسودات. لم تُحذف أي بيانات.`);
  } catch (error) {
    if (transactionStarted) await client.query('ROLLBACK');
    throw error;
  } finally {
    await client.end();
  }
}

cleanupGeneratedPosts().catch((error) => {
  console.error(`تعذر تنظيف المقالات: ${error.message}`);
  process.exitCode = 1;
});