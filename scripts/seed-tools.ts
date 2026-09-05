import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("المتغير NEXT_PUBLIC_SUPABASE_URL غير موجود في ملف .env.local");
}

if (!supabaseServiceKey) {
  throw new Error(
    "المتغير SUPABASE_SERVICE_ROLE_KEY غير موجود في ملف .env.local. أضف مفتاح Service Role من إعدادات Supabase قبل تشغيل seed؛ لا تستخدم مفتاح anon للإدراج.",
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const tools = [
  {
    title: "حاسبة تسعير خدمات العمل الحر",
    slug: "freelance-pricing-calculator",
    sector: "finance",
    description: "أداة تفاعلية لحساب سعر الساعة العادل وتحديد قيمة المشاريع بناءً على التكاليف والخبرة.",
    icon: "Calculator",
    is_interactive: true,
    status: "active",
  },
  {
    title: "مولد العقود والاتفاقيات الرقمية",
    slug: "contract-generator",
    sector: "finance",
    description: "توليد مسودة عقد عمل حر تحدد نطاق العمل والتسليم والالتزامات المالية للطرفين.",
    icon: "FileText",
    is_interactive: true,
    status: "active",
  },
  {
    title: "حاسبة هامش الربح ونقطة التعادل",
    slug: "break-even-calculator",
    sector: "finance",
    description: "حساب هامش الربح وحجم المبيعات المطلوب لتغطية التكاليف التشغيلية.",
    icon: "TrendingUp",
    is_interactive: true,
    status: "active",
  },
  {
    title: "حاسبة التدفقات النقدية والميزانية",
    slug: "cash-flow-calculator",
    sector: "finance",
    description: "متابعة الدخل والمصروفات الشهرية وتقدير الرصيد النقدي للمشاريع الرقمية.",
    icon: "DollarSign",
    is_interactive: true,
    status: "active",
  },
  {
    title: "أداة فحص وترتيب الأوامر الذكية",
    slug: "prompt-optimizer",
    sector: "tech",
    description: "تحليل الأوامر الموجهة لنماذج الذكاء الاصطناعي واقتراح تحسينات للحصول على مخرجات أدق.",
    icon: "Sparkles",
    is_interactive: true,
    status: "active",
  },
  {
    title: "مولد سياسات الخصوصية والأمان",
    slug: "privacy-policy-generator",
    sector: "tech",
    description: "إنشاء مسودة سياسة خصوصية وأمان مناسبة للمواقع والتطبيقات الرقمية.",
    icon: "ShieldCheck",
    is_interactive: true,
    status: "active",
  },
  {
    title: "حاسبة تكاليف استضافة الخوادم",
    slug: "cloud-cost-calculator",
    sector: "tech",
    description: "تقدير التكلفة الشهرية لاستضافة المواقع والتطبيقات على المنصات السحابية.",
    icon: "Server",
    is_interactive: true,
    status: "active",
  },
  {
    title: "أداة فحص سرعة وأداء الويب",
    slug: "web-speed-checker",
    sector: "tech",
    description: "فحص مؤشرات أداء الويب الأساسية وتقديم إرشادات عملية لتحسين زمن الاستجابة.",
    icon: "Zap",
    is_interactive: false,
    status: "active",
  },
  {
    title: "أداة حساب معدل التفاعل على المنصات",
    slug: "engagement-rate-calculator",
    sector: "media",
    description: "قياس نسبة تفاعل الجمهور مع المحتوى لتحسين استراتيجية النشر.",
    icon: "BarChart2",
    is_interactive: true,
    status: "active",
  },
  {
    title: "مولد عناوين وأفكار المقالات",
    slug: "headline-generator",
    sector: "media",
    description: "اقتراح عناوين وأفكار مقالات واضحة وجذابة ومتوافقة مع محركات البحث.",
    icon: "PenTool",
    is_interactive: true,
    status: "active",
  },
  {
    title: "حاسبة أوقات النشر المثالية",
    slug: "posting-time-optimizer",
    sector: "media",
    description: "تحديد أوقات النشر المناسبة بناءً على نشاط الجمهور المستهدف.",
    icon: "Clock",
    is_interactive: true,
    status: "active",
  },
  {
    title: "أداة تقدير أرباح المحتوى والإعلانات",
    slug: "creator-earnings-calculator",
    sector: "media",
    description: "تقدير العوائد المحتملة من مشاهدات المحتوى والرعايات والإعلانات الرقمية.",
    icon: "Video",
    is_interactive: true,
    status: "active",
  },
  {
    title: "أداة تقييم جودة الحياة والإنتاجية الرقمية",
    slug: "aura-life-score",
    sector: "digital-lifestyle",
    description: "تقييم التوازن بين العمل الرقمي والحياة الشخصية والعادات اليومية.",
    icon: "Activity",
    is_interactive: true,
    status: "active",
  },
  {
    title: "حاسبة ساعات التركيز والراحة",
    slug: "focus-time-calculator",
    sector: "digital-lifestyle",
    description: "تنظيم جلسات التركيز والاستراحات اليومية لزيادة الإنتاجية دون إجهاد.",
    icon: "Smile",
    is_interactive: true,
    status: "active",
  },
  {
    title: "أداة تخطيط مسار التعلم الذاتي",
    slug: "learning-path-builder",
    sector: "digital-lifestyle",
    description: "بناء مسار زمني لاكتساب مهارة جديدة وتقسيمها إلى أهداف قابلة للمتابعة.",
    icon: "BookOpen",
    is_interactive: true,
    status: "active",
  },
  {
    title: "أداة قياس مستوى الرفاهية والوقاية من الاحتراق",
    slug: "burnout-prevention-checker",
    sector: "digital-lifestyle",
    description: "تقييم مؤشرات الإجهاد الرقمي وتقديم خطوات عملية للوقاية من الاحتراق.",
    icon: "Heart",
    is_interactive: true,
    status: "active",
  },
] as const;

async function seedTools() {
  console.log("جاري إدراج 16 أداة رقمية في جدول tools...");

  const { error } = await supabase
    .from("tools")
    .upsert(tools, { onConflict: "slug" });

  if (error) {
    throw new Error(`فشل إدراج الأدوات الرقمية: ${error.message}`);
  }

  console.log("تم بنجاح إدراج أو تحديث 16 أداة رقمية، 4 أدوات لكل قسم.");
}

seedTools().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});