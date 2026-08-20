import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Cpu,
  Tv,
  Brain,
  Users,
  ArrowLeft,
  Sparkles,
  Search,
  MessageSquare,
  FileText,
  Calculator,
  ShieldCheck,
  TrendingDown,
  ExternalLink
} from "lucide-react";

export default function HomePage() {
  const sectors = [
    {
      title: "المال والأعمال",
      description: "حاسبات التسعير، التجارة الإلكترونية، والتسويق الرقمي وعائد الإعلانات.",
      icon: TrendingUp,
      href: "/finance",
      badge: "7 أقسام"
    },
    {
      title: "التكنولوجيا والابتكار",
      description: "أدوات فحص كلمات المرور وتكاليف الـ API والـ Tokens وسير السحابة.",
      icon: Cpu,
      href: "/tech",
      badge: "5 أقسام"
    },
    {
      title: "الإعلام الجديد",
      description: "صناعة المحتوى، البودكاست المرئي، ومنصات البث الحي والتفاعل.",
      icon: Tv,
      href: "/media",
      badge: "5 أقسام"
    },
    {
      title: "رقميون (أسلوب الحياة)",
      description: "إدارة الحياة الرقمية، الصحة النفسية والوقاية من الاحتراق الرقمي.",
      icon: Brain,
      href: "/digital-lifestyle",
      badge: "6 أقسام"
    },
    {
      title: "مجتمع مكاسب",
      description: "مشاركة نتائج الأدوات والاستشارات المباشرة مع المطورين والأقران.",
      icon: Users,
      href: "/community",
      badge: "تفاعلي"
    },
  ];

  const trendingTools = [
    {
      title: "حاسبة تسعير الخدمات ومعدل الساعة",
      sector: "المال والأعمال",
      path: "/finance/freelancing",
      desc: "تحديد السعر العادل لساعتك بناءً على المصاريف وهوامش الربح."
    },
    {
      title: "حاسبة عائد الإعلانات (ROAS & CAC)",
      sector: "المال والأعمال",
      path: "/finance/marketing",
      desc: "قياس جدوى ونقطة تعادل حملاتك الإعلانية على مختلف المنصات."
    },
    {
      title: "فاحص قوة وأمان كلمات المرور",
      sector: "التكنولوجيا والابتكار",
      path: "/tech/cybersecurity",
      desc: "حساب درجة الإنتروبي محلياً وزمن الكسر المتوقع بالتخمين."
    }
  ];

  const latestArticles = [
    {
      title: "من نظام الساعة إلى نظام القيمة: المعادلة الذهبية",
      category: "الأعمال الحرة",
      desc: "كيف ترفع أرباحك بتقديم تسعير مبني على العوائد بدلاً من حساب الساعات.",
      path: "/finance/freelancing"
    },
    {
      title: "الوقاية من الاحتراق الرقمي (Digital Burnout)",
      category: "الصحة الرقمية",
      desc: "خطوات عملية لبناء عادة فصل الشاشات واستعادة التركيز الإبداعي العالي.",
      path: "/digital-lifestyle/health"
    }
  ];

  return (
    <div className="space-y-16 py-4 dir-rtl">
      
      {/* القسم الرئيسي - Hero Section & Interactive Demo */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/80 p-8 sm:p-12 text-center md:text-right flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
        <div className="max-w-xl space-y-6 z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>المنظومة المعرفية والأدوات التفاعلية الشاملة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            أدوات تفاعلية حية بدلاً من <span className="text-emerald-400">النصوص الجامدة</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            نفّذ واحسب نفقاتك، أمانك، وتفاعلاتك فوراً داخل الصفحة مع دلائل إجرائية تطبيقية صُممت للبيئة الرقمية. اضغط <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-mono text-[10px] text-white">Cmd+K</kbd> أو <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-mono text-[10px] text-white">Ctrl+K</kbd> لتجربة الملاحة والبحث الفوري.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <Link
              href="/sitemap"
              className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>خريطة المنصة التفاعلية</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/community"
              className="bg-slate-800/80 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl text-xs sm:text-sm border border-slate-700/80 transition-colors"
            >
              انضم لمجتمع مكاسب
            </Link>
          </div>
        </div>

        {/* إطار معاينة النافذة المجهزة */}
        <div className="w-full md:w-96 bg-slate-950/95 border border-slate-800 rounded-2xl p-5 shadow-2xl relative backdrop-blur-md">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">freelancing_calc.exe</span>
          </div>

          <div className="space-y-3 font-mono">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
              <span className="text-slate-400 text-[11px]">دخلُك الشهري المستهدف؟</span>
              <span className="text-emerald-400 font-bold">3,500 $</span>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
              <span className="text-slate-400 text-[11px]">مصاريفك التشغيلية؟</span>
              <span className="text-white font-bold">250 $</span>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-sans block">
                معدل الساعة المستهدف المقترح:
              </span>
              <span className="text-xl font-black text-emerald-400">
                58.30 $ / ساعة
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* قطاعات المنظومة الخمسة */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white border-r-4 border-emerald-500 pr-3">
            المنظومة المعرفية (The 5 Core Pillars)
          </h2>
          <Link href="/sitemap" className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1.5">
            <span>استعراض شجرة الملاحة كاملة</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Link
                key={idx}
                href={sec.href}
                className="bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/40 p-5 rounded-2xl transition-all duration-300 group flex flex-col justify-between items-center text-center space-y-4 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {sec.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                    {sec.description}
                  </p>
                </div>
                <span className="text-[9px] bg-slate-950/80 text-slate-500 px-2 py-0.5 rounded border border-slate-800">
                  {sec.badge}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* الأدوات الأكثر استخداماً والمقالات التكتيكية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* العمود 1 و 2: الأدوات الأكثر استخداماً + المقالات */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* الأدوات الرائجة */}
          <section className="space-y-5">
            <h2 className="text-lg font-bold text-white border-r-4 border-emerald-500 pr-3">
              الأدوات الأكثر استخداماً (Trending Tools)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trendingTools.map((tool, idx) => (
                <Link
                  key={idx}
                  href={tool.path}
                  className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all flex flex-col justify-between space-y-2"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] text-emerald-400 font-semibold">{tool.sector}</span>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-400">{tool.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{tool.desc}</p>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 pt-1.5 border-t border-slate-800">
                    <span>احسب الآن</span>
                    <ArrowLeft className="w-3 h-3 text-slate-500" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* المقالات التكتيكية */}
          <section className="space-y-5">
            <h2 className="text-lg font-bold text-white border-r-4 border-emerald-500 pr-3">
              أحدث المقالات والدلائل (Latest Articles)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {latestArticles.map((art, idx) => (
                <Link
                  key={idx}
                  href={art.path}
                  className="bg-slate-900/30 border border-slate-800 p-5 rounded-xl hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all space-y-2"
                >
                  <span className="text-[10px] bg-slate-950 text-emerald-400 px-2 py-0.5 rounded border border-slate-800">{art.category}</span>
                  <h4 className="text-xs font-bold text-white">{art.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{art.desc}</p>
                </Link>
              ))}
            </div>
          </section>

        </div>

        {/* العمود 3: ملخص نقاشات مجتمع مكاسب */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white border-r-4 border-emerald-500 pr-3">
            مجتمع مكاسب (Highlights)
          </h2>
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 space-y-4">
            
            <div className="space-y-3">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-emerald-400 font-semibold">أحمد التميمي</span>
                  <span className="text-slate-500">قبل 3 ساعات</span>
                </div>
                <h4 className="text-[11px] font-bold text-white line-clamp-1">كيف أصيغ ردًا احترافيًا لرفض ميزانية متدنية؟</h4>
                <p className="text-[10px] text-slate-400 line-clamp-2">شاركت صيغة ردي المبني على العقد المستخرج من المنصة، وقد تم قبول اعتذاري برقي.</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-emerald-400 font-semibold">خالد الرويلي</span>
                  <span className="text-slate-500">أمس</span>
                </div>
                <h4 className="text-[11px] font-bold text-white line-clamp-1">حساب تكلفة 100 مليون توكين لـ DeepSeek V3</h4>
                <p className="text-[10px] text-slate-400 line-clamp-2">قمت بمقارنة دقيقة مع GPT-4o والوفورات مذهلة وتصل لـ 80% في ميزانية التشغيل.</p>
              </div>
            </div>

            <Link
              href="/community"
              className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs py-2.5 rounded-xl block text-center transition-colors"
            >
              انتقل لساحة الاستشارات والمجتمع
            </Link>

          </div>
        </div>

      </div>

    </div>
  );
}