# تقرير التدقيق الشامل لنظام `makasib-digital3`

**تاريخ الفحص:** 2026-09-05  
**نطاق الفحص:** البنية والتهيئة، تكامل Supabase وقاعدة البيانات، الأنواع، الواجهة والأداء، المسارات الديناميكية، الأمان، والتحقق الآلي المحلي.  
**منهجية الفحص:** مراجعة ملفات المصدر وملفات migrations والإعدادات، البحث عن أنماط الاستخدام، ثم تشغيل فحص الأخطاء المحلي المتاح.

## 1. الملخص التنفيذي

المشروع مبني على Next.js App Router وReact 19 وTailwind CSS 4، ويستخدم `@supabase/ssr` بطريقة مناسبة للفصل بين عميل المتصفح وعميل الخادم. توجد آليات جيدة نسبيًا للتخزين المؤقت عبر ISR، وإعادة التحقق بعد عمليات الإدارة، وتقسيم الأدوات التفاعلية باستخدام `next/dynamic`.

لكن توجد نقاط عالية الأولوية قبل اعتبار النظام جاهزًا إنتاجيًا:

1. سياسات RLS الإدارية تقرأ `public.user_roles` من داخل سياسة الجدول نفسه. هذا قد يؤدي إلى recursion في تقييم RLS، كما أن تكرار هذا النمط في سياسات `tools` و`tool_definitions` يجعل مسار الإدارة هشًا.
2. `profiles` قابل للقراءة عموميًا بكل حقوله، بما فيها `notification_settings` و`two_factor_enabled`، وهو كشف زائد لبيانات ملف المستخدم.
3. `database.types.ts` لا يعرّف جدول `tool_definitions` الموجود في migration، كما أن علاقات عدة جداول غير مكتملة في النوع المولّد.
4. لا يوجد مسار `/blog/[slug]`؛ المسار الفعلي للمقالات هو `/articles/[category]/[subcategory]/[slug]`، مع تحويل legacy من `/posts/[id]`. إذا كان `/blog/[slug]` عقدًا مطلوبًا خارجيًا فهو غير منفذ.
5. لا توجد إعدادات Vercel صريحة أو توثيق نشر خاص بالمشروع، ولا يمكن إثبات إعدادات المشروع السحابية أو متغيراته من الملفات المحلية وحدها.

**التقييم العام:** جاهزية تطبيقية جيدة في الهيكل، مع مخاطر أمنية/تشغيلية متوسطة إلى عالية في RLS وتزامن المخطط والأنواع. يوصى بمعالجة البنود عالية الأولوية قبل النشر العام.

## حالة المعالجة الحالية

تم تنفيذ إصلاحات P0/P1 التالية بعد إعداد التقرير:

- إضافة migration `2026090503_harden_rls_profiles_storage.sql` مع دالة `public.is_admin_user()` بصلاحية `SECURITY DEFINER` و`search_path` ثابت لتفادي recursion في سياسات الإدارة.
- حصر قراءة جدول `profiles` بالمستخدم نفسه أو الإدارة، وإنشاء view باسم `public_profiles` يعرض `id`, `full_name`, `avatar_url`, و`bio` فقط للاستخدام العام.
- إضافة `tool_definitions` و`public_profiles` و`is_admin_user` إلى `database.types.ts`، ثم ربط Supabase CLI بالمشروع `hhmqywbnooukgghqsjeq` والتحقق عبر `npx supabase db push` من أن قاعدة البيانات البعيدة محدثة.
- إضافة route توافقية من `/blog/[slug]` إلى المسار canonical تحت `/articles/...`.
- استبدال استعلامات `select("*")` الأساسية للمقالات والأدوات بحقول صريحة، وإضافة قيود الفئة والتصنيف عند البحث عن المقال بالـ slug.
- ربط رفع صور المقالات بمجلد المستخدم والتحقق من MIME type والحجم في سياسة Storage، إلى جانب التحقق الموجود في العميل.
- تأكيد وجود فحوصات typecheck/lint/test/build في GitHub Actions وإضافة تحقق من مخرجات `.next`.

تبقى المصادقة السلوكية على SQL وRLS بحاجة إلى اختبار بحسابات `anon` و`authenticated` ومستخدم إداري؛ نجاح `db push` يؤكد حالة migrations، لكنه لا يستبدل اختبارات الصلاحيات العملية.

