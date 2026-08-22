import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" dir="rtl" aria-live="polite" aria-busy="true">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4 text-sm text-slate-300">
        <LoaderCircle className="h-5 w-5 animate-spin text-emerald-400" />
        جارٍ تحميل الصفحة...
      </div>
    </div>
  );
}
