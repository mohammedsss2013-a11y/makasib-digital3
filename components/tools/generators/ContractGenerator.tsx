"use client";

import React, { useEffect, useState, useId } from "react";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileText, Copy, Check, Bookmark, ShieldCheck, BookOpen, Expand, Minimize2 } from "lucide-react";
import { recordToolUsage } from "@/config/toolsRegistry";
import { ArticleDrawer } from "@/components/drawers/ArticleDrawer";
import { contractsService } from "@/services/contracts.service";
import type { ContractData } from "@/types/contracts";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/providers/ToastProvider";

export const contractSchema = z.object({
  freelancerName: z.string().min(2, "يرجى إدخال اسم المستقل (حرفين على الأقل)"),
  clientName: z.string().min(2, "يرجى إدخال اسم العميل بشكل صحيح"),
  projectTitle: z.string().min(3, "عنوان أو وصف المشروع مطلوب (3 أحرف على الأقل)"),
  totalFee: z.coerce.number({ message: "المبلغ يجب أن يكون رقماً" }).positive("المبلغ يجب أن يكون أكبر من 0"),
  advancePercent: z.coerce.number({ message: "النسبة يجب أن تكون رقماً" }).min(0, "النسبة لا تقل عن 0%").max(100, "النسبة لا تتجاوز 100%"),
  deliveryDays: z.coerce.number({ message: "مدة التنفيذ يجب أن تكون رقماً" }).min(1, "مدة التنفيذ يجب أن تكون يوماً واحداً على الأقل"),
});

export type ContractInput = z.input<typeof contractSchema>;
export type ContractFormData = z.infer<typeof contractSchema>;

export const ContractGenerator = () => {
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    recordToolUsage("contract-generator");
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContractInput, undefined, ContractFormData>({
    resolver: zodResolver(contractSchema),
    mode: "onChange",
    defaultValues: {
      freelancerName: "أحمد علي",
      clientName: "شركة الحلول المبتكرة",
      projectTitle: "تطوير واجهة منصة إلكترونية",
      totalFee: 1500,
      advancePercent: 50,
      deliveryDays: 14,
    },
  });

  const formValues = useWatch({ control });
  const contractPayload: ContractData = {
    freelancerName: formValues.freelancerName || "أحمد علي",
    clientName: formValues.clientName || "شركة الحلول المبتكرة",
    projectTitle: formValues.projectTitle || "تطوير واجهة منصة إلكترونية",
    totalFee: Number(formValues.totalFee) || 0,
    advancePercent: Number(formValues.advancePercent) || 0,
    deliveryDays: Number(formValues.deliveryDays) || 1,
  };

  const freelancerId = useId();
  const clientId = useId();
  const titleId = useId();
  const feeId = useId();
  const advanceId = useId();
  const daysId = useId();

  const contractText = contractsService.generateContractMarkdown(contractPayload);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractText);
      setCopied(true);
      showToast("تم نسخ العقد", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("تعذر نسخ العقد", "error");
    }
  };

  const onSubmit: SubmitHandler<ContractFormData> = async (data) => {
    try {
      const { error } = await contractsService.saveContract(data);
      if (error) throw error;
      setIsSaved(true);
      showToast("تم حفظ العقد في لوحتك", "success");
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("تعذر حفظ العقد", error);
      showToast("تعذر حفظ العقد. حاول مرة أخرى", "error");
    }
  };

  return (
    <div className={cn(
      "bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 dir-rtl text-slate-100 shadow-xl",
      isFocusMode && "fixed inset-0 z-40 overflow-y-auto rounded-none"
    )}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">مولد عقود العمل الحر المباشر</h3>
            <p className="text-xs text-slate-400">صغ اتفاقية قانونية واضحة تحمي حقوقك وتحدد الدفعات ونطاق العمل.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setIsGuideOpen(true)} className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-400 transition-colors" title="قراءة الدليل الإجرائي" aria-label="قراءة الدليل الإجرائي">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          <button onClick={() => setIsFocusMode((value) => !value)} className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors" title={isFocusMode ? "إغلاق وضع التركيز" : "وضع التركيز"} aria-label={isFocusMode ? "إغلاق وضع التركيز" : "وضع التركيز"}>
            {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" /> : <Expand className="w-3.5 h-3.5" aria-hidden="true" />}
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="p-2 px-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-slate-950 transition-all text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSaved ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor={freelancerId} className="block text-xs font-semibold text-slate-300 mb-1">اسمك (المستقل)</label>
              <input
                id={freelancerId}
                type="text"
                {...register("freelancerName")}
                className={`w-full bg-slate-950 border ${errors.freelancerName ? "border-rose-500" : "border-slate-800"} rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.freelancerName && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.freelancerName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor={clientId} className="block text-xs font-semibold text-slate-300 mb-1">اسم العميل / الشركة</label>
              <input
                id={clientId}
                type="text"
                {...register("clientName")}
                className={`w-full bg-slate-950 border ${errors.clientName ? "border-rose-500" : "border-slate-800"} rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.clientName && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.clientName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor={titleId} className="block text-xs font-semibold text-slate-300 mb-1">اسم أو وصف المشروع</label>
            <input
              id={titleId}
              type="text"
              {...register("projectTitle")}
              className={`w-full bg-slate-950 border ${errors.projectTitle ? "border-rose-500" : "border-slate-800"} rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500`}
            />
            {errors.projectTitle && (
              <p className="mt-1 text-[11px] text-rose-400">{errors.projectTitle.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor={feeId} className="block text-[11px] font-semibold text-slate-400 mb-1">إجمالي المبلغ ($)</label>
              <input
                id={feeId}
                type="number"
                {...register("totalFee")}
                className={`w-full bg-slate-950 border ${errors.totalFee ? "border-rose-500" : "border-slate-800"} rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.totalFee && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.totalFee.message}</p>
              )}
            </div>
            <div>
              <label htmlFor={advanceId} className="block text-[11px] font-semibold text-slate-400 mb-1">الدفعة الأولى (%)</label>
              <input
                id={advanceId}
                type="number"
                {...register("advancePercent")}
                className={`w-full bg-slate-950 border ${errors.advancePercent ? "border-rose-500" : "border-slate-800"} rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.advancePercent && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.advancePercent.message}</p>
              )}
            </div>
            <div>
              <label htmlFor={daysId} className="block text-[11px] font-semibold text-slate-400 mb-1">مدة التنفيذ (أيام)</label>
              <input
                id={daysId}
                type="number"
                {...register("deliveryDays")}
                className={`w-full bg-slate-950 border ${errors.deliveryDays ? "border-rose-500" : "border-slate-800"} rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.deliveryDays && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.deliveryDays.message}</p>
              )}
            </div>
          </div>
        </form>

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