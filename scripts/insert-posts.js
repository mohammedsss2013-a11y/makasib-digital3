/* eslint-disable */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// استخدام المفتاح العادي أو مفتاح المسؤول لضمان تجاوز الصلاحيات إذا لزم
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// قائمة المقالات المراد إضافتها للبرنامج
const newPosts = [
  {
    title: 'مقدمة في التسويق بالعمولة للمبتدئين',
    content: '<p>يعتبر التسويق بالعمولة أحد أفضل مجالات العمل الحر...</p>',
    category: 'المال والأعمال',
    subcategory: 'التسويق الرقمي وعائد الإعلانات'
  },
  {
    title: 'أهمية الأمن السيبراني للأعمال الناشئة',
    content: '<p>مع زيادة الهجمات الرقمية أصبحت الحماية ضرورة وليست رفاهية...</p>',
    category: 'التكنولوجيا والابتكار',
    subcategory: 'الأمن السايبراني والخصوصية'
  }
];

async function uploadPosts() {
  console.log('🚀 جاري إضافة المقالات إلى قاعدة البيانات...');

  for (const post of newPosts) {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select();

    if (error) {
      console.error(`❌ خطأ أثناء إضافة المقال "${post.title}":`, error.message);
    } else {
      console.log(`✅ تم نشر المقال بنجاح! ID: ${data[0].id}`);
    }
  }
}

uploadPosts();