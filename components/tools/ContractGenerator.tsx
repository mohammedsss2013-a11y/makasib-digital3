"use client";

import React, { useEffect, useState, useId } from "react";
import { FileText, Copy, Check, Download, Bookmark, ShieldCheck, BookOpen, Expand, Minimize2 } from "lucide-react";
import { recordToolUsage } from "@/config/toolsRegistry";
import { ArticleDrawer } from "@/components/drawers/ArticleDrawer";

export const ContractGenerator = () => {
  const [freelancerName, setFreelancerName] = useState("أحمد علي");
  const [clientName, setClientName] = useState("شركة الحلول المبتكرة");
  const [projectTitle, setProjectTitle] = useState("تطوير واجهة منصة إلكترونية");
  const [totalFee, setTotalFee] = useState(1500);
  const [advancePercent, setAdvancePercent] = useState(50);
  const [deliveryDays, setDeliveryDays] = useState(14);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    recordToolUsage("contract-generator");
  }, []);

  // Generate unique IDs for form elements
  const freelancerId = useId();
  const clientId = useId();
  const titleId = useId();
  const feeId = useId();
  const advanceId = useId();
  const daysId = useId();

  const advanceAmount = (totalFee * advancePercent) / 100;
  const remainingAmount = totalFee - advanceAmount;

  const contractText = `📄 **اتفاقية تقديم خدمات عمل حر**

**الطرف الأول (المستقل):** ${freelancerName}
**الطرف الثاني (العميل):** ${clientName}

**1. نطاق العمل:**
يتعهد الطرف الأول بتنفيذ مشروع: (${projectTitle}) وفقاً للمواصفات والمتطلبات المتفق عليها بين الطرفين.

**2. التكلفة والشروط المالية:**
- القيمة الإجمالية للمشروع: ${totalFee} دولار أمريكي.
- الدفعة المقدمة المطلوبة (${advancePercent}%): ${advanceAmount} دولار أمريكي (تُدفع قبل البدء).
- المتبقي عند التسليم النهائي: ${remainingAmount} دولار أمريكي.

**3. مدة التنفيذ والتسليم:**
يلتزم الطرف الأول بتسليم المخرجات النهائية خلال (${deliveryDays}) يوماً من تاريخ استلام الدفعة المقدمة.

**4. الملكية الفكرية وحقوق الاستخدام:**
تنتقل كافة حقوق الملكية الفكرية للمخرجات للطرف الثاني فور سداد كامل القيمة المستحقة.

**تاريخ الاتفاقية:** ${new Date().toLocaleDateString("ar-EG")}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(contractText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    try {
      const existing = JSON.parse(localStorage.getItem("saved_tools") || "[]");
      const newItem = {
        toolSlug: "contract-generator",
        toolTitle: `عقد: ${projectTitle}`,
        inputs: { freelancerName, clientName, projectTitle, totalFee, advancePercent, deliveryDays },
        outputs: {
          "الطرفان": `${freelancerName} / ${clientName}`,
          "القيمة": `${totalFee} $`,
          "الدفعة الأولى": `${advanceAmount} $`
        },
        savedAt: new Date().toISOString()
      };
      localStorage.setItem("saved_tools", JSON.stringify([newItem, ...existing]));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`${isFocusMode ? "fixed inset-0 z-40 overflow-y-auto rounded-none" : ""} bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 dir-rtl text-slate-100 shadow-xl`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">مولد عقود العمل الحر المباشر</h3>
            <p className="text-xs text-slate-400">صغ اتفاقية قانونية واضحة تحمي حقوقك وتحدد الدفعات ونطاق العمل.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
        <button onClick={() => setIsGuideOpen(true)} className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-400 transition-colors" title="قراءة الدليل الإجرائي" aria-label="قراءة الدليل الإجرائي">
          <BookOpen className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => setIsFocusMode((value) => !value)} className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors" title={isFocusMode ? "إغلاق وضع التركيز" : "وضع التركيز"} aria-label={isFocusMode ? "إغلاق وضع التركيز" : "وضع التركيز"}>
          {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Expand className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={handleSave}
          className="p-2 px-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-slate-950 transition-all text-xs font-bold flex items-center gap-1.5"
        >
          {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          <span>{isSaved ? "تم الحفظ بـ لوحتي" : "حفظ العقد"}</span>
        </button>
        </div>
      </div>

      <ArticleDrawer isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} articleTitle="صياغة عقد عمل حر يحمي نطاق المشروع" articleHref="/finance/freelancing/pricing-guide#contract-generator">
        <p>العقد الجيد يحول الاتفاق الشفهي إلى نطاق عمل قابل للقياس، ودفعات واضحة، وحدود تمنع تمدد المشروع دون مقابل.</p>
        <ul>
          <li>اكتب مخرجات المشروع بلغة قابلة للتحقق، لا بعبارات عامة.</li>
          <li>حدد الدفعة المقدمة وموعد التسليم وشروط التعديلات.</li>
          <li>اربط انتقال الملكية الفكرية بسداد كامل المستحقات.</li>
        </ul>
      </ArticleDrawer>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor={freelancerId} className="block text-xs font-semibold text-slate-300 mb-1">اسمك (المستقل)</label>
              <input
                id={freelancerId}
                type="text"
                value={freelancerName}
                onChange={(e) => setFreelancerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor={clientId} className="block text-xs font-semibold text-slate-300 mb-1">اسم العميل / الشركة</label>
              <input
                id={clientId}
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor={titleId} className="block text-xs font-semibold text-slate-300 mb-1">اسم أو وصف المشروع</label>
            <input
              id={titleId}
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor={feeId} className="block text-[11px] font-semibold text-slate-400 mb-1">إجمالي المبلغ ($)</label>
              <input
                id={feeId}
                type="number"
                value={totalFee}
                onChange={(e) => setTotalFee(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor={advanceId} className="block text-[11px] font-semibold text-slate-400 mb-1">الدفعة الأولى (%)</label>
              <input
                id={advanceId}
                type="number"
                value={advancePercent}
                onChange={(e) => setAdvancePercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor={daysId} className="block text-[11px] font-semibold text-slate-400 mb-1">مدة التنفيذ (أيام)</label>
              <input
                id={daysId}
                type="number"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Live Contract Preview (6 cols) */}
        <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-400" /> معاينة العقد المولّد
            </span>
            <button
              onClick={handleCopy}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "تم نسخ العقد" : "نسخ نص العقد"}</span>
            </button>
          </div>

          <pre className="bg-slate-900/60 p-4 rounded-xl text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed max-h-64 overflow-y-auto border border-slate-800">
            {contractText}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ContractGenerator;