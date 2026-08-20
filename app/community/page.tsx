"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Users, ThumbsUp, PlusCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface CommunityPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  likes_count: number;
  created_at: string;
}

const supabase = createClient();

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [likingPostId, setLikingPostId] = useState<string | null>(null);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    async function loadCommunity() {
      const [{ data: authData }, { data, error }, { data: likes }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("community_posts").select("id, user_id, title, content, likes_count, created_at").order("created_at", { ascending: false }),
        supabase.from("community_post_likes").select("post_id, user_id"),
      ]);

      setUserId(authData.user?.id ?? null);
      if (error) setErrorMessage("تعذر تحميل منشورات المجتمع حاليًا.");
      const likeCounts = (likes ?? []).reduce<Record<string, number>>((counts, like) => {
        counts[like.post_id] = (counts[like.post_id] ?? 0) + 1;
        return counts;
      }, {});
      setPosts((data ?? []).map((post) => ({ ...post, likes_count: likeCounts[post.id] ?? 0 })));
      setIsLoading(false);
    }

    loadCommunity();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !newPostTitle.trim() || !newPostContent.trim()) return;

    const { data, error } = await supabase
      .from("community_posts")
      .insert({ user_id: userId, category: "general", title: newPostTitle.trim(), content: newPostContent.trim() })
      .select("id, user_id, title, content, likes_count, created_at")
      .single();

    if (error || !data) {
      setErrorMessage("تعذر نشر الموضوع. حاول مرة أخرى.");
      return;
    }

    setPosts((currentPosts) => [data, ...currentPosts]);
    setNewPostTitle("");
    setNewPostContent("");
    setShowNewPostForm(false);
  };

  const handleLike = async (id: string) => {
    if (!userId || likingPostId) return;
    setLikingPostId(id);

    const { error } = await supabase.from("community_post_likes").insert({ post_id: id, user_id: userId });
    if (!error) {
      setPosts((currentPosts) => currentPosts.map((post) => post.id === id ? { ...post, likes_count: post.likes_count + 1 } : post));
    }
    setLikingPostId(null);
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
          disabled={!userId}
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-colors whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{userId ? "إضافة منشور جديد" : "سجل الدخول للنشر"}</span>
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

      {errorMessage && <p role="alert" className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">{errorMessage}</p>}
      {!userId && !isLoading && (
        <p className="text-sm text-slate-400 bg-slate-900 border border-slate-800 rounded-xl p-4">
          للمشاركة في المجتمع، <Link href="/login" className="text-emerald-400 hover:text-emerald-300">سجل الدخول أولًا</Link>.
        </p>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {isLoading ? <p className="text-center text-slate-400 py-8">جارٍ تحميل المنشورات...</p> : posts.length === 0 ? <p className="text-center text-slate-400 py-8">لا توجد منشورات بعد.</p> : posts.map((post) => (
          <div key={post.id} className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-emerald-400 text-xs">
                  م
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">عضو مجتمع</h4>
                  <span className="text-[10px] text-slate-500">{new Date(post.created_at).toLocaleDateString("ar-EG")}</span>
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
                disabled={!userId || likingPostId === post.id}
                className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>إعجاب ({post.likes_count})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
