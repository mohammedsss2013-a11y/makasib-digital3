import { createAdminPostAction, deleteAdminPostAction, updateAdminPostAction } from "@/actions/admin.actions";
import { createClient } from "@/lib/supabase/server";

export default async function AdminContentManagerPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, category, status, created_at")
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">إدارة المحتوى</h1>
        <p className="mt-2 text-sm text-slate-400">إضافة وتحديث وحذف المقالات مباشرة من لوحة الإدارة.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form action={createAdminPostAction} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold text-white">مقال جديد</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
              <span>العنوان</span>
              <input name="title" required className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0" placeholder="عنوان المقال" />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>الفئة</span>
              <input name="category" defaultValue="finance" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0" />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>الحالة</span>
              <select name="status" defaultValue="draft" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0">
                <option value="draft">مسودة</option>
                <option value="published">منشور</option>
                <option value="archived">مؤرشف</option>
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
              <span>Slug</span>
              <input name="slug" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0" placeholder="example-article" />
            </label>

            <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
              <span>وصف مختصر</span>
              <textarea name="description" rows={2} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0" placeholder="وصف موجز للمقال" />
            </label>

            <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
              <span>المحتوى</span>
              <textarea name="content" required rows={7} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none ring-0" placeholder="نص المقال الكامل" />
            </label>
          </div>

          <button type="submit" className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-emerald-400">
            حفظ المقال
          </button>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold text-white">آخر المقالات</h2>
          <div className="mt-4 space-y-3">
            {(posts ?? []).map((post) => (
              <div key={post.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-white">{post.title}</p>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-300">
                    {post.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{post.category}</span>
                  <form action={async (formData: FormData) => {
                    "use server";
                    await deleteAdminPostAction(formData.get("postId")?.toString() || "");
                  }}>
                    <input type="hidden" name="postId" value={String(post.id)} />
                    <button type="submit" className="text-red-400 hover:text-red-300">حذف</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h2 className="text-lg font-bold text-white">تحديث سريع</h2>
        <div className="mt-4 space-y-4">
          {(posts ?? []).slice(0, 3).map((post) => (
            <form key={post.id} action={updateAdminPostAction} className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 md:grid-cols-[1.2fr_0.8fr_0.8fr_auto]">
              <input type="hidden" name="postId" value={String(post.id)} />
              <input name="title" defaultValue={post.title} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white" />
              <select name="status" defaultValue={post.status} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white">
                <option value="draft">مسودة</option>
                <option value="published">منشور</option>
                <option value="archived">مؤرشف</option>
              </select>
              <input name="category" defaultValue={post.category ?? "finance"} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white" />
              <button type="submit" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-black text-emerald-300">تحديث</button>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
