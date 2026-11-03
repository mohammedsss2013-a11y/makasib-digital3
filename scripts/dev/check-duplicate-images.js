/* DEV-ONLY: هذا السكربت مخصص للتطوير المحلي فقط */
require('dotenv').config({ path: require('node:path').join(__dirname, '..', '..', '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  // جلب جميع المقالات المنشورة
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, category, subcategory, image_url')
    .eq('status', 'published')
    .order('id', { ascending: true });

  if (error) throw new Error(error.message);

  console.log(`إجمالي المقالات المنشورة: ${data.length}`);

  // إيجاد الصور المكررة
  const imageMap = new Map();
  for (const row of data) {
    const key = row.image_url || 'NULL';
    if (!imageMap.has(key)) imageMap.set(key, []);
    imageMap.get(key).push(row);
  }

  let dupCount = 0;
  console.log('\n=== الصور المكررة ===');
  for (const [url, rows] of imageMap.entries()) {
    if (rows.length > 1) {
      dupCount++;
      console.log(`[${rows.length}x] ${url.slice(0, 90)}`);
      for (const r of rows) {
        console.log(`     id=${r.id} | ${r.category} | ${r.subcategory} | ${r.slug}`);
      }
    }
  }
  if (dupCount === 0) console.log('لا توجد صور مكررة!');

  // المقالات بدون صورة
  const noImg = data.filter(r => !r.image_url);
  console.log(`\n=== مقالات بدون صورة: ${noImg.length} ===`);
  for (const r of noImg) console.log(`  id=${r.id} | ${r.slug}`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
