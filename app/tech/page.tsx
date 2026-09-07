"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Bot,
  BrainCircuit,
  CloudCog,
  Cpu,
  Gauge,
  LockKeyhole,
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
    key: "تطبيقات الذكاء الاصطناعي",
    title: "الذكاء الاصطناعي",
    description: "أدوات، نماذج، وقرارات الاستخدام العملي.",
    href: "/tech/ai-apps",
    icon: Bot,
  },
  {
    key: "الأمن السيبراني",
    title: "الأمن السيبراني",
    description: "الخصوصية، الحماية، والكلمات السرية.",
    href: "/tech/cybersecurity",
    icon: LockKeyhole,
  },
  {
    key: "الحوسبة السحابية",
    title: "السحابة والعمل عن بُعد",
    description: "الخيارات التقنية، التكلفة، والأداء.",
    href: "/tech/cloud-remote",
    icon: CloudCog,
  },
  {
    key: "البنية التحتية",
    title: "البنية التقنية",
    description: "الأداء، التوسع، وحوكمة الأنظمة.",
    href: "/tech/infra",
    icon: Cpu,
  },
  {
    key: "إنترنت الأشياء",
    title: "IoT والتقنيات الناشئة",
    description: "البيانات، الأجهزة، والأنظمة الذكية.",
    href: "/tech/iot-emerging",
    icon: Gauge,
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
    badge: "قطاع تقني",
    title: "ذكاء اصطناعي + أمان + سحابة",
    description: "قيمة أعلى تتركز في الربط بين البنية التقنية والقرار العملي والنتائج الملموسة.",
  },
  "ai-apps": {
    badge: "الأكثر نمواً",
    title: "تطبيقات الذكاء الاصطناعي العملية",
    description: "التقرير الفوري الخاص بالنماذج والأدوات التي تحول الذكاء الاصطناعي إلى نتائج قابلة للقياس.",
  },
  cybersecurity: {
    badge: "أولوية تشغيلية",
    title: "الأمن السيبراني وحماية البيانات",
    description: "التقرير الفوري الخاص بالخصوصية والحماية والاستجابة للمخاطر الرقمية.",
  },
  "cloud-remote": {
    badge: "مرونة أعلى",
    title: "السحابة والعمل عن بُعد",
    description: "التقرير الفوري الخاص بالتكلفة والأداء وبناء بيئة عمل قابلة للتوسع.",
  },
  infra: {
    badge: "أساس مستقر",
    title: "البنية التحتية وحوكمة الأنظمة",
    description: "التقرير الفوري الخاص بالأداء والتوسع واستقرار المنتجات الرقمية.",
  },
  "iot-emerging": {
    badge: "فرصة ناشئة",
    title: "إنترنت الأشياء والتقنيات الناشئة",
    description: "التقرير الفوري الخاص بالبيانات والأجهزة والأنظمة الذكية.",
  },
};

const heroContentBySub: Record<string, HeroContent> = {
  all: {
    title: "التكنولوجيا والابتكار",
    description: "الأدلة والتقنيات التي تحوّل الأجهزة، البيانات، والذكاء الاصطناعي إلى ميزة تنافسية في العمل اليومي والمنتجات الرقمية.",
    badgeText: "مقالات مكاسب رقمية",
    metadataText: "أدوات + معرفة + تطبيق عملي",
  },
  "ai-apps": {
    title: "تطبيقات الذكاء الاصطناعي",
    description: "اختر النماذج والأدوات التي تحول الذكاء الاصطناعي إلى نتائج عملية داخل منتجك أو عملك.",
    badgeText: "مسار الذكاء الاصطناعي",
    metadataText: "نماذج + أدوات + قرار عملي",
  },
  cybersecurity: {
    title: "الأمن السيبراني",
    description: "خطوات عملية لحماية الحسابات والبيانات وتقليل المخاطر في العمل الرقمي اليومي.",
    badgeText: "مسار الأمن السيبراني",
    metadataText: "خصوصية + حماية + استجابة",
  },
  "cloud-remote": {
    title: "الحوسبة السحابية والعمل عن بُعد",
    description: "قارن الخيارات السحابية وتكلفتها وأداءها لبناء بيئة عمل مرنة وقابلة للتوسع.",
    badgeText: "مسار السحابة والعمل عن بُعد",
    metadataText: "تكلفة + أداء + مرونة",
  },
  infra: {
    title: "البنية التحتية التقنية",
    description: "أسس الأداء والتوسع وحوكمة الأنظمة التي تحافظ على استقرار المنتجات الرقمية.",
    badgeText: "مسار البنية التقنية",
    metadataText: "أداء + توسع + حوكمة",
  },
  "iot-emerging": {
    title: "إنترنت الأشياء والتقنيات الناشئة",
    description: "افهم البيانات والأجهزة والأنظمة الذكية قبل تحويل الفكرة الناشئة إلى تطبيق قابل للاستخدام.",
    badgeText: "مسار التقنيات الناشئة",
    metadataText: "بيانات + أجهزة + ابتكار",
  },
};

