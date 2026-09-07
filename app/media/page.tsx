"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Clapperboard,
  Mic,
  Newspaper,
  Radio,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type SectorPost = {
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
    key: "صناعة المحتوى المرئي والمكتوب",
    title: "صناعة المحتوى",
    description: "الرسائل، الوعي، والتسويق بالقصص.",
    href: "/media/creation",
    icon: Camera,
  },
  {
    key: "الأخبار والتحليلات",
    title: "الأخبار والتحليلات",
    description: "الطبيعة، الاتجاهات، والأدوات الإعلامية.",
    href: "/media/news",
    icon: Newspaper,
  },
  {
    key: "البودكاست",
    title: "البودكاست",
    description: "الصوت، السرد، وتوزيع الحلقة الرقمية.",
    href: "/media/podcasting",
    icon: Mic,
  },
  {
    key: "البث المباشر",
    title: "البث المباشر",
    description: "الانتشار، التفاعل، والمرونة الفنية.",
    href: "/media/streaming",
    icon: Radio,
  },
  {
    key: "الترفيه الرقمي",
    title: "الترفيه واللعب",
    description: "الحضور الرقمي، المجتمع، والتفاعل النقدي.",
    href: "/media/gaming",
    icon: Clapperboard,
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
    badge: "قطاع إعلامي",
    title: "صناعة المحتوى + البث",
    description: "التركيز يذهب إلى القنوات التي تجمع بين الصدق الإعلامي والقدرة على التوزيع المستمر.",
  },
  creation: {
    badge: "الأكثر تأثيراً",
    title: "صناعة المحتوى المرئي والمكتوب",
    description: "التقرير الفوري الخاص بالرسائل والقصص وبناء محتوى قابل للنمو.",
  },
  news: {
    badge: "طلب مستمر",
    title: "الأخبار والتحليلات الرقمية",
    description: "التقرير الفوري الخاص بالتحقق والاتجاهات وبناء سياق إعلامي موثوق.",
  },
  podcasting: {
    badge: "نمو صوتي",
    title: "البودكاست والسرد الرقمي",
    description: "التقرير الفوري الخاص بالصوت وتخطيط الحلقات وتوزيعها.",
  },
  streaming: {
    badge: "تفاعل مباشر",
    title: "البث المباشر وبناء الجمهور",
    description: "التقرير الفوري الخاص بالانتشار والتفاعل والمرونة الفنية.",
  },
  gaming: {
    badge: "مجتمع متفاعل",
    title: "الترفيه الرقمي واللعب",
    description: "التقرير الفوري الخاص بالمجتمع والتفاعل وتصميم التجارب الرقمية.",
  },
};

const heroContentBySub: Record<string, HeroContent> = {
  all: {
    title: "الإعلام الجديد",
    description: "استراتيجيات بناء المحتوى، الإنتاج، التوزيع، والوعي بالاتجاهات في الإعلام الرقمي وصناعة التفاعل.",
    badgeText: "مقالات مكاسب رقمية",
    metadataText: "محتوى + توزيع + تفاعل",
  },
  creation: {
    title: "صناعة المحتوى المرئي والمكتوب",
    description: "ابنِ رسائل واضحة ومحتوى مؤثرًا يوازن بين القصة والوعي والنتائج التسويقية.",
    badgeText: "مسار صناعة المحتوى",
    metadataText: "رسالة + قصة + أثر",
  },
  news: {
    title: "الأخبار والتحليلات",
    description: "اقرأ الاتجاهات والأخبار الرقمية بأدوات تساعدك على التحقق والفهم واتخاذ موقف واعٍ.",
    badgeText: "مسار الأخبار والتحليلات",
    metadataText: "اتجاهات + تحقق + سياق",
  },
  podcasting: {
    title: "البودكاست",
    description: "خطط للحلقة والصوت والتوزيع لبناء تجربة بودكاست مستدامة وقابلة للنمو.",
    badgeText: "مسار البودكاست",
    metadataText: "صوت + سرد + توزيع",
  },
  streaming: {
    title: "البث المباشر",
    description: "طوّر حضورك المباشر عبر الانتشار والتفاعل والمرونة الفنية التي تحافظ على اهتمام الجمهور.",
    badgeText: "مسار البث المباشر",
    metadataText: "انتشار + تفاعل + مرونة",
  },
  gaming: {
    title: "الترفيه الرقمي واللعب",
    description: "افهم المجتمع والتفاعل والحضور الرقمي لصناعة تجارب ترفيهية أكثر اتصالًا بالجمهور.",
    badgeText: "مسار الترفيه الرقمي",
    metadataText: "مجتمع + تفاعل + تجربة",
  },
};

