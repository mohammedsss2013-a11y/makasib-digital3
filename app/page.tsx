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
  Flame,
} from "lucide-react";
import { HomeSearchButton } from "@/components/search/HomeSearchButton";
import { createClient } from "@/lib/supabase/server";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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
  const recentArticles = allArticles.slice(1, 7);

  const categories = [
    {
      id: "finance",
      title: "المال والأعمال",
      description: "الاستثمار، التخطيط المالي، وبناء المشاريع الناشئة.",
      icon: TrendingUp,
      href: "/finance",
      color: "text-emerald-500",
      bgLight: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      id: "tech",
      title: "التكنولوجيا",
      description: "الذكاء الاصطناعي، الأمن السيبراني، والتقنيات الحديثة.",
      icon: Cpu,
      href: "/tech",
      color: "text-blue-500",
      bgLight: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      id: "media",
      title: "الإعلام الجديد",
      description: "صناعة المحتوى، منصات التواصل الاجتماعي، والترفيه الرقمي.",
      icon: Tv,
      href: "/media",
      color: "text-purple-500",
      bgLight: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      id: "digital-lifestyle",
      title: "أسلوب الحياة الرقمي",
      description: "العمل عن بعد، الصحة الرقمية، وإدارة الحياة المعاصرة.",
      icon: Brain,
      href: "/digital-lifestyle",
      color: "text-amber-500",
      bgLight: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
  ];

  return (
    <div className="space-y-12 py-2 dir-rtl">
      {/* Blog Header / Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card)] p-8 shadow-sm sm:p-12">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <Badge variant="accent" size="md" className="mx-auto px-4 py-1">
            <Flame className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
            <span>مدونة متخصصة في المعرفة والتنفيذ الرقمي</span>
          </Badge>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-[var(--text-main)] sm:text-5xl">
            أفكار ودراسات عملية لتطوير <span className="text-[var(--accent-primary)]">أعمالك الرقمية</span>
          </h1>

          <p className="text-sm leading-relaxed text-[var(--text-muted)] sm:text-base max-w-2xl mx-auto">
            مقالات تطبيقية مُركزة، تحليلات متخصصة، وأدوات مساعدة تجمع بين الفكرة والخطوات التنفيذية المباشرة.
          </p>

          {/* Quick Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <Link key={cat.id} href={cat.href}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-main)] bg-[var(--bg-muted)] px-3.5 py-1.5 text-xs font-bold text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]">
                  <cat.icon className={`h-3.5 w-3.5 ${cat.color}`} />
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>

          <div className="pt-2 flex justify-center">
            <HomeSearchButton />
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      {featuredArticle && (
        <section aria-labelledby="featured-article-title" className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
            <h2 id="featured-article-title" className="flex items-center gap-2 text-xl font-bold text-[var(--text-main)]">
              <Sparkles className="h-5 w-5 text-amber-500" aria-hidden="true" />
              المقال المميز
            </h2>
            <Badge variant="outline">اختيار المحرر</Badge>
          </div>

          <Link
            href={getArticlePath(featuredArticle)}
            className="group relative block overflow-hidden rounded-3xl border border-[var(--border-main)] bg-[var(--bg-card)] shadow-sm transition-all duration-300 hover:border-[var(--accent-primary)]/50 hover:shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="relative aspect-[16/9] lg:aspect-auto lg:col-span-7 overflow-hidden bg-[var(--bg-muted)] min-h-[260px] lg:min-h-[340px]">
                <AppImage
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.coverImageAlt || featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <Badge variant="accent">{featuredArticle.categoryLabel}</Badge>
                    <span className="flex items-center gap-1 text-[var(--text-muted)]">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold leading-snug text-[var(--text-main)] transition-colors group-hover:text-[var(--accent-primary)] sm:text-2xl">
                    {featuredArticle.title}
                  </h3>

                  {featuredArticle.description && (
                    <p className="line-clamp-3 text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
                      {featuredArticle.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-[var(--border-main)] pt-4 text-xs">
                  <span className="text-[var(--text-muted)]">
                    {new Date(featuredArticle.publishedAt).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>

                  <span className="inline-flex items-center gap-1.5 font-bold text-[var(--accent-primary)] transition-transform group-hover:-translate-x-1">
                    اقرأ المقال الكامل
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Latest Articles Grid */}
      <section aria-labelledby="latest-articles-title" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border-main)] pb-3">
          <div>
            <h2 id="latest-articles-title" className="text-xl font-bold text-[var(--text-main)]">
              أحدث المقالات
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              قراءات وتحليلات جديدة نُشرت مؤخراً في المدونة
            </p>
          </div>
          <Link
            href="/articles"
            className="flex items-center gap-1 text-xs font-bold text-[var(--accent-primary)] hover:opacity-80"
          >
            تصفح الأرشيف الكامل <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {recentArticles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={getArticlePath(article)}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/50 hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-muted)]">
                    <AppImage
                      src={article.coverImage}
                      alt={article.coverImageAlt || article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <div className="flex items-center justify-between text-[11px]">
                      <Badge variant="accent" size="sm">
                        {article.categoryLabel}
                      </Badge>
                      <span className="flex items-center gap-1 text-[var(--text-muted)]">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="line-clamp-2 text-base font-bold leading-snug text-[var(--text-main)] transition-colors group-hover:text-[var(--accent-primary)]">
                      {article.title}
                    </h3>

                    {article.description && (
                      <p className="line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
                        {article.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-[var(--border-main)] px-5 py-3 text-[11px] text-[var(--text-muted)] flex items-center justify-between">
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString("ar-EG")}
                  </time>
                  <span className="font-semibold text-[var(--accent-primary)] group-hover:underline">
                    متابعة القراءة ←
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-[var(--border-main)] p-8 text-center text-xs text-[var(--text-muted)]">
            ستظهر المقالات هنا فور نشرها.
          </p>
        )}
      </section>

      {/* Explore by Category Grid */}
      <section className="space-y-6 pt-4">
        <div className="border-b border-[var(--border-main)] pb-3">
          <h2 className="text-xl font-bold text-[var(--text-main)]">التصفح حسب الأقسام</h2>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            اختر المجال الذي تود تعميق معرفتك فيه اليوم
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.id} href={cat.href} className="group block">
                <Card hoverEffect className="p-6 h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cat.bgLight} ${cat.color}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-base group-hover:text-[var(--accent-primary)] transition-colors">
                      {cat.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-xs leading-relaxed">
                      {cat.description}
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-[var(--accent-primary)] pt-2 border-t border-[var(--border-main)]">
                    <span>تصفح المقالات</span>
                    <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Interactive Blog Extensions (Tools & Community Highlights) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Tools Callout */}
        <Card className="p-6 flex flex-col justify-between space-y-4 border-[var(--border-main)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-muted)]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <Badge variant="accent">أدوات تنفيذية</Badge>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-main)]">أدوات وحاسبات رقمية مجانية</h3>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              ساعد نفسك في حساب تكاليف المشاريع، تسعير الخدمات المستقلة، وفحص الأمان بكل يسر وسهولة.
            </p>
          </div>
          <div>
            <Link href="/tools">
              <Button variant="primary" size="sm" icon={<ArrowLeft className="h-3.5 w-3.5" />}>
                استكشف الأدوات الرقمية
              </Button>
            </Link>
          </div>
        </Card>

        {/* Community Callout */}
        <Card className="p-6 flex flex-col justify-between space-y-4 border-[var(--border-main)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-muted)]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                <MessageSquare className="h-4 w-4" />
              </div>
              <Badge variant="secondary">نقاشات المجتمع</Badge>
            </div>
            {communityPosts?.length ? (
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[var(--text-main)] line-clamp-1">{communityPosts[0].title}</h3>
                <p className="line-clamp-2 text-xs text-[var(--text-muted)]">{communityPosts[0].content}</p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-[var(--text-main)]">مجتمع مكاسب التفاعلي</h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  شارِك أفكارك، اسأل المتخصصين، وتبادل الخبرات العملية مع صناع المحتوى ورواد الأعمال.
                </p>
              </div>
            )}
          </div>
          <div>
            <Link href="/community">
              <Button variant="secondary" size="sm" icon={<ArrowLeft className="h-3.5 w-3.5" />}>
                الانضمام للمناقشات
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}