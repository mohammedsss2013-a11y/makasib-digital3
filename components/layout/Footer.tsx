"use client";

import React from "react";
import Link from "next/link";
import { Send, Globe, MessageSquare, Share2, ShieldCheck, HelpCircle, FileText, LayoutDashboard, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs mt-auto dir-rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* الجزء الأعلى: أعمدة شجرة الخريطة الشاملة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-xs">
          
          {/* العمود 1: حول المنصة */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-md shadow-emerald-500/20">
                مـ
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                مكاسب <span className="text-emerald-400">رقمية</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              المنظومة المعرفية والأدوات التفاعلية الشاملة لإدارة المال والأعمال، التكنولوجيا والابتكار، الإعلام الجديد، وأسلوب الحياة الرقمي.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg hover:bg-emerald-500/20 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>شجرة الخريطة الهيكلية (Sitemap)</span>
              </Link>
            </div>
          </div>

          {/* العمود 2: المال والأعمال والتكنولوجيا */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs border-r-2 border-emerald-400 pr-2">
              القطاعات التكنولوجية
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li><Link href="/finance" className="hover:text-emerald-400 transition-colors">قطاع المال والأعمال</Link></li>
              <li><Link href="/finance/freelancing" className="hover:text-emerald-400 transition-colors">العمل الحر والمشاريع</Link></li>
              <li><Link href="/finance/ecommerce" className="hover:text-emerald-400 transition-colors">التجارة الإلكترونية</Link></li>
              <li><Link href="/tech" className="hover:text-emerald-400 transition-colors">التكنولوجيا والابتكار</Link></li>
              <li><Link href="/tech/ai-apps" className="hover:text-emerald-400 transition-colors">أنظمة الذكاء الاصطناعي</Link></li>
              <li><Link href="/tech/cybersecurity" className="hover:text-emerald-400 transition-colors">الأمن السيبراني</Link></li>
            </ul>
          </div>

          {/* العمود 3: الإعلام والإسلوب الرقمي */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs border-r-2 border-emerald-400 pr-2">
              الإعلام ورقميون
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li><Link href="/media" className="hover:text-emerald-400 transition-colors">الإعلام الجديد</Link></li>
              <li><Link href="/media/creation" className="hover:text-emerald-400 transition-colors">صناعة المحتوى</Link></li>
              <li><Link href="/media/podcasting" className="hover:text-emerald-400 transition-colors">البودكاست والبث الحي</Link></li>
              <li><Link href="/digital-lifestyle" className="hover:text-emerald-400 transition-colors">رقميون - أسلوب الحياة</Link></li>
              <li><Link href="/digital-lifestyle/health" className="hover:text-emerald-400 transition-colors">الصحة الرقمية والوقاية</Link></li>
              <li><Link href="/community" className="hover:text-emerald-400 transition-colors">مجتمع مكاسب الرقمي</Link></li>
            </ul>
          </div>

          {/* العمود 4: لوحة تحكم المستخدم */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs border-r-2 border-emerald-400 pr-2">
              لوحة التشغيل (OS)
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors font-semibold text-emerald-400/90">نظام لوحة المستخدم</Link></li>
              <li><Link href="/dashboard/analytics" className="hover:text-emerald-400 transition-colors">ملخص الأنشطة والإحصائيات</Link></li>
              <li><Link href="/dashboard/tools" className="hover:text-emerald-400 transition-colors">مكتبة الأدوات المحفوظة</Link></li>
              <li><Link href="/dashboard/bookmarks" className="hover:text-emerald-400 transition-colors">المفضلة السريعة</Link></li>
              <li><Link href="/dashboard/export" className="hover:text-emerald-400 transition-colors">إدارة التقارير والعقود</Link></li>
              <li><Link href="/dashboard/settings" className="hover:text-emerald-400 transition-colors">إعدادات الحساب والأمان</Link></li>
            </ul>
          </div>

          {/* العمود 5: الصفحات القانونية والشركة */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs border-r-2 border-emerald-400 pr-2">
              الصفحات القانونية
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">من نحن</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">سياسة الخصوصية (AdSense & GDPR)</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">شروط الاستخدام</Link></li>
              <li><Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">إخلاء المسؤولية</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-400 transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">اتصل بنا والدعم</Link></li>
            </ul>
          </div>

        </div>

        {/* الجزء الأوسط: وسائل التواصل والشعارات */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-400">
            <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors" aria-label="Website">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors" aria-label="Share">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors" aria-label="Telegram">
              <Send className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 transition-colors" aria-label="Community">
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>خصوصية محمية بالكامل</span>
            </span>
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>دعم متواصل 24/7</span>
            </span>
          </div>
        </div>

        {/* الجزء السفلي: حقوق النشر والإصدار */}
        <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} منصة <span className="text-slate-300 font-semibold">مكاسب رقمية (Makasib Digital)</span> — جميع الحقوق محفوظة.
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-emerald-400/90 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 text-[10px]">
              v3.0 Full Architecture
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};