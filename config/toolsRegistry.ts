// config/toolsRegistry.ts

export interface ToolItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'finance' | 'tech' | 'media' | 'digital-lifestyle';
  categoryLabel: string;
  iconName: string;
  href: string;
  createdAt: string; // ISO Date: "YYYY-MM-DD"
  isNew?: boolean;
  articleUrl?: string; // رابط المقال الشارح
}

export const TOOLS_REGISTRY: ToolItem[] = [
  {
    id: 'contract-generator',
    slug: 'contract-generator',
    title: 'مولد عقود العمل الحر',
    description: 'إنشاء وتوثيق عقود خدمات برمجية وتصميمية فورية مع تصدير PDF.',
    category: 'finance',
    categoryLabel: 'قطاع المال والأعمال',
    iconName: 'FileText',
    href: '/finance/freelancing/pricing-guide#contract-generator',
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
    iconName: 'Calculator',
    href: '/finance/freelancing/pricing-guide#pricing-calculator',
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
    iconName: 'ShieldCheck',
    href: '/tech/cybersecurity',
    createdAt: '2026-08-19', // أداة حديثة
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