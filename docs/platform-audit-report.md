# تقرير تقييم منصة مكاسب رقمية

**تاريخ المراجعة:** 2026-09-07  |  **النطاق:** البنية، Supabase، الواجهة، المسارات، الأمن والاختبارات

## الملخص التنفيذي
- المنصة مبنية على Next.js 16 App Router وReact 19 مع فصل واضح نسبياً بين الصفحات، الخدمات، Server Actions ومكونات Client.
- البنية مناسبة للتوسع، لكن أولوية الإصلاح هي الأسرار، سياسات RLS، وتوحيد مسار migrations قبل إضافة وظائف إدارية جديدة.

## البنية التحتية والمشروع
| المجال | التقييم |
|---|---|
| Next.js/App Router | استخدام جيد للمسارات الديناميكية، layouts، `searchParams` وServer/Client Components. |
| TypeScript | `strict` مفعّل، وalias `@/*` مضبوط، مع فحص نوعي متاح عبر `tsc --noEmit`. |
| الإعدادات | `next.config.ts` يضبط صور Supabase/Unsplash وSentry؛ يلزم متابعة تحذير `disableLogger` deprecated. |
| الحزم | Supabase SSR، Zod، Vitest، Tailwind وSentry مناسبة؛ توجد تحذيرات peer dependency في TipTap أثناء Vercel build. |
| الهيكلية | `app`, `components`, `services`, `actions`, `lib`, `supabase` و`__tests__` مقسمة بشكل مفهوم. |

## نقاط القوة
- استخدام `auth.getUser()` للتحقق من الجلسة بدلاً من الثقة بالجلسة المحلية فقط.
- وجود Zod للتحقق من المقالات والأدوار والأدوات، واختبارات للخدمات والتحقق.
- وجود RLS على الجداول الحساسة، ودالة `is_admin_user()` مع `SECURITY DEFINER` و`search_path` ثابت.
- حماية محتوى المقالات عبر `sanitizeHtml` وتقليل مخاطر XSS.
- فصل المكونات التفاعلية بعلامة `use client` ومعالجة أخطاء للأدوات والمقالات.
- ربط تقارير القطاعات الأربعة بجدول `instant_reports` مع fallback للقطاع العام.
- حظر redirect غير الآمن في OAuth callback عبر التحقق من المسار.

## الملاحظات والمخاطر
1. **حرج:** يحتوي `.env.local` على `DATABASE_URL` وكلمة مرور، `SUPABASE_SERVICE_ROLE_KEY` و`SENTRY_AUTH_TOKEN`. يجب تدويرها فوراً والتأكد من عدم وجودها في Git أو CI logs.
2. سياسة قراءة `posts` العامة في `schema.sql` تستخدم `USING (true)`؛ قد تكشف draft وarchived. يجب تقييدها بـ`status = 'published'`.
3. عمليات إنشاء/تحديث/حذف المقالات تعتمد عميل جلسة المستخدم، بينما سياسات mutation المناسبة لـ`posts` غير مكتملة؛ قد تفشل أو تحتاج سياسة إدارية صريحة.
4. تعيين الدور بالبريد قد يحفظ `user_id = null` ولا يمنح صلاحية؛ يجب حل البريد إلى `auth.users.id` خادمياً أو الاعتماد على UUID فقط.
5. البريد الإداري الثابت مكرر في `proxy.ts` و`lib/admin.ts` وmigrations؛ الأفضل اعتماد `user_roles` مع bootstrap إداري موثق ومحدود.
6. `schema.sql` وmigrations ليسا مرجعاً واحداً؛ بعض الجداول والسياسات، ومنها `instant_reports` و`tools`، تظهر في migrations فقط.
7. بعض صفحات الإدارة تعرض بيانات تجريبية أو لا تفحص أخطاء الاستعلامات، مثل مؤشرات overview والدعم وإحصاء `saved_tools`.
8. رفع الصور يستخدم bucket `avatars` بينما migrations الظاهرة تجهز `article-images` فقط؛ يلزم bucket وسياسات SELECT/INSERT/UPDATE واضحة.
9. `app/admin/posts/new/page.tsx` يمثل مساراً إدارياً موازياً وقد يفتقد الحماية والتحقق الموحد، مع redirect إلى مسار غير موجود حسب التدقيق.
10. قراءة `user_roles` في المجتمع قد تفشل بسبب RLS؛ الأفضل view عامة ضيقة لا تكشف بيانات الأدوار الحساسة.
11. نماذج الدعم تحتاج Zod وحدود طول للموضوع والرسالة والقيم الاختيارية.

## التوصيات المستقبلية
- تدوير الأسرار فوراً، ثم إضافة فحص secret scanning إلى CI.
- اعتماد migrations كمصدر schema وحيد، وتشغيلها في بيئة staging ثم production مع مراجعة `db advisors`.
- كتابة اختبارات RLS فعلية لـ anon، مستخدم عادي، admin وsuper_admin، خصوصاً للـposts والأدوار والتقارير والتخزين.
- توحيد العمليات الحساسة في Server Actions محمية بـ`ensureAdminAccess` وZod، وتقليل عميل Supabase المباشر في المتصفح.
- إضافة سياسات posts الإدارية، وقيد uniqueness صحيح للأدوار، ومسار موثوق لحل البريد إلى UUID.
- إضافة bucket `avatars` أو إزالة fallback Data URL، مع حد حجم ونوع الملف.
- استبدال البيانات التجريبية بمؤشرات حقيقية أو تسميتها بوضوح كـmock.
- ضبط توافق TipTap أو تثبيت الإصدارات لتقليل تحذيرات `ERESOLVE`، ومراجعة Sentry config.
- إضافة اختبارات route smoke وbuild وlint إلى CI، ومراقبة أخطاء الإنتاج عبر Sentry.

## حالة التحقق
- فحص TypeScript وأخطاء الملفات المتأثرة: لا أخطاء ثابتة ظاهرة.
- اختبارات Vitest و`next build` وESLint الكامل لم تُنفذ ضمن هذه المراجعة النهائية؛ يجب تشغيلها في CI قبل الدمج.
- migration `instant_reports` تحتاج تطبيقاً فعلياً على Supabase؛ وجودها في Git لا يطبقها تلقائياً.

## الأولويات
**P0:** تدوير الأسرار، منع قراءة المسودات، تثبيت سياسات mutation للمقالات، وتوحيد migrations.
**P1:** إصلاح الأدوار والتخزين والدعم، وإضافة اختبارات RLS.
**P2:** إزالة البيانات التجريبية، تحسين observability، وتثبيت توافق الحزم.
