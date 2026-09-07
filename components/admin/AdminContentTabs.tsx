"use client";

import { useState } from "react";
import { FileText, PlusCircle, Save, Wrench } from "lucide-react";
import { createToolAction } from "@/actions/admin-tools.actions";

type Post = {
  id: number;
  title: string;
  category: string | null;
  status: string;
  created_at: string;
};

type Tool = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  sector: string;
  status: string;
  created_at: string;
};

type Tab = "articles" | "tools" | "new-tool";

type AdminContentTabsProps = {
  posts: Post[];
  tools: Tool[];
  createPostAction: (formData: FormData) => Promise<void>;
  deletePostAction: (postId: string) => Promise<void>;
  updatePostAction: (formData: FormData) => Promise<void>;
};

const fieldClassName = "w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20";

const categoryLabels: Record<string, string> = {
  finance: "المال والأعمال",
  tech: "التكنولوجيا والابتكار",
  media: "الإعلام الجديد",
  "digital-lifestyle": "رقميون",
};

const statusLabels: Record<string, string> = {
  active: "نشطة",
  inactive: "غير نشطة",
  archived: "مؤرشفة",
};

export default function AdminContentTabs({
  posts,
  tools,
  createPostAction,
  deletePostAction,
  updatePostAction,
}: AdminContentTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("articles");

  return (
    <div className="space-y-6 dir-rtl">
      <div>
        <h1 className="text-2xl font-black text-white">إدارة المحتوى</h1>
        <p className="mt-2 text-sm text-slate-400">إدارة المقالات والأدوات الرقمية من واجهة واحدة.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-slate-800 pb-2" role="tablist" aria-label="أقسام إدارة المحتوى">
        <TabButton active={activeTab === "articles"} onClick={() => setActiveTab("articles")} icon={<FileText className="h-4 w-4" />}>
          المقالات
        </TabButton>
        <TabButton active={activeTab === "tools"} onClick={() => setActiveTab("tools")} icon={<Wrench className="h-4 w-4" />}>
          الأدوات الرقمية
        </TabButton>
        <TabButton active={activeTab === "new-tool"} onClick={() => setActiveTab("new-tool")} icon={<PlusCircle className="h-4 w-4" />}>
          إضافة أداة جديدة
        </TabButton>
      </div>

      {activeTab === "articles" && (
        <ArticlesPanel
          posts={posts}
          createPostAction={createPostAction}
          deletePostAction={deletePostAction}
          updatePostAction={updatePostAction}
        />
      )}
      {activeTab === "tools" && <ToolsPanel tools={tools} />}
      {activeTab === "new-tool" && <NewToolPanel onCreated={() => setActiveTab("tools")} />}
    </div>
  );
}

function TabButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${active ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
    >
      {icon}
      {children}
    </button>
  );
}

