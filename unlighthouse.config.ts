import { defineConfig } from 'unlighthouse'

export default defineConfig({
  // 1. تقليل الضغط: فحص صفحة واحدة فقط في كل مرة
  puppeteerClusterOptions: {
    maxConcurrency: 1,
  },
  // 2. إعدادات المتصفح لمنع تجمّد المحتوى (NO_FCP)
  puppeteerOptions: {
    timeout: 60000, // مهلة 60 ثانية لكل صفحة
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--headless=new' // وضع Chrome الحديث
    ]
  },
  // 3. تخفيف عملية الزحف
  scanner: {
    samples: 1, // عينة واحدة فقط لكل مسار
  }
})