## 2. جدول المخاطر والأولويات

| المعرّف | المجال | الملاحظة | الشدة | الأولوية |
|---|---|---|---|---|
| SEC-01 | RLS | سياسة `user_roles` تعتمد على استعلام من الجدول نفسه، ما قد يسبب recursion أو فشلًا في القراءة/الإدارة | عالية | P0 |
| SEC-02 | خصوصية | سياسة القراءة العامة لـ `profiles` تكشف حقولًا داخلية وحساسة نسبيًا | عالية | P0 |
| SEC-03 | RLS | صلاحيات الإدارة تعتمد جزئيًا على بريد ثابت داخل SQL و`proxy.ts` | متوسطة | P1 |
| DB-01 | الأنواع | جدول `tool_definitions` موجود في migration لكنه غائب من `Database` | عالية | P1 |
| DB-02 | المخطط | `schema.sql` الأساسي لا يعكس كل migrations الحديثة، ومنها `tools` و`tool_definitions` | متوسطة | P1 |
| ROUTE-01 | التوجيه | لا يوجد `/blog/[slug]`؛ العقد الحالي هو `/articles/...` | متوسطة | P1 |
| PERF-01 | الأداء | بعض الخدمات تستخدم `select("*")` وتنفذ طلبات كاملة للمقالات | متوسطة | P1 |
| OPS-01 | النشر | لا توجد ملفات/تعريفات Vercel صريحة أو فحص CI موثق | متوسطة | P1 |
| SEC-04 | Storage | رفع `article-images` متاح لكل مستخدم authenticated دون تقييد مسار/مالك الملف | متوسطة | P1 |
| QA-01 | التحقق | لا توجد اختبارات مباشرة لـ RLS أو smoke tests للمسارات الرئيسية | متوسطة | P1 |

## 3. البنية التحتية والتهيئة

### 3.1 Next.js وTypeScript

- [package.json](../package.json) يثبت Next.js على `16.3.1` وReact على `19.2.8`، ويحتوي على أوامر `build` و`lint` و`test` و`typecheck`.
- [next.config.ts](../next.config.ts) يفعل `reactStrictMode` ويقيد الصور البعيدة إلى Supabase Storage العام وUnsplash، ويطلب AVIF/WebP. هذا جيد للأداء، لكن wildcard في `*.supabase.co` أوسع من اسم مشروع واحد؛ الأفضل تقييده إلى host المشروع عند ثباته.
- [tsconfig.json](../tsconfig.json) يستخدم `strict: true` و`noEmit: true` و`moduleResolution: bundler` وalias `@/*`. هذه إعدادات سليمة. وجود `allowJs: true` غير ضروري غالبًا لأن المشروع TypeScript بالكامل تقريبًا، ويمكن تعطيله بعد التأكد من عدم وجود ملفات JS تحتاجه.
- `skipLibCheck: true` يقلل ضجيج التحقق من تعريفات الاعتماديات، لكنه يخفي أخطاء في ملفات الأنواع الخارجية. لا يمثل مشكلة مباشرة، لكنه يقلل صرامة التدقيق.

### 3.2 متغيرات البيئة وSupabase

- [lib/env.ts](../lib/env.ts) يتحقق من `NEXT_PUBLIC_SUPABASE_URL` و`NEXT_PUBLIC_SUPABASE_ANON_KEY`، ويجعل `SUPABASE_SERVICE_ROLE_KEY` اختياريًا.
- [lib/supabase/client.ts](../lib/supabase/client.ts) يستخدم `createBrowserClient`، و[lib/supabase/server.ts](../lib/supabase/server.ts) يستخدم `createServerClient` مع cookies. هذا الفصل صحيح من حيث التصميم.
- [lib/supabase/admin.ts](../lib/supabase/admin.ts) يحصر مفتاح service role في عميل إداري مستقل ولا يظهر استيراده في مكونات الواجهة بحسب البحث المحلي. يجب الاستمرار في منع أي `NEXT_PUBLIC_` لمفتاح service role.
- [proxy.ts](../proxy.ts) يجدد جلسة Supabase عبر `getUser()` ويضع حراسة مبكرة لمسارات `/admin`. هذا مفيد، لكن القرار الإداري مكرر أيضًا في layout وسياسات SQL؛ توحيد مصدر القرار يقلل اختلاف السلوك.
- لا تم طباعة محتوى `.env.local` ولا يمكن إثبات صحة القيم أو صلاحية مشروع Supabase عن بعد من فحص الملفات فقط. يلزم فحص runtime/CI آمن باستخدام متغيرات بيئة حقيقية.