function getArticlePath(post: SectorPost) {
  const slug = post.slug || `post-${post.id}`;
  const subcategorySlug =
    post.subcategory === "صناعة المحتوى المرئي والمكتوب"
      ? "creation"
      : post.subcategory === "الأخبار والتحليلات"
        ? "news"
        : post.subcategory === "البودكاست"
          ? "podcasting"
          : post.subcategory === "البث المباشر"
            ? "streaming"
            : post.subcategory === "الترفيه الرقمي"
              ? "gaming"
              : "general";

  return `/articles/media/${subcategorySlug}/${slug}`;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function MediaSectorPageContent({ posts }: { posts: SectorPost[] }) {
  const searchParams = useSearchParams();
  const activeSub = searchParams.get("sub") ?? "all";
  const activeKey = {
    creation: "صناعة المحتوى المرئي والمكتوب",
    news: "الأخبار والتحليلات",
    podcasting: "البودكاست",
    streaming: "البث المباشر",
    gaming: "الترفيه الرقمي",
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
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">مؤشر المحتوى</span>
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
            {activeKey === "الكل" ? "مقالات الإعلام الجديد" : `مقالات ${activeKey}`}
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
                    src={post.image_url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"}
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
            <h2 className="mt-1 text-xl font-black text-white">استخدم الأدوات الرقمية المرتبطة بهذا القطاع</h2>
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

export default function MediaSectorPage() {
  const posts: SectorPost[] = [
    {
      id: 1,
      title: "كيف تبني شبكة محتوى قابلة للاستمرار عبر منصات متعددة؟",
      content: "<p>أطر عمل للتوزيع، التحسين، وقياس التفاعل على القنوات المتعددة دون إهدار الوقت.</p>",
      subcategory: "صناعة المحتوى المرئي والمكتوب",
      slug: "content-distribution-system",
      image_url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-20T10:00:00.000Z",
    },
    {
      id: 2,
      title: "أساسيات تحليل الأخبار الرقمية عند التدفق المستمر",
      content: "<p>كيف تميز بين الأخبار الحقيقية، الاتجاهات، والتأثيرات الاجتماعية في البيئة الرقمية السريعة.</p>",
      subcategory: "الأخبار والتحليلات",
      slug: "digital-news-analysis",
      image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-19T10:00:00.000Z",
    },
    {
      id: 3,
      title: "خطّة إطلاق بودكاست من غرفة صغيرة بموارد محدودة",
      content: "<p>تخطيط الإنتاج، الصوت، الإخراج، والتوزيع لمحتوى صوتي مستدام مع أقل كلفة.</p>",
      subcategory: "البودكاست",
      slug: "podcast-launch-small-room",
      image_url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-15T10:00:00.000Z",
    },
    {
      id: 4,
      title: "مؤشرات البث المباشر: متى تكون الحلقة فعلاً قابلة للتوسع؟",
      content: "<p>مقاييس البقاء، التفاعل، والوقت الحقيقي للقبول عند تحويل الخطة المحتوى إلى تجربة مباشرة.</p>",
      subcategory: "البث المباشر",
      slug: "live-stream-success-signals",
      image_url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-11T10:00:00.000Z",
    },
    {
      id: 5,
      title: "إطلاق قناة ترفيهية رقمية: من الفكرة إلى المتابع المستقر",
      content: "<p>نهج واضح لتحديد الشكل المناسب للتفاعل، بناء الحدث، والصياغة الهادفة دون فقدان الثبات.</p>",
      subcategory: "الترفيه الرقمي",
      slug: "digital-entertainment-channel",
      image_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-07T10:00:00.000Z",
    },
  ];

  return <MediaSectorPageContent posts={posts} />;
}
