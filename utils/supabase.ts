import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// الكود الأصلي الموجود لديك
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- إضافات جديدة لجلب المقالات حسب القسم والفرع ---

// 1. جلب مقالات قسم رئيسي (مثل: المال والأعمال)
export async function getPostsByCategory(categoryName: string) {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', categoryName)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('خطأ في جلب مقالات القسم:', error.message);
    return [];
  }
  return posts;
}

// 2. جلب مقالات فرع محدد (مثل: العمل الحر والمشاريع المصغرة)
export async function getPostsBySubcategory(categoryName: string, subcategoryName: string) {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', categoryName)
    .eq('subcategory', subcategoryName)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('خطأ في جلب مقالات الفرع:', error.message);
    return [];
  }
  return posts;
}