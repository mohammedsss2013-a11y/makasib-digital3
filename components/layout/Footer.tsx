"use client";

import Link from "next/link";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";

const footerLinks = {
  platform: [
    { href: "/articles", label: "أرشيف المقالات" },
    { href: "/about", label: "عن المدونة" },
    { href: "/tools", label: "الأدوات الرقمية" },
    { href: "/sitemap", label: "دليل الموقع" },
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
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 lg:px-8">
        <div className="border-b border-[var(--border-main)] pb-8">
          <div className="space-y-4">
            <BrandLogo />
            <p className="max-w-2xl text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
              مدونة عربية متخصصة في نشر المقالات التطبيقية، التحليلات، والأدوات الرقمية المساعدة في مجالات المال والأعمال، التكنولوجيا، الإعلام الجديد، وأسلوب الحياة الرقمي.
            </p>
          </div>
        </div>

        <div className="grid gap-8 border-b border-[var(--border-main)] py-8 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div className="space-y-4">
            <Link
              href="/community"
              className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-main)] transition-colors hover:text-[var(--accent-primary)]"
            >
              <MessageSquare className="h-4 w-4 text-[var(--accent-primary)]" />
              انضم لمناقشات مجتمع مكاسب
            </Link>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xs font-bold text-[var(--text-main)]">
              <Mail className="h-4 w-4 text-[var(--accent-primary)]" /> المدونة
            </h3>
            <ul className="space-y-2.5 text-xs text-[var(--text-muted)]">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-[var(--accent-primary)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xs font-bold text-[var(--text-main)]">
              <ShieldCheck className="h-4 w-4 text-[var(--accent-primary)]" /> الدعم والسياسات
            </h3>
            <ul className="space-y-2.5 text-xs text-[var(--text-muted)]">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-[var(--accent-primary)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-6 text-center text-[11px] text-[var(--text-muted)] sm:flex-row sm:justify-between sm:text-right">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <p>© {new Date().getFullYear()} <span className="font-semibold text-[var(--text-main)]">مكاسب رقمية</span>. جميع الحقوق محفوظة.</p>
          </div>

          <nav aria-label="التنقل السريع" className="flex items-center justify-center gap-3 text-xs sm:justify-start">
            <Link href="/privacy" className="transition-colors hover:text-[var(--accent-primary)]">الخصوصية</Link>
            <span className="text-[var(--border-main)]">/</span>
            <Link href="/contact" className="transition-colors hover:text-[var(--accent-primary)]">تواصل معنا</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
