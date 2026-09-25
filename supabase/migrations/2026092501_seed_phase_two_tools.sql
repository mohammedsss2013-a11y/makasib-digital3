INSERT INTO public.tools (title, slug, sector, description, icon, is_interactive, status)
VALUES
  ('حاسبة ضريبة القيمة المضافة', 'vat-calculator', 'finance', 'احسب قيمة الضريبة والسعر النهائي بسرعة للمبيعات والخدمات.', 'ReceiptText', true, 'active'),
  ('مقارن بوابات الدفع', 'payment-gateway-comparator', 'finance', 'قارن رسوم بوابات الدفع واكتشف صافي المبلغ المستلم.', 'Landmark', true, 'active'),
  ('حاسبة تكلفة نماذج الذكاء الاصطناعي', 'ai-token-cost-calculator', 'tech', 'قدّر تكلفة استهلاك tokens قبل إطلاق ميزة ذكية.', 'BrainCircuit', true, 'active'),
  ('مولد خطة المحتوى الشهرية', 'content-plan-generator', 'media', 'حوّل هدفك وجمهورك إلى خطة نشر شهرية قابلة للتنفيذ.', 'CalendarRange', true, 'active')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  is_interactive = EXCLUDED.is_interactive,
  status = EXCLUDED.status,
  updated_at = TIMEZONE('utc'::text, NOW());