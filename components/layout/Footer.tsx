"use client";

import React from "react";
import Link from "next/link";
import {
  Github,
  Twitter,
  Send,
  Disc as Discord,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          
          {/* الشعار والوصف */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-extrabold text-slate-950 text-lg shadow-md shadow-emerald-500/20">
                مـ
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                مكاسب <span className="text-emerald-400">رقمية</span>
              </span>
            </Link>
            <p className="text-slate-500 text-xs text-center md:text-right max-w-sm">
              منصة الأدوات التفاعلية والدلائل الإجرائية لتطوير الأعمال والتكنولوجيا والنمط الرقمي.
            </p>
          </div>

          {/* روابط الملاحة */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-medium">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              الرئيسية
            </Link>
            <Link href="/about" className="hover:text-emerald-400 transition-colors">
              من نحن
            </Link>
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">
              اتصل بنا
            </Link>
          </div>

          {/* أيقونات التواصل الاجتماعي */}
          <div className="flex items-center gap-3 text-slate-400">
            <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors" aria-label="Github">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors" aria-label="Telegram">
              <Send className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors" aria-label="Discord">
              <Discord className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* حقوق النشر والإصدار */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} مكاسب رقمية — جميع الحقوق محفوظة.
          </div>
          <div className="font-mono text-emerald-400/80 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            v2.5.0
          </div>
        </div>
      </div>
    </footer>
  );
};