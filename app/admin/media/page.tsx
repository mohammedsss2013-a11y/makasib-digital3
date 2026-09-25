import { Image as ImageIcon, Trash2 } from "lucide-react";
import { deleteArticleMediaAction } from "@/actions/admin-media.actions";
import { createClient } from "@/lib/supabase/server";

interface MediaFile {
  name: string;
  path: string;
  url: string;
  size: number;
  updatedAt: string | null;
  unused: boolean;
}

async function listMediaFiles() {
  const supabase = await createClient();
  const files: MediaFile[] = [];
  const { data: posts } = await supabase.from("posts").select("image_url").not("image_url", "is", null);
  const usedUrls = new Set((posts ?? []).map((post) => post.image_url).filter((url): url is string => Boolean(url)));

  async function walk(prefix = "") {
    const { data, error } = await supabase.storage.from("article-images").list(prefix, { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    if (error) throw new Error(error.message);
    for (const item of data ?? []) {
      const path = prefix ? `${prefix}/${item.name}` : item.name;
      if (item.id) {
        const url = supabase.storage.from("article-images").getPublicUrl(path).data.publicUrl;
        files.push({ name: item.name, path, url, size: item.metadata?.size ?? 0, updatedAt: item.updated_at ?? item.created_at ?? null, unused: !usedUrls.has(url) });
      } else {
        await walk(path);
      }
    }
  }

  await walk();
  return files;
}

export default async function AdminMediaPage() {
  let files: MediaFile[] = [];
  let errorMessage = "";
  try {
    files = await listMediaFiles();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "تعذر تحميل الوسائط.";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">مكتبة الوسائط</h1>
        <p className="mt-2 text-sm text-slate-400">تصفح صور المقالات المرفوعة واحذف الملفات غير المطلوبة.</p>
      </div>
      {errorMessage && <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">{errorMessage}</p>}
      {!errorMessage && !files.length && <p className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">لا توجد صور مرفوعة حالياً.</p>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {files.map((file) => (
          <article key={file.path} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
            <div className="relative aspect-video bg-slate-950"><img src={file.url} alt={file.name} className="h-full w-full object-cover" /></div>
            <div className="space-y-3 p-4">
              <p className="truncate text-xs font-bold text-white" title={file.path}>{file.path}</p>
              <p className="text-[10px] text-slate-500">{Math.ceil(file.size / 1024)} KB · {file.updatedAt ? new Date(file.updatedAt).toLocaleDateString("ar-EG") : ""}</p>
              <p className={`text-[10px] font-bold ${file.unused ? "text-amber-300" : "text-emerald-300"}`}>{file.unused ? "غير مستخدمة في المقالات" : "مستخدمة في مقال"}</p>
              <form action={deleteArticleMediaAction.bind(null, file.path)}>
                <button type="submit" className="inline-flex items-center gap-2 rounded-lg border border-rose-500/30 px-3 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/10"><Trash2 className="h-3.5 w-3.5" /> حذف الملف</button>
              </form>
            </div>
          </article>
        ))}
      </div>
      {!errorMessage && <p className="flex items-center gap-2 text-xs text-slate-500"><ImageIcon className="h-4 w-4" /> إجمالي الملفات: {files.length}</p>}
    </div>
  );
}