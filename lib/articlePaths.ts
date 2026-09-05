const categorySlugs: Record<string, string> = {
  "المال والأعمال": "finance",
  "قطاع المال والأعمال": "finance",
  "التكنولوجيا والابتكار": "tech",
  "قطاع التكنولوجيا": "tech",
  "الإعلام الجديد": "media",
  "قطاع الإعلام": "media",
  "رقميون - أسلوب الحياة": "digital-lifestyle",
};

const subcategorySlugs: Record<string, Record<string, string>> = {
  finance: {
    "العمل الحر والخدمات": "freelancing",
    "العمل الحر والمشاريع المصغرة": "freelancing",
    "التجارة الإلكترونية": "ecommerce",
    "التسويق الرقمي": "marketing",
    "التجارة الإلكترونية والبيع الرقمي": "ecommerce",
    "التسويق الرقمي وعائد الإعلانات": "marketing",
    "اقتصاد صناعة المحتوى": "content-economy",
    "العملات الرقمية والبلوكشين": "crypto",
    "العتاد والإنتاجية المالية": "hardware",
  },
  tech: {
    "تطبيقات الذكاء الاصطناعي": "ai-apps",
    "تطبيقات وأنظمة الذكاء الاصطناعي": "ai-apps",
    "الأمن السيبراني": "cybersecurity",
    "الأمن السيبراني والخصوصية الرقمية": "cybersecurity",
    "الحوسبة السحابية": "cloud-remote",
    "الحوسبة السحابية والعمل عن بعد": "cloud-remote",
    "البنية التحتية": "infra",
    "تطوير البنية وتقنيات المستقبل": "infra",
    "إنترنت الأشياء والتقنيات الناشئة": "iot-emerging",
  },
  media: {
    "صناعة المحتوى": "creation",
    "صناعة المحتوى المرئي والمكتوب": "creation",
    "أخبار وتحليلات الصناعة الرقمية": "news",
    "البودكاست": "podcasting",
    "البودكاست والبودكاست المرئي": "podcasting",
    "البث المباشر": "streaming",
    "منصات البث الحي والتفاعل": "streaming",
    "الترفيه الرقمي والألعاب": "gaming",
  },
  "digital-lifestyle": {
    "إدارة الحياة الرقمية": "life-management",
    "إدارة الحياة الرقمية والتنظيم": "life-management",
    "الصحة الرقمية": "health",
    "الصحة الرقمية والوقاية من الاحتراق": "health",
    "التعليم والتعلم الرقمي المستمر": "learning",
    "الثقافة الرقمية العابرة للمستقبل": "culture",
    "مجتمع مكاسب": "community",
  },
};

export function toCategorySlug(category: string | null | undefined) {
  if (!category) return "general";
  return categorySlugs[category] ?? category.trim().toLowerCase().replace(/\s+/g, "-");
}

export function toSubcategorySlug(category: string | null | undefined, subcategory: string | null | undefined) {
  if (!subcategory) return "general";
  const categorySlug = toCategorySlug(category);
  return subcategorySlugs[categorySlug]?.[subcategory] ?? subcategory.trim().toLowerCase().replace(/\s+/g, "-");
}

export function getArticlePath(post: {
  category?: string | null;
  subcategory?: string | null;
  slug?: string | null;
  id: number | string;
}) {
  return `/articles/${toCategorySlug(post.category)}/${toSubcategorySlug(post.category, post.subcategory)}/${post.slug || `post-${post.id}`}`;
}
