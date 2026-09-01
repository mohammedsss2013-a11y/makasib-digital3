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
      badge: "6 أقسام"
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
      badge: "5 أقسام"
    },
  ];

  const quickMap = [
    { title: "الأدوات الرقمية", description: "ابدأ بأداة عملية مناسبة لاحتياجك الحالي.", href: "/tools", icon: LayoutDashboard },
    { title: "مجتمع مكاسب", description: "شارك خبراتك وتعلم من مجتمع المهنيين الرقميين.", href: "/community", icon: MessageSquare },
    { title: "من نحن", description: "تعرف على رؤية المنصة وأهدافها العملية.", href: "/about", icon: Sparkles },
    { title: "دليل المنصة العام", description: "تصفح جميع الأقسام والصفحات الرئيسية.", href: "/sitemap", icon: ExternalLink },
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
      path: "/articles/finance/freelancing/value-pricing-freelancing",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "الوقاية من الاحتراق الرقمي (Digital Burnout)",
      category: "الصحة الرقمية",
      desc: "خطوات عملية لبناء عادة فصل الشاشات واستعادة التركيز الإبداعي العالي.",
      path: "/articles/tech/ai/practical-ai-tools-2026",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <div className="space-y-16 py-4 dir-rtl">
      <section aria-labelledby="home-hero-title" className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-8 shadow-2xl sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="z-10 max-w-2xl space-y-6 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>منصة تمكين رقمي وتوجيه عملي</span>
            </div>

            <h1 id="home-hero-title" className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              طريقك المباشر لتحويل <span className="text-emerald-400">المهارات الرقمية</span> إلى مكاسب حقيقية
            </h1>

            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              مقالات تطبيقية، أدوات مجانية، ومجتمع يربط بين التعلم والتنفيذ والفرص الرقمية لتساعدك على بناء دخل محترف واستقرار مهني.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
              <Link
                href="/tools"
                className="flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-300 sm:text-sm"
              >
                <span>استكشف الأدوات</span>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/community"
                className="rounded-xl border border-slate-700/80 bg-slate-800/80 px-6 py-3.5 text-xs font-semibold text-white transition-colors hover:bg-slate-700 sm:text-sm"
              >
                انضم لمجتمع مكاسب
              </Link>
              <HomeSearchButton />
            </div>
          </div>

          <div className="relative z-10">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5 shadow-2xl shadow-emerald-500/5">
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                  أدوات مختارة
                </span>
                <span className="text-[10px] text-slate-400">عرض سريع</span>
              </div>

              <div className="space-y-3">
                {[
                  { title: "حاسبة تسعير الخدمات", detail: "المال والأعمال", href: "/finance/freelancing" },
                  { title: "فاحص كلمات المرور", detail: "التكنولوجيا", href: "/tech/cybersecurity" },
                  { title: "قائمة أدوات المنصة", detail: "كل الأدوات", href: "/tools" }
                ].map((tool) => (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 transition-colors hover:border-emerald-500/30 hover:bg-slate-900"
                  >
                    <div>
                      <p className="text-sm font-bold text-white">{tool.title}</p>
                      <p className="text-[10px] text-slate-400">{tool.detail}</p>
                    </div>
                    <ArrowLeft className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  </Link>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-emerald-300">بوابة الأدوات</p>
                    <p className="mt-1 text-sm font-black text-white">تصفح كل الأدوات الرقمية</p>
                  </div>
                  <Link
                    href="/tools"
                    className="rounded-lg bg-emerald-400 px-3 py-2 text-[11px] font-bold text-slate-950 transition-colors hover:bg-emerald-300"
                  >
                    افتح الآن
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="border-r-4 border-emerald-500 pr-3 text-xl font-bold text-white">محاور المنصة وأدوارها</h2>
          <span className="text-[11px] text-slate-400">كل محور يخدم هدفاً مختلفاً</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "الأدوات",
              description: "أدوات تنفيذ عملية تساعدك على حساب الخيارات، إعداد العروض، وتحويل الفكرة إلى خطة قابلة للتنفيذ.",
              detail: "تنفيذ ومحاسبة",
              icon: LayoutDashboard,
            },
            {
              title: "المحتوى",
              description: "مقالات وتوجيهات عملية تشرح الفكرة، تفتح الطريق، وتساعدك على اتخاذ القرار الصحيح.",
              detail: "معرفة وتوجيه",
              icon: FileText,
            },
            {
              title: "المجتمع",
              description: "مساحة تواصل ومناقشة تُغذي الخبرات وتجعل التعلم أكثر فاعلية من خلال التفاعل الحقيقي.",
              detail: "تفاعل ومناقشة",
              icon: MessageSquare,
            },
            {
              title: "المنصة",
              description: "البنية والهوية والمرجعية التي تجمع كل هذه العناصر في تجربة موحدة ومتماسكة.",
              detail: "هوية وبنية",
              icon: Sparkles,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-emerald-500/40 hover:bg-slate-900/70">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-[9px] text-slate-400">{item.detail}</span>
                </div>
                <h3 className="mt-4 text-sm font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-[11px] leading-6 text-slate-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="site-map-title" className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="site-map-title" className="border-r-4 border-emerald-500 pr-3 text-xl font-bold text-white">خريطة الوصول السريع</h2>
            <p className="mt-2 text-xs text-slate-500">كل ما تحتاجه بعد اختيار القسم، مرتب في مسارات قصيرة وواضحة.</p>
          </div>
          <Link href="/tools" className="text-xs font-bold text-emerald-300 hover:text-emerald-200">
            استكشاف الأدوات <ArrowLeft className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickMap.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-emerald-500/40 hover:bg-slate-900/70">
                <Icon className="mb-4 h-5 w-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-400">{item.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="pillars" className="space-y-6 scroll-mt-28">
        <div className="flex items-center justify-between">
          <h2 className="border-r-4 border-emerald-500 pr-3 text-xl font-bold text-white">أقسام المقالات الرئيسية</h2>
          <Link href="/tools" className="flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-emerald-400">
            <span>استكشف الأدوات</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Link
                key={idx}
                href={sec.href}
                className="group flex flex-col items-center justify-between space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-400 group-hover:text-slate-950">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-white transition-colors group-hover:text-emerald-400">{sec.title}</h3>
                  <p className="line-clamp-3 text-[11px] leading-relaxed text-slate-400">{sec.description}</p>
                </div>
                <span className="rounded border border-slate-800 bg-slate-950/80 px-2 py-0.5 text-[9px] text-slate-500">{sec.badge}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="border-r-4 border-emerald-500 pr-3 text-lg font-bold text-white">ماذا يضيف المجتمع؟</h2>
          <Link href="/community" className="text-[11px] text-slate-400 transition-colors hover:text-emerald-300">انضم الآن</Link>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          {communityPosts?.length ? (
            <article className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-emerald-400">منشور من المجتمع</span>
                <time className="text-slate-500" dateTime={communityPosts[0].created_at}>{new Date(communityPosts[0].created_at).toLocaleDateString("ar-EG")}</time>
              </div>
              <h3 className="text-sm font-bold text-white">{communityPosts[0].title}</h3>
              <p className="line-clamp-3 text-[11px] leading-6 text-slate-400">{communityPosts[0].content}</p>
            </article>
          ) : (
            <p className="rounded-xl border border-dashed border-slate-800 p-5 text-center text-xs text-slate-500">ستظهر هنا أحدث تجارب المجتمع بعد نشرها.</p>
          )}
        </div>
      </section>
    </div>
  );
}