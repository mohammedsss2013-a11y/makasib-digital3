"use client";

import { useMemo, useState } from "react";
import { Check, Copy, RotateCcw, Sparkles, Wrench } from "lucide-react";
import { z } from "zod";

type FieldType = "text" | "number" | "select" | "textarea";

type ToolField = {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  defaultValue: string;
  required?: boolean;
};

type ToolConfig = {
  title: string;
  description: string;
  fields: ToolField[];
};

const defaultConfigs: Record<string, ToolConfig> = {
  "vat-calculator": {
    title: "حاسبة ضريبة القيمة المضافة",
    description: "احسب قيمة الضريبة والسعر النهائي أو استخرج السعر قبل الضريبة.",
    fields: [
      { id: "amount", label: "المبلغ ($)", type: "number", defaultValue: "1000" },
      { id: "rate", label: "نسبة الضريبة (%)", type: "number", defaultValue: "15" },
      { id: "mode", label: "طريقة الإدخال", type: "select", options: ["قبل الضريبة", "شامل الضريبة"], defaultValue: "قبل الضريبة" },
    ],
  },
  "payment-gateway-comparator": {
    title: "مقارن بوابات الدفع",
    description: "قارن صافي المبلغ بعد رسوم بوابات الدفع الشائعة.",
    fields: [
      { id: "amount", label: "قيمة العملية ($)", type: "number", defaultValue: "1000" },
      { id: "gateway", label: "البوابة", type: "select", options: ["Stripe", "PayPal", "Moyasar", "Tap"], defaultValue: "Stripe" },
    ],
  },
  "ai-token-cost-calculator": {
    title: "حاسبة تكلفة نماذج الذكاء الاصطناعي",
    description: "قدّر تكلفة الإدخال والإخراج بناءً على عدد tokens والأسعار التقريبية.",
    fields: [
      { id: "inputTokens", label: "Tokens الإدخال لكل شهر", type: "number", defaultValue: "1000000" },
      { id: "outputTokens", label: "Tokens الإخراج لكل شهر", type: "number", defaultValue: "250000" },
      { id: "inputRate", label: "سعر مليون input tokens ($)", type: "number", defaultValue: "5" },
      { id: "outputRate", label: "سعر مليون output tokens ($)", type: "number", defaultValue: "15" },
    ],
  },
  "content-plan-generator": {
    title: "مولد خطة المحتوى الشهرية",
    description: "أنشئ إيقاع نشر عملياً من هدفك وجمهورك والمنصة الأساسية.",
    fields: [
      { id: "topic", label: "الموضوع الرئيسي", type: "text", defaultValue: "العمل الحر", required: true },
      { id: "audience", label: "الجمهور المستهدف", type: "text", defaultValue: "المستقلون الجدد", required: true },
      { id: "platform", label: "المنصة الأساسية", type: "select", options: ["إنستغرام", "لينكدإن", "يوتيوب", "إكس"], defaultValue: "لينكدإن" },
      { id: "posts", label: "عدد المنشورات أسبوعياً", type: "number", defaultValue: "3" },
    ],
  },
  "break-even-calculator": {
    title: "حاسبة هامش الربح ونقطة التعادل",
    description: "اعرف عدد المبيعات المطلوبة لتغطية تكاليف مشروعك.",
    fields: [
      { id: "fixedCosts", label: "التكاليف الثابتة الشهرية ($)", type: "number", defaultValue: "1500" },
      { id: "price", label: "سعر البيع للوحدة ($)", type: "number", defaultValue: "100" },
      { id: "variableCost", label: "التكلفة المتغيرة للوحدة ($)", type: "number", defaultValue: "40" },
    ],
  },
  "cash-flow-calculator": {
    title: "حاسبة التدفقات النقدية والميزانية",
    description: "قارن دخلك ومصروفاتك واعرف رصيدك المتوقع.",
    fields: [
      { id: "income", label: "الدخل الشهري ($)", type: "number", defaultValue: "5000" },
      { id: "expenses", label: "المصروفات الشهرية ($)", type: "number", defaultValue: "2800" },
      { id: "startingBalance", label: "الرصيد الحالي ($)", type: "number", defaultValue: "1000" },
    ],
  },
  "cloud-cost-calculator": {
    title: "حاسبة تكاليف استضافة الخوادم",
    description: "قدّر ميزانية الاستضافة الشهرية قبل إطلاق مشروعك.",
    fields: [
      { id: "compute", label: "الخادم والمعالجة ($)", type: "number", defaultValue: "45" },
      { id: "storage", label: "التخزين والنسخ الاحتياطي ($)", type: "number", defaultValue: "20" },
      { id: "traffic", label: "النقل والخدمات الإضافية ($)", type: "number", defaultValue: "15" },
    ],
  },
  "engagement-rate-calculator": {
    title: "حاسبة معدل التفاعل",
    description: "احسب نسبة تفاعل جمهورك مع المحتوى المنشور.",
    fields: [
      { id: "likes", label: "الإعجابات والتفاعلات", type: "number", defaultValue: "850" },
      { id: "comments", label: "التعليقات والمشاركات", type: "number", defaultValue: "120" },
      { id: "reach", label: "الوصول أو عدد المتابعين", type: "number", defaultValue: "12000" },
    ],
  },
  "creator-earnings-calculator": {
    title: "أداة تقدير أرباح المحتوى والإعلانات",
    description: "قدّر العائد الشهري المحتمل من المشاهدات والإعلانات.",
    fields: [
      { id: "views", label: "المشاهدات الشهرية", type: "number", defaultValue: "100000" },
      { id: "rpm", label: "العائد لكل ألف مشاهدة ($)", type: "number", defaultValue: "3" },
      { id: "sponsorships", label: "دخل الرعايات ($)", type: "number", defaultValue: "500" },
    ],
  },
  "focus-time-calculator": {
    title: "حاسبة ساعات التركيز والراحة",
    description: "نظّم يومك بين جلسات التركيز والاستراحات المتوازنة.",
    fields: [
      { id: "availableHours", label: "الساعات المتاحة اليوم", type: "number", defaultValue: "8" },
      { id: "sessionLength", label: "طول جلسة التركيز بالدقائق", type: "number", defaultValue: "50" },
      { id: "breakLength", label: "طول الاستراحة بالدقائق", type: "number", defaultValue: "10" },
    ],
  },
  "aura-life-score": {
    title: "أداة تقييم جودة الحياة والإنتاجية الرقمية",
    description: "قيّم توازنك الرقمي بسرعة واحصل على خطوة عملية.",
    fields: [
      { id: "sleep", label: "جودة النوم من 1 إلى 10", type: "number", defaultValue: "7" },
      { id: "focus", label: "التركيز من 1 إلى 10", type: "number", defaultValue: "6" },
      { id: "balance", label: "التوازن من 1 إلى 10", type: "number", defaultValue: "7" },
    ],
  },
  "burnout-prevention-checker": {
    title: "أداة الوقاية من الاحتراق الرقمي",
    description: "افحص مؤشرات الإجهاد الرقمي وحدد أول إجراء وقائي.",
    fields: [
      { id: "workHours", label: "ساعات العمل اليومية", type: "number", defaultValue: "8" },
      { id: "breaks", label: "عدد الاستراحات اليومية", type: "number", defaultValue: "3" },
      { id: "energy", label: "مستوى الطاقة من 1 إلى 10", type: "number", defaultValue: "6" },
    ],
  },
  "learning-path-builder": {
    title: "أداة تخطيط مسار التعلم الذاتي",
    description: "حوّل مهارتك المستهدفة إلى خطة تعلم أسبوعية قابلة للتنفيذ.",
    fields: [
      { id: "skill", label: "المهارة المستهدفة", type: "text", defaultValue: "تحليل البيانات", required: true },
      { id: "weeks", label: "مدة الخطة بالأسابيع", type: "number", defaultValue: "8" },
      { id: "hours", label: "ساعات التعلم أسبوعيًا", type: "number", defaultValue: "5" },
    ],
  },
  "headline-generator": {
    title: "مولد عناوين وأفكار المقالات",
    description: "أنشئ زوايا تحريرية وعناوين أولية لموضوعك.",
    fields: [
      { id: "topic", label: "موضوع المقال", type: "text", defaultValue: "العمل الحر", required: true },
      { id: "audience", label: "الجمهور المستهدف", type: "text", defaultValue: "المستقلون الجدد" },
      { id: "tone", label: "نبرة العنوان", type: "select", options: ["عملية", "تعليمية", "ملهمة"], defaultValue: "عملية" },
    ],
  },
  "posting-time-optimizer": {
    title: "حاسبة أوقات النشر المثالية",
    description: "حوّل نشاط جمهورك المتوقع إلى نافذة نشر عملية.",
    fields: [
      { id: "audienceTime", label: "ساعة ذروة نشاط الجمهور", type: "number", defaultValue: "19" },
      { id: "platform", label: "المنصة", type: "select", options: ["إنستغرام", "لينكدإن", "يوتيوب", "إكس"], defaultValue: "إنستغرام" },
      { id: "frequency", label: "عدد المنشورات أسبوعيًا", type: "number", defaultValue: "3" },
    ],
  },
  "privacy-policy-generator": {
    title: "مولد سياسات الخصوصية والأمان",
    description: "أنشئ مسودة أولية لسياسة خصوصية قابلة للتخصيص لموقعك.",
    fields: [
      { id: "siteName", label: "اسم الموقع أو التطبيق", type: "text", defaultValue: "موقعي الرقمي", required: true },
      { id: "email", label: "بريد التواصل", type: "text", defaultValue: "privacy@example.com", required: true },
      { id: "data", label: "البيانات التي تجمعها", type: "textarea", defaultValue: "الاسم والبريد الإلكتروني وبيانات الاستخدام", required: true },
    ],
  },
  "prompt-optimizer": {
    title: "أداة فحص وترتيب الأوامر الذكية",
    description: "حوّل فكرتك إلى prompt أوضح وأكثر قابلية للقياس.",
    fields: [
      { id: "prompt", label: "الأمر أو الفكرة الحالية", type: "textarea", defaultValue: "اكتب مقالًا عن التسويق الرقمي", required: true },
      { id: "audience", label: "الجمهور المستهدف", type: "text", defaultValue: "أصحاب المشاريع الصغيرة" },
      { id: "format", label: "صيغة المخرجات", type: "select", options: ["نقاط عملية", "مقال منظم", "جدول مقارنة"], defaultValue: "نقاط عملية" },
    ],
  },
};

