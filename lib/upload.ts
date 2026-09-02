import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createBrowserClient } from "@/utils/supabase/client";

export async function uploadArticleImage(
  file: File,
  folder = "articles",
  client?: Awaited<ReturnType<typeof createBrowserClient>>
) {
  const supabase =
    client ??
    (typeof window === "undefined"
      ? await createServerClient()
      : createBrowserClient());

  const safeFileName = file.name.replace(/\s+/g, "-").toLowerCase();
  const timestamp = Date.now();
  const filePath = `${folder}/${timestamp}-${safeFileName}`;

  const { data, error } = await supabase.storage
    .from("article-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type || "application/octet-stream",
    });

  if (error) {
    throw new Error(`فشل في رفع الصورة: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from("article-images")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