### 3.3 Vercel والنشر

- لم يظهر `vercel.json` أو إعداد Vercel خاص بالمشروع في الملفات المفحوصة.
- غياب الملف ليس خطأ بحد ذاته؛ Vercel يستطيع اكتشاف Next.js تلقائيًا. لكنه يعني أن إعدادات build، environment variables، preview/production، وmigrations ليست موثقة داخل المستودع.
- يجب ضبط المتغيرات التالية في Vercel حسب البيئة: `NEXT_PUBLIC_SUPABASE_URL` و`NEXT_PUBLIC_SUPABASE_ANON_KEY`. يضاف `SUPABASE_SERVICE_ROLE_KEY` فقط للوظائف الخادمية/المهام التي تحتاجه، ولا يضاف إلى متغيرات العميل أو يمرر إلى المتصفح.
- يوصى بإضافة فحص CI يشغل `npm run typecheck`, `npm run lint`, `npm test` ثم `npm run build`، مع تشغيل migrations من pipeline منفصل ومراقب.

## 4. قاعدة البيانات والأنواع

### 4.1 التوافق بين المخطط والأنواع

| الكيان | في SQL/migrations | في `database.types.ts` | النتيجة |
|---|---|---|---|
| `posts` | موجود في `schema.sql` مع migrations لاحقة | موجود | متوافق وظيفيًا، لكن يلزم إعادة توليد النوع من قاعدة المصدر |
| `profiles` | موجود | موجود | الأعمدة الأساسية متطابقة |
| `support_tickets` | موجود في migration | موجود | متطابق وظيفيًا |
| `saved_tools` | موجود | موجود | متطابق وظيفيًا |
| `community_posts` | موجود | موجود | متطابق وظيفيًا |
| `community_post_likes` | موجود | موجود | متطابق وظيفيًا |
| `user_roles` | موجود | موجود | النوع لا يعكس بالضرورة القيود والسياسات |
| `audit_logs` | موجود | موجود | متطابق في الأعمدة الأساسية |
| `tools` | موجود في `2026090502_create_tools.sql` | موجود | متوافق في الحقول الرئيسية |
| `tool_definitions` | موجود في `2026090501_add_tool_definitions.sql` | **غائب** | عدم توافق مؤكد |

ملاحظة إضافية: الأنواع تعرض علاقات لبعض الجداول، لكنها تستخدم `Relationships: []` لجداول أخرى مثل `posts` و`profiles` و`tools`. هذا قد لا يكسر الاستعلامات الحالية، لكنه يفقد فوائد النوع في الاستعلامات المتداخلة وإعادة توليد المخطط.

**الإجراء المقترح:** إعادة توليد `types/database.types.ts` من قاعدة البيانات الفعلية بعد تطبيق كل migrations، ثم مراجعة diff يدويًا وعدم تعديل النوع يدويًا كحل دائم.

### 4.2 مراجعة RLS

نقاط إيجابية:

- تم تفعيل RLS على الجداول الرئيسية العامة، ومنها `posts`, `profiles`, `support_tickets`, `saved_tools`, `community_posts`, `community_post_likes`, `user_roles`, `audit_logs`, و`tools`.
- سياسات ملكية المستخدم في `saved_tools` و`community_posts` و`tickets` تستخدم `auth.uid()` مع `USING` و/أو `WITH CHECK` بشكل مناسب في الغالب.
- تحديثات العناصر المملوكة تتضمن `USING` و`WITH CHECK`، وهو نمط مطلوب لمنع تغيير المالك.
- جدول `tools` يعرض فقط السجلات ذات `status = 'active'` للزوار، وهو فصل مناسب بين العرض العام والإدارة.

مخاطر وملاحظات:

