export const ARTICLE_SECTORS = [
  {
    id: "finance",
    title: "المال والأعمال",
    href: "/finance",
    description: "استراتيجيات الاستثمار، التخطيط المالي، وبناء المشاريع الناشئة.",
  },
  {
    id: "technology",
    title: "التكنولوجيا",
    href: "/tech",
    description: "أحدث التقنيات، برمجة الويب، الذكاء الاصطناعي، والأمان الرقمي.",
  },
  {
    id: "media",
    title: "الإعلام الجديد",
    href: "/media",
    description: "صناعة المحتوى، التسويق الرقمي، والتأثير في المنصات الحديثة.",
  },
  {
    id: "digitalists",
    title: "رقميون",
    href: "/digital-lifestyle",
    description: "قصص نجاح، العمل الحر، وتمكين رواد الأعمال الرقميين.",
  },
] as const;

export type SectorId = (typeof ARTICLE_SECTORS)[number]["id"];
