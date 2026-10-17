const categorySlugs: Record<string, string> = {
  "المال والأعمال": "finance",
  "قطاع المال والأعمال": "finance",
  finance: "finance",
  "التكنولوجيا والابتكار": "tech",
  التكنولوجيا: "tech",
  "قطاع التكنولوجيا": "tech",
  tech: "tech",
  technology: "tech",
  "الإعلام الجديد": "media",
  "قطاع الإعلام": "media",
  media: "media",
  "رقميون - أسلوب الحياة": "digital-lifestyle",
  "رقميون - أسلوب الحياة الرقمي": "digital-lifestyle",
  "أسلوب الحياة الرقمي": "digital-lifestyle",
  "digital-lifestyle": "digital-lifestyle",
  digitalists: "digital-lifestyle",
};

function normalizeSlugValue(value: string | null | undefined) {
  if (!value) return "";

  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^\p{L}\p{N}\-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getNormalizedLookupValue<T extends Record<string, string>>(lookup: T, value: string | null | undefined) {
  if (!value) return undefined;

  const direct = lookup[value];
  if (direct) return direct;

  const normalizedValue = normalizeSlugValue(value);
  if (!normalizedValue) return undefined;

  for (const [lookupKey, routeSlug] of Object.entries(lookup)) {
    if (normalizeSlugValue(lookupKey) === normalizedValue) return routeSlug;
  }

  return undefined;
}

const subcategorySlugs: Record<string, Record<string, string>> = {
  finance: {
    INVESTMENT: "investment",
    investment: "investment",
    freelancing: "freelancing",
    ecommerce: "ecommerce",
    marketing: "marketing",
    "content-economy": "content-economy",
    crypto: "crypto",
    hardware: "hardware",
    "freelance-economy": "freelance-economy",
    "الاستثمار": "investment",
    "الاقتصاد الحر": "freelance-economy",
    "ريادة الأعمال": "entrepreneurship",
    "العمل الحر والخدمات": "freelance-economy",
    "العمل الحر والمشاريع المصغرة": "freelance-economy",
    "التسويق الرقمي": "freelance-economy",
    "اقتصاد صناعة المحتوى": "freelance-economy",
    "العتاد والإنتاجية المالية": "entrepreneurship",
    "التجارة الإلكترونية": "freelance-economy",
    "التجارة الإلكترونية والبيع الرقمي": "freelance-economy",
    "التسويق الرقمي وعائد الإعلانات": "freelance-economy",
    "العملات الرقمية والبلوكشين": "investment",
    "الأسواق المالية": "investment",
    "الاستثمار العقاري الرقمي": "investment",
  },
  tech: {
    "ai-apps": "ai-apps",
    "cloud-remote": "cloud-remote",
    infra: "infra",
    "iot-emerging": "iot-emerging",
    cybersecurity: "cybersecurity",
    "الذكاء الاصطناعي": "artificial-intelligence",
    "التقنيات الناشئة": "emerging-tech",
    "تطبيقات الذكاء الاصطناعي": "artificial-intelligence",
    "تطبيقات وأنظمة الذكاء الاصطناعي": "artificial-intelligence",
    "الحوسبة السحابية": "emerging-tech",
    "الحوسبة السحابية والعمل عن بعد": "emerging-tech",
    "البنية التحتية": "emerging-tech",
    "تطوير البنية وتقنيات المستقبل": "emerging-tech",
    "إنترنت الأشياء": "emerging-tech",
    "إنترنت الأشياء والتقنيات الناشئة": "emerging-tech",
    "الأمن السيبراني": "cybersecurity",
    "الأمن السيبراني والخصوصية الرقمية": "cybersecurity",
  },
  media: {
    creation: "creation",
    news: "news",
    podcasting: "podcasting",
    streaming: "streaming",
    gaming: "gaming",
    "صناعة المحتوى": "content-creation",
    "صناعة المحتوى المرئي والمكتوب": "content-creation",
    "أخبار وتحليلات الصناعة الرقمية": "social-platforms",
    "الأخبار والتحليلات": "social-platforms",
    "البودكاست": "content-creation",
    "البودكاست والبودكاست المرئي": "content-creation",
    "البث المباشر": "content-creation",
    "منصات البث الحي والتفاعل": "content-creation",
    "الترفيه الرقمي والألعاب": "gaming",
    "صناعة الألعاب والترفيه": "gaming",
  },
  "digital-lifestyle": {
    culture: "culture",
    health: "health",
    learning: "learning",
    "life-management": "life-management",
    philosophy: "philosophy",
    psychology: "psychology",
    "العمل عن بعد": "remote-work",
    "الواقع الافتراضي": "virtual-reality",
    "الصحة الرقمية": "digital-health",
    "إدارة الحياة الرقمية": "remote-work",
    "إدارة الحياة الرقمية والتنظيم": "remote-work",
    "الصحة الرقمية والوقاية من الاحتراق": "digital-health",
    "التعليم والتعلم الرقمي": "virtual-reality",
    "التعليم والتعلم الرقمي المستمر": "virtual-reality",
    "الثقافة الرقمية": "remote-work",
    "الثقافة الرقمية العابرة للمستقبل": "remote-work",
    "مجتمع مكاسب": "remote-work",
  },
};

const topicSlugs: Record<string, string> = {
  "العملات الرقمية": "digital-currencies", "الأسواق المالية": "financial-markets", "الاستثمار العقاري الرقمي": "digital-real-estate",
  "الوظائف المستقلة": "independent-work", "التجارة الإلكترونية": "ecommerce", "مصادر الدخل المتعددة": "multiple-income",
  "الشركات الناشئة": "startups", "جولات التمويل": "funding-rounds", "الامتياز التجاري الرقمي": "digital-franchising",
  "نماذج الذكاء الاصطناعي": "ai-models", "الوكلاء الذكيون": "ai-agents", "أخلاقيات الذكاء الاصطناعي": "ai-ethics",
  "حماية البيانات": "data-protection", "التشفير": "encryption", "الهجمات السيبرانية": "cyberattacks",
  "الحوسبة الكمومية": "quantum-computing", "التكنولوجيا الخضراء": "green-tech", "إنترنت الأشياء (IoT)": "iot",
  "البث المباشر": "live-streaming", "اقتصاد المبدعين": "creator-economy", "استوديوهات البودكاست": "podcast-studios",
  "المجتمعات الرقمية": "digital-communities", "التسويق الرقمي الحديث": "modern-digital-marketing", "الإعلانات التفاعلية": "interactive-ads",
  "بث الألعاب": "game-streaming", "الرياضات الإلكترونية": "esports", "تطوير الألعاب": "game-development",
  "الترحال الرقمي": "digital-nomadism", "إدارة المعرفة الشخصية": "personal-knowledge", "الاتصال الفضائي والمتنقل": "satellite-connectivity",
  "العمل والترفيه": "vr-work-entertainment", "المجتمعات والبيئات الافتراضية": "virtual-communities", "التعليم المنزلي بالتقنية": "home-tech-learning",
  "السموم الرقمية": "digital-toxins", "اليقظة الذهنية": "mindfulness", "الصحة الحيوية": "biohealth",
};

export function toCategorySlug(category: string | null | undefined) {
  if (!category) return "general";

  const direct = getNormalizedLookupValue(categorySlugs, category);
  if (direct) return direct;

  return normalizeSlugValue(category) || "general";
}

export function toSubcategorySlug(category: string | null | undefined, subcategory: string | null | undefined) {
  if (!subcategory) return "general";

  const categorySlug = toCategorySlug(category);
  const direct = getNormalizedLookupValue(subcategorySlugs[categorySlug] ?? {}, subcategory);
  if (direct) return direct;

  return normalizeSlugValue(subcategory) || "general";
}

export function toTopicSlug(topic: string | null | undefined) {
  if (!topic) return "";

  const direct = getNormalizedLookupValue(topicSlugs, topic);
  if (direct) return direct;

  return normalizeSlugValue(topic);
}

export function getArticlePath(post: {
  category?: string | null;
  subcategory?: string | null;
  slug?: string | null;
  id: number | string;
}) {
  return `/articles/${toCategorySlug(post.category)}/${toSubcategorySlug(post.category, post.subcategory)}/${post.slug || `post-${post.id}`}`;
}

export function getCanonicalArticlePath(article: {
  categorySlug: string;
  subcategorySlug: string;
  slug: string;
}) {
  return `/articles/${article.categorySlug}/${article.subcategorySlug}/${article.slug}`;
}
