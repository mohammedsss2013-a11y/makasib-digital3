import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, BookOpen } from "lucide-react";
import { articlesService } from "@/services/articles.service";

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export async function generateStaticParams() {
  const paths = await articlesService.getAllSlugPaths();

  return Array.from(
    new Map(
      paths.map((path) => [`${path.category}/${path.subcategory}`, { category: path.category, subcategory: path.subcategory }]),
    ).values(),
  );
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const article = (await articlesService.getAllArticles()).find(
    (item) => item.categorySlug === category && item.subcategorySlug === subcategory,
  );

  return {
    title: `${article?.subcategoryLabel ?? subcategory} | مكاسب رقمية`,
    description: "أدلة ومقالات عملية تساعدك على اتخاذ خطوة رقمية أوضح.",
    alternates: { canonical: `/articles/${category}/${subcategory}` },
  };
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const subcategoryAliases: Record<string, string[]> = {
  finance: {
    freelancing: ["العمل الحر", "المشاريع المصغرة", "freelancing", "تسعير الخدمات", "العقود", "السعر", "العميل"],
    ecommerce: ["التجارة الإلكترونية", "ecommerce", "البيع", "المتجر", "هوامش الربح", "المنتج"],
    marketing: ["التسويق الرقمي", "marketing", "الإعلانات", "الحملات", "الـ ROAS", "CAC", "التسويق"],
    "content-economy": ["صناعة المحتوى", "content economy", "العضويات", "الرعاية", "الإيرادات", "المحتوى"],
    crypto: ["العملات الرقمية", "crypto", "البلوكشين", "المحفظة", "الأمان", "التشفير"],
    hardware: ["العتاد", "hardware", "الإنتاجية", "الشاشة", "الكمبيوتر", "الجهاز"],
  },
  tech: {
    "ai-apps": ["الذكاء الاصطناعي", "ai apps", "النماذج", "openai", "claude", "gpt", "llm"],
    cybersecurity: ["الأمن السيبراني", "cybersecurity", "الحماية", "الخصوصية", "الاختراق", "2fa", "الهوية"],
    "cloud-remote": ["السحابة", "cloud", "العمل عن بعد", "remote", "الخادم", "server"],
    infra: ["البنية التقنية", "infra", "الخادم", "الاستضافة", "الأداء", "الـ VPS"],
    "iot-emerging": ["iot", "التقنيات الناشئة", "الإنترنت", "الأجهزة", "الاستشعار", "المستشعر"],
  },
  media: {
    creation: ["صناعة المحتوى", "content creation", "المرئي", "المكتوب", "السرد", "التسويق"],
    news: ["الأخبار", "التحليلات", "industry news", "المنصات", "التحليل"],
    podcasting: ["البودكاست", "podcast", "الصوت", "الحلقة", "الاستماع"],
    streaming: ["البث المباشر", "streaming", "الـ live", "التفاعل", "البث"],
    gaming: ["الترفيه", "الألعاب", "gaming", "اللعب", "المجتمع"],
  },
  "digital-lifestyle": {
    "life-management": ["إدارة الحياة الرقمية", "life management", "التنظيم", "الوقت", "الاستخدام"],
    health: ["الصحة الرقمية", "health", "التوازن", "النوم", "الإرهاق"],
    psychology: ["علم النفس الرقمي", "psychology", "الانتباه", "العادات", "السلوك"],
    learning: ["التعليم", "learning", "التعلم", "المهارات", "المحتوى التعليمي"],
    culture: ["الثقافة الرقمية", "culture", "الهوية", "الوعي", "الرقمي"],
    philosophy: ["الفلسفة", "philosophy", "العصر الرقمي", "الوعي", "التفكير"],
  },
};

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category, subcategory } = await params;
  const allArticles = await articlesService.getAllArticles();
  const relatedTerms = subcategoryAliases[category]?.[subcategory] ?? [subcategory];

  const articles = allArticles.filter((item) => {
    if (item.categorySlug !== category) return false;

    const directMatch = item.subcategorySlug === subcategory;
    if (directMatch) return true;

    const haystack = [
      item.title,
      item.description,
      item.content,
      item.subcategoryLabel,
      item.categoryLabel,
    ]
      .join(" ")
      .toLowerCase();

    return relatedTerms.some((term) => {
      const normalizedTerm = normalizeText(term);
      return normalizedTerm && haystack.includes(normalizedTerm);
    });
  });
  const section = articles[0];

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-6 dir-rtl">
      <header className="border-b border-slate-800/80 pb-8">
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          {section?.subcategoryLabel ?? `قسم: ${subcategory}`}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          المقالات المرتبطة بهذا الفرع، بما في ذلك المقالات التي تذكره أو تتناول موضوعاته بشكل مباشر.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          لا توجد مقالات مرتبطة بهذا الفرع حاليًا.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.categorySlug}/${article.subcategorySlug}/${article.slug}`}
              className="group flex min-h-64 flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-slate-900"
            >
              <div className="relative mb-5 aspect-[16/8] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                <Image src={article.coverImage} alt={article.coverImageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div>
                <div className="mb-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">{article.categoryLabel}</span>
                  <span className="rounded-full border border-slate-800 bg-slate-950 px-2.5 py-1 text-slate-400">{article.subcategoryLabel}</span>
                </div>
                <h2 className="text-xl font-bold leading-8 text-white transition-colors group-hover:text-emerald-300">{article.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">{article.description}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-500">
                <span>{new Date(article.publishedAt).toLocaleDateString("ar-EG")}</span>
                <span className="flex items-center gap-2 font-bold text-emerald-300">قراءة المقال <ArrowLeft className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
