import { Activity, AlertTriangle, DollarSign, Users } from "lucide-react";

const kpis = [
  { label: "المبيعات اليومية", value: "$1,240", icon: DollarSign, accent: "text-emerald-400" },
  { label: "المستخدمين الجدد", value: "+148", icon: Users, accent: "text-blue-400" },
  { label: "نشاط الخادم", value: "99.9%", icon: Activity, accent: "text-indigo-400" },
  { label: "تنبيهات الأخطاء", value: "3 أخطاء", icon: AlertTriangle, accent: "text-amber-400" },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white sm:text-3xl">نظرة عامة على المنصة</h1>
        <p className="mt-2 text-sm leading-7 text-slate-400">
          متابعة العمليات المالية، المستخدمين، والأداء العام للنظام الداخلي.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{item.label}</span>
                <Icon className={`h-5 w-5 ${item.accent}`} />
              </div>
              <p className="mt-4 text-2xl font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-bold text-white">مؤشرات التشغيل</h2>
          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                <span>الزيارات اليومية</span>
                <span>72%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800">
                <div className="h-2.5 w-[72%] rounded-full bg-emerald-400" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                <span>معدل التحويل</span>
                <span>46%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800">
                <div className="h-2.5 w-[46%] rounded-full bg-blue-400" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                <span>المحتوى النشط</span>
                <span>81%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800">
                <div className="h-2.5 w-[81%] rounded-full bg-violet-400" />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-bold text-white">تنبيهات سريعة</h2>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-amber-200">
              يحتاج نظام الدعم إلى متابعة طلبات جديدة لمدة 12 ساعة.
            </li>
            <li className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-200">
              تم تحديث قاعدة المحتوى بنجاح خلال آخر ساعة.
            </li>
            <li className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-200">
              يوجد 3 أخطاء في سجل النظام تحتاج مراجعة.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
