export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  subcategorySlug: string;
  categoryLabel: string;
  subcategoryLabel: string;
  author: string;
  publishedAt: string;
  readTime: string;
  content: string;
}

export const ARTICLES_DATA: Article[] = [
  {
    id: "1",
    slug: "practical-ai-tools-2026",
    title: "تطبيقات الذكاء الاصطناعي العملية في بيئة العمل الرقمية",
    description: "كيف تستفيد من نماذج الذكاء الاصطناعي وأتمتة المهام اليومية لرفع الإنتاجية بقرارات عملية.",
    categorySlug: "tech",
    subcategorySlug: "ai",
    categoryLabel: "التكنولوجيا والابتكار",
    subcategoryLabel: "تطبيقات الذكاء الاصطناعي",
    author: "فريق مكاسب رقمية",
    publishedAt: "2026-08-20",
    readTime: "6 دقائق",
    content: `الذكاء الاصطناعي لم يعد مجرد أداة تجريبية، بل أصبح ركيزة أساسية في البيئة البرمجية وإدارة الأعمال.

محاور المقال الرئيسية:

1. أتمتة مهام خدمة العملاء والتواصل.
2. تسريع عملية كتابة وتوثيق الأكواد.
3. تحليل البيانات واتخاذ قرارات معتمدة على المؤشرات.

ابدأ بمهمة متكررة واحدة، قس أثرها خلال أسبوع، ثم وسّع الاستخدام تدريجيًا بدل بناء نظام كبير قبل اختبار القيمة.`,
  },
  {
    id: "2",
    slug: "value-pricing-freelancing",
    title: "من نظام الساعة إلى نظام القيمة: المعادلة الذهبية للعمل الحر",
    description: "استراتيجيات تقديم التسعير المبني على العوائد المباشرة بدلًا من حساب ساعات العمل فقط.",
    categorySlug: "finance",
    subcategorySlug: "freelancing",
    categoryLabel: "المال والأعمال",
    subcategoryLabel: "العمل الحر والمشاريع المصغرة",
    author: "فريق مكاسب رقمية",
    publishedAt: "2026-08-18",
    readTime: "8 دقائق",
    content: `الانتقال من تسعير الوقت إلى تسعير القيمة هو الخطوة الأولى لتنظيم أعمالك كاستشاري مستقل وليس مجرد منفذ.

ابدأ بفهم النتيجة التي يريدها العميل، ثم اربط عرضك بمؤشرات قابلة للقياس مثل زيادة المبيعات أو تقليل وقت التشغيل.

لا يعني ذلك تجاهل الوقت والتكاليف؛ بل استخدامهما داخليًا لحماية هامش الربح، مع تقديم العرض للعميل بوصفه قيمة واضحة ومخرجات محددة.`,
  },
];

export function getArticle(category: string, subcategory: string, slug: string) {
  return ARTICLES_DATA.find(
    (article) =>
      article.categorySlug === category &&
      article.subcategorySlug === subcategory &&
      article.slug === slug,
  );
}

export function getArticlesBySubcategory(category: string, subcategory: string) {
  return ARTICLES_DATA.filter(
    (article) => article.categorySlug === category && article.subcategorySlug === subcategory,
  );
}
