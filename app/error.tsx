"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[55vh] items-center justify-center py-12" dir="rtl">
      <section className="w-full max-w-lg rounded-3xl border border-red-500/20 bg-slate-900/80 p-8 text-center shadow-2xl">
        <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-amber-300" />
        <h1 className="text-2xl font-black text-white">حدث خطأ غير متوقع</h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">تعذر تحميل هذه الصفحة حاليًا. يمكنك المحاولة مرة أخرى.</p>
        <button type="button" onClick={() => reset()} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-300">
          <RefreshCw className="h-4 w-4" /> إعادة المحاولة
        </button>
      </section>
    </div>
  );
}
