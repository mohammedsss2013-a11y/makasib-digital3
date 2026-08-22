"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <main className="flex min-h-screen items-center justify-center px-6 text-center">
          <section className="max-w-md">
            <p className="text-sm font-bold text-emerald-400">مكاسب رقمية</p>
            <h1 className="mt-3 text-2xl font-black">تعذر تحميل الموقع</h1>
            <p className="mt-3 text-sm leading-7 text-slate-400">حدث خطأ في الطبقة الرئيسية. حاول إعادة تحميل الموقع.</p>
            <button type="button" onClick={() => reset()} className="mt-6 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-300">
              إعادة المحاولة
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}