1. **Recursion محتملة في RLS:** سياسة `Admins can manage user roles` على `user_roles` تستعلم من `public.user_roles` للتحقق من دور المستخدم نفسه. السياسات المقابلة على `tools` و`tool_definitions` تستخدم النمط نفسه. ينبغي نقل فحص الدور إلى دالة آمنة ومحددة الصلاحيات، أو استخدام جدول/دالة لا تعيد تقييم السياسة بشكل دائري، مع اختبار فعلي بدور `anon`, `authenticated`, admin، ومستخدم عادي.
2. **كشف ملفات المستخدمين:** سياسة `Public profiles are viewable by everyone` تستخدم `USING (true)` على الصف الكامل. ذلك يجعل حقولًا مثل إعدادات الإشعارات وحالة المصادقة الثنائية قابلة للقراءة من Data API. الأفضل فصل public profile عن private profile، أو إنشاء view آمن يعرض الاسم والصورة فقط مع منع الوصول إلى الجدول الأصلي.
3. **اعتماد بريد ثابت:** السماح الإداري عبر `auth.email() = 'mohammed.sss2013@gmail.com'` حل طوارئ هش؛ البريد قد يتغير، كما أن منطق الصلاحية موزع بين SQL و[proxy.ts](../proxy.ts). الأفضل اعتماد role موثق في `app_metadata` أو جدول أدوار مع دالة تحقق مركزية.
4. **دالة trigger بصلاحية مرتفعة:** `handle_new_user()` معرفة كـ `SECURITY DEFINER` في [supabase/schema.sql](../supabase/schema.sql). هذا قد يكون مقصودًا لإنشاء profile، لكن يجب إضافة `SET search_path` ثابت، وتقييد صلاحية التنفيذ، ومراجعة أن الدالة لا توجد في schema مكشوفة دون حاجة.
5. **Storage:** migration `20260902_storage_bucket.sql` تجعل bucket المقالات عامًا وتسمح بالرفع لكل `authenticated`. يجب تقييد مسار الملف وامتداده/حجمه وملكيته، وإضافة سياسات UPDATE/DELETE دقيقة إن كان الاستبدال أو الحذف مطلوبًا.
6. لا تظهر اختبارات SQL أو اختبارات تكامل تتحقق من أن مستخدمًا عاديًا لا يقرأ أو يعدل بيانات الإدارة. وجود RLS في الملف لا يكفي لإثبات السلوك الفعلي.

## 5. الواجهة الأمامية والأداء

### 5.1 تقسيم الحزمة والتفاعل

- [components/tools/DynamicToolRenderer.tsx](../components/tools/DynamicToolRenderer.tsx) يستخدم `next/dynamic` لتحميل `FreelancePricingCalculator` و`ContractGenerator` عند الحاجة. هذا قرار جيد لأن الأدوات التفاعلية تضم منطقًا خاصًا ولا ينبغي تحميلها في كل صفحة.
- التحميل يعرض حالة `ToolLoader`، ويتعامل مع خطأ Supabase، وعدم وجود mapping للـ slug. هذه حالات fallback واضحة.
- `DynamicToolRenderer` ينفذ تحققًا إضافيًا من وجود الأداة في Supabase على العميل بعد أن تكون الصفحة قد تحققت منها على الخادم. هذا يحسن الرسالة للمستخدم لكنه يضيف طلبًا مكررًا؛ يمكن تمرير نتيجة التحقق أو بيانات الأداة من Server Component إذا لم تكن هناك حاجة أمنية لإعادة التحقق.
- لا يوجد دليل من الملفات على تحليل bundle فعلي. وجود `@next/bundle-analyzer` في dependencies وحده لا يثبت استخدامه. يوصى بتفعيل تحليل في build منفصل قبل وبعد التغييرات الكبيرة.

### 5.2 Responsive وTailwind

- [tailwind.config.ts](../tailwind.config.ts) يضم مسارات `app`, `components`, `pages`, و`src` ويعرف ألوان العلامة وخط Cairo العربي وJetBrains Mono.
- [app/globals.css](../app/globals.css) يفعّل Tailwind 4 وtypography، ويحتوي على focus-visible واضح، ودعم `prefers-reduced-motion`، وتنسيق مناسب لمحتوى المقالات والصور.
- صفحات الأدوات والمقالات تستخدم breakpoints مثل `sm` و`md` و`lg`، وقيود `max-w`، و`aspect-ratio` للصور؛ وهذا يشير إلى دعم responsive جيد في المسارات المفحوصة.
- توجد ازدواجية بين Tailwind 4 عبر `@import "tailwindcss"` ووجود إعداد theme تقليدي في `tailwind.config.ts`. لا يلزم أن تكون مشكلة، لكن ينبغي التأكد من أن plugin typography والألوان المخصصة تطبق فعليًا في build الإنتاجي.
- الثيم الافتراضي في layout داكن، بينما `:root` في CSS يعلن `color-scheme: light` ويحدد خلفية فاتحة، مع body class داكن. يوصى بتوحيد مصدر الثيم لتجنب ومضات أو تعارضات ألوان أثناء hydration.

