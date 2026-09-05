require('dotenv').config({ path: '.env.local' });
const fs = require('node:fs');
const path = require('node:path');
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('يجب تعريف DATABASE_URL أو POSTGRES_URL في ملف .env.local لتطبيق migration.');
}

const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '2026090502_create_tools.sql');
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

(async () => {
  try {
    await client.connect();
    await client.query(fs.readFileSync(migrationPath, 'utf8'));
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'tools'
    `);
    if (result.rowCount !== 1) throw new Error('لم يتم العثور على جدول public.tools بعد تطبيق migration.');
    console.log('تم إنشاء جدول public.tools وتطبيق سياسات الوصول بنجاح.');
  } finally {
    await client.end();
  }
})().catch((error) => {
  console.error(`فشل تطبيق migration: ${error.message}`);
  process.exitCode = 1;
});