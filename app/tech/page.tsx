"use client";

import React, { useState } from "react";
import { CategoryArticlesClient } from "@/components/articles/CategoryArticlesClient";
import { Cpu, ShieldCheck, KeyRound, Calculator, Check, Bookmark } from "lucide-react";

export default function TechSectorPage() {
  // Token Calculator State
  const [tokenCount, setTokenCount] = useState<number>(500000);
  const [costPerMillion, setCostPerMillion] = useState<number>(2.5); // e.g. $2.5 per 1M tokens

  // Password Evaluator State
  const [password, setPassword] = useState("");

  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "أدخل كلمة مرور للفحص", color: "text-slate-500", time: "-" };
    let score = 0;
    if (pwd.length >= 8) score += 25;
    if (pwd.length >= 12) score += 25;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20;

    if (score < 40) return { score, label: "ضعيفة جداً", color: "text-red-400", time: "ثوانٍ معدودة" };
    if (score < 75) return { score, label: "متوسطة الأمان", color: "text-yellow-400", time: "عدة أشهر" };
    return { score, label: "قوية جداً وتشديد أمني ممتاز", color: "text-emerald-400", time: "مئات السنين" };
  };

  const pwdInfo = calculatePasswordStrength(password);
  const totalApiCost = ((tokenCount / 1000000) * costPerMillion).toFixed(3);

  return <CategoryArticlesClient category="التكنولوجيا والابتكار" categoryLabel="التكنولوجيا والابتكار" description="تحليلات وأدلة حول الذكاء الاصطناعي والأمن السيبراني والسحابة وتقنيات المستقبل." subcategorySection="tech" />;

  return (
    <div className="space-y-12 py-4 dir-rtl">
      {/* Sector Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full font-semibold">
          <Cpu className="w-4 h-4" />
          <span>قطاع التكنولوجيا والأمن الرقمي</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          أدوات فحص كلمات المرور وحساب تكاليف الذكاء الاصطناعي الـ API
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          فحص وتأمين البيانات، تقييم حصانة كلمة السر، وحساب نفقات استهلاك نماذج الـ LLM وتكاليف الـ Tokens تفاعلياً.
        </p>
      </div>

      {/* Tool 1: AI Token & API Cost Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">حاسبة تكلفة استخدام نماذج الـ AI والـ Tokens</h3>
            <p className="text-xs text-slate-400">احسب التكلفة الإجمالية لاستدعاءات API بناءً على عدد الـ Tokens وسعر المليون token.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">عدد الـ Tokens التقديري (مجموع المدخلات والمخرجات)</label>
              <input
                type="number"
                value={tokenCount}
                onChange={(e) => setTokenCount(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">سعر المليون Token ($ / 1M Tokens)</label>
              <input
                type="number"
                step="0.1"
                value={costPerMillion}
                onChange={(e) => setCostPerMillion(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs text-slate-400">التكلفة التقديرية للاستخدام:</span>
              <div className="text-3xl font-black text-blue-400 mt-2 font-mono">{totalApiCost} $</div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              تصلح لحساب تكلفة التطبيقات الذكية وحزم الاستعلام اليومية والشهرية.
            </p>
          </div>
        </div>
      </div>

      {/* Tool 2: Password Security & Crack Time Evaluator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">حاسبة زمن فك وقوة كلمات المرور</h3>
            <p className="text-xs text-slate-400">اختبر صلابة كلمة السر ومدى قدرة هجمات التخمين الشامل (Brute Force) على اختراقها.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">كلمة المرور للفحص (لا يتم تخزين أي شيء في السيرفر)</label>
            <input
              type="text"
              placeholder="اكتب كلمة سر تجريبية..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">درجة الصلابة والأمان:</span>
              <span className={`font-bold ${pwdInfo.color}`}>{pwdInfo.label} ({pwdInfo.score}%)</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${pwdInfo.score < 40 ? "bg-red-500" : pwdInfo.score < 75 ? "bg-yellow-500" : "bg-emerald-500"}`}
                style={{ width: `${pwdInfo.score}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span>الزمن التقديري لاختراقها بالقوة الغاشمة:</span>
              <span className="font-bold text-white font-mono">{pwdInfo.time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
