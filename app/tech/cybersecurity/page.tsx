import Link from "next/link";
import { ArrowLeft, LockKeyhole, Sparkles } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-8 py-6 dir-rtl">
      <section className="overflow-hidden rounded-[28px] border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-bold text-emerald-300">
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              قسم التكنولوجيا والابتكار • الأمن السيبراني
            </span>
            <h1 className="text-3xl font-black text-white sm:text-4xl">الأمن السيبراني</h1>
            <p className="text-sm leading-7 text-slate-300 sm:text-base">
              يركز هذا الفرع على حماية الحسابات والأنظمة والبيانات، مع توضيح أفضل الممارسات والاختناقات التي يجب تجنبها.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-emerald-300">
              <Sparkles className="h-4 w-4" />
              <span className="font-bold">معلومات القسم</span>
            </div>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              الاسم: الأمن السيبراني<br />
              الفئة: التكنولوجيا والابتكار<br />
              الهدف: حماية البيانات والهوية
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-[10px] font-bold text-emerald-300">ما الذي ستجده هنا</p>
          <h2 className="mt-3 text-xl font-black text-white">حماية فعالة</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            <li>• كلمات مرور وبروتوكولات أكثر أمانًا.</li>
            <li>• إدارة الحسابات والهوية الرقمية.</li>
            <li>• أساليب تقليل المخاطر اليومية.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="text-[10px] font-bold text-emerald-300">الهدف</p>
          <h2 className="mt-3 text-xl font-black text-white">الأمان أولًا</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            يساعد هذا الفرع على بناء عادات أكثر أمانًا في استخدام التطبيقات والهواتف والبيانات، مع تعقبه للاختناقات الشائعة.
          </p>
        </div>
      </section>

      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold text-emerald-300">عرض المقالات</p>
            <h2 className="mt-1 text-xl font-black text-white">ابدأ من المقالات المرتبطة بهذا الفرع</h2>
          </div>
          <Link href="/articles/tech/cybersecurity" className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-xs font-black text-slate-950 transition-colors hover:bg-emerald-300">
            مشاهدة المقالات
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

