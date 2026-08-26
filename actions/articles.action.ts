"use server";

import { revalidatePath, revalidateTag } from "next/cache";

/**
 * إعادة التوليد الفوري لمسار مقال محدد عند تحديثه في قاعدة البيانات
 */
export async function revalidateArticleAction(category: string, subcategory: string, slug: string) {
  try {
    // 1. إعادة التحقق من مسار المقال المباشر
    revalidatePath(`/articles/${category}/${subcategory}/${slug}`);
    
    // 2. إعادة التحقق من مسار القسم الفرعي والرئيسي
    revalidatePath(`/articles/${category}/${subcategory}`);
    revalidatePath(`/${category}`);
    revalidatePath("/articles");

    return { success: true, message: "تم تحديث الكاش بنجاح" };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * إعادة التوليد الشامل لجميع المقالات
 */
export async function revalidateAllArticlesAction() {
  try {
    revalidatePath("/articles", "layout");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
