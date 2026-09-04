import { createClient } from "@/lib/supabase/client";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function uploadArticleImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("نوع الملف غير مدعوم. استخدم JPG أو PNG أو WEBP أو GIF.");
  }
  if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
    throw new Error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت.");
  }

  const extension = EXTENSIONS[file.type];
  const filePath = `articles/${crypto.randomUUID()}.${extension}`;
  const supabase = createClient();
  const { error } = await supabase.storage.from("article-images").upload(filePath, file, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    console.error("خطأ في رفع الصورة:", error.message);
    throw new Error("فشل رفع الصورة إلى الخادم.");
  }

  return supabase.storage.from("article-images").getPublicUrl(filePath).data.publicUrl;
}