const fallbackConfig: ToolConfig = {
  title: "المشغل التفاعلي",
  description: "أدخل البيانات المطلوبة للحصول على نتيجة أولية قابلة للتخصيص.",
  fields: [{ id: "details", label: "التفاصيل", type: "textarea", defaultValue: "", required: true }],
};

function numberValue(values: Record<string, string>, id: string) {
  return Number(values[id]) || 0;
}

function generateResult(slug: string, values: Record<string, string>, config: ToolConfig) {
  const numbers = Object.values(values).map(Number).filter(Number.isFinite);
  const average = numbers.length ? numbers.reduce((sum, value) => sum + value, 0) / numbers.length : 0;

  if (slug === "vat-calculator") {
    const amount = numberValue(values, "amount");
    const rate = numberValue(values, "rate") / 100;
    const net = values.mode === "شامل الضريبة" ? amount / (1 + rate) : amount;
    const tax = values.mode === "شامل الضريبة" ? amount - net : amount * rate;
    return `المبلغ قبل الضريبة: ${net.toFixed(2)} $\nالضريبة: ${tax.toFixed(2)} $\nالإجمالي: ${(net + tax).toFixed(2)} $`;
  }
  if (slug === "payment-gateway-comparator") {
    const rates: Record<string, [number, number]> = { Stripe: [2.9, 0.3], PayPal: [3.49, 0.49], Moyasar: [2.7, 1], Tap: [2.5, 1] };
    const [percent, fixed] = rates[values.gateway] ?? rates.Stripe;
    const amount = numberValue(values, "amount");
    const fee = amount * percent / 100 + fixed;
    return `البوابة: ${values.gateway}\nالرسوم التقديرية: ${fee.toFixed(2)} $\nالصافي المستلم: ${Math.max(0, amount - fee).toFixed(2)} $`;
  }
  if (slug === "ai-token-cost-calculator") {
    const inputCost = numberValue(values, "inputTokens") / 1_000_000 * numberValue(values, "inputRate");
    const outputCost = numberValue(values, "outputTokens") / 1_000_000 * numberValue(values, "outputRate");
    return `تكلفة الإدخال: ${inputCost.toFixed(2)} $\nتكلفة الإخراج: ${outputCost.toFixed(2)} $\nالإجمالي الشهري: ${(inputCost + outputCost).toFixed(2)} $`;
  }
  if (slug === "content-plan-generator") {
    const posts = Math.max(1, Math.round(numberValue(values, "posts")));
    return `خطة ${values.topic} لجمهور ${values.audience} على ${values.platform}\n\nالأسبوع 1: سؤال شائع + دليل عملي\nالأسبوع 2: دراسة حالة + خطأ شائع\nالأسبوع 3: قائمة أدوات + رأي تحليلي\nالأسبوع 4: ملخص النتائج + دعوة للنقاش\n\nالإيقاع المقترح: ${posts} منشورات أسبوعياً.`;
  }

  if (slug === "break-even-calculator") {
    const margin = numberValue(values, "price") - numberValue(values, "variableCost");
    const units = margin > 0 ? Math.ceil(numberValue(values, "fixedCosts") / margin) : 0;
    return `هامش الربح للوحدة: ${Math.max(0, margin).toFixed(2)} $\nنقطة التعادل: ${units} وحدة\n\nملاحظة: راجع التكاليف المتغيرة قبل اعتماد السعر النهائي.`;
  }
  if (slug === "cash-flow-calculator") {
    const net = numberValue(values, "income") - numberValue(values, "expenses");
    return `صافي التدفق الشهري: ${net.toFixed(2)} $\nالرصيد المتوقع: ${(numberValue(values, "startingBalance") + net).toFixed(2)} $\n\n${net >= 0 ? "تدفقك موجب. خصص جزءًا للطوارئ." : "تدفقك سالب. راجع المصروفات أو ارفع الدخل المتكرر."}`;
  }
  if (slug === "engagement-rate-calculator") {
    const rate = numberValue(values, "reach") > 0 ? ((numberValue(values, "likes") + numberValue(values, "comments")) / numberValue(values, "reach")) * 100 : 0;
    return `معدل التفاعل التقديري: ${rate.toFixed(2)}%\n\nاستخدم النتيجة للمقارنة بين المنشورات، لا كحكم منفرد على جودة المحتوى.`;
  }
  if (slug === "privacy-policy-generator") {
    return `مسودة سياسة الخصوصية لـ ${values.siteName}\n\nيجمع ${values.siteName} البيانات التالية: ${values.data}. تُستخدم هذه البيانات لتقديم الخدمة وتحسين التجربة. للاستفسارات أو طلبات الوصول والحذف، تواصل معنا عبر ${values.email}.\n\nتُراجع هذه المسودة قانونيًا قبل نشرها، لأنها ليست استشارة قانونية.`;
  }
  if (slug === "headline-generator") {
    return [`${values.topic}: دليل عملي لـ${values.audience}`, `7 أخطاء شائعة في ${values.topic} وكيف تتجنبها`, `كيف تبدأ في ${values.topic} بخطة ${values.tone} واضحة`].join("\n");
  }
  if (slug === "prompt-optimizer") {
    return `الدور: خبير متخصص في الموضوع\nالمهمة: ${values.prompt}\nالجمهور: ${values.audience}\nالمخرجات: ${values.format}\nالمعايير: اذكر الافتراضات، نظم الإجابة بعناوين، وأنهِ بخطوات قابلة للتنفيذ.`;
  }
  if (slug === "learning-path-builder") {
    const weeks = Math.max(1, Math.round(numberValue(values, "weeks")));
    return `خطة تعلم ${values.skill}\n\nالمدة: ${weeks} أسابيع\nالالتزام الأسبوعي: ${numberValue(values, "hours")} ساعات\n\nالأسبوع 1-2: الأساسيات والمفاهيم الرئيسية\nالأسبوع 3-${Math.max(3, Math.ceil(weeks / 2))}: تطبيقات صغيرة\nالمرحلة الأخيرة: مشروع عملي ومراجعة النتائج`;
  }
  if (["aura-life-score", "burnout-prevention-checker"].includes(slug)) {
    const score = Math.round(average * 10);
    return `النتيجة التقديرية: ${score}/100\n\n${score >= 70 ? "مؤشراتك جيدة. حافظ على العادات التي تدعم توازنك." : "ابدأ بخطوة صغيرة: أضف استراحة قصيرة وحدد وقتًا واضحًا لإنهاء العمل."}`;
  }
  if (slug === "focus-time-calculator") {
    const cycle = numberValue(values, "sessionLength") + numberValue(values, "breakLength");
    const sessions = cycle > 0 ? Math.floor((numberValue(values, "availableHours") * 60) / cycle) : 0;
    return `جلسات التركيز المقترحة: ${sessions}\nإجمالي التركيز: ${(sessions * numberValue(values, "sessionLength"))} دقيقة\nإجمالي الاستراحات: ${(sessions * numberValue(values, "breakLength"))} دقيقة`;
  }
  if (slug === "cloud-cost-calculator" || slug === "creator-earnings-calculator") {
    return `التقدير الشهري: ${numbers.reduce((sum, value) => sum + value, 0).toFixed(2)} $\n\nهذه نتيجة تقديرية. تحقق من الأسعار الفعلية وحجم الاستخدام قبل اتخاذ قرار مالي.`;
  }
  return `${config.title}\n\nتم تحليل المدخلات بنجاح. استخدم النتيجة التالية كنقطة بداية: ${numbers.length ? `المتوسط ${average.toFixed(2)}` : "راجع التفاصيل المدخلة"}.`;
}

