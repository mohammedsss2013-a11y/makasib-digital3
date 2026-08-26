require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

// الأقسام والفروع الحقيقية المستخرجة من شريط الملاحة في موقعك
const realCategories = [
  {
    name: 'المال والأعمال',
    subcategories: [
      'العمل الحر والمشاريع المصغرة',
      'التجارة الإلكترونية والبيع الرقمي',
      'التسويق الرقمي وعائد الإعلانات',
      'اقتصاد صناعة المحتوى',
      'العملات الرقمية والبلوكشين',
      'الذكاء الاصطناعي في المال والأعمال'
    ]
  },
  {
    name: 'التكنولوجيا والابتكار',
    subcategories: [
      'تطبيق وأنظمة الذكاء الاصطناعي',
      'الأمن السايبراني والخصوصية',
      'الحوسبة السحابية والعمل عن بعد',
      'تطوير البنية وتقنيات المستقبل',
      'إنترنت الأشياء والتقنيات الناشئة'
    ]
  },
  {
    name: 'الإعلام الجديد',
    subcategories: [
      'صناعة المحتوى المرئي والمكتوب',
      'أخبار وتحليلات الصناعة الرقمية',
      'البودكاست والبودكاست المرئي',
      'منصات البث الحي والتفاعل',
      'الترفيه الرقمي والألعاب'
    ]
  },
  {
    name: 'رقميون - أسلوب الحياة',
    subcategories: [
      'إدارة الحياة الرقمية والتنظيم',
      'الصحة الرقمية والوقاية من الاحتراق',
      'علم النفس الرقمي وسلوك الجمهور',
      'التعليم والتعلم الرقمي المستمر',
      'الثقافة الرقمية العابرة للمستقبل'
    ]
  }
];

async function updateToRealCategories() {
  try {
    await client.connect();
    console.log('⚡ تم الاتصال بقاعدة البيانات!');

    const res = await client.query('SELECT id FROM public.posts ORDER BY id ASC;');
    const posts = res.rows;

    console.log(`🚀 جاري إعادة توزيع ${posts.length} مقالاً على أقسام موقعك الحقيقية...`);

    for (let i = 0; i < posts.length; i++) {
      const catObj = realCategories[Math.floor(Math.random() * realCategories.length)];
      const subCat = catObj.subcategories[Math.floor(Math.random() * catObj.subcategories.length)];

      await client.query(
        'UPDATE public.posts SET category = $1, subcategory = $2 WHERE id = $3;',
        [catObj.name, subCat, posts[i].id]
      );

      console.log(`✅ المقال ID ${posts[i].id} -> [${catObj.name}] / [${subCat}]`);
    }

    console.log('\n🎉 اكتمل التحديث بنجاح! المقالات مرتبطة الآن بأقسام موقعك الفعليه.');
  } catch (err) {
    console.error('❌ حدث خطأ:', err.message);
  } finally {
    await client.end();
  }
}

updateToRealCategories();