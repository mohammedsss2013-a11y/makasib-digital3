"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BadgePercent,
  Bitcoin,
  BriefcaseBusiness,
  Building2,
  Megaphone,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type FinancePost = {
  id: string | number;
  title: string;
  content: string;
  subcategory: string | null;
  image_url?: string | null;
  slug?: string | null;
  created_at?: string;
};

const subcategoryCards: Array<{
  key: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    key: "العمل الحر والخدمات",
    title: "العمل الحر",
    description: "تسعير الخدمات، العروض، والعقود المباشرة.",
    href: "/finance/freelancing",
    icon: BriefcaseBusiness,
  },
  {
    key: "التجارة الإلكترونية",
    title: "التجارة الإلكترونية",
    description: "هوامش الربح، الطلب، وتخطيط الإيرادات.",
    href: "/finance/ecommerce",
    icon: ShoppingCart,
  },
  {
    key: "التسويق الرقمي",
    title: "التسويق الرقمي",
    description: "CAC، ROAS، الحملات، والتحول الرقمي.",
    href: "/finance/marketing",
    icon: Megaphone,
  },
  {
    key: "اقتصاد صناعة المحتوى",
    title: "صناعة المحتوى",
    description: "الاستثمارات، الرعاية، والعضويات الرقمية.",
    href: "/finance/content-economy",
    icon: BadgePercent,
  },
  {
    key: "العملات الرقمية والبلوكشين",
    title: "العملات الرقمية",
    description: "المحافظ، الأمان، والتقلبات المجدية.",
    href: "/finance/crypto",
    icon: Bitcoin,
  },
  {
    key: "العتاد والإنتاجية المالية",
    title: "العتاد والإنتاجية",
    description: "الإنفاق، الاستحواذ، وتجهيز بيئة العمل.",
    href: "/finance/hardware",
    icon: Building2,
  },
];

type HeroContent = {
  title: string;
  description: string;
  badgeText: string;
  metadataText: string;
};

type InstantReport = {
  title: string;
  badge: string;
  description: string;
};

const instantReportsBySub: Record<string, InstantReport> = {
  all: {
    badge: "قطاع صاعد",
    title: "تسعير الخدمات والعمل الحر",
    description: "المقالات المميزة والمجالات ذات الصلة تُظهر أفضل مسار للزوار في هذا القطاع.",
  },
  freelancing: {
    badge: "الأكثر طلباً",
    title: "نماذج العقود واستراتيجيات التسعير",
    description: "التقرير الفوري الخاص بمسار العمل الحر والخدمات.",
  },
  ecommerce: {
    badge: "نمو متسارع",
    title: "معدلات التحويل ومتاجر التجزئة",
    description: "التقرير الفوري الخاص بالتجارة الإلكترونية.",
  },
  marketing: {
    badge: "عائد مرتفع",
    title: "تكلفة الاستحواذ وحملات النمو",
    description: "التقرير الفوري الخاص بالتسويق الرقمي.",
  },
  "content-economy": {
    badge: "فرصة متنامية",
    title: "الرعاية والعضويات واقتصاد المحتوى",
    description: "التقرير الفوري الخاص بصناعة المحتوى والفرص التجارية المرتبطة بها.",
  },
  crypto: {
    badge: "سوق متقلب",
    title: "الأمان وإدارة مخاطر الأصول الرقمية",
    description: "التقرير الفوري الخاص بالعملات الرقمية والبلوكشين.",
  },
  hardware: {
    badge: "إنفاق محسوب",
    title: "العتاد والإنتاجية المالية",
    description: "التقرير الفوري الخاص بتجهيز بيئة العمل وتحسين الإنتاجية.",
  },
};

const heroContentBySub: Record<string, HeroContent> = {
  all: {
    title: "المال والأعمال",
    description: "أنماط حقيقية للربح، التسعير، التوسع، والتحول الرقمي — من خلال المقالات العملية والخرائط المعرفية التي تساعدك على اتخاذ قرارات أكثر ذكاءً.",
    badgeText: "مقالات مكاسب رقمية",
    metadataText: "أداة + مقال + توجيه عملي",
  },
  freelancing: {
    title: "العمل الحر والخدمات",
    description: "ابنِ عرضك، سعّر خبرتك، وحوّل العمل الحر إلى خدمة قابلة للنمو بعقود وقرارات أوضح.",
    badgeText: "مسار العمل الحر",
    metadataText: "تسعير + عروض + عقود",
  },
  ecommerce: {
    title: "التجارة الإلكترونية",
    description: "افهم هوامش الربح والطلب وتجربة الشراء لبناء متجر إلكتروني أكثر استدامة.",
    badgeText: "مسار التجارة الإلكترونية",
    metadataText: "طلب + ربحية + نمو",
  },
  marketing: {
    title: "التسويق الرقمي",
    description: "حوّل الحملات والبيانات إلى قرارات تسويقية تقيس الأثر وتدعم النمو الحقيقي.",
    badgeText: "مسار التسويق الرقمي",
    metadataText: "CAC + ROAS + تحويل",
  },
  "content-economy": {
    title: "اقتصاد صناعة المحتوى",
    description: "اكتشف نماذج الرعاية والعضويات والاستثمار التي تجعل صناعة المحتوى نشاطًا مستدامًا.",
    badgeText: "مسار اقتصاد المحتوى",
    metadataText: "رعاية + عضويات + استثمار",
  },
  crypto: {
    title: "العملات الرقمية والبلوكشين",
    description: "تعرّف على المحافظ والأمان والتقلبات من زاوية عملية تساعدك على اتخاذ قرارات واعية.",
    badgeText: "مسار العملات الرقمية",
    metadataText: "محافظ + أمان + وعي",
  },
  hardware: {
    title: "العتاد والإنتاجية المالية",
    description: "وازن بين الإنفاق وتجهيز بيئة العمل والأدوات التي ترفع إنتاجيتك دون تكلفة زائدة.",
    badgeText: "مسار الإنتاجية المالية",
    metadataText: "إنفاق + تجهيز + إنتاجية",
  },
};