export function GenericToolRunner({ slug }: { slug: string }) {
  const config = defaultConfigs[slug] ?? fallbackConfig;
  const initialValues = useMemo(() => Object.fromEntries(config.fields.map((field) => [field.id, field.defaultValue])), [config]);
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function updateValue(id: string, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const schema = z.object(Object.fromEntries(config.fields.map((field) => [field.id, field.required ? z.string().trim().min(1, `يرجى إدخال ${field.label}`) : z.string()])));
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "راجع البيانات المدخلة.");
      return;
    }
    setError("");
    setResult(generateResult(slug, values, config));
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function reset() {
    setValues(initialValues);
    setResult("");
    setError("");
  }

  return (
    <section className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-100 shadow-xl sm:p-8" dir="rtl">
      <header className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-start gap-3">
          <span className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-300"><Wrench className="h-5 w-5" aria-hidden="true" /></span>
          <div><h3 className="text-lg font-black text-white">{config.title}</h3><p className="mt-1 text-xs leading-6 text-slate-400">{config.description}</p></div>
        </div>
        <Sparkles className="mt-1 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
      </header>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        {config.fields.map((field) => <label key={field.id} className={field.type === "textarea" ? "md:col-span-2" : ""}><span className="mb-1.5 block text-xs font-semibold text-slate-300">{field.label}</span>{field.type === "textarea" ? <textarea value={values[field.id]} onChange={(event) => updateValue(field.id, event.target.value)} placeholder={field.placeholder} rows={4} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400" /> : field.type === "select" ? <select value={values[field.id]} onChange={(event) => updateValue(field.id, event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400">{field.options?.map((option) => <option key={option}>{option}</option>)}</select> : <input type={field.type} value={values[field.id]} onChange={(event) => updateValue(field.id, event.target.value)} placeholder={field.placeholder} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400" />}</label>)}
        {error && <p className="md:col-span-2 text-sm text-rose-400" role="alert">{error}</p>}
        <div className="flex flex-wrap gap-2 md:col-span-2"><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-300"><Sparkles className="h-4 w-4" aria-hidden="true" />إنشاء النتيجة</button><button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800"><RotateCcw className="h-4 w-4" aria-hidden="true" />إعادة الضبط</button></div>
      </form>
      {result && <div className="rounded-xl border border-emerald-400/30 bg-slate-950 p-4"><div className="mb-3 flex items-center justify-between gap-2"><strong className="text-sm text-emerald-300">النتيجة</strong><button type="button" onClick={copyResult} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800" title="نسخ النتيجة">{copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "تم النسخ" : "نسخ"}</button></div><pre className="whitespace-pre-wrap text-sm leading-7 text-slate-300">{result}</pre></div>}
    </section>
  );
}