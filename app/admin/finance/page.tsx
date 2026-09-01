const transactionalData = [
  { label: "إيرادات اليوم", value: "$1,240" },
  { label: "المدفوعات المعلقة", value: "$320" },
  { label: "التحويلات المكتملة", value: "86" },
  { label: "المطالبات المفتوحة", value: "12" },
];

export default function AdminFinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">المعاملات المالية</h1>
        <p className="mt-2 text-sm text-slate-400">مراقبة الإيرادات، المدفوعات، والتحويلات التشغيلية.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {transactionalData.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-3 text-2xl font-black text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-lg font-bold text-white">آخر المعاملات</h2>
        <div className="mt-5 space-y-3 text-sm text-slate-300">
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span>تحويل من حساب وكالة رقم 102</span>
            <span className="text-emerald-300">مكتمل</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span>دفعة من شراكة محتوى</span>
            <span className="text-amber-300">قيد المراجعة</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span>استرداد منتج خاص</span>
            <span className="text-red-300">مرفوض</span>
          </div>
        </div>
      </section>
    </div>
  );
}
