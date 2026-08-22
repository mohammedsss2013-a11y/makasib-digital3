import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[55vh] items-center justify-center py-12" dir="rtl">
      <section className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl">
        <Compass className="mx-auto mb-4 h-12 w-12 text-emerald-400" />
        <p className="text-sm font-bold text-emerald-400">404</p>
        <h1 className="mt-2 text-2xl font-black text-white">الصفحة غير موجودة</h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">قد يكون الرابط قديمًا أو أن الصفحة نُقلت إلى مكان آخر.</p>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-300">
          العودة إلى الرئيسية <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
