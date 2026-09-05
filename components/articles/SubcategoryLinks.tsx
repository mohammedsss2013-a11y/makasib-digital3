import Link from "next/link";
import { ArrowLeft, ListTree } from "lucide-react";

interface SubcategoryLink {
  title: string;
  href: string;
  description: string;
}

const subcategories: Record<string, SubcategoryLink[]> = {
  finance: [
    { title: "العمل الحر وإدارة المشاريع المصغرة", href: "/finance/freelancing", description: "حاسبة تسعير الخدمات ومولد العقود المباشرة" },
    { title: "التجارة الإلكترونية والبيع الرقمي", href: "/finance/ecommerce", description: "حاسبة صافي هامش الربح ومقارن العمولات" },
    { title: "التسويق الرقمي وعائد الإعلانات", href: "/finance/marketing", description: "قياس ROAS وCAC ونقطة التعادل" },
    { title: "اقتصاد صناعة المحتوى", href: "/finance/content-economy", description: "تسعير الرعايات والعضويات الرقمية" },
    { title: "العملات الرقمية والبلوكشين", href: "/finance/crypto", description: "حماية المحافظ والعملات المستقرة" },
    { title: "العتاد والإنتاجية المالية", href: "/finance/hardware", description: "حاسبة إهلاك العتاد وتجهيز بيئة العمل" },
  ],
  tech: [
    { title: "تطبيقات وأنظمة الذكاء الاصطناعي", href: "/tech/ai-apps", description: "حاسبة API وTokens ومقارن النماذج" },
    { title: "الأمن السيبراني والخصوصية الرقمية", href: "/tech/cybersecurity", description: "فحص قوة كلمات المرور والتشفير" },
    { title: "الحوسبة السحابية وأدوات العمل عن بُعد", href: "/tech/cloud-remote", description: "مقارن VPS وServerless والعمل الموزع" },
    { title: "تطوير البنية الرقمية وتقنيات المستقبل", href: "/tech/infra", description: "معايير Core Web Vitals وتقنيات Edge" },
    { title: "إنترنت الأشياء والتقنيات الناشئة", href: "/tech/iot-emerging", description: "بروتوكولات IoT وTinyML" },
  ],
  media: [
    { title: "صناعة المحتوى المرئي والمكتوب", href: "/media/creation", description: "هيكلية الفيديو القصير والعناوين الجاذبة" },
    { title: "أخبار وتحليلات الصناعة الرقمية", href: "/media/news", description: "رادار الخوارزميات والتقارير التحليلية" },
    { title: "البودكاست والبودكاست المرئي", href: "/media/podcasting", description: "التجهيزات الصوتية واستراتيجيات التوزيع" },
    { title: "منصات البث الحي والتفاعل", href: "/media/streaming", description: "حاسبة الدعم وإعدادات Bitrate" },
    { title: "الترفيه الرقمي والألعاب", href: "/media/gaming", description: "بطولات Esports وتطوير الألعاب المستقلة" },
  ],
  lifestyle: [
    { title: "إدارة الحياة الرقمية والتنظيم", href: "/digital-lifestyle/life-management", description: "بناء الدماغ الثاني وتنظيم المهام" },
    { title: "الصحة الرقمية والوقاية من الاحتراق", href: "/digital-lifestyle/health", description: "اختبار قياس Burnout والتعافي" },
    { title: "التعليم والتعلم الرقمي المستمر", href: "/digital-lifestyle/learning", description: "دليل التعلم السريع وخرائط المهارات" },
    { title: "الثقافة الرقمية العابرة للمستقبل", href: "/digital-lifestyle/culture", description: "دليل الرحالة الرقمي والبرمجيات المفتوحة" },
  ],
  community: [
    { title: "مساحة الاستشارات والتجريب", href: "/community/consultations", description: "حوارات حية واستشارات فورية" },
    { title: "مراجعات النتائج المرفقة من الأدوات", href: "/community/tool-results", description: "مشاركة وتحليل نتائج الحاسبات" },
    { title: "النقاشات الساخنة والأفكار المبتكرة", href: "/community/topics", description: "حوارات الاتجاهات والفرص المستقبلية" },
    { title: "دليل الأعضاء والموثوقية", href: "/community/directory", description: "دليل الأعضاء والخبراء والشارات" },
  ],
};

export function SubcategoryLinks({ section }: { section: keyof typeof subcategories }) {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {subcategories[section].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-emerald-500/50 hover:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-bold leading-6 text-white transition-colors group-hover:text-emerald-300">{item.title}</h3>
              <ArrowLeft aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-emerald-300" />
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
