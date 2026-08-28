require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

async function main() {
  if (!connectionString) {
    throw new Error('DATABASE_URL أو POSTGRES_URL غير متاح في .env.local');
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const migrations = [
      'supabase/migrations/20260828_add_post_images.sql',
      'supabase/migrations/20260828_normalize_posts.sql',
    ];
    for (const migrationPath of migrations) {
      await client.query(fs.readFileSync(migrationPath, 'utf8'));
    }
    const result = await client.query(
      "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'posts' AND column_name IN ('image_url', 'slug', 'description', 'image_alt', 'article_type', 'tool_slug', 'status', 'published_at', 'updated_at')",
    );
    if (result.rowCount !== 9) {
      throw new Error('تعذر التحقق من أعمدة المقالات الجديدة');
    }
    console.log('تم تطبيق migration والتحقق من العمود image_url بنجاح.');
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