function getArticlePath(post: FinancePost) {
  const slug = post.slug || `post-${post.id}`;
  const subcategorySlug =
    post.subcategory === "العمل الحر والخدمات" || post.subcategory === "العمل الحر والمشاريع المصغرة"
      ? "freelancing"
      : post.subcategory === "التجارة الإلكترونية"
        ? "ecommerce"
        : post.subcategory === "التسويق الرقمي"
          ? "marketing"
          : post.subcategory === "اقتصاد صناعة المحتوى"
            ? "content-economy"
            : post.subcategory === "العملات الرقمية والبلوكشين"
              ? "crypto"
              : post.subcategory === "العتاد والإنتاجية المالية"
                ? "hardware"
                : "general";

  return `/articles/finance/${subcategorySlug}/${slug}`;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function FinanceSectorPageContent({ posts }: { posts: FinancePost[] }) {
  const searchParams = useSearchParams();
  const activeSub = searchParams.get("sub") ?? "all";
  const activeKey = {
    freelancing: "العمل الحر والخدمات",
    ecommerce: "التجارة الإلكترونية",
    marketing: "التسويق الرقمي",
    "content-economy": "اقتصاد صناعة المحتوى",
    crypto: "العملات الرقمية والبلوكشين",
    hardware: "العتاد والإنتاجية المالية",
  }[searchParams.get("sub") ?? ""] ?? "الكل";
  const heroContent = heroContentBySub[activeSub] ?? heroContentBySub.all;
  const currentReport = instantReportsBySub[activeSub] ?? instantReportsBySub.all;

  const articleCounts = useMemo(() => {
    const counts: Record<string, number> = { "الكل": posts.length };

    subcategoryCards.forEach((item) => {
      counts[item.key] = posts.filter((post) => post.subcategory === item.key).length;
    });

    return counts;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeKey === "الكل") return posts;
    return posts.filter((post) => post.subcategory === activeKey);
  }, [activeKey, posts]);

  return (
    <div className="space-y-8 py-2 dir-rtl" dir="rtl">
      <section className="overflow-hidden rounded-[28px] border border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
        <div key={heroContent.title} className="min-h-[220px] space-y-5 animate-[sectorHeroFadeIn_300ms_ease-out] sm:min-h-[208px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {heroContent.badgeText}
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-white sm:text-4xl">{heroContent.title}</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              {heroContent.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-[11px] text-slate-300">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              {articleCounts[activeKey] ?? posts.length} مقال منشور
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-[11px] text-slate-300">
              <ArrowLeft className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              {heroContent.metadataText}
            </span>
          </div>
        </div>

      </section>

      <div className="mt-2 rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
            تقرير فوري
          </span>
          <span className="text-[10px] text-slate-400">{currentReport.badge}</span>
        </div>

        <div className="mt-4 text-sm leading-7 text-slate-300">
          <p className="text-[10px] text-slate-400">أكثر مسار يطلبه الزوار</p>
          <p className="mt-2 text-lg font-black text-white">{currentReport.title}</p>
          <p className="mt-2 text-sm text-slate-300">{currentReport.description}</p>
        </div>
      </div>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="border-r-4 border-emerald-500 pr-3 text-xl font-bold text-white">
            {activeKey === "الكل" ? "مقالات المال والأعمال" : `مقالات ${activeKey}`}
          </h2>
          <Link href="/tools" className="text-[11px] text-slate-400 transition-colors hover:text-emerald-300">
            انتقال إلى أدوات رقمية
          </Link>
        </div>

        {filteredPosts.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-all hover:-translate-y-1 hover:border-emerald-500/40">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-800 bg-slate-950">
                  <Image
                    src={post.image_url || "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.subcategory && (
                        <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[10px] text-slate-300">
                          {post.subcategory}
                        </span>
                      )}
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                        مقال معرفي
                      </span>
                    </div>

                    <h3 className="text-lg font-black leading-8 text-white transition-colors group-hover:text-emerald-300">
                      <Link href={getArticlePath(post)}>{post.title}</Link>
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">
                      {stripHtml(post.content || "") || "محتوى عملي يشرح الفكرة الأساسية، الخطوات، والأدوات اللازمة."}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
                    <time dateTime={post.created_at ?? undefined}>
                      {post.created_at ? new Date(post.created_at).toLocaleDateString("ar-EG") : "حديث"}
                    </time>
                    <Link href={getArticlePath(post)} className="inline-flex items-center gap-2 font-bold text-emerald-300 hover:text-emerald-200">
                      قراءة المقال <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center text-sm text-slate-400">
            لا توجد مقالات في هذا التصنيف حالياً
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold text-emerald-300">تجربة عملية</p>
            <h2 className="mt-1 text-xl font-black text-white">استخدم الأدوات الرقمية الخاصة بهذا القطاع</h2>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-xs font-black text-slate-950 transition-colors hover:bg-emerald-300"
          >
            زيارة قسم الأدوات الرقمية
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function FinanceSectorPage() {
  const posts: FinancePost[] = [
    {
      id: 1,
      title: "من نظام الساعة إلى نظام القيمة: المعادلة الذهبية",
      content: "<p>كيف ترفع أرباحك بتقديم تسعير مبني على العوائد بدلاً من حساب الساعات.</p>",
      subcategory: "العمل الحر والخدمات",
      slug: "value-pricing-freelancing",
      image_url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-20T10:00:00.000Z",
    },
    {
      id: 2,
      title: "هل يجب أن تبدأ متجرًا إلكترونيًا أم تبيع عبر المنصات؟",
      content: "<p>قارن بين الربحية، التعقيد، والتسليم عند بناء نموذج تجارة إلكترونية ناجح.</p>",
      subcategory: "التجارة الإلكترونية",
      slug: "ecommerce-vs-marketplace",
      image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-15T10:00:00.000Z",
    },
    {
      id: 3,
      title: "تسعير الحملات الرقمية: ROAS أم CAC أم نقطة التعادل؟",
      content: "<p>تعلم كيف تقرر ما إذا كانت الحملة تستحق التوسع على أساس الربح الحقيقي لا مجرد التفاعل.</p>",
      subcategory: "التسويق الرقمي",
      slug: "roas-cac-decision-framework",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-12T10:00:00.000Z",
    },
    {
      id: 4,
      title: "إطلاق صفحة رعاية محتوى: من الفكرة إلى أول عميل مستقر",
      content: "<p>نموذج عملي لبناء عرض محتوى قابل للبيع مع التركيز على الربحية بدلًا من مجرد التغطية.</p>",
      subcategory: "اقتصاد صناعة المحتوى",
      slug: "content-sponsorship-pricing",
      image_url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-10T10:00:00.000Z",
    },
    {
      id: 5,
      title: "كيفية بناء محفظة رقمية آمنة دون الإفراط في التشدد",
      content: "<p>بعض الممارسات الأساسية لزيادة الأمان مع الحفاظ على قابلية الاستخدام والمرونة.</p>",
      subcategory: "العملات الرقمية والبلوكشين",
      slug: "crypto-wallet-safety",
      image_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-08T10:00:00.000Z",
    },
  ];

  return <FinanceSectorPageContent posts={posts} />;
}