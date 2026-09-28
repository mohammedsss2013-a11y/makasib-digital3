ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS topic TEXT,
  ADD COLUMN IF NOT EXISTS legacy_category TEXT,
  ADD COLUMN IF NOT EXISTS legacy_subcategory TEXT;

UPDATE public.posts
SET legacy_category = COALESCE(legacy_category, category),
    legacy_subcategory = COALESCE(legacy_subcategory, subcategory)
WHERE legacy_category IS NULL OR legacy_subcategory IS NULL;

UPDATE public.posts
SET category = CASE
      WHEN category IN ('المال والأعمال', 'قطاع المال والأعمال', 'finance') THEN 'finance'
      WHEN category IN ('التكنولوجيا', 'التكنولوجيا والابتكار', 'قطاع التكنولوجيا', 'tech') THEN 'tech'
      WHEN category IN ('الإعلام الجديد', 'قطاع الإعلام', 'media') THEN 'media'
      WHEN category IN ('رقميون', 'رقميون - أسلوب الحياة', 'رقميون - أسلوب الحياة الرقمي', 'أسلوب الحياة الرقمي', 'digital-lifestyle') THEN 'digital-lifestyle'
      ELSE category
    END,
    subcategory = CASE
      WHEN category IN ('المال والأعمال', 'قطاع المال والأعمال', 'finance') THEN
        CASE
          WHEN legacy_subcategory IN ('العملات الرقمية والبلوكشين', 'العملات الرقمية', 'الأسواق المالية', 'الاستثمار العقاري الرقمي')
            OR concat_ws(' ', title, content) ILIKE ANY (ARRAY['%العملات الرقمية%', '%الأسواق المالية%', '%الاستثمار العقاري%', '%crypto%', '%blockchain%', '%stocks%', '%real estate%'])
            THEN 'الاستثمار'
          WHEN legacy_subcategory IN ('العتاد والإنتاجية المالية') THEN 'ريادة الأعمال'
          ELSE 'الاقتصاد الحر'
        END
      WHEN category IN ('التكنولوجيا', 'التكنولوجيا والابتكار', 'قطاع التكنولوجيا', 'tech') THEN
        CASE
          WHEN legacy_subcategory IN ('تطبيقات الذكاء الاصطناعي', 'تطبيقات وأنظمة الذكاء الاصطناعي', 'الذكاء الاصطناعي') THEN 'الذكاء الاصطناعي'
          WHEN legacy_subcategory IN ('الأمن السيبراني', 'الأمن السيبراني والخصوصية الرقمية') THEN 'الأمن السيبراني'
          ELSE 'التقنيات الناشئة'
        END
      WHEN category IN ('الإعلام الجديد', 'قطاع الإعلام', 'media') THEN
        CASE
          WHEN legacy_subcategory IN ('الترفيه الرقمي والألعاب', 'الترفيه الرقمي', 'صناعة الألعاب والترفيه') THEN 'الألعاب (Gaming)'
          WHEN legacy_subcategory IN ('الأخبار والتحليلات', 'أخبار وتحليلات الصناعة الرقمية') THEN 'منصات التواصل الاجتماعي'
          ELSE 'صناعة المحتوى'
        END
      WHEN category IN ('رقميون', 'رقميون - أسلوب الحياة', 'رقميون - أسلوب الحياة الرقمي', 'أسلوب الحياة الرقمي', 'digital-lifestyle') THEN
        CASE
          WHEN legacy_subcategory IN ('الصحة الرقمية', 'الصحة الرقمية والوقاية من الاحتراق') THEN 'الصحة الرقمية'
          WHEN legacy_subcategory IN ('التعليم والتعلم الرقمي', 'التعليم والتعلم الرقمي المستمر') THEN 'الواقع الافتراضي'
          ELSE 'العمل عن بعد'
        END
      ELSE subcategory
    END,
    topic = CASE
      WHEN category IN ('المال والأعمال', 'قطاع المال والأعمال', 'finance') THEN
        CASE
          WHEN legacy_subcategory IN ('العملات الرقمية والبلوكشين', 'العملات الرقمية') OR concat_ws(' ', title, content) ILIKE ANY (ARRAY['%العملات الرقمية%', '%crypto%', '%blockchain%', '%المحفظة الرقمية%']) THEN 'العملات الرقمية'
          WHEN legacy_subcategory = 'الاستثمار العقاري الرقمي' OR concat_ws(' ', title, content) ILIKE ANY (ARRAY['%العقار%', '%real estate%']) THEN 'الاستثمار العقاري الرقمي'
          WHEN legacy_subcategory = 'الأسواق المالية' OR concat_ws(' ', title, content) ILIKE ANY (ARRAY['%الأسواق المالية%', '%الأسهم%', '%البورصة%', '%stocks%', '%market%']) THEN 'الأسواق المالية'
          WHEN legacy_subcategory IN ('العمل الحر والخدمات', 'العمل الحر والمشاريع المصغرة') THEN 'الوظائف المستقلة'
          WHEN legacy_subcategory = 'التجارة الإلكترونية' OR concat_ws(' ', title, content) ILIKE ANY (ARRAY['%التجارة الإلكترونية%', '%المتجر الإلكتروني%', '%ecommerce%']) THEN 'التجارة الإلكترونية'
          WHEN legacy_subcategory = 'العتاد والإنتاجية المالية' THEN 'الشركات الناشئة'
          ELSE 'مصادر الدخل المتعددة'
        END
      WHEN category IN ('التكنولوجيا', 'التكنولوجيا والابتكار', 'قطاع التكنولوجيا', 'tech') THEN
        CASE
          WHEN legacy_subcategory IN ('تطبيقات الذكاء الاصطناعي', 'تطبيقات وأنظمة الذكاء الاصطناعي', 'الذكاء الاصطناعي') THEN
            CASE WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%وكيل%', '%agent%']) THEN 'الوكلاء الذكيون' WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%أخلاقيات%', '%ethic%']) THEN 'أخلاقيات الذكاء الاصطناعي' ELSE 'نماذج الذكاء الاصطناعي' END
          WHEN legacy_subcategory IN ('الأمن السيبراني', 'الأمن السيبراني والخصوصية الرقمية') THEN
            CASE WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%التشفير%', '%encryption%', '%cryptography%']) THEN 'التشفير' WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%هجوم%', '%اختراق%', '%attack%', '%breach%']) THEN 'الهجمات السيبرانية' ELSE 'حماية البيانات' END
          WHEN legacy_subcategory IN ('إنترنت الأشياء', 'إنترنت الأشياء والتقنيات الناشئة') OR concat_ws(' ', title, content) ILIKE ANY (ARRAY['%إنترنت الأشياء%', '%iot%', '%مستشعر%']) THEN 'إنترنت الأشياء (IoT)'
          WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%كمومي%', '%quantum%']) THEN 'الحوسبة الكمومية'
          ELSE 'التكنولوجيا الخضراء'
        END
      WHEN category IN ('الإعلام الجديد', 'قطاع الإعلام', 'media') THEN
        CASE
          WHEN legacy_subcategory IN ('البودكاست', 'البودكاست والبودكاست المرئي') THEN 'استوديوهات البودكاست'
          WHEN legacy_subcategory IN ('البث المباشر', 'منصات البث الحي والتفاعل') THEN 'البث المباشر'
          WHEN legacy_subcategory IN ('الترفيه الرقمي والألعاب', 'الترفيه الرقمي', 'صناعة الألعاب والترفيه') THEN
            CASE WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%تطوير الألعاب%', '%برمجة الألعاب%', '%game development%']) THEN 'تطوير الألعاب' WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%رياضات إلكترونية%', '%esports%']) THEN 'الرياضات الإلكترونية' ELSE 'بث الألعاب' END
          WHEN legacy_subcategory IN ('الأخبار والتحليلات', 'أخبار وتحليلات الصناعة الرقمية') THEN 'التسويق الرقمي الحديث'
          WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%إعلان تفاعلي%', '%interactive ad%']) THEN 'الإعلانات التفاعلية'
          WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%مجتمع رقمي%', '%digital communit%']) THEN 'المجتمعات الرقمية'
          ELSE 'اقتصاد المبدعين'
        END
      WHEN category IN ('رقميون', 'رقميون - أسلوب الحياة', 'رقميون - أسلوب الحياة الرقمي', 'أسلوب الحياة الرقمي', 'digital-lifestyle') THEN
        CASE
          WHEN legacy_subcategory IN ('الصحة الرقمية', 'الصحة الرقمية والوقاية من الاحتراق') THEN
            CASE WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%يقظة%', '%mindful%']) THEN 'اليقظة الذهنية' WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%صحة حيوية%', '%biohealth%']) THEN 'الصحة الحيوية' ELSE 'السموم الرقمية' END
          WHEN legacy_subcategory IN ('التعليم والتعلم الرقمي', 'التعليم والتعلم الرقمي المستمر') THEN 'التعليم المنزلي بالتقنية'
          WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%ترحال رقمي%', '%digital nomad%']) THEN 'الترحال الرقمي'
          WHEN concat_ws(' ', title, content) ILIKE ANY (ARRAY['%فضائي%', '%satellite%', '%اتصال متنقل%']) THEN 'الاتصال الفضائي والمتنقل'
          ELSE 'إدارة المعرفة الشخصية'
        END
      ELSE topic
    END
WHERE category IN (
  'المال والأعمال', 'قطاع المال والأعمال', 'finance',
  'التكنولوجيا', 'التكنولوجيا والابتكار', 'قطاع التكنولوجيا', 'tech',
  'الإعلام الجديد', 'قطاع الإعلام', 'media',
  'رقميون', 'رقميون - أسلوب الحياة', 'رقميون - أسلوب الحياة الرقمي', 'أسلوب الحياة الرقمي', 'digital-lifestyle'
);

CREATE INDEX IF NOT EXISTS idx_posts_taxonomy
  ON public.posts(category, subcategory, topic);
