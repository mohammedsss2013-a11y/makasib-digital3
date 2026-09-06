"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  HeartPulse,
  Sparkles,
  SunMedium,
  Target,
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
    key: "إدارة الحياة الرقمية",
    title: "إدارة الحياة الرقمية",
    description: "التنظيم والهوية والمهام في بيئة مزدحمة.",
    href: "/digital-lifestyle/life-management",
    icon: Target,
  },
  {
    key: "الصحة الرقمية",
    title: "الصحة الرقمية",
    description: "التوازن، النوم، والوقاية من الإرهاق.",
    href: "/digital-lifestyle/health",
    icon: HeartPulse,
  },
  {
    key: "التعليم والتعلم الرقمي",
    title: "التعليم والتعلم",
    description: "مهارات مستدامة ونماذج تعليم قابلة للتنفيذ.",
    href: "/digital-lifestyle/learning",
    icon: BookOpen,
  },
  {
    key: "الثقافة الرقمية",
    title: "الثقافة الرقمية",
    description: "الأدوات، العادات، والهوية الرقمية.",
    href: "/digital-lifestyle/culture",
    icon: SunMedium,
  },
];

function getArticlePath(post: SectorPost) {
  const slug = post.slug || `post-${post.id}`;
  const subcategorySlug =
    post.subcategory === "إدارة الحياة الرقمية"
      ? "life-management"
      : post.subcategory === "الصحة الرقمية"
        ? "health"
        : post.subcategory === "التعليم والتعلم الرقمي"
          ? "learning"
          : post.subcategory === "الثقافة الرقمية"
            ? "culture"
            : "general";

  return `/articles/digital-lifestyle/${subcategorySlug}/${slug}`;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function DigitalLifestylePageContent({ posts }: { posts: SectorPost[] }) {
  const searchParams = useSearchParams();
  const activeKey = {
    "life-management": "إدارة الحياة الرقمية",
    health: "الصحة الرقمية",
    learning: "التعليم والتعلم الرقمي",
    culture: "الثقافة الرقمية",
  }[searchParams.get("sub") ?? ""] ?? "الكل";

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
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            مقالات مكاسب رقمية
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-white sm:text-4xl">رقميون - أسلوب الحياة</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              بناء نمط حياة أكثر تركيزًا، توازنًا، ووعيًا في العالم الرقمي من خلال أدوات عملية ومعرفة مستدامة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-[11px] text-slate-300">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              {posts.length} مقال منشور
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-[11px] text-slate-300">
              <ArrowLeft className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              توازن + إنتاجية + وعي
            </span>
          </div>
        </div>

      </section>

      <div className="mt-2 rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">مؤشر التوازن</span>
          <span className="text-[10px] text-slate-400">قطاع حياة رقمية</span>
        </div>

        <div className="mt-4 text-sm leading-7 text-slate-300">
          <p className="text-[10px] text-slate-400">أكثر مسار يطلبه الزوار</p>
          <p className="mt-2 text-lg font-black text-white">الصحة الرقمية + التنظيم</p>
          <p className="mt-2 text-sm text-slate-300">النتائج الأفضل تأتي عندما يكون التوازن البشري هو نقطة بداية كل تصميم واختيار.</p>
        </div>
      </div>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="border-r-4 border-emerald-500 pr-3 text-xl font-bold text-white">
            {activeKey === "الكل" ? "مقالات رقميون" : `مقالات ${activeKey}`}
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
                    src={post.image_url || "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80"}
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

export default function DigitalLifestylePage() {
  const posts: SectorPost[] = [
    {
      id: 1,
      title: 'كيف تتحول من "استجابة سريعة" إلى "إنتاجية مدروسة"؟',
      content: "<p>نظام عملي لتقليل التشتيت وتحويل الطاقة الرقمية إلى نتائج ذات معنى في الحياة اليومية.</p>",
      subcategory: "إدارة الحياة الرقمية",
      slug: "digital-life-organization",
      image_url: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-20T10:00:00.000Z",
    },
    {
      id: 2,
      title: "مؤشر الإرهاق الرقمي: متى تحتاج إلى استراحة فعالة؟",
      content: "<p>علامات التوتر، تجاوز الشاشات، وطرق إعادة ضبط الطاقة دون الانسحاب الكامل.</p>",
      subcategory: "الصحة الرقمية",
      slug: "digital-burnout-checklist",
      image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-18T10:00:00.000Z",
    },
    {
      id: 4,
      title: "تعلم سريع دون إهدار الوقت: بناء نظام مهارات شخصي",
      content: "<p>خريطة طريقة لتحديد المهارة المناسبة، فترات التعلم، ومعايير التقييم السريعة.</p>",
      subcategory: "التعليم والتعلم الرقمي",
      slug: "personal-skill-system",
      image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-10T10:00:00.000Z",
    },
    {
      id: 5,
      title: "الثقافة الرقمية: كيف تبني حضورك بوعي بدلًا من التلقين؟",
      content: "<p>استراتيجية لبناء هوية رقمية ذات معنى مع حماية الوقت والقرارات الشخصية.</p>",
      subcategory: "الثقافة الرقمية",
      slug: "digital-culture-identity",
      image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      created_at: "2026-08-07T10:00:00.000Z",
    },
  ];

  return <DigitalLifestylePageContent posts={posts} />;
}