function ArticlesPanel({ posts, createPostAction, deletePostAction, updatePostAction }: Omit<AdminContentTabsProps, "tools">) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form action={createPostAction} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold text-white">مقال جديد</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300 md:col-span-2"><span>العنوان</span><input name="title" required className={fieldClassName} placeholder="عنوان المقال" /></label>
            <label className="space-y-2 text-sm text-slate-300"><span>الفئة</span><input name="category" defaultValue="finance" className={fieldClassName} /></label>
            <label className="space-y-2 text-sm text-slate-300"><span>الحالة</span><select name="status" defaultValue="draft" className={fieldClassName}><option value="draft">مسودة</option><option value="published">منشور</option><option value="archived">مؤرشف</option></select></label>
            <label className="space-y-2 text-sm text-slate-300 md:col-span-2"><span>Slug</span><input name="slug" className={fieldClassName} placeholder="example-article" /></label>
            <label className="space-y-2 text-sm text-slate-300 md:col-span-2"><span>وصف مختصر</span><textarea name="description" rows={2} className={fieldClassName} placeholder="وصف موجز للمقال" /></label>
            <label className="space-y-2 text-sm text-slate-300 md:col-span-2"><span>المحتوى</span><textarea name="content" required rows={7} className={fieldClassName} placeholder="نص المقال الكامل" /></label>
          </div>
          <button type="submit" className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-emerald-400">حفظ المقال</button>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold text-white">آخر المقالات</h2>
          <div className="mt-4 space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center justify-between gap-2"><p className="text-sm font-bold text-white">{post.title}</p><span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-300">{post.status}</span></div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400"><span>{post.category}</span><button type="button" onClick={() => deletePostAction(String(post.id))} className="text-red-400 hover:text-red-300">حذف</button></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h2 className="text-lg font-bold text-white">تحديث سريع</h2>
        <div className="mt-4 space-y-4">
          {posts.slice(0, 3).map((post) => (
            <form key={post.id} action={updatePostAction} className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 md:grid-cols-[1.2fr_0.8fr_0.8fr_auto]">
              <input type="hidden" name="postId" value={String(post.id)} /><input name="title" defaultValue={post.title} className={fieldClassName} />
              <select name="status" defaultValue={post.status} className={fieldClassName}><option value="draft">مسودة</option><option value="published">منشور</option><option value="archived">مؤرشف</option></select>
              <input name="category" defaultValue={post.category ?? "finance"} className={fieldClassName} /><button type="submit" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-black text-emerald-300">تحديث</button>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}

function ToolsPanel({ tools }: { tools: Tool[] }) {
  return (
    <section className="space-y-4">
      <div><h2 className="text-xl font-black text-white">الأدوات الرقمية</h2><p className="mt-2 text-sm text-slate-400">عرض الأدوات المتاحة وحالتها داخل المنصة.</p></div>
      {tools.length ? <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70"><div className="divide-y divide-slate-800">{tools.map((tool) => <article key={tool.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-bold text-white">{tool.title}</h3><p className="mt-1 text-xs text-slate-500" dir="ltr">{tool.slug}</p><p className="mt-2 text-sm text-slate-400">{tool.description || "بدون وصف"}</p></div><div className="flex shrink-0 gap-2 text-xs"><span className="rounded-full border border-slate-700 px-3 py-1.5 text-slate-300">{categoryLabels[tool.sector] ?? tool.sector}</span><span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-300">{statusLabels[tool.status] ?? tool.status}</span></div></article>)}</div></div> : <EmptyState text="لا توجد أدوات مضافة من لوحة الإدارة بعد." />}
    </section>
  );
}

function NewToolPanel({ onCreated }: { onCreated: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", slug: "", description: "", category: "finance" as "finance" | "tech" | "media" | "digital-lifestyle", iconName: "Wrench", status: "active" as "active" | "inactive" | "archived" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true); setMessage(null);
    const result = await createToolAction(formData);
    if (result.success) { setMessage("تمت إضافة الأداة بنجاح."); onCreated(); } else setMessage(result.error);
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div><h2 className="text-xl font-black text-white">إضافة أداة رقمية جديدة</h2><p className="mt-2 text-sm text-slate-400">أضف الأداة إلى سجل المنصة.</p></div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300"><span>اسم الأداة</span><input required value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} className={fieldClassName} /></label>
        <label className="space-y-2 text-sm text-slate-300"><span>الرابط المختصر</span><input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={formData.slug} onChange={(event) => setFormData({ ...formData, slug: event.target.value.toLowerCase() })} className={`${fieldClassName} text-left`} dir="ltr" /></label>
        <label className="space-y-2 text-sm text-slate-300"><span>القطاع</span><select value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value as typeof formData.category })} className={fieldClassName}><option value="finance">المال والأعمال</option><option value="tech">التكنولوجيا والابتكار</option><option value="media">الإعلام الجديد</option><option value="digital-lifestyle">رقميون</option></select></label>
        <label className="space-y-2 text-sm text-slate-300"><span>الأيقونة</span><select value={formData.iconName} onChange={(event) => setFormData({ ...formData, iconName: event.target.value })} className={fieldClassName}><option value="Wrench">أداة</option><option value="Calculator">حاسبة</option><option value="FileText">مستند</option><option value="ShieldCheck">أمان</option><option value="Sparkles">لمعان</option></select></label>
        <label className="space-y-2 text-sm text-slate-300"><span>حالة النشر</span><select value={formData.status} onChange={(event) => setFormData({ ...formData, status: event.target.value as typeof formData.status })} className={fieldClassName}><option value="active">نشطة</option><option value="inactive">غير نشطة</option><option value="archived">مؤرشفة</option></select></label>
      </div>
      <label className="block space-y-2 text-sm text-slate-300"><span>وصف الأداة</span><textarea required minLength={10} maxLength={500} value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} rows={5} className={fieldClassName} /></label>
      {message && <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200" role="status">{message}</p>}
      <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 disabled:opacity-50"><Save className="h-4 w-4" />{isSubmitting ? "جاري الحفظ..." : "حفظ الأداة"}</button>
    </form>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-12 text-center text-sm text-slate-400">{text}</div>;
}
