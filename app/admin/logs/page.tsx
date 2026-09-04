import { createClient } from "@/lib/supabase/server";

export default async function AdminLogsPage() {
  const supabase = await createClient();
  const { data: auditRows } = await supabase
    .from("audit_logs")
    .select("id, action, target_resource, created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  const auditEntries = (auditRows ?? []).map((entry) => ({
    action: entry.action,
    resource: entry.target_resource,
    createdAt: new Date(entry.created_at).toLocaleString("ar-EG"),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">المراقبة والسجلات</h1>
        <p className="mt-2 text-sm text-slate-400">سجل النشاطات وإجراءات الإدارة والعمليات الحرجة.</p>
      </div>

      <div className="space-y-3">
        {auditEntries.length ? auditEntries.map((entry) => (
          <div key={`${entry.action}-${entry.createdAt}`} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-white">{entry.action}</p>
              <span className="text-xs text-slate-500">{entry.createdAt}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">المورد: {entry.resource}</p>
          </div>
        )) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-400">لا توجد سجلات نشاط متاحة حتى الآن.</div>
        )}
      </div>
    </div>
  );
}
