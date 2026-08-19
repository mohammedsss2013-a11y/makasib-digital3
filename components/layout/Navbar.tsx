"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  Cpu,
  Tv,
  Brain,
  Users,
  Briefcase,
  ShoppingBag,
  Megaphone,
  Video,
  Coins,
  Bot,
  Laptop,
  Shield,
  Cloud,
  Layers,
  Wifi,
  FileText,
  Newspaper,
  Podcast,
  Radio,
  Gamepad2,
  Calendar,
  HeartPulse,
  Sparkles,
  GraduationCap,
  Compass,
  MessageSquare,
  BarChart,
  UserCheck,
  Zap
} from "lucide-react";

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar = ({ onOpenSearch }: NavbarProps) => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const navigationRef = useRef<HTMLElement>(null);

  // إغلاق القوائم عند تغيير المسار
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveMegaMenu(null);
      setMobileMenuOpen(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navigationRef.current && !navigationRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMegaMenu(null);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navigationPillars = [
    {
      id: "finance",
      title: "المال والأعمال",
      icon: TrendingUp,
      href: "/finance",
      badge: "7 أقسام",
      subItems: [
        { title: "العمل الحر والمشاريع المصغرة", href: "/finance/freelancing", icon: Briefcase, desc: "حاسبات التسعير وعقود العمل" },
        { title: "التجارة الإلكترونية والبيع الرقمي", href: "/finance/ecommerce", icon: ShoppingBag, desc: "تحليل هوامش الربح والمنصات" },
        { title: "التسويق الرقمي وعائد الإعلانات", href: "/finance/marketing", icon: Megaphone, desc: "حساب الـ ROAS والـ CAC" },
        { title: "اقتصاد صناعة المحتوى", href: "/finance/content-economy", icon: Video, desc: "نماذج التكسب والاستدامة" },
        { title: "العملات الرقمية والبلوكشين", href: "/finance/crypto", icon: Coins, desc: "تقنيات Web3 وإدارة المخاطر" },
        { title: "الذكاء الاصطناعي في المال والأعمال", href: "/finance/ai-business", icon: Bot, desc: "أتمتة العمليات وتخفيض التكاليف" },
        { title: "العتاد والإنتاجية المالية", href: "/finance/hardware", icon: Laptop, desc: "تجهيزات بيئة العمل المحترفة" },
      ]
    },
    {
      id: "tech",
      title: "التكنولوجيا والابتكار",
      icon: Cpu,
      href: "/tech",
      badge: "5 أقسام",
      subItems: [
        { title: "تطبيق وأنظمة الذكاء الاصطناعي", href: "/tech/ai-apps", icon: Bot, desc: "نماذج LLMs وتكاليف الـ API" },
        { title: "الأمن السيبراني والخصوصية", href: "/tech/cybersecurity", icon: Shield, desc: "فحص كلمات المرور والتشفير" },
        { title: "الحوسبة السحابية والعمل عن بُعد", href: "/tech/cloud-remote", icon: Cloud, desc: "أدوات السحاب والبنية التحتية" },
        { title: "تطوير البنية وتقنيات المستقبل", href: "/tech/infra", icon: Layers, desc: "أحدث المعايير الهندسية" },
        { title: "إنترنت الأشياء والتقنيات الناشئة", href: "/tech/iot-emerging", icon: Wifi, desc: "الأجهزة الذكية والربط" },
      ]
    },
    {
      id: "media",
      title: "الإعلام الجديد",
      icon: Tv,
      href: "/media",
      badge: "5 أقسام",
      subItems: [
        { title: "صناعة المحتوى المرئي والمكتوب", href: "/media/creation", icon: FileText, desc: "استراتيجيات السرد والنشر" },
        { title: "أخبار وتحليلات الصناعة الرقمية", href: "/media/news", icon: Newspaper, desc: "رصد التحولات والاتجاهات" },
        { title: "البودكاست والبودكاست المرئي", href: "/media/podcasting", icon: Podcast, desc: "إنتاج الصوت والتوزيع" },
        { title: "منصات البث الحي والتفاعل", href: "/media/streaming", icon: Radio, desc: "أدوات البث ومعدل التفاعل" },
        { title: "الترفيه الرقمي والألعاب", href: "/media/gaming", icon: Gamepad2, desc: "صناعة الألعاب والرياضات الرقمية" },
      ]
    },
    {
      id: "lifestyle",
      title: "رقميون - أسلوب الحياة",
      icon: Brain,
      href: "/digital-lifestyle",
      badge: "6 أقسام",
      subItems: [
        { title: "إدارة الحياة الرقمية والتنظيم", href: "/digital-lifestyle/life-management", icon: Calendar, desc: "تنظيم الوقت والمهام" },
        { title: "الصحة الرقمية والوقاية من الاحتراق", href: "/digital-lifestyle/health", icon: HeartPulse, desc: "الاستخدام المتوازن والتعافي" },
        { title: "علم النفس الرقمي وسلوك الجمهور", href: "/digital-lifestyle/psychology", icon: Sparkles, desc: "فهم سلوك المتابعين" },
        { title: "التعليم والتعلم الرقمي المستمر", href: "/digital-lifestyle/learning", icon: GraduationCap, desc: "تطوير المهارات الذاتية" },
        { title: "الثقافة الرقمية العابرة للمستقبل", href: "/digital-lifestyle/culture", icon: Compass, desc: "مفاهيم وقيم العالم الرقمي" },
        { title: "الفلسفة الرقمية", href: "/digital-lifestyle/philosophy", icon: Zap, desc: "تأملات وتأثير التكنولوجيا" },
      ]
    },
    {
      id: "community",
      title: "مجتمع مكاسب",
      icon: Users,
      href: "/community",
      badge: "تفاعلي",
      subItems: [
        { title: "مساحة الاستشارات والتجريب", href: "/community/consultations", icon: MessageSquare, desc: "تجارب الأعضاء والمشورة" },
        { title: "مراجعات النتائج المرفقة من الأدوات", href: "/community/tool-results", icon: BarChart, desc: "مشاركة مخرجات الحاسبات" },
        { title: "النقاشات الساخنة والأفكار المبتكرة", href: "/community/topics", icon: Sparkles, desc: "حوارات حول المستقبل الرقمي" },
        { title: "دليل الأعضاء والموثوقية", href: "/community/directory", icon: UserCheck, desc: "قائمة الأعضاء والشارات" },
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 text-white dir-rtl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* الشعار والوصف */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              مـ
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight leading-none text-white">
                مكاسب <span className="text-emerald-400">رقمية</span>
              </span>
              <span className="text-[10px] text-slate-400 mt-1">
                المنظومة المعرفية والأدوات التفاعلية
              </span>
            </div>
          </Link>
        </div>

        {/* روابط الملاحة الرئيسية مع Mega Dropdown */}
        <nav ref={navigationRef} className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-300 relative">
          <Link
            href="/"
            className={`px-3 py-2 rounded-lg transition-colors ${
              pathname === "/" ? "text-emerald-400 font-bold bg-emerald-500/10" : "hover:text-emerald-400 hover:bg-slate-900/60"
            }`}
          >
            الرئيسية
          </Link>

          {navigationPillars.map((pillar) => {
            const Icon = pillar.icon;
            const isOpen = activeMegaMenu === pillar.id;
            const isActive = pathname.startsWith(pillar.href);

            return (
              <div
                key={pillar.id}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(pillar.id)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href={pillar.href}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "text-emerald-400 font-bold bg-emerald-500/10"
                      : "hover:text-emerald-400 hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pillar.title}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-400" : "text-slate-500"
                    }`}
                  />
                </Link>

                {/* قائمة الملاحة العملاقة Mega Menu */}
                {isOpen && (
                  <div className="absolute right-0 top-full pt-2 w-[340px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-slate-900/95 backdrop-blur-2xl border border-slate-800 p-3 rounded-2xl shadow-2xl space-y-1">
                      <div className="px-3 py-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                        <span className="flex items-center gap-1.5 text-white">
                          <Icon className="w-4 h-4 text-emerald-400" />
                          {pillar.title}
                        </span>
                        <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[10px]">
                          {pillar.badge}
                        </span>
                      </div>

                      <div className="max-h-[380px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                        {pillar.subItems.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <Link key={sub.href} href={sub.href} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-all group">
                              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors shrink-0 mt-0.5">
                                <SubIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{sub.title}</h4>
                                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{sub.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* أزرار البحث ولوحة الأدوات وقائمة الهواتف */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs px-3.5 py-2 rounded-xl transition-all"
            title="البحث السريع (Cmd+K)"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Cmd+K للبحث</span>
          </button>

          <Link
            href="/dashboard"
            className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-extrabold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden md:inline">لوحة التشغيل</span>
          </Link>

          {/* زر القائمة للشاشات الصغيرة */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="القائمة الرئيسية"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* drawer الجوال القابل للتوسع */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <Link
            href="/"
            className="block p-2 rounded-lg font-bold text-white hover:text-emerald-400"
          >
            🏠 الشاشة الرئيسية
          </Link>

          {navigationPillars.map((pillar) => {
            const Icon = pillar.icon;
            const isOpen = activeMegaMenu === pillar.id;
            return (
              <div key={pillar.id} className="space-y-2 border-b border-slate-800/80 pb-3">
                <button
                  type="button"
                  onClick={() => setActiveMegaMenu(isOpen ? null : pillar.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-xs font-bold text-emerald-400 px-2"
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {pillar.title}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {pillar.badge}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </span>
                </button>
                {isOpen && (
                  <div className="grid grid-cols-1 gap-1 pr-4">
                    <Link href={pillar.href} className="text-xs font-bold text-slate-200 hover:text-emerald-400 py-1.5 block">
                      • الصفحة الرئيسية للقسم
                    </Link>
                    {pillar.subItems.map((sub) => (
                      <Link key={sub.href} href={sub.href} className="text-xs text-slate-300 hover:text-emerald-400 py-1.5 block">
                        • {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="w-full bg-emerald-400 text-slate-950 font-bold text-xs p-3 rounded-xl text-center flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>لوحة تحكم المستخدم الشخصية</span>
            </Link>
            <Link
              href="/sitemap"
              className="w-full bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs p-2.5 rounded-xl text-center"
            >
              شجرة الهيكل العام الشامل (Sitemap)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};