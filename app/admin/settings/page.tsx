export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">إعدادات النظام</h1>
        <p className="mt-2 text-sm text-slate-400">إدارة إعدادات التشغيل، الأمان، والتخصيص العام.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold text-white">الأمان</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• تفعيل التحقق الثنائي</li>
            <li>• سياسة الوصول للوصول للـ admin</li>
            <li>• سجل السلوك وفعاليات المسؤول</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-bold text-white">النظام</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• إعدادات الموقع العامة</li>
            <li>• إعدادات الروابط والـ SEO</li>
            <li>• التحديثات الدورية للمحتوى</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
