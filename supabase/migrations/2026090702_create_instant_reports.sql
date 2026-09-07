CREATE TABLE IF NOT EXISTS public.instant_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_slug TEXT NOT NULL,
  sub_category_slug TEXT,
  badge TEXT,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_instant_reports_category_sub_unique
  ON public.instant_reports (category_slug, COALESCE(sub_category_slug, ''));

CREATE INDEX IF NOT EXISTS idx_instant_reports_slugs
  ON public.instant_reports (category_slug, sub_category_slug);

ALTER TABLE public.instant_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read instant reports" ON public.instant_reports;
CREATE POLICY "Public can read instant reports"
  ON public.instant_reports
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can update instant reports" ON public.instant_reports;
CREATE POLICY "Admins can update instant reports"
  ON public.instant_reports
  FOR UPDATE
  TO authenticated
  USING ((SELECT public.is_admin_user()))
  WITH CHECK ((SELECT public.is_admin_user()));

INSERT INTO public.instant_reports (category_slug, sub_category_slug, badge, title, description)
VALUES
  ('finance', NULL, 'قطاع صاعد', 'تسعير الخدمات والعمل الحر', 'المقالات المميزة والمجالات ذات الصلة تُظهر أفضل مسار للزوار في هذا القطاع.'),
  ('finance', 'freelancing', 'الأكثر طلباً', 'نماذج العقود واستراتيجيات التسعير', 'التقرير الفوري الخاص بمسار العمل الحر والخدمات.'),
  ('finance', 'ecommerce', 'نمو متسارع', 'معدلات التحويل ومتاجر التجزئة', 'التقرير الفوري الخاص بالتجارة الإلكترونية.'),
  ('finance', 'marketing', 'عائد مرتفع', 'تكلفة الاستحواذ وحملات النمو', 'التقرير الفوري الخاص بالتسويق الرقمي.'),
  ('finance', 'content-economy', 'فرصة متنامية', 'الرعاية والعضويات واقتصاد المحتوى', 'التقرير الفوري الخاص بصناعة المحتوى والفرص التجارية المرتبطة بها.'),
  ('finance', 'crypto', 'سوق متقلب', 'الأمان وإدارة مخاطر الأصول الرقمية', 'التقرير الفوري الخاص بالعملات الرقمية والبلوكشين.'),
  ('finance', 'hardware', 'إنفاق محسوب', 'العتاد والإنتاجية المالية', 'التقرير الفوري الخاص بتجهيز بيئة العمل وتحسين الإنتاجية.'),
  ('tech', NULL, 'قطاع تقني', 'ذكاء اصطناعي + أمان + سحابة', 'قيمة أعلى تتركز في الربط بين البنية التقنية والقرار العملي والنتائج الملموسة.'),
  ('tech', 'ai-apps', 'الأكثر نمواً', 'تطبيقات الذكاء الاصطناعي العملية', 'التقرير الفوري الخاص بالنماذج والأدوات التي تحول الذكاء الاصطناعي إلى نتائج قابلة للقياس.'),
  ('tech', 'cybersecurity', 'أولوية تشغيلية', 'الأمن السيبراني وحماية البيانات', 'التقرير الفوري الخاص بالخصوصية والحماية والاستجابة للمخاطر الرقمية.'),
  ('tech', 'cloud-remote', 'مرونة أعلى', 'السحابة والعمل عن بُعد', 'التقرير الفوري الخاص بالتكلفة والأداء وبناء بيئة عمل قابلة للتوسع.'),
  ('tech', 'infra', 'أساس مستقر', 'البنية التحتية وحوكمة الأنظمة', 'التقرير الفوري الخاص بالأداء والتوسع واستقرار المنتجات الرقمية.'),
  ('tech', 'iot-emerging', 'فرصة ناشئة', 'إنترنت الأشياء والتقنيات الناشئة', 'التقرير الفوري الخاص بالبيانات والأجهزة والأنظمة الذكية.'),
  ('media', NULL, 'قطاع إعلامي', 'صناعة المحتوى + البث', 'التركيز يذهب إلى القنوات التي تجمع بين الصدق الإعلامي والقدرة على التوزيع المستمر.'),
  ('media', 'creation', 'الأكثر تأثيراً', 'صناعة المحتوى المرئي والمكتوب', 'التقرير الفوري الخاص بالرسائل والقصص وبناء محتوى قابل للنمو.'),
  ('media', 'news', 'طلب مستمر', 'الأخبار والتحليلات الرقمية', 'التقرير الفوري الخاص بالتحقق والاتجاهات وبناء سياق إعلامي موثوق.'),
  ('media', 'podcasting', 'نمو صوتي', 'البودكاست والسرد الرقمي', 'التقرير الفوري الخاص بالصوت وتخطيط الحلقات وتوزيعها.'),
  ('media', 'streaming', 'تفاعل مباشر', 'البث المباشر وبناء الجمهور', 'التقرير الفوري الخاص بالانتشار والتفاعل والمرونة الفنية.'),
  ('media', 'gaming', 'مجتمع متفاعل', 'الترفيه الرقمي واللعب', 'التقرير الفوري الخاص بالمجتمع والتفاعل وتصميم التجارب الرقمية.'),
  ('digital-lifestyle', NULL, 'قطاع حياة رقمية', 'الصحة الرقمية + التنظيم', 'النتائج الأفضل تأتي عندما يكون التوازن البشري هو نقطة بداية كل تصميم واختيار.'),
  ('digital-lifestyle', 'life-management', 'أولوية يومية', 'إدارة الحياة الرقمية بتركيز', 'التقرير الفوري الخاص بالتنظيم والهوية وإدارة المهام في بيئة مزدحمة.'),
  ('digital-lifestyle', 'health', 'توازن مستدام', 'الصحة الرقمية والوقاية من الإرهاق', 'التقرير الفوري الخاص بالنوم والطاقة وبناء علاقة أكثر صحة مع التقنية.'),
  ('digital-lifestyle', 'learning', 'مهارة قابلة للنمو', 'التعليم والتعلم الرقمي', 'التقرير الفوري الخاص ببناء نظام مهارات شخصي قابل للتنفيذ والقياس.'),
  ('digital-lifestyle', 'culture', 'وعي رقمي', 'الثقافة الرقمية والهوية الواعية', 'التقرير الفوري الخاص بالأدوات والعادات والهوية الرقمية.')
ON CONFLICT (category_slug, (COALESCE(sub_category_slug, ''))) DO UPDATE
SET badge = EXCLUDED.badge,
    title = EXCLUDED.title,
    description = EXCLUDED.description;
