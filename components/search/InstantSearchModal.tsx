"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowLeft, Wrench, FileText, FilePlus2, LayoutDashboard, Shield, Users, Compass, Cpu, TrendingUp, Tv, Brain } from "lucide-react";
import Link from "next/link";

export const InstantSearchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), a[href]'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockResults = [
    // 💼 قطاع المال والأعمال
    { type: "sector", title: "قطاع المال والأعمال الرئيسي", category: "المال والأعمال", path: "/finance" },
    { type: "tool", title: "حاسبة تسعير الخدمات ومعدل الساعة وعقود العمل الحر", category: "المال والأعمال - Freelancing", path: "/finance/freelancing" },
    { type: "tool", title: "التجارة الإلكترونية والبيع الرقمي وحاسبة هوامش الربح", category: "المال والأعمال - E-Commerce", path: "/finance/ecommerce" },
    { type: "tool", title: "التسويق الرقمي وحاسبة عائد الإعلانات (ROAS & CAC)", category: "المال والأعمال - Digital Marketing", path: "/finance/marketing" },
    { type: "article", title: "اقتصاد صناعة المحتوى ونماذج التكسب الرقمي", category: "المال والأعمال - Content Economy", path: "/finance/content-economy" },
    { type: "article", title: "العملات الرقمية والبلوكشين وتقنيات Web3", category: "المال والأعمال - Crypto & Web3", path: "/finance/crypto" },
    { type: "tool", title: "الذكاء الاصطناعي في المال والأعمال وأتمتة العمليات", category: "المال والأعمال - AI in Business", path: "/finance/ai-business" },
    { type: "article", title: "العتاد والإنتاجية المالية وتجهيز بيئة العمل", category: "المال والأعمال - Hardware & Productivity", path: "/finance/hardware" },

    // ⚙️ قطاع التكنولوجيا والابتكار
    { type: "sector", title: "قطاع التكنولوجيا والابتكار الرئيسي", category: "التكنولوجيا", path: "/tech" },
    { type: "tool", title: "تطبيقات وأنظمة الذكاء الاصطناعي وحاسبة الـ Tokens & API", category: "التكنولوجيا - AI Applications", path: "/tech/ai-apps" },
    { type: "tool", title: "الأمن السيبراني وفحص قوة كلمات المرور والتشفير", category: "التكنولوجيا - Cybersecurity", path: "/tech/cybersecurity" },
    { type: "article", title: "الحوسبة السحابية وأدوات العمل عن بُعد", category: "التكنولوجيا - Cloud & Remote", path: "/tech/cloud-remote" },
    { type: "article", title: "تطوير البنية الرقمية وتقنيات المستقبل (Next-Gen Infra)", category: "التكنولوجيا - Next-Gen Infra", path: "/tech/infra" },
    { type: "article", title: "إنترنت الأشياء (IoT) والتقنيات الناشئة", category: "التكنولوجيا - IoT & Emerging", path: "/tech/iot-emerging" },

    // 🎙️ قطاع الإعلام الجديد
    { type: "sector", title: "قطاع الإعلام الجديد الرئيسي", category: "الإعلام الجديد", path: "/media" },
    { type: "article", title: "صناعة المحتوى المرئي والمكتوب واستراتيجيات النشر", category: "الإعلام الجديد - Content Creation", path: "/media/creation" },
    { type: "article", title: "أخبار وتحليلات الصناعة الرقمية والتحولات", category: "الإعلام الجديد - Industry News", path: "/media/news" },
    { type: "tool", title: "البودكاست والبودكاست المرئي وتوزيع الصوتيات", category: "الإعلام الجديد - Podcasting", path: "/media/podcasting" },
    { type: "tool", title: "منصات البث الحي وحاسبة معدل التفاعل", category: "الإعلام الجديد - Live Streaming", path: "/media/streaming" },
    { type: "article", title: "الترفيه الرقمي والألعاب وصناعة Esports", category: "الإعلام الجديد - Digital Entertainment", path: "/media/gaming" },

    // 🧠 قطاع رقميون
    { type: "sector", title: "قطاع رقميون (أسلوب الحياة والتفكير)", category: "أسلوب الحياة الرقمي", path: "/digital-lifestyle" },
    { type: "tool", title: "إدارة الحياة الرقمية وتنظيم الوقت والمهام", category: "رقميون - Life Management", path: "/digital-lifestyle/life-management" },
    { type: "article", title: "الصحة الرقمية والوقاية من الاحتراق الرقمي", category: "رقميون - Digital Health", path: "/digital-lifestyle/health" },
    { type: "article", title: "علم النفس الرقمي وسلوك الجمهور والمتابعين", category: "رقميون - Digital Psychology", path: "/digital-lifestyle/psychology" },
    { type: "article", title: "التعليم والتعلم الرقمي المستمر وتطوير الذات", category: "رقميون - Continuous Learning", path: "/digital-lifestyle/learning" },
    { type: "article", title: "الثقافة الرقمية العابرة للمستقبل والأنماط المعاصرة", category: "رقميون - Future Culture", path: "/digital-lifestyle/culture" },

    // 💬 مجتمع مكاسب
    { type: "community", title: "مجتمع مكاسب الرقمي الرئيسي", category: "المجتمع", path: "/community" },
    { type: "community", title: "مساحة الاستشارات والتجريب المباشرة", category: "المجتمع - Consultations Feed", path: "/community/consultations" },
    { type: "community", title: "مراجعات النتائج المرفقة من الأدوات والحاسبات", category: "المجتمع - Tool Results Review", path: "/community/tool-results" },
    { type: "community", title: "النقاشات الساخنة والأفكار المبتكرة", category: "المجتمع - Discussion Topics", path: "/community/topics" },
    { type: "community", title: "دليل الأعضاء والموثوقية والشارات", category: "المجتمع - Member Directory", path: "/community/directory" },

    // 🛠️ لوحة التحكم OS
    { type: "dashboard", title: "لوحة تحكم المستخدم الشخصية (Personal OS)", category: "لوحة التحكم", path: "/dashboard" },
    { type: "dashboard", title: "ملخص الأنشطة والإحصائيات الشخصية", category: "لوحة التحكم - Personal Analytics", path: "/dashboard/analytics" },
    { type: "dashboard", title: "لوحة أدواتي", category: "لوحة التحكم", path: "/dashboard/tools" },
    { type: "dashboard", title: "قائمة المفضلة السريعة (Bookmarks)", category: "لوحة التحكم - Pinned Bookmarks", path: "/dashboard/bookmarks" },
    { type: "dashboard", title: "إدارة العقود والتقارير المطبوعة (PDF/Excel)", category: "لوحة التحكم - Export Center", path: "/dashboard/export" },
    { type: "dashboard", title: "مشاركاتي وتفاعلاتي في مجتمع مكاسب", category: "لوحة التحكم - My Posts", path: "/dashboard/posts" },
    { type: "dashboard", title: "إعدادات الحساب والأمان والربط", category: "لوحة التحكم - Settings", path: "/dashboard/settings" },

    // ⚖️ الصفحات القانونية والشركة
    { type: "legal", title: "من نحن - عن منصة مكاسب رقمية", category: "عن المنصة", path: "/about" },
    { type: "legal", title: "سياسة الخصوصية (AdSense & GDPR Ready)", category: "قانوني", path: "/privacy" },
    { type: "legal", title: "شروط الاستخدام والأحكام", category: "قانوني", path: "/terms" },
    { type: "legal", title: "إخلاء المسؤولية العامة والمشورة", category: "قانوني", path: "/disclaimer" },
    { type: "legal", title: "مركز المساعدة والأسئلة الشائعة (FAQ Hub)", category: "الدعم", path: "/faq" },
    { type: "legal", title: "اتصل بنا ومركز الدعم الفني", category: "الدعم", path: "/contact" },

    // 🗺️ دليل المنصة العام
    { type: "sitemap", title: "دليل المنصة العام (Interactive Platform Guide)", category: "الدليل العام", path: "/sitemap" }
  ].filter(
    (r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-search-title"
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden dir-rtl"
      >
        <div className="flex items-center px-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-emerald-400" aria-hidden="true" />
          <h2 id="site-search-title" className="sr-only">البحث في الموقع</h2>
          <input
            ref={inputRef}
            type="text"
            id="site-search-input"
            aria-label="ابحث في الموقع"
            placeholder="ابحث عن أداة، حاسبة، قسم، أو استشارة... (مثال: تسعير، ذكاء، أمان، عقود)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent p-4 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق البحث"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
          {mockResults.length > 0 ? (
            mockResults.map((res, idx) => (
              <Link
                key={idx}
                href={res.path}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-all group border border-transparent hover:border-slate-700/60"
              >
                <div className="flex items-center gap-3">
                  {res.type === "tool" ? (
                    <Wrench className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : res.type === "dashboard" ? (
                    res.path === "/dashboard/tools" ? (
                      <FilePlus2 className="w-4 h-4 text-teal-400 shrink-0" />
                    ) : (
                      <LayoutDashboard className="w-4 h-4 text-teal-400 shrink-0" />
                    )
                  ) : res.type === "community" ? (
                    <Users className="w-4 h-4 text-blue-400 shrink-0" />
                  ) : res.type === "legal" ? (
                    <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {res.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {res.category} • {res.path}
                    </span>
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
              </Link>
            ))
          ) : (
            <div className="text-center py-10 space-y-2">
              <p className="text-xs text-slate-400">
                لا توجد نتائج مطابقة لمفهوم البحث &ldquo;{query}&rdquo;
              </p>
              <p className="text-[11px] text-slate-500">جرب البحث بكلمات عامة مثل &ldquo;تسعير&rdquo;، &ldquo;أمان&rdquo;، &ldquo;ذكاء&rdquo; أو &ldquo;لوحة&rdquo;</p>
            </div>
          )}
        </div>

        <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
          <span>مفتاح Esc للإغلاق</span>
          <span>{mockResults.length} نتيجة متوفرة</span>
        </div>
      </div>
    </div>
  );
};