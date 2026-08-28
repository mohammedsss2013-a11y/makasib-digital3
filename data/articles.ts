export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  subcategorySlug: string;
  categoryLabel: string;
  subcategoryLabel: string;
  author: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  coverImageAlt: string;
  content: string;
}

export const ARTICLES_DATA: Article[] = [
  {
    id: "1",
    slug: "practical-ai-tools-2026",
    title: "تطبيقات الذكاء الاصطناعي العملية في بيئة العمل الرقمية",
    description: "كيف تستفيد من نماذج الذكاء الاصطناعي وأتمتة المهام اليومية لرفع الإنتاجية بقرارات عملية.",
    categorySlug: "tech",
    subcategorySlug: "ai",
    categoryLabel: "التكنولوجيا والابتكار",
    subcategoryLabel: "تطبيقات الذكاء الاصطناعي",
    author: "فريق مكاسب رقمية",
    publishedAt: "2026-08-20",
    readTime: "6 دقائق",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    coverImageAlt: "لوحة بيانات رقمية تعرض مؤشرات وأفكاراً مترابطة",
    content: `الذكاء الاصطناعي لم يعد مجرد أداة تجريبية، بل أصبح ركيزة أساسية في البيئة البرمجية وإدارة الأعمال.

محاور المقال الرئيسية:

1. أتمتة مهام خدمة العملاء والتواصل.
2. تسريع عملية كتابة وتوثيق الأكواد.
3. تحليل البيانات واتخاذ قرارات معتمدة على المؤشرات.

ابدأ بمهمة متكررة واحدة، قس أثرها خلال أسبوع، ثم وسّع الاستخدام تدريجيًا بدل بناء نظام كبير قبل اختبار القيمة.`,
  },
  {
    id: "2",
    slug: "value-pricing-freelancing",
    title: "من نظام الساعة إلى نظام القيمة: المعادلة الذهبية للعمل الحر",
    description: "دليل تنفيذي لتحديد سعرك دون خسارة، تأمين نطاق العمل، وتجهيز اتفاقية واضحة قبل بدء المشروع.",
    categorySlug: "finance",
    subcategorySlug: "freelancing",
    categoryLabel: "المال والأعمال",
    subcategoryLabel: "العمل الحر والمشاريع المصغرة",
    author: "فريق مكاسب رقمية",
    publishedAt: "2026-08-18",
    readTime: "8 دقائق",
    coverImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
    coverImageAlt: "فريق عمل يناقش خطة مشروع وأهدافاً تجارية",
    content: `<h2>الخلاصة التنفيذية</h2>
  <p>هدف هذا الدليل هو أن تخرج بسعر ساعة يحمي دخلك، ونطاق عمل واضح، وخطوات تعاقد تقلل احتمال تأخر الدفع. استخدم الحاسبة في نهاية الدليل، ثم عدّل العرض للعميل بناءً على النتيجة والقيمة المتوقعة.</p>
  <h2>1. احسب سعرك من نقطة التعادل</h2>
  <p>لا تعتمد على متوسطات السوق وحدها. اجمع التكاليف الثابتة الشهرية، والدخل الصافي الذي تستهدفه، ثم اقسمهما على الساعات القابلة للفوترة فقط. اترك هامشًا للطوارئ والضرائب والعمولات، لأن وقت التسويق والإدارة ليس وقتًا قابلًا للفوترة.</p>
  <p><strong>المعادلة العملية:</strong> معدل الساعة = (الدخل المستهدف + التكاليف التشغيلية) × (1 + هامش الأمان) ÷ الساعات القابلة للفوترة.</p>
  <h2>2. حوّل السعر إلى عرض واضح</h2>
  <p>ابدأ بفهم النتيجة التي يريدها العميل، ثم اربط عرضك بمخرجات قابلة للقياس مثل صفحة منشورة، تقرير تسليم، أو عدد محدد من الشاشات والتعديلات. استخدم السعر الداخلي لحماية ربحك، وقدّم للعميل قيمة ونطاقًا وموعدًا واضحًا.</p>
  <h2>3. أمّن مستحقاتك قبل التنفيذ</h2>
  <p>مرّر المشروع عبر أربع نقاط: تفاوض موثق، اتفاقية موقعة، دفعة مقدمة لا تقل عن 50%، ثم بدء التنفيذ. اكتب نطاق العمل، وعدد جولات التعديل، وموعد التسليم، وطريقة الإنهاء، واحتفظ بالملكية الفكرية حتى سداد الدفعة الأخيرة.</p>
  <h2>4. قائمة تحقق قبل الإرسال</h2>
  <ol><li>هل عرفت المخرجات والنتيجة المطلوبة بدقة؟</li><li>هل حددت الساعات القابلة للفوترة والتكاليف والهامش؟</li><li>هل ذُكرت الدفعة المقدمة وعدد التعديلات في العرض؟</li><li>هل وقّع العميل الاتفاقية قبل مشاركة الملفات أو بدء التنفيذ؟</li></ol>
  <h2>طبّق الآن</h2>
  <p>استخدم الحاسبة لتقدير معدل الساعة، ثم جهّز اتفاقية أولية من المولد المرفق. هذه النماذج استرشادية وليست بديلاً عن مراجعة قانونية متخصصة.</p>`,
  },
];

export function getArticle(category: string, subcategory: string, slug: string) {
  return ARTICLES_DATA.find(
    (article) =>
      article.categorySlug === category &&
      article.subcategorySlug === subcategory &&
      article.slug === slug,
  );
}

export function getArticlesBySubcategory(category: string, subcategory: string) {
  return ARTICLES_DATA.filter(
    (article) => article.categorySlug === category && article.subcategorySlug === subcategory,
  );
}
