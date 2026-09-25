// config/toolsRegistry.ts

export interface ToolItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'finance' | 'tech' | 'media' | 'digital-lifestyle';
  categoryLabel: string;
  subcategory: string;
  iconName: string;
  isInteractive?: boolean;
  href: string;
  createdAt: string; // ISO Date: "YYYY-MM-DD"
  isNew?: boolean;
  articleUrl?: string; // رابط المقال الشارح
  isCatalogOnly?: boolean;
}

export const TOOLS_REGISTRY: ToolItem[] = [
  {
    id: 'contract-generator',
    slug: 'contract-generator',
    title: 'مولد عقود العمل الحر',
    description: 'إنشاء وتوثيق عقود خدمات برمجية وتصميمية فورية مع تصدير PDF.',
    category: 'finance',
    categoryLabel: 'قطاع المال والأعمال',
    subcategory: 'العمل الحر والخدمات',
    iconName: 'FileText',
    href: '/tools/finance/contract-generator',
    createdAt: '2026-08-15',
    articleUrl: '/finance/freelancing/pricing-guide#contract-generator',
  },
  {
    id: 'freelance-pricing',
    slug: 'freelance-pricing',
    title: 'حاسبة تسعير الخدمات',
    description: 'حساب سعر الساعة المستهدف بناءً على التكاليف وهامش الربح.',
    category: 'finance',
    categoryLabel: 'قطاع المال والأعمال',
    subcategory: 'العمل الحر والخدمات',
    iconName: 'Calculator',
    href: '/tools/finance/freelance-pricing',
    createdAt: '2026-08-18',
    articleUrl: '/finance/freelancing/pricing-guide',
  },
  {
    id: 'password-checker',
    slug: 'password-checker',
    title: 'فاحص قوة كلمات المرور',
    description: 'حساب وقت الاختراق التقديري ودرجة التعقيد محلياً.',
    category: 'tech',
    categoryLabel: 'قطاع التكنولوجيا',
    subcategory: 'الأمن السيبراني',
    iconName: 'ShieldCheck',
    href: '/tech/cybersecurity',
    createdAt: '2026-08-19', // أداة حديثة
  },
  {
    id: 'vat-calculator',
    slug: 'vat-calculator',
    title: 'حاسبة ضريبة القيمة المضافة',
    description: 'احسب الضريبة والسعر النهائي بسرعة للمبيعات والخدمات.',
    category: 'finance',
    categoryLabel: 'قطاع المال والأعمال',
    subcategory: 'الضرائب والتسعير',
    iconName: 'ReceiptText',
    href: '/tools/finance/vat-calculator',
    createdAt: '2026-09-25',
    isNew: true,
  },
  {
    id: 'payment-gateway-comparator',
    slug: 'payment-gateway-comparator',
    title: 'مقارن بوابات الدفع',
    description: 'قارن رسوم بوابات الدفع واكتشف صافي المبلغ المستلم.',
    category: 'finance',
    categoryLabel: 'قطاع المال والأعمال',
    subcategory: 'المدفوعات الرقمية',
    iconName: 'Landmark',
    href: '/tools/finance/payment-gateway-comparator',
    createdAt: '2026-09-25',
    isNew: true,
  },
  {
    id: 'ai-token-cost-calculator',
    slug: 'ai-token-cost-calculator',
    title: 'حاسبة تكلفة نماذج الذكاء الاصطناعي',
    description: 'قدّر تكلفة استهلاك tokens قبل إطلاق ميزة ذكية.',
    category: 'tech',
    categoryLabel: 'قطاع التكنولوجيا',
    subcategory: 'الذكاء الاصطناعي',
    iconName: 'BrainCircuit',
    href: '/tools/tech/ai-token-cost-calculator',
    createdAt: '2026-09-25',
    isNew: true,
  },
  {
    id: 'content-plan-generator',
    slug: 'content-plan-generator',
    title: 'مولد خطة المحتوى الشهرية',
    description: 'حوّل هدفك وجمهورك إلى خطة نشر شهرية قابلة للتنفيذ.',
    category: 'media',
    categoryLabel: 'قطاع الإعلام الجديد',
    subcategory: 'صناعة المحتوى',
    iconName: 'CalendarRange',
    href: '/tools/media/content-plan-generator',
    createdAt: '2026-09-25',
    isNew: true,
  },
];

// دالة جلب الأدوات الحديثة تلقائياً (التي تم إنشاؤها خلال آخر 30 يوماً)
export const getRecentTools = () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return TOOLS_REGISTRY.filter(
    (tool) => new Date(tool.createdAt) >= thirtyDaysAgo
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const recordToolUsage = (toolId: string) => {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem('recent_tools') || '[]') as string[];
    localStorage.setItem('recent_tools', JSON.stringify([toolId, ...existing.filter((id) => id !== toolId)].slice(0, 6)));
  } catch {
    localStorage.setItem('recent_tools', JSON.stringify([toolId]));
  }
};