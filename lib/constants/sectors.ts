import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BriefcaseBusiness,
  Coins,
  Cpu,
  Gamepad2,
  HeartPulse,
  LockKeyhole,
  Radio,
  Rocket,
  Share2,
  Sparkles,
  Wallet,
  Wifi,
} from "lucide-react";

export interface ArticleTopic {
  slug: string;
  title: string;
}

export interface ArticleBranch {
  slug: string;
  title: string;
  icon: LucideIcon;
  topics: readonly ArticleTopic[];
}

export const ARTICLE_SECTORS = [
  {
    id: "finance",
    title: "المال والأعمال",
    href: "/finance",
    description: "استراتيجيات الاستثمار، التخطيط المالي، وبناء المشاريع الناشئة.",
    branches: [
      { slug: "investment", title: "الاستثمار", icon: Coins, topics: [{ slug: "digital-currencies", title: "العملات الرقمية" }, { slug: "financial-markets", title: "الأسواق المالية" }, { slug: "digital-real-estate", title: "الاستثمار العقاري الرقمي" }] },
      { slug: "freelance-economy", title: "الاقتصاد الحر", icon: Wallet, topics: [{ slug: "independent-work", title: "الوظائف المستقلة" }, { slug: "ecommerce", title: "التجارة الإلكترونية" }, { slug: "multiple-income", title: "مصادر الدخل المتعددة" }] },
      { slug: "entrepreneurship", title: "ريادة الأعمال", icon: Rocket, topics: [{ slug: "startups", title: "الشركات الناشئة" }, { slug: "funding-rounds", title: "جولات التمويل" }, { slug: "digital-franchising", title: "الامتياز التجاري الرقمي" }] },
    ] satisfies readonly ArticleBranch[],
  },
  {
    id: "technology",
    title: "التكنولوجيا",
    href: "/tech",
    description: "أحدث التقنيات، برمجة الويب، الذكاء الاصطناعي، والأمان الرقمي.",
    branches: [
      { slug: "artificial-intelligence", title: "الذكاء الاصطناعي", icon: Bot, topics: [{ slug: "ai-models", title: "نماذج الذكاء الاصطناعي" }, { slug: "ai-agents", title: "الوكلاء الذكيون" }, { slug: "ai-ethics", title: "أخلاقيات الذكاء الاصطناعي" }] },
      { slug: "cybersecurity", title: "الأمن السيبراني", icon: LockKeyhole, topics: [{ slug: "data-protection", title: "حماية البيانات" }, { slug: "encryption", title: "التشفير" }, { slug: "cyberattacks", title: "الهجمات السيبرانية" }] },
      { slug: "emerging-tech", title: "التقنيات الناشئة", icon: Cpu, topics: [{ slug: "quantum-computing", title: "الحوسبة الكمومية" }, { slug: "green-tech", title: "التكنولوجيا الخضراء" }, { slug: "iot", title: "إنترنت الأشياء (IoT)" }] },
    ] satisfies readonly ArticleBranch[],
  },
  {
    id: "media",
    title: "الإعلام الجديد",
    href: "/media",
    description: "صناعة المحتوى، التسويق الرقمي، والتأثير في المنصات الحديثة.",
    branches: [
      { slug: "content-creation", title: "صناعة المحتوى", icon: Radio, topics: [{ slug: "live-streaming", title: "البث المباشر" }, { slug: "creator-economy", title: "اقتصاد المبدعين" }, { slug: "podcast-studios", title: "استوديوهات البودكاست" }] },
      { slug: "social-platforms", title: "منصات التواصل الاجتماعي", icon: Share2, topics: [{ slug: "digital-communities", title: "المجتمعات الرقمية" }, { slug: "modern-digital-marketing", title: "التسويق الرقمي الحديث" }, { slug: "interactive-ads", title: "الإعلانات التفاعلية" }] },
      { slug: "gaming", title: "الألعاب (Gaming)", icon: Gamepad2, topics: [{ slug: "game-streaming", title: "بث الألعاب" }, { slug: "esports", title: "الرياضات الإلكترونية" }, { slug: "game-development", title: "تطوير الألعاب" }] },
    ] satisfies readonly ArticleBranch[],
  },
  {
    id: "digitalists",
    title: "رقميون - أسلوب الحياة الرقمي",
    href: "/digital-lifestyle",
    description: "قصص نجاح، العمل الحر، وتمكين رواد الأعمال الرقميين.",
    branches: [
      { slug: "remote-work", title: "العمل عن بعد", icon: Wifi, topics: [{ slug: "digital-nomadism", title: "الترحال الرقمي" }, { slug: "personal-knowledge", title: "إدارة المعرفة الشخصية" }, { slug: "satellite-connectivity", title: "الاتصال الفضائي والمتنقل" }] },
      { slug: "virtual-reality", title: "الواقع الافتراضي", icon: Sparkles, topics: [{ slug: "vr-work-entertainment", title: "العمل والترفيه" }, { slug: "virtual-communities", title: "المجتمعات والبيئات الافتراضية" }, { slug: "home-tech-learning", title: "التعليم المنزلي بالتقنية" }] },
      { slug: "digital-health", title: "الصحة الرقمية", icon: HeartPulse, topics: [{ slug: "digital-toxins", title: "السموم الرقمية" }, { slug: "mindfulness", title: "اليقظة الذهنية" }, { slug: "biohealth", title: "الصحة الحيوية" }] },
    ] satisfies readonly ArticleBranch[],
  },
] as const;

export type SectorId = (typeof ARTICLE_SECTORS)[number]["id"];
