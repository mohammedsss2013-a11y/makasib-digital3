"use client";

import { useEffect } from "react";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <div className="mx-auto max-w-xl rounded-2xl border border-red-500/20 bg-red-500/5 p-10 text-center dir-rtl"><h1 className="text-xl font-bold text-white">تعذر تحميل لوحة التحكم</h1><p className="mt-3 text-sm text-slate-400">حدث خطأ مؤقت أثناء جلب بياناتك.</p><button type="button" onClick={() => reset()} className="mt-6 rounded-xl bg-emerald-400 px-5 py-2.5 text-xs font-bold text-slate-950">إعادة المحاولة</button></div>;
}
