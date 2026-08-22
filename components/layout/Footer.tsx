"use client";

import Link from "next/link";
import { HelpCircle, MessageSquare, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-[#070b14] text-slate-400 dir-rtl">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-slate-800/80 pb-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-5 lg:col-span-5">
            <BrandLogo />
            <p className="max-w-md text-sm leading-7 text-slate-400">منظومة معرفية وأدوات تفاعلية تساعدك على إدارة المال والأعمال، التكنولوجيا، الإعلام، وأسلوب الحياة الرقمي بقرارات أكثر وضوحًا.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4"><ShieldCheck className="h-6 w-6 shrink-0 text-emerald-400" /><div><p className="text-xs font-bold text-white">خصوصية محمية بالكامل</p><p className="mt-1 text-[11px] text-slate-500">معايير واضحة لحماية بياناتك</p></div></div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4"><HelpCircle className="h-6 w-6 shrink-0 text-emerald-400" /><div><p className="text-xs font-bold text-white">دعم متواصل</p><p className="mt-1 text-[11px] text-slate-500">مساعدة تقنية وإرشادات عملية</p></div></div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-b border-slate-800/80 py-7 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/community" className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 transition-colors hover:text-emerald-300">
            <MessageSquare className="h-4 w-4 text-emerald-400" /> شارك تجربتك مع مجتمع مكاسب
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4 pt-6 text-center text-[11px] text-slate-500 sm:flex-row sm:justify-between sm:text-right">
          <p>© {new Date().getFullYear()} <span className="font-semibold text-slate-300">مكاسب رقمية</span>. جميع الحقوق محفوظة.</p>
          <nav aria-label="الصفحات القانونية" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500 sm:justify-start">
            <Link href="/about" className="transition-colors hover:text-emerald-300">من نحن</Link>
            <Link href="/privacy" className="transition-colors hover:text-emerald-300">الخصوصية</Link>
            <Link href="/terms" className="transition-colors hover:text-emerald-300">الشروط والأحكام</Link>
            <Link href="/disclaimer" className="transition-colors hover:text-emerald-300">إخلاء المسؤولية</Link>
            <Link href="/contact" className="transition-colors hover:text-emerald-300">تواصل معنا</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
