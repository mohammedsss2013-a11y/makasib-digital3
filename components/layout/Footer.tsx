"use client";

import Link from "next/link";
import { CircleHelp, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";

const footerLinks = {
  platform: [
    { href: "/about", label: "من نحن" },
    { href: "/sitemap", label: "دليل المنصة" },
    { href: "/contact", label: "تواصل معنا" },
  ],
  support: [
    { href: "/faq", label: "الأسئلة الشائعة" },
    { href: "/terms", label: "الشروط والأحكام" },
    { href: "/privacy", label: "سياسة الخصوصية" },
    { href: "/disclaimer", label: "إخلاء المسؤولية" },
  ],
};

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-muted)] dir-rtl">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <div className="border-b border-[var(--border-main)] pb-10">
          <div className="space-y-5">
            <BrandLogo />
            <p className="max-w-2xl text-sm leading-7 text-slate-400">
              منظومة معرفية وأدوات تفاعلية تساعدك على إدارة المال والأعمال، التكنولوجيا، الإعلام، وأسلوب الحياة الرقمي بقرارات أكثر وضوحًا.
            </p>
          </div>
        </div>

        <div className="grid gap-8 border-b border-[var(--border-main)] py-8 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div className="space-y-4">
            <Link href="/community" className="inline-flex items-center gap-2 text-sm font-bold text-slate-200 transition-colors hover:text-emerald-300">
              <MessageSquare className="h-4 w-4 text-emerald-400" /> شارك تجربتك مع مجتمع مكاسب
            </Link>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-200">
              <Mail className="h-4 w-4 text-emerald-400" /> المنصة
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-emerald-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-200">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> الدعم والسياسات
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-emerald-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-5 text-center text-[11px] text-slate-500 sm:flex-row sm:justify-between sm:text-right">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <p>© {new Date().getFullYear()} <span className="font-semibold text-slate-300">مكاسب رقمية</span>. جميع الحقوق محفوظة.</p>
            <span className="text-slate-600">|</span>
            <span className="font-medium text-slate-300">الإصدار v1.0.0</span>
          </div>

          <nav aria-label="التنقل السريع" className="flex items-center justify-center gap-3 text-xs sm:justify-start">
            <Link href="/privacy" className="transition-colors hover:text-emerald-300">الخصوصية</Link>
            <span className="text-slate-600">/</span>
            <Link href="/contact" className="transition-colors hover:text-emerald-300">تواصل معنا</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