## 6. المسارات والصفحات الديناميكية

### 6.1 الأدوات

- صفحة الفهرس موجودة في [app/tools/page.tsx](../app/tools/page.tsx)، وتقرأ `tools` ذات الحالة `active`، ثم تستخدم `TOOLS_REGISTRY` كـ fallback عند عدم وجود بيانات.
- صفحة التفاصيل موجودة في [app/tools/[category]/[slug]/page.tsx](../app/tools/[category]/[slug]/page.tsx)، وتتحقق من `slug`, `sector`, و`status`، ثم تستدعي `notFound()` عند غياب الأداة.
- التحقق من category في صفحة الفهرس يعتمد على union محلي، وهو جيد لمنع عرض قطاعات غير معروفة، لكنه يعني أن إضافة قطاع جديد تحتاج تعديل الكود.
- لا توجد `generateStaticParams` لمسار الأدوات؛ الصفحات ستولد عند الطلب، وهو مقبول لأن الكتالوج ديناميكي، لكن يمكن إضافة ISR أو cache صريح إذا كان حجم الكتالوج كبيرًا.

### 6.2 المقالات

- المسار الأساسي هو [app/articles/[category]/[subcategory]/[slug]/page.tsx](../app/articles/[category]/[subcategory]/[slug]/page.tsx)، وفيه `generateStaticParams`, `revalidate = 3600`, و`dynamicParams = true`. هذا يحقق توليدًا مسبقًا مع fallback مرن.
- عند غياب المقال، يستدعي المسار `notFound()`، كما تعرض صفحة التصنيف حالة عدم وجود مقالات بدل الانهيار.
- [app/posts/[id]/page.tsx](../app/posts/[id]/page.tsx) يدعم legacy IDs، ويعيد التوجيه إلى canonical article path بعد التحقق من رقم صحيح ووجود المقال.
- لا يوجد مسار `app/blog/[slug]/page.tsx` ولا ظهور لمسار `/blog/` في البحث المحلي. لذلك يجب إما اعتماد `/articles/...` رسميًا وتحديث العقد/الروابط الخارجية، أو إضافة redirect/route توافقية لـ `/blog/[slug]` إذا كان هذا المسار مطلوبًا.
- `articlesService.getBySlug` يبحث عن slug أولًا ثم يحاول `Number(slug)` كمعرف، لكنه لا يقيّد نتيجة slug مباشرة بـ `category` و`subcategory`. إذا كانت slugs غير فريدة عالميًا أو بيانات قديمة غير منضبطة، قد يعرض مسار فئة مقالًا من فئة أخرى. يوصى بإضافة شروط الفئة والتصنيف إلى الاستعلام أو التحقق بعد التحويل.
- `getAllArticles` و`getBySlug` يستخدمان `select("*")`. الأفضل اختيار الأعمدة المطلوبة فقط وتقليل payload، خصوصًا أن `content` قد يكون كبيرًا.

### 6.3 Fallback وSEO

- sitemap يعيد استخدام Supabase anon ويضيف المقالات المنشورة فقط، مع `revalidate = 3600`.
- metadata للمقال تستخدم canonical وOpen Graph، وهذا جيد.
- ينبغي إضافة مسارات الأدوات الفعلية إلى sitemap إذا كانت صفحات public مهمة لمحركات البحث، ومراجعة canonical بعد حسم عقد `/articles` مقابل `/blog`.

## 7. الأخطاء والتحقق الآلي

