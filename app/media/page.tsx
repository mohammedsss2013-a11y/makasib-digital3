import Image from "next/image";
import Link from "next/link";
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
import InstantReportCard from "@/components/sections/InstantReportCard";
import { articlesService } from "@/services/articles.service";
import { getCanonicalArticlePath } from "@/lib/articlePaths";
import { ArticleViewsCount } from "@/components/articles/ArticleViewsCount";

type SectorPost = {
  id: string | number;
  title: string;
  content: string;
  subcategory: string | null;
  image_url?: string | null;
  slug?: string | null;
  created_at?: string;
  description?: string;
  viewsCount: number;
  href: string;
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
  return post.href;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function MediaSectorPageContent({ posts, activeSub }: { posts: SectorPost[]; activeSub: string }) {
  const activeKey = ({
    creation: "صناعة المحتوى المرئي والمكتوب",
    news: "الأخبار والتحليلات",
    podcasting: "البودكاست",
    streaming: "البث المباشر",
    gaming: "الترفيه الرقمي",
  } as Record<string, string>)[activeSub] ?? "الكل";
  const heroContent = heroContentBySub[activeSub] ?? heroContentBySub.all;

  const articleCounts: Record<string, number> = { "الكل": posts.length };
  subcategoryCards.forEach((item) => {
    articleCounts[item.key] = posts.filter((post) => post.subcategory === item.key).length;
  });
  const filteredPosts = activeKey === "الكل" ? posts : posts.filter((post) => post.subcategory === activeKey);

  return (
    <div className="space-y-8 py-2 dir-rtl" dir="rtl">
      <section className="overflow-hidden rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-card)] p-6 shadow-xl sm:p-8">
        <div key={heroContent.title} className="min-h-[220px] space-y-5 animate-[sectorHeroFadeIn_300ms_ease-out] sm:min-h-[208px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {heroContent.badgeText}
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-[var(--text-main)] sm:text-4xl">{heroContent.title}</h1>
            <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
              {heroContent.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-main)] bg-[var(--bg-muted)]/70 px-3 py-1.5 text-[11px] text-[var(--text-muted)]">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
              {articleCounts[activeKey] ?? posts.length} مقال منشور
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-main)] bg-[var(--bg-muted)]/70 px-3 py-1.5 text-[11px] text-[var(--text-muted)]">
              <ArrowLeft className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
              {heroContent.metadataText}
            </span>
          </div>
        </div>

      </section>

      <InstantReportCard category="media" sub={activeSub === "all" ? undefined : activeSub} />

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="border-r-4 border-emerald-500 pr-3 text-xl font-bold text-[var(--text-main)]">
            {activeKey === "الكل" ? "مقالات الإعلام الجديد" : `مقالات ${activeKey}`}
          </h2>
          <Link href="/tools" className="text-[11px] text-[var(--text-muted)] transition-colors hover:text-emerald-500 dark:hover:text-emerald-300">
            انتقال إلى أدوات رقمية
          </Link>
        </div>

        {filteredPosts.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] transition-all hover:-translate-y-1 hover:border-emerald-500/40">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--border-main)] bg-[var(--bg-muted)]">
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
                        <span className="rounded-full border border-[var(--border-main)] bg-[var(--bg-muted)] px-2.5 py-1 text-[10px] text-[var(--text-muted)]">
                          {post.subcategory}
                        </span>
                      )}
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-300">
                        مقال معرفي
                      </span>
                    </div>

                    <h3 className="text-lg font-black leading-8 text-[var(--text-main)] transition-colors group-hover:text-emerald-500 dark:group-hover:text-emerald-300">
                      <Link href={getArticlePath(post)}>{post.title}</Link>
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--text-muted)]">
                      {post.description || stripHtml(post.content || "") || "محتوى عملي يشرح الفكرة الأساسية، الخطوات، والأدوات اللازمة."}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-main)] pt-4 text-xs text-[var(--text-subtle)]">
                    <span className="flex flex-wrap items-center gap-3">
                      <time dateTime={post.created_at ?? undefined}>
                        {post.created_at ? new Date(post.created_at).toLocaleDateString("ar-EG") : "حديث"}
                      </time>
                      <ArticleViewsCount initialCount={post.viewsCount} />
                    </span>
                    <Link href={getArticlePath(post)} className="inline-flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200">
                      قراءة المقال <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border-main)] bg-[var(--bg-card)] p-10 text-center text-sm text-[var(--text-muted)]">
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

export default async function MediaSectorPage({ searchParams }: { searchParams: Promise<{ sub?: string }> }) {
  const [{ sub = "all" }, articles] = await Promise.all([searchParams, articlesService.getAllArticles()]);
  const posts: SectorPost[] = articles
    .filter((article) => article.categorySlug === "media")
    .map((article) => ({
      id: article.id,
      title: article.title,
      content: article.content,
      subcategory: article.subcategoryLabel,
      image_url: article.coverImage,
      slug: article.slug,
      created_at: article.publishedAt,
      description: article.description,
      viewsCount: article.viewsCount,
      href: getCanonicalArticlePath(article),
    }));

  return <MediaSectorPageContent posts={posts} activeSub={sub} />;
}
