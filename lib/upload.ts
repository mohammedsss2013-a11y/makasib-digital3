import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createBrowserClient } from "@/lib/supabase/client";

export async function uploadArticleImage(
  file: File,
  folder = "articles",
  client?: Awaited<ReturnType<typeof createBrowserClient>>
) {
  if (file.type && !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
    throw new Error("نوع الصورة غير مدعوم. استخدم JPG أو PNG أو WEBP أو GIF.");
  }
  if (file.size <= 0 || file.size > 5 * 1024 * 1024) {
    throw new Error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت.");
  }

  const supabase =
    client ??
    (typeof window === "undefined"
      ? await createServerClient()
      : createBrowserClient());

  const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
  const filePath = `${folder}/${crypto.randomUUID()}.${extension}`;

  const { data, error } = await supabase.storage
    .from("article-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw new Error(`فشل في رفع الصورة: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from("article-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
