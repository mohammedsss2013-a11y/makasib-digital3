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
  Clock,
  ChevronLeft,
  LayoutDashboard,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import AppImage from "@/components/ui/AppImage";
import { articlesService } from "@/services/articles.service";
import { getArticlePath } from "@/lib/articlePaths";

export default async function HomePage() {
  const supabase = await createClient();
  const [{ data: communityPosts }, allArticles] = await Promise.all([
    supabase
      .from("community_posts")
      .select("id, title, content, created_at")
      .order("created_at", { ascending: false })
      .range(0, 1),
    articlesService.getAllArticles(),
  ]);

  const featuredArticle = allArticles[0] || null;
  const recentArticles = allArticles.slice(1, 10);

  const categories = [
    {
      id: "finance",
      title: "المال والأعمال",
      description: "الاستثمار، التخطيط المالي، وبناء المشاريع الناشئة.",
      icon: TrendingUp,
      href: "/finance",
      color: "text-emerald-500",
      bgLight: "bg-emerald-500/10",
    },
    {
      id: "tech",
      title: "التكنولوجيا",
      description: "الذكاء الاصطناعي، الأمن السيبراني، والتقنيات الحديثة.",
      icon: Cpu,
      href: "/tech",
      color: "text-blue-500",
      bgLight: "bg-blue-500/10",
    },
    {
      id: "media",
      title: "الإعلام الجديد",
      description: "صناعة المحتوى، منصات التواصل الاجتماعي، والترفيه الرقمي.",
      icon: Tv,
      href: "/media",
      color: "text-purple-500",
      bgLight: "bg-purple-500/10",
    },
    {
      id: "digital-lifestyle",
      title: "أسلوب الحياة الرقمي",
      description: "العمل عن بعد، الصحة الرقمية، وإدارة الحياة المعاصرة.",
      icon: Brain,
      href: "/digital-lifestyle",
      color: "text-amber-500",
      bgLight: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-20 py-6 dir-rtl">
      {/* ── 1. Top Section: Hero & Featured Post ── */}
      <section aria-labelledby="hero-title" className="space-y-6">
        {/* Subtle Announcement Pill */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-main)]/80 bg-[var(--bg-card)]/80 px-3.5 py-1 text-xs font-semibold text-[var(--text-muted)] backdrop-blur-md shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span>مدونة مكاسب الرقمية</span>
            <span className="text-[var(--border-main)]">|</span>
            <span className="text-[var(--text-main)] font-bold">المقال المميز للأسبوع</span>
          </div>

          <Link
            href="/articles"
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent-primary)] transition-all hover:opacity-80"
          >
            <span>أرشيف المقالات الكامل</span>
            <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* Featured Post Hero Card (Linear / Vercel style) */}
        {featuredArticle && (
          <Link
            href={getArticlePath(featuredArticle)}
            className="group relative block overflow-hidden rounded-3xl border border-[var(--border-main)]/80 bg-[var(--bg-card)] shadow-md transition-all duration-300 hover:border-[var(--accent-primary)]/50 hover:shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Content Column */}
              <div className="lg:col-span-7 flex flex-col justify-between p-7 sm:p-10 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-xs">
                    <Badge variant="accent" size="sm" className="font-bold">
                      {featuredArticle.categoryLabel}
                    </Badge>
                    <span className="flex items-center gap-1 text-[var(--text-muted)] text-[11px]">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h1
                    id="hero-title"
                    className="text-2xl sm:text-4xl font-black leading-tight tracking-tight text-[var(--text-main)] transition-colors duration-200 group-hover:text-[var(--accent-primary)]"
                  >
                    {featuredArticle.title}
                  </h1>

                  {featuredArticle.description && (
                    <p className="line-clamp-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                      {featuredArticle.description}
                    </p>
                  )}
                </div>

                {/* Meta info & interactive CTA */}
                <div className="flex items-center justify-between border-t border-[var(--border-main)]/60 pt-6 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-[var(--accent-light)] text-[var(--accent-primary)] flex items-center justify-center font-bold text-[11px]">
                      م
                    </div>
                    <div>
                      <p className="font-bold text-[var(--text-main)]">{featuredArticle.author}</p>
                      <time dateTime={featuredArticle.publishedAt} className="text-[10px] text-[var(--text-muted)]">
                        {new Date(featuredArticle.publishedAt).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-primary)] px-4 py-2 font-bold text-white shadow-sm transition-all duration-200 group-hover:opacity-95 group-hover:gap-3">
                    <span>قراءة المقال</span>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Image Column with Immersive Ratio */}
              <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-[var(--bg-muted)] min-h-[280px]">
                <AppImage
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.coverImageAlt || featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
              </div>
            </div>
          </Link>
        )}
      </section>

      {/* ── 2. Category Filter Pills (Vercel / Linear Style) ── */}
      <section aria-label="أقسام المدونة" className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Link href="/articles">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-primary)] bg-[var(--accent-light)] px-4 py-2 text-xs font-bold text-[var(--accent-primary)] shadow-xs transition-colors">
              <Sparkles className="h-3.5 w-3.5" />
              جميع المقالات
            </span>
          </Link>
          {categories.map((cat) => (
            <Link key={cat.id} href={cat.href}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-main)]/80 bg-[var(--bg-card)]/80 px-4 py-2 text-xs font-medium text-[var(--text-muted)] transition-all hover:border-[var(--accent-primary)]/50 hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)] whitespace-nowrap">
                <cat.icon className={`h-3.5 w-3.5 ${cat.color}`} />
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. Latest Posts Grid (CSS Grid Cards with Hover Effects) ── */}
      <section aria-labelledby="latest-posts-heading" className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-main)]/60 pb-4">
          <div>
            <h2 id="latest-posts-heading" className="text-2xl font-black text-[var(--text-main)] sm:text-3xl">
              أحدث المقالات المنشورة
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
              تحليلات ودراسات تطبيقية أُضيفت مؤخراً لمساعدتك في بناء وتطوير مهاراتك
            </p>
          </div>
          <Link
            href="/articles"
            className="flex items-center gap-1 text-xs font-bold text-[var(--accent-primary)] transition-all hover:opacity-80"
          >
            تصفح الكل ({allArticles.length}) <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>

        {recentArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={getArticlePath(article)}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-main)]/70 bg-[var(--bg-card)]/90 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/50 hover:shadow-xl"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-muted)]">
                    <AppImage
                      src={article.coverImage}
                      alt={article.coverImageAlt || article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="accent" size="sm" className="backdrop-blur-md bg-[var(--bg-surface)]/90 font-bold shadow-xs">
                        {article.categoryLabel}
                      </Badge>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-3 p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                      <span>•</span>
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString("ar-EG")}
                      </time>
                    </div>

                    <h3 className="line-clamp-2 text-lg font-bold leading-snug text-[var(--text-main)] transition-colors duration-200 group-hover:text-[var(--accent-primary)]">
                      {article.title}
                    </h3>

                    {article.description && (
                      <p className="line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
                        {article.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="border-t border-[var(--border-main)]/60 px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                    {article.author}
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-[var(--accent-primary)] transition-transform group-hover:-translate-x-1">
                    قراءة المقال
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border-main)] p-12 text-center text-xs text-[var(--text-muted)]">
            ستظهر المقالات هنا فور نشرها.
          </div>
        )}
      </section>

      {/* ── 4. Interactive Callouts: Tools & Community (Sleek Linear Style) ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Tools Feature Card */}
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border-main)]/70 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-muted)]/50 p-7 sm:p-8 space-y-4 shadow-sm transition-all hover:border-[var(--accent-primary)]/40 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <Badge variant="outline" size="sm">أدوات تنفيذية مجانية</Badge>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[var(--text-main)]">حاسبات وأدوات إنتاجية متخصصة</h3>
            <p className="text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
              طبّق استراتيجيات التسعير، احسب العوائد الاستثمارية، واختبر الأدوات مباشرة دون مغادرة الموقع.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-primary)] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:opacity-90"
            >
              <span>فتح مكتبة الأدوات</span>
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Community Card */}
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border-main)]/70 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-muted)]/50 p-7 sm:p-8 space-y-4 shadow-sm transition-all hover:border-purple-500/40 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500">
              <MessageSquare className="h-5 w-5" />
            </div>
            <Badge variant="secondary" size="sm">نقاشات المجتمع</Badge>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[var(--text-main)]">مجتمع مكاسب التفاعلي</h3>
            {communityPosts?.length ? (
              <p className="text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm line-clamp-2">
                &ldquo;{communityPosts[0].title}&rdquo; — {communityPosts[0].content}
              </p>
            ) : (
              <p className="text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
                اطرح استفساراتك وشارك تجاربك العملية وتواصل مع نخبة من المهنيين والمستقلين.
              </p>
            )}
          </div>

          <div className="pt-2">
            <Link
              href="/community"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-4 py-2 text-xs font-bold text-[var(--text-main)] shadow-sm transition-all hover:bg-[var(--bg-muted)]"
            >
              <span>الانضمام للمناقشات</span>
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}