import React from "react";
import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  Cpu,
  Tv,
  Brain,
  Users,
  LayoutDashboard,
  ArrowLeft,
  Sparkles
} from "lucide-react";

export default function SitemapPage() {
  const fullSitemap = [
    {
      sectionNumber: "1",
      sectionTitle: "الشاشة الرئيسية والواجهة التفاعلية (Home Dashboard)",
      icon: MapPin,
      badge: "المركز الرئيسي",
      items: [
        { title: "البانر الرئيسي المحفز (Hero Section & Interactive Demo)", href: "/", desc: "عرض الرؤية والأدوات الحية للزوار" },
        { title: "شريط البحث الذكي السريع (Instant Search Overlay - Cmd+K)", href: "/#search", desc: "محرك البحث السريع عبر الاختصارات" },
        { title: "وصول سريع للأدوات الأكثر استخداماً (Trending Tools)", href: "/", desc: "حاسبات التسعير والتفاعل والأمان" },
        { title: "أحدث المقالات التكتيكية والدراسات (Latest Articles)", href: "/", desc: "دراسات إجرائية تطبيقية للمهنيين" },
        { title: "ملخص مناقشات مجتمع مكاسب (Community Highlights)", href: "/community", desc: "أبرز استشارات ومساهمات الأعضاء" },
      ]
    },
    {
      sectionNumber: "2.1",
      sectionTitle: "قطاع المال والأعمال (Finance & Business)",
      icon: TrendingUp,
      badge: "6 أقسام فرعية",
      items: [
        { title: "العمل الحر وإدارة المشاريع المصغرة (Freelancing)", href: "/finance/freelancing", desc: "حاسبة تسعير الخدمات ومولد العقود المباشرة" },
        { title: "التجارة الإلكترونية والبيع الرقمي (E-Commerce)", href: "/finance/ecommerce", desc: "حاسبة صافي هامش الربح ومقارن العمولات" },
        { title: "التسويق الرقمي وعائد الإعلانات (Digital Marketing)", href: "/finance/marketing", desc: "قياس الـ ROAS والـ CAC ونقطة التعادل" },
        { title: "اقتصاد صناعة المحتوى (Content Economy)", href: "/finance/content-economy", desc: "تسعير الرعايات والعضويات الرقمية" },
        { title: "العملات الرقمية والبلوكشين (Crypto & Web3)", href: "/finance/crypto", desc: "حماية المحافظ والـ Stablecoins" },
        { title: "العتاد والإنتاجية المالية (Hardware & Productivity)", href: "/finance/hardware", desc: "حاسبة إهلاك العتاد وتجهيز بيئة العمل" },
      ]
    },
    {
      sectionNumber: "2.2",
      sectionTitle: "قطاع التكنولوجيا والابتكار (Tech & Infrastructure)",
      icon: Cpu,
      badge: "5 أقسام فرعية",
      items: [
        { title: "تطبيقات وأنظمة الذكاء الاصطناعي (AI Applications)", href: "/tech/ai-apps", desc: "حاسبة الـ API والـ Tokens ومقارن النماذج" },
        { title: "الأمن السيبراني والخصوصية الرقمية (Cybersecurity)", href: "/tech/cybersecurity", desc: "فحص قوة كلمات المرور والتشفير" },
        { title: "الحوسبة السحابية وأدوات العمل عن بُعد (Cloud & Remote)", href: "/tech/cloud-remote", desc: "مقارن VPS vs Serverless والعمل الموزع" },
        { title: "تطوير البنية الرقمية وتقنيات المستقبل (Next-Gen Infra)", href: "/tech/infra", desc: "معايير Core Web Vitals والـ Edge" },
        { title: "إنترنت الأشياء والتقنيات الناشئة (IoT & Emerging)", href: "/tech/iot-emerging", desc: "بروتوكولات الـ IoT والـ TinyML" },
      ]
    },
    {
      sectionNumber: "2.3",
      sectionTitle: "قطاع الإعلام الجديد (New Media)",
      icon: Tv,
      badge: "5 أقسام فرعية",
      items: [
        { title: "صناعة المحتوى المرئي والمكتوب (Content Creation)", href: "/media/creation", desc: "هيكلية الفيديو القصير والعناوين الجاذبة" },
        { title: "أخبار وتحليلات الصناعة الرقمية (Industry News)", href: "/media/news", desc: "رادار الخوارزميات والتقارير التحليلية" },
        { title: "البودكاست والبودكاست المرئي (Podcasting)", href: "/media/podcasting", desc: "التجهيزات الصوتية واستراتيجيات التوزيع" },
        { title: "منصات البث الحي والتفاعل (Live Streaming)", href: "/media/streaming", desc: "حاسبة الدعم وإعدادات الـ Bitrate" },
        { title: "الترفيه الرقمي والألعاب (Digital Entertainment)", href: "/media/gaming", desc: "بطولات Esports وتطوير الألعاب المستقلة" },
      ]
    },
    {
      sectionNumber: "2.4",
      sectionTitle: "قطاع رقميون - أسلوب الحياة والتفكير (Digital Lifestyle)",
      icon: Brain,
      badge: "5 أقسام فرعية",
      items: [
        { title: "إدارة الحياة الرقمية والتنظيم (Life Management)", href: "/digital-lifestyle/life-management", desc: "بناء الدماغ الثاني وتنظيم المهام" },
        { title: "الصحة الرقمية والوقاية من الاحتراق (Digital Health)", href: "/digital-lifestyle/health", desc: "اختبار قياس Burnout والتعافي" },
        { title: "التعليم والتعلم الرقمي المستمر (Continuous Learning)", href: "/digital-lifestyle/learning", desc: "دليل التعلم السريع وخرائط المهارات" },
        { title: "الثقافة الرقمية العابرة للمستقبل (Future Culture)", href: "/digital-lifestyle/culture", desc: "دليل الرحالة الرقمي والبرمجيات المفتوحة" },
      ]
    },
    {
      sectionNumber: "2.5",
      sectionTitle: "مجتمع مكاسب الرقمي (Community Hub)",
      icon: Users,
      badge: "4 أقسام فرعية",
      items: [
        { title: "مساحة الاستشارات والتجريب (Consultations Feed)", href: "/community/consultations", desc: "حوارات حية واستشارات فورية" },
        { title: "مراجعات النتائج المرفقة من الأدوات (Tool Results Review)", href: "/community/tool-results", desc: "مشاركة وتحليل نتائج الحاسبات" },
        { title: "النقاشات الساخنة والأفكار المبتكرة (Discussion Topics)", href: "/community/topics", desc: "حوارات الاتجاهات والفرص المستقبلية" },
        { title: "دليل الأعضاء والموثوقية (Member Directory & Badges)", href: "/community/directory", desc: "دليل الأعضاء والخبراء والموثوقية" },
      ]
    },
    {
      sectionNumber: "2.6",
      sectionTitle: "أدوات رقمية ومنصة المعالجة التفاعلية (Digital Tools Platform)",
      icon: LayoutDashboard,
      badge: "منصة الأدوات الأساسية",
      items: [
        { title: "صفحة الأدوات الرقمية الرئيسية", href: "/tools", desc: "قائمة شاملة للأدوات المصنفة حسب المجال" },
        { title: "لوحة أدواتي", href: "/dashboard/tools", desc: "الحاسبات المفضلة والملفات المخزنة" },
        { title: "أدوات المال والأعمال", href: "/tools?category=finance", desc: "الأدوات المختصة بالتسعير والتسويق والعمليات" },
        { title: "أدوات التكنولوجيا", href: "/tools?category=tech", desc: "أمان، سحابة، وذكاء اصطناعي" },
        { title: "أدوات الإعلام", href: "/tools?category=media", desc: "محتوى، بث، وإنتاج رقمية" },
        { title: "أدوات أسلوب الحياة الرقمي", href: "/tools?category=digital-lifestyle", desc: "إدارة الوقت والمهارات والرفاهية" },
      ]
    },
    {
      sectionNumber: "3",
      sectionTitle: "نظام لوحة تحكم المستخدم (User Personal Operating System)",
      icon: LayoutDashboard,
      badge: "6 أقسام تشغيلية",
      items: [
        { title: "ملخص الأنشطة والإحصائيات الشخصية (Personal Analytics)", href: "/dashboard/analytics", desc: "تتبع الأداء والأنشطة المحسوبة" },
        { title: "لوحة أدواتي", href: "/dashboard/tools", desc: "المدخلات والمخرجات المخزنة" },
        { title: "قائمة المفضلة السريعة (Pinned Bookmarks)", href: "/dashboard/bookmarks", desc: "الأدوات والروابط المفضلة لديك" },
        { title: "إدارة العقود والتقارير المطبوعة (Export Center - PDF/Excel)", href: "/dashboard/export", desc: "تحليل وتصدير المستندات والعقود" },
        { title: "مشاركاتي في مجتمع مكاسب (My Posts & Responses)", href: "/dashboard/posts", desc: "سجل التفاعلات والردود الاستشارية" },
        { title: "إعدادات الحساب والأمان والربط (Settings & Integrations)", href: "/dashboard/settings", desc: "الملف الشخصي، الأمان والربط الخارجي" },
      ]
    },
    {
      sectionNumber: "4",
      sectionTitle: "الدعم والصفحات القانونية (Support & Legal Pages)",
      icon: Sparkles,
      badge: "معلومات شاملة",
      items: [
        { title: "من نحن", href: "/about", desc: "مقدمة ورؤية ومنهجية المنصة" },
        { title: "الأسئلة الشائعة", href: "/faq", desc: "إجابات سريعة عن التسجيل والاستخدام والدعم" },
        { title: "سياسة الخصوصية", href: "/privacy", desc: "حماية البيانات والالتزام بمعايير الخصوصية" },
        { title: "الشروط والأحكام", href: "/terms", desc: "قواعد الاستخدام وحقوق المنصة والمستخدم" },
        { title: "إخلاء المسؤولية", href: "/disclaimer", desc: "تنبيه عام بشأن المعلومات والاستشارات" },
        { title: "تواصل معنا", href: "/contact", desc: "للاستفسارات والمقترحات والدعم الفني" },
        { title: "دليل المنصة العام", href: "/sitemap", desc: "دليل كامل لأقسام المنصة وعلاقاتها" },
      ]
    },
  ];

  return (
    <div className="space-y-12 py-8 dir-rtl">
      {/* البانر الرئيسي */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>دليل المنصة العام</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          دليل المنصة <span className="text-emerald-400">العام</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          نظرة مختصرة على جميع أقسام المنصة، من الأدوات والخدمات إلى الصفحات القانونية والدعم، لتجد كل ما تحتاجه في مكان واحد.
        </p>
      </div>

      {/* استعراض الأقسام الهيكلية */}
      <div className="space-y-10">
        {fullSitemap.map((sec, idx) => {
          const SecIcon = sec.icon;
          return (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-extrabold text-sm">
                    {sec.sectionNumber}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <SecIcon className="w-5 h-5 text-emerald-400" />
                    <span>{sec.sectionTitle}</span>
                  </h2>
                </div>
                <span className="bg-slate-950 text-emerald-400 text-xs font-mono px-3 py-1 rounded-full border border-slate-800">
                  {sec.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sec.items.map((item, subIdx) => (
                  <Link
                    key={subIdx}
                    href={item.href}
                    className="bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/50 p-4 rounded-2xl transition-all group space-y-2 hover:shadow-lg hover:shadow-emerald-500/5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </span>
                      <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                    <div className="text-[10px] text-slate-600 font-mono pt-1">
                      {item.href}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