| الفحص | النتيجة | ملاحظة |
|---|---|---|
| تحليل أخطاء VS Code على workspace | لا توجد أخطاء معروضة | نتيجة static analysis محلية، وليست بديلًا عن build إنتاجي |
| `npm run typecheck` | لم تصل مخرجات نصية قابلة للاقتباس من جلسة الطرفية | يجب تأكيد exit code في CI أو تشغيل مباشر مرئي |
| `npm run lint` | لم تصل مخرجات نصية قابلة للاقتباس من جلسة الطرفية | يجب تأكيده في CI |
| `npm test` | لم تصل مخرجات نصية قابلة للاقتباس من جلسة الطرفية | توجد اختبارات Vitest في `__tests__/`، لكن لا تغطي RLS/المسارات المتصفحّية |
| `npm run build` | لم يُثبت تشغيله ضمن هذا التدقيق | يجب تشغيله قبل النشر |

لا تظهر أخطاء TypeScript صريحة من المحلل المحلي، لكن عدم وجود `tool_definitions` في النوع قد لا يظهر طالما أن التطبيق لا يستعلم عنه مباشرة. هذه فجوة تعاقدية وليست دليلًا على سلامة schema.

## 8. التوصيات التنفيذية

### P0: قبل النشر

1. إصلاح نمط RLS الدائري في `user_roles` و`tools` و`tool_definitions`، ثم اختبار select/insert/update/delete بأدوار متعددة.
2. إيقاف القراءة العامة للجدول الكامل `profiles`، وفصل الحقول العامة عن الخاصة.
3. مراجعة `SECURITY DEFINER` في trigger وإضافة `search_path` ثابت وتقييد التنفيذ.
4. التأكد من أن `SUPABASE_SERVICE_ROLE_KEY` لا يدخل bundle العميل أو متغيرات `NEXT_PUBLIC_`.

### P1: هذا الإصدار

1. إعادة توليد `database.types.ts` من قاعدة البيانات الفعلية، وإضافة `tool_definitions` والعلاقات الصحيحة.
2. توحيد source of truth للمخطط: migrations هي المرجع، و`schema.sql` يجب أن يكون dump/مرجعًا محدثًا أو يوضح أنه bootstrap فقط.
3. حسم عقد `/blog/[slug]`، وإضافة redirect أو route توافقية إن كان مطلوبًا، ثم تحديث sitemap والروابط.
4. تقييد Storage حسب owner/path/type/size، ومراجعة public bucket.
5. استبدال `select("*")` في الخدمات العامة باختيارات أعمدة صريحة، وإضافة شروط category/subcategory لاستعلام slug.
6. إضافة اختبارات تكامل لـ RLS، واختبارات smoke للمسارات `/tools`, `/tools/[category]/[slug]`, و`/articles/...`.

### P2: تحسينات تشغيلية

1. إضافة CI موثق يشغل typecheck/lint/test/build.
2. تفعيل bundle analyzer عند الطلب، وقياس حجم الصفحات قبل وبعد تحميل الأدوات.
3. توثيق إعدادات Vercel ومتغيرات كل بيئة، مع تشغيل migrations كخطوة منفصلة قابلة للتتبع.
4. إضافة مراقبة للأخطاء وطلبات Supabase البطيئة، ومراجعة فهارس البحث حسب `slug`, `status`, و`category/subcategory`.
5. توحيد إعدادات الثيم بين layout و`globals.css` وتقليل ازدواجية إعداد Tailwind 4.

## 9. خطة تحقق مقترحة بعد المعالجة

```text
1. تطبيق إصلاحات RLS على بيئة staging.
2. اختبار anon: قراءة المنشورات المنشورة والأدوات النشطة فقط.
3. اختبار user: قراءة/تعديل موارده فقط وعدم الوصول إلى الإدارة أو بيانات مستخدم آخر.
4. اختبار admin: إدارة الأدوات والأدوار وقراءة/إضافة audit logs.
5. إعادة توليد database.types.ts من staging.
6. تشغيل npm run typecheck && npm run lint && npm test && npm run build.
7. فحص المسارات الأساسية عبر متصفح على desktop/mobile.
8. نشر preview على Vercel ومراجعة env، logs، sitemap، والصور من Supabase Storage.
```

## 10. الخلاصة

البنية الحالية قابلة للتطوير وتحتوي على أساس جيد في Next.js App Router، تقسيم المكونات، fallback، وتنظيم عملاء Supabase. العائق الأكبر ليس في شكل الواجهة، بل في ضمانات الوصول واتساق عقد البيانات: RLS الإداري، خصوصية profiles، وتزامن migrations مع الأنواع. معالجة هذه النقاط ثم إضافة اختبارات تكامل ومسار نشر موثق سترفع موثوقية النظام بشكل واضح.