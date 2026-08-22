"use client";

import React, { useState } from "react";
import { CategoryArticlesClient } from "@/components/articles/CategoryArticlesClient";
import { Tv, Share2, Heart, MessageSquare, TrendingUp, BarChart3 } from "lucide-react";

export default function MediaSectorPage() {
  const [followers, setFollowers] = useState<number>(10000);
  const [likes, setLikes] = useState<number>(450);
  const [comments, setComments] = useState<number>(60);
  const [shares, setShares] = useState<number>(25);

  const totalInteractions = likes + comments + shares;
  const engagementRate = followers > 0 ? ((totalInteractions / followers) * 100).toFixed(2) : "0.00";

  const getEngagementRating = (rate: number) => {
    if (rate < 1) return { text: "ضعيف (أقل من المتوسط)", color: "text-red-400" };
    if (rate <= 3.5) return { text: "جيد جداً (ضمن المعدل الطبيعي)", color: "text-yellow-400" };
    return { text: "ممتاز مرتفع الفاعلية", color: "text-emerald-400" };
  };

  const rating = getEngagementRating(Number(engagementRate));

  return <CategoryArticlesClient category="الإعلام الجديد" categoryLabel="الإعلام الجديد" description="مقالات عن صناعة المحتوى والبث والتفاعل والاقتصاد الجديد للإعلام الرقمي." subcategorySection="media" />;

  return (
    <div className="space-y-12 py-4 dir-rtl">
      {/* Sector Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs px-3 py-1 rounded-full font-semibold">
          <Tv className="w-4 h-4" />
          <span>قطاع الإعلام الجديد والتسويق الرقمي</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          أدوات حساب معدل التفاعل وتكلفة الحملات التسويقية
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          قس فاعلية الحسابات وصناع المحتوى وحلل معدلات المشاركة (Engagement Rate) بدقة قبل توقيع العقود الإعلانية.
        </p>
      </div>

      {/* Engagement Rate Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">حاسبة معدل التفاعل (Engagement Rate)</h3>
            <p className="text-xs text-slate-400">أدخل عدد المتابعين والمتوسط الإحصائي للتفاعلات لقياس النسبة المئوية للتفاعل.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">إجمالي المتابعين</label>
              <input
                type="number"
                value={followers}
                onChange={(e) => setFollowers(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">الإعجابات (Likes)</label>
                <input
                  type="number"
                  value={likes}
                  onChange={(e) => setLikes(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">التعليقات (Comments)</label>
                <input
                  type="number"
                  value={comments}
                  onChange={(e) => setComments(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">المشاركات (Shares)</label>
                <input
                  type="number"
                  value={shares}
                  onChange={(e) => setShares(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 border border-purple-500/30 rounded-xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs text-slate-400">معدل التفاعل النظري:</span>
              <div className="text-4xl font-black text-purple-400 mt-2 font-mono">{engagementRate}%</div>
              <div className={`text-xs font-bold mt-2 ${rating.color}`}>{rating.text}</div>
            </div>

            <div className="border-t border-slate-800/80 pt-3 text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>إجمالي التفاعلات المحسوبة:</span>
                <span className="font-mono text-white font-bold">{totalInteractions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
