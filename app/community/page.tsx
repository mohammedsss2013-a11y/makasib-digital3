"use client";

import React, { useState } from "react";
import { Users, MessageSquare, ThumbsUp, Send, Sparkles, PlusCircle } from "lucide-react";

export default function CommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "سارة المهندس",
      role: "مواجهة تجربة مستقلة",
      time: "منذ ساعتين",
      title: "تجربتي في تحويل التسعير من الساعة إلى التسعير القائم على القيمة",
      content: "بعد استخدام حاسبة التسعير في المنصة، اكتشفت أن معدل ساعتي القديم كان يظلم خبرتي 40%. قمت بتعديل عروضي وحصلت على أول عميل بالسعر الجديد اليوم!",
      likes: 18,
    },
    {
      id: 2,
      author: "محمد العتيبي",
      role: "مطور برمجيات",
      time: "منذ 5 ساعات",
      title: "صياغة بند الدفعة الأولى في عقود العمل الحر",
      content: "نصيحة لكل المستقلين: لا تبدأ أي مشروع بدون الحصول على 50% مقدم على الأقل. استخدمت مولد العقود في المنصة والعملاء أصبحوا يثقون في التعاقد أكثر.",
      likes: 24,
    },
  ]);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle || !newPostContent) return;

    const newPost = {
      id: Date.now(),
      author: "زائر مكاسب",
      role: "عضو مجتمع",
      time: "الآن",
      title: newPostTitle,
      content: newPostContent,
      likes: 1,
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setShowNewPostForm(false);
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="space-y-8 py-4 dir-rtl max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full font-semibold border border-emerald-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>مجتمع مكاسب التفاعلي</span>
          </div>
          <h1 className="text-2xl font-black text-white">نقاشات وتجارب الأدوات الرقمية</h1>
          <p className="text-xs text-slate-400 max-w-md">
            شارك نتائج حساباتك، تجاربك مع العملاء، واستشارات التسعير والتكنولوجيا مع نخبة من المطورين والمستقلين.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-colors whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>إضافة منشور جديد</span>
        </button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <form onSubmit={handleCreatePost} className="bg-slate-900 border border-emerald-500/40 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white">إضافة منشور جديد للمجتمع</h3>
          <div>
            <input
              type="text"
              placeholder="عنوان الموضوع أو التجربة..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="اكتب التفاصيل والملاحظات هنا..."
              rows={3}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNewPostForm(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-lg hover:bg-slate-700"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-emerald-600"
            >
              نشر الموضوع
            </button>
          </div>
        </form>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-emerald-400 text-xs">
                  {post.author[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{post.author}</h4>
                  <span className="text-[10px] text-slate-500">{post.role} • {post.time}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-100">{post.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>
            </div>

            <div className="flex items-center gap-4 pt-3 border-t border-slate-800/60 text-xs">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>إعجاب ({post.likes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
