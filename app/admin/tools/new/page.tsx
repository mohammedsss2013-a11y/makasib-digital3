"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Save, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/providers/ToastProvider";
import { createToolAction } from "@/actions/admin-tools.actions";

const fieldClassName = "w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20";

export default function NewToolPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "finance" as "finance" | "tech" | "media" | "digital-lifestyle",
    iconName: "Wrench",
    status: "active" as "active" | "inactive" | "archived",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const result = await createToolAction(formData);
    if (result.success) {
      showToast("تمت إضافة الأداة إلى قاعدة البيانات بنجاح", "success");
      router.push("/admin/tools");
    } else {
      showToast(result.error, "error");
    }
    setIsSubmitting(false);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 dir-rtl">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
        <Link href="/admin/tools" aria-label="العودة إلى الأدوات الرقمية" className="rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-300 transition hover:border-emerald-400 hover:text-white">
          <ArrowRight className="h-5 w-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-emerald-400" aria-hidden="true" />
            <h1 className="text-2xl font-black text-white">إضافة أداة رقمية جديدة</h1>
          </div>
          <p className="mt-2 text-sm text-slate-400">أضف بيانات الأداة إلى سجل الأدوات الرقمية.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            <span>اسم الأداة <b className="text-red-400">*</b></span>
            <input name="title" required value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} className={fieldClassName} placeholder="حاسبة تسعير الخدمات" />
          </label>

          <label className="space-y-2 text-sm text-slate-300">
            <span>الرابط المختصر <b className="text-red-400">*</b></span>
            <input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={formData.slug} onChange={(event) => setFormData({ ...formData, slug: event.target.value.toLowerCase() })} dir="ltr" className={`${fieldClassName} text-left`} placeholder="pricing-calculator" />
          </label>

          <label className="space-y-2 text-sm text-slate-300">
            <span>القطاع</span>
            <select name="category" value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value as typeof formData.category })} className={fieldClassName}>
              <option value="finance">المال والأعمال</option>
              <option value="tech">التكنولوجيا والابتكار</option>
              <option value="media">الإعلام الجديد</option>
              <option value="digital-lifestyle">رقميون</option>
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-300">
            <span>الأيقونة</span>
            <select name="iconName" value={formData.iconName} onChange={(event) => setFormData({ ...formData, iconName: event.target.value })} className={fieldClassName}>
              <option value="Wrench">أداة</option>
              <option value="Calculator">حاسبة</option>
              <option value="FileText">مستند</option>
              <option value="ShieldCheck">أمان</option>
              <option value="Sparkles">لمعان</option>
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-300">
            <span>حالة النشر</span>
            <select name="status" value={formData.status} onChange={(event) => setFormData({ ...formData, status: event.target.value as typeof formData.status })} className={fieldClassName}>
              <option value="active">نشطة</option>
              <option value="inactive">غير نشطة</option>
              <option value="archived">مؤرشفة</option>
            </select>
          </label>
        </div>

        <label className="block space-y-2 text-sm text-slate-300">
          <span>وصف الأداة</span>
          <textarea name="description" required minLength={10} maxLength={500} value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} rows={5} className={fieldClassName} placeholder="اكتب وصفًا موجزًا يوضح فائدة الأداة." />
        </label>

        <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
          <Link href="/admin/tools" className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800">إلغاء</Link>
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50">
            <Save className="h-4 w-4" aria-hidden="true" />
            {isSubmitting ? "جاري الحفظ..." : "حفظ الأداة"}
          </button>
        </div>
      </form>
    </div>
  );
}
