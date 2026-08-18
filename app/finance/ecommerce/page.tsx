import React from "react";
import Link from "next/link";
import { ShoppingBag, Calculator, TrendingUp, ArrowLeft, ShieldCheck, Percent, Layers } from "lucide-react";

export default function EcommercePage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      {/* البانر العلوي */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 z-10 relative">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
            <ShoppingBag className="w-4 h-4" />
            <span>قطاع المال والأعمال • القسم 2.1</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            التجارة الإلكترونية والبيع الرقمي (E-Commerce)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            نماذج وحاسبات هوامش الربح السافي، تكاليف المنصات والبوابات المالية، وإدارة المخزون والاشتراكات الرقمية.
          </p>
        </div>
      </div>

      {/* الأدوات والحاسبات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">حاسبة صافي هامش ربح المنتج (Net Margin Calculator)</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              احسب الربح الصافي بعد خصم تكلفة الشحن، عمولة بوابات الدفع (Stripe/Mada)، والإعلانات المستهدفة.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-mono font-bold">جاهز للاستخدام</span>
            <Link href="/finance" className="text-slate-400 hover:text-white flex items-center gap-1">
              <span>تخصيص الحسابات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Percent className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">مقارن عمولات المنصات والبوابات</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              مقارنة العمولات بين Shopify, Salla, Zid, Stripe, PayPal وبوابات الدفع المحلية لمعرفة الأكثر وفراً لمتجرك.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-mono font-bold">دليل إجرائي محين</span>
            <Link href="/finance" className="text-slate-400 hover:text-white flex items-center gap-1">
              <span>عرض المقارنة</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
