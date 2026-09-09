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
  LayoutDashboard,
} from "lucide-react";
import { HomeSearchButton } from "@/components/search/HomeSearchButton";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

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
      badge: "6 أقسام",
    },
    {
      title: "التكنولوجيا والابتكار",
      description: "أدوات فحص كلمات المرور وتكاليف الـ API والـ Tokens وسير السحابة.",
      icon: Cpu,
      href: "/tech",
      badge: "5 أقسام",
    },
    {
      title: "الإعلام الجديد",
      description: "صناعة المحتوى، البودكاست المرئي، ومنصات البث الحي والتفاعل.",
      icon: Tv,
      href: "/media",
      badge: "5 أقسام",
    },
    {
      title: "رقميون - أسلوب الحياة",
      description: "إدارة الحياة الرقمية، الصحة النفسية والوقاية من الاحتراق الرقمي.",
      icon: Brain,
      href: "/digital-lifestyle",
      badge: "5 أقسام",
    },
  ];

  const quickMap = [
    { title: "الأدوات الرقمية", description: "ابدأ بأداة عملية مناسبة لاحتياجك الحالي.", href: "/tools", icon: LayoutDashboard },
    { title: "مجتمع مكاسب", description: "شارك خبراتك وتعلم من مجتمع المهنيين الرقميين.", href: "/community", icon: MessageSquare },
    { title: "من نحن", description: "تعرف على رؤية المنصة وأهدافها العملية.", href: "/about", icon: Sparkles },
    { title: "دليل المنصة العام", description: "تصفح جميع الأقسام والصفحات الرئيسية.", href: "/sitemap", icon: ExternalLink },
  ];

  return (
    <div className="space-y-16 py-4 dir-rtl">
      {/* Hero Section */}
      <section aria-labelledby="home-hero-title" className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-8 shadow-2xl sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="z-10 max-w-2xl space-y-6 text-center lg:text-right">
            <Badge variant="accent" size="md">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>منصة تمكين رقمي وتوجيه عملي</span>
            </Badge>

            <h1 id="home-hero-title" className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              طريقك المباشر لتحويل <span className="text-[var(--accent-primary)]">المهارات الرقمية</span> إلى مكاسب حقيقية
            </h1>

            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              مقالات تطبيقية، أدوات مجانية، ومجتمع يربط بين التعلم والتنفيذ والفرص الرقمية لتساعدك على بناء دخل محترف واستقرار مهني.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
              <Link href="/tools">
                <Button variant="primary" size="lg" icon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}>
                  استكشف الأدوات
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="secondary" size="lg">
                  انضم لمجتمع مكاسب
                </Button>
              </Link>
              <HomeSearchButton />
            </div>
          </div>

          <div className="relative z-10">
            <Card className="p-5 bg-slate-950/70 shadow-2xl">
              <div className="mb-4 flex items-center justify-between gap-2">
                <Badge variant="accent">أدوات مختارة</Badge>
                <span className="text-[10px] text-[var(--text-muted)]">عرض سريع</span>
              </div>

              <div className="space-y-3">
                {[
                  { title: "حاسبة تسعير الخدمات", detail: "المال والأعمال", href: "/finance/freelancing" },
                  { title: "فاحص كلمات المرور", detail: "التكنولوجيا", href: "/tech/cybersecurity" },
                  { title: "قائمة أدوات المنصة", detail: "كل الأدوات", href: "/tools" },
                ].map((tool) => (
                  <Link key={tool.title} href={tool.href} className="block">
                    <Card hoverEffect className="flex items-center justify-between gap-3 p-3 bg-slate-900/60">
                      <div>
                        <p className="text-sm font-bold text-white">{tool.title}</p>
                        <p className="text-[10px] text-slate-400">{tool.detail}</p>
                      </div>
                      <ArrowLeft className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--accent-light)] p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-[var(--accent-primary)]">بوابة الأدوات</p>
                    <p className="mt-1 text-sm font-black text-[var(--text-main)]">تصفح كل الأدوات الرقمية</p>
                  </div>
                  <Link href="/tools">
                    <Button variant="primary" size="sm">
                      افتح الآن
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Pillars */}
      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="border-r-4 border-[var(--accent-primary)] pr-3 text-xl font-bold text-[var(--text-main)]">محاور المنصة وأدوارها</h2>
          <span className="text-[11px] text-[var(--text-muted)]">كل محور يخدم هدفاً مختلفاً</span>
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
              <Card key={item.title} hoverEffect className="p-5 flex flex-col justify-between">
                <CardHeader className="p-0 pb-3 space-y-0 flex flex-row items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-light)] text-[var(--accent-primary)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <Badge variant="secondary" size="sm">{item.detail}</Badge>
                </CardHeader>
                <CardTitle className="text-sm mt-2">{item.title}</CardTitle>
                <CardDescription className="mt-1 text-[11px] leading-6">{item.description}</CardDescription>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick Map */}
      <section aria-labelledby="site-map-title" className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="site-map-title" className="border-r-4 border-[var(--accent-primary)] pr-3 text-xl font-bold text-[var(--text-main)]">خريطة الوصول السريع</h2>
            <p className="mt-2 text-xs text-[var(--text-muted)]">كل ما تحتاجه بعد اختيار القسم، مرتب في مسارات قصيرة وواضحة.</p>
          </div>
          <Link href="/tools" className="text-xs font-bold text-[var(--accent-primary)] hover:opacity-80">
            استكشاف الأدوات <ArrowLeft className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickMap.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="block">
                <Card hoverEffect className="p-5">
                  <Icon className="mb-4 h-5 w-5 text-[var(--accent-primary)]" />
                  <CardTitle className="text-sm">{item.title}</CardTitle>
                  <CardDescription className="mt-2 text-xs leading-6">{item.description}</CardDescription>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Sectors */}
      <section id="pillars" className="space-y-6 scroll-mt-28">
        <div className="flex items-center justify-between">
          <h2 className="border-r-4 border-[var(--accent-primary)] pr-3 text-xl font-bold text-[var(--text-main)]">أقسام المقالات الرئيسية</h2>
          <Link href="/tools" className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--accent-primary)]">
            <span>استكشف الأدوات</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Link key={idx} href={sec.href} className="block">
                <Card hoverEffect className="flex flex-col items-center justify-between space-y-4 p-5 text-center h-full">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-light)] text-[var(--accent-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xs">{sec.title}</CardTitle>
                    <CardDescription className="line-clamp-3 text-[11px]">{sec.description}</CardDescription>
                  </div>
                  <Badge variant="outline" size="sm">{sec.badge}</Badge>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Community Section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="border-r-4 border-[var(--accent-primary)] pr-3 text-lg font-bold text-[var(--text-main)]">ماذا يضيف المجتمع؟</h2>
          <Link href="/community" className="text-[11px] text-[var(--text-muted)] transition-colors hover:text-[var(--accent-primary)]">انضم الآن</Link>
        </div>
        <Card className="p-5">
          {communityPosts?.length ? (
            <article className="space-y-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-main)] p-4">
              <div className="flex items-center justify-between text-[10px]">
                <Badge variant="accent">منشور من المجتمع</Badge>
                <time className="text-[var(--text-muted)]" dateTime={communityPosts[0].created_at}>
                  {new Date(communityPosts[0].created_at).toLocaleDateString("ar-EG")}
                </time>
              </div>
              <h3 className="text-sm font-bold text-[var(--text-main)]">{communityPosts[0].title}</h3>
              <p className="line-clamp-3 text-[11px] leading-6 text-[var(--text-muted)]">{communityPosts[0].content}</p>
            </article>
          ) : (
            <p className="rounded-xl border border-dashed border-[var(--border-main)] p-5 text-center text-xs text-[var(--text-muted)]">
              ستظهر هنا أحدث تجارب المجتمع بعد نشرها.
            </p>
          )}
        </Card>
      </section>
    </div>
  );
}