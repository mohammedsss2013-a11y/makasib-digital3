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
  },
  tech: {
    "تطبيقات الذكاء الاصطناعي": "ai-apps",
    "الأمن السيبراني": "cybersecurity",
    "الحوسبة السحابية": "cloud-remote",
    "البنية التحتية": "infra",
  },
  media: {
    "صناعة المحتوى": "creation",
    "البودكاست": "podcasting",
    "البث المباشر": "streaming",
  },
  "digital-lifestyle": {
    "إدارة الحياة الرقمية": "life-management",
    "الصحة الرقمية": "health",
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