function getArticlePath(post: SectorPost) {
  const slug = post.slug || `post-${post.id}`;
  const subcategorySlug =
    post.subcategory === "تطبيقات الذكاء الاصطناعي"
      ? "ai-apps"
      : post.subcategory === "الأمن السيبراني"
        ? "cybersecurity"
        : post.subcategory === "الحوسبة السحابية"
          ? "cloud-remote"
          : post.subcategory === "البنية التحتية"
            ? "infra"
            : post.subcategory === "إنترنت الأشياء"
              ? "iot-emerging"
              : "general";

  return `/articles/tech/${subcategorySlug}/${slug}`;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function TechSectorPageContent({ posts }: { posts: SectorPost[] }) {
  const searchParams = useSearchParams();
  const activeSub = searchParams.get("sub") ?? "all";
  const activeKey = {
    "ai-apps": "تطبيقات الذكاء الاصطناعي",
    cybersecurity: "الأمن السيبراني",
    "cloud-remote": "الحوسبة السحابية",
    infra: "البنية التحتية",
    "iot-emerging": "إنترنت الأشياء",
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
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">مؤشر الابتكار</span>
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
            {activeKey === "الكل" ? "مقالات التكنولوجيا والابتكار" : `مقالات ${activeKey}`}
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
                    src={post.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"}
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

export default function TechSectorPage() {
  const posts: SectorPost[] = [
    {
      id: 1,
      title: "كيف تختار نموذج الذكاء الاصطناعي المناسب لمنتجك؟",
      content: "<p>قارن النماذج المفتوحة والمغلقة، والتكلفة، وسرعة التنفيذ، قبل اعتماد الذكاء الاصطناعي في التشغيل.</p>",
      subcategory: "تطبيقات الذكاء الاصطناعي",
      slug: "choosing-ai-model",
      image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-20T10:00:00.000Z",
    },
    {
      id: 2,
      title: "خطة أمان أولية لعامل مستقل أو فريق صغير",
      content: "<p>خوارزمية بسيطة لتقليل الثغرات وتقييم الجوانب التي تحتاج إلى أولوية فورية.</p>",
      subcategory: "الأمن السيبراني",
      slug: "small-team-security-plan",
      image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-17T10:00:00.000Z",
    },
    {
      id: 3,
      title: "السحابة أم الخادم الخاص؟ دليل القرار السريع",
      content: "<p>معيار العمق والمخاطر للتنقل بين السحابة المحلية والمستضافة مع الحفاظ على القرارات الاقتصادية.</p>",
      subcategory: "الحوسبة السحابية",
      slug: "cloud-vs-self-hosted",
      image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-15T10:00:00.000Z",
    },
    {
      id: 4,
      title: "مقاييس الأداء الأساسية قبل إطلاق تطبيق جديد",
      content: "<p>راجع Core Web Vitals واستجابة الخادم والتخزين قبل الاعتماد على المنتج في الإنتاج.</p>",
      subcategory: "البنية التحتية",
      slug: "performance-metrics-launch",
      image_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-12T10:00:00.000Z",
    },
    {
      id: 5,
      title: "أين تبدأ في بناء نظام IoT صغير؟",
      content: "<p>من جمع البيانات إلى الحماية والمحطات المنطقية، وقائمة أولية للخطوات التنفيذية.</p>",
      subcategory: "إنترنت الأشياء",
      slug: "iot-starter-guide",
      image_url: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-08T10:00:00.000Z",
    },
  ];

  return <TechSectorPageContent posts={posts} />;
}
