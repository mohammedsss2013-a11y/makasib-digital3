const tickets = [
  { title: "مشكلة في تسجيل الدخول", status: "قيد المتابعة", priority: "عالية" },
  { title: "طلب إضافة أداة جديدة", status: "تمت الإجابة", priority: "متوسطة" },
  { title: "استفسار حول الإحصاءات", status: "مفتوح", priority: "منخفضة" },
];

export default function AdminSupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">الدعم الفني</h1>
        <p className="mt-2 text-sm text-slate-400">متابعة طلبات المستخدمين، التذاكر، والتواصل الداخلي.</p>
      </div>

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <div key={ticket.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-bold text-white">{ticket.title}</h2>
              <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[10px] font-bold text-slate-300">
                {ticket.priority}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400">الحالة: {ticket.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
