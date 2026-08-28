import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Cpu,
  Tv,
  Brain,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  FileText,
  ExternalLink,
  LayoutDashboard
} from "lucide-react";
import { FreelancingCalculator } from "@/components/tools/calculators/FreelancingCalculator";
import { HomeSearchButton } from "@/components/search/HomeSearchButton";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: communityPosts } = await supabase
    .from("community_posts")
    .select("id, title, content, created_at")
    .order("created_at", { ascending: false })
    .range(0, 1);
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
      title: "رقميون - أسلوب الحياة",
      description: "إدارة الحياة الرقمية، الصحة النفسية والوقاية من الاحتراق الرقمي.",
      icon: Brain,
      href: "/digital-lifestyle",
      badge: "6 أقسام"
    },
  ];

  const quickMap = [
    { title: "الأدوات الرقمية", description: "ابدأ بحاسبة عملية واختر المجال المناسب لاحتياجك.", href: "/tools", icon: LayoutDashboard },
    { title: "المكتبة المعرفية", description: "اقرأ الأدلة والمقالات العملية حسب المجال.", href: "/posts", icon: FileText },
    { title: "مجتمع مكاسب", description: "شارك تجربتك وناقش الفرص الرقمية مع المجتمع.", href: "/community", icon: MessageSquare },
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
      path: "/articles/finance/freelancing/value-pricing-freelancing"
    },
    {
      title: "الوقاية من الاحتراق الرقمي (Digital Burnout)",
      category: "الصحة الرقمية",
      desc: "خطوات عملية لبناء عادة فصل الشاشات واستعادة التركيز الإبداعي العالي.",
      path: "/articles/tech/ai/practical-ai-tools-2026"
    }
  ];

  return (
    <div className="space-y-16 py-4 dir-rtl">
      
      {/* القسم الرئيسي - Hero Section & Interactive Demo */}
      <section aria-labelledby="home-hero-title" className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/80 p-8 sm:p-12 text-center md:text-right flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
        <div className="max-w-xl space-y-6 z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>المنظومة المعرفية والأدوات التفاعلية الشاملة</span>
          </div>

          <h1 id="home-hero-title" className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            ابدأ بخطوة رقمية أوضح مع <span className="text-emerald-400">أداة عملية</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            أهلاً بك في المنصة الرقمية للتطوير والابتكار. استكشف الأدوات التفاعلية، احسب قيمتك السوقية، وابنِ مستقبلك المهني بحلول ذكية وصناعة محتوى متقدمة.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <Link
              href="/tools"
              className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>استكشف الأدوات</span>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/community"
              className="bg-slate-800/80 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl text-xs sm:text-sm border border-slate-700/80 transition-colors"
            >
              انضم لمجتمع مكاسب
            </Link>
            <HomeSearchButton />
          </div>
        </div>

        {/* إطار معاينة النافذة المجهزة */}
        <FreelancingCalculator />
      </section>

      <section aria-labelledby="site-map-title" className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="site-map-title" className="text-xl font-bold text-white border-r-4 border-emerald-500 pr-3">خريطة الوصول السريع</h2>
            <p className="mt-2 text-xs text-slate-500">كل ما تحتاجه بعد اختيار القسم، مرتب في مسارات قصيرة وواضحة.</p>
          </div>
          <Link href="/tools" className="text-xs font-bold text-emerald-300 hover:text-emerald-200">استكشاف الأدوات <ArrowLeft className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" /></Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickMap.map((item) => {
            const Icon = item.icon;
            return <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-emerald-500/40 hover:bg-slate-900/70"><Icon className="mb-4 h-5 w-5 text-emerald-400" /><h3 className="text-sm font-bold text-white group-hover:text-emerald-300">{item.title}</h3><p className="mt-2 text-xs leading-6 text-slate-400">{item.description}</p></Link>;
          })}
        </div>
      </section>

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

      <section id="pillars" className="space-y-6 scroll-mt-28">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white border-r-4 border-emerald-500 pr-3">أقسام المدونة الرئيسية</h2>
          <Link href="/tools" className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1.5">
            <span>استكشف الأدوات</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Link key={idx} href={sec.href} className="bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/40 p-5 rounded-2xl transition-all duration-300 group flex flex-col justify-between items-center text-center space-y-4 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors shrink-0"><Icon className="w-5 h-5" /></div>
                <div className="space-y-2"><h3 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{sec.title}</h3><p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">{sec.description}</p></div>
                <span className="text-[9px] bg-slate-950/80 text-slate-500 px-2 py-0.5 rounded border border-slate-800">{sec.badge}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-lg font-bold text-white border-r-4 border-emerald-500 pr-3">الأدوات الأكثر استخداماً (Trending Tools)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingTools.map((tool, idx) => (
            <Link key={idx} href={tool.path} className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all flex flex-col justify-between space-y-2">
              <div className="space-y-1"><span className="text-[10px] text-emerald-400 font-semibold">{tool.sector}</span><h4 className="text-xs font-bold text-white">{tool.title}</h4><p className="text-[11px] text-slate-400 leading-relaxed">{tool.desc}</p></div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1 pt-1.5 border-t border-slate-800"><span>احسب الآن</span><ArrowLeft className="w-3 h-3 text-slate-500" /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-lg font-bold text-white border-r-4 border-emerald-500 pr-3">مجتمع مكاسب (Highlights)</h2>
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {communityPosts?.length ? communityPosts.map((post) => (
              <article key={post.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[10px]"><span className="text-emerald-400 font-semibold">منشور من المجتمع</span><time className="text-slate-500" dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString("ar-EG")}</time></div>
                <h3 className="text-[11px] font-bold text-white">{post.title}</h3>
                <p className="text-[10px] text-slate-400 line-clamp-2">{post.content}</p>
              </article>
            )) : <p className="col-span-full rounded-xl border border-dashed border-slate-800 p-5 text-center text-xs text-slate-500">ستظهر هنا أحدث تجارب المجتمع بعد نشرها.</p>}
          </div>
          <Link href="/community" className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs py-2.5 rounded-xl block text-center transition-colors">انتقل لساحة الاستشارات والمجتمع</Link>
        </div>
      </section>

    </div>
  );
}