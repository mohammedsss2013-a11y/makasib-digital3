"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, MessageSquare, Send, Sparkles, CheckCircle2 } from "lucide-react";

export default function ConsultationModal() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !description) return;
    setSubmitted(true);
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={() => router.back()} />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl dir-rtl text-slate-100 sm:p-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h2 id="consultation-modal-title" className="text-lg font-black text-white">
                طلب استشارة سريعة
              </h2>
              <p className="text-xs text-slate-400">اطرح تساؤلك ليصل لمجتمع الخبراء والأقران</p>
            </div>
          </div>

          <button
            onClick={() => router.back()}
            className="rounded-xl border border-slate-800 bg-slate-800/60 p-2 text-slate-400 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-all"
            aria-label="إغلاق النافذة"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">تم إرسال استشارتك بنجاح!</h3>
            <p className="text-xs text-slate-400">سيتم نقلك تلقائياً لمساحة المجتمع...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                عنوان الاستشارة
              </label>
              <input
                type="text"
                required
                placeholder="مثال: كيف أتعامل مع عميل يطلب تخفيض السعر؟"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                تفاصيل الاستشارة والسياق
              </label>
              <textarea
                required
                rows={4}
                placeholder="اشرح المشكلة، الميزانية، أو التحدي التقني بإيجاز..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-xl border border-slate-800 px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-2 text-xs font-extrabold text-slate-950 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <Send className="h-3.5 w-3.5" />
                <span>نشر الاستشارة</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
