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
const PAGE_SIZE = 10;

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [likingPostId, setLikingPostId] = useState<string | null>(null);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    loadCommunity(0);
  }, []);

  async function loadCommunity(pageNumber: number) {
    if (pageNumber > 0) setIsLoadingMore(true);
    const from = pageNumber * PAGE_SIZE;
    const [{ data: authData }, { data, error }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from("community_posts").select("id, user_id, title, content, likes_count, created_at").order("created_at", { ascending: false }).range(from, from + PAGE_SIZE - 1),
    ]);

    setUserId(authData.user?.id ?? null);
    if (error) setErrorMessage("تعذر تحميل منشورات المجتمع حاليًا.");
    if (authData.user && data?.length) {
      const { data: userLikes } = await supabase
        .from("community_post_likes")
        .select("post_id")
        .eq("user_id", authData.user.id)
        .in("post_id", data.map((post) => post.id));
      setLikedPostIds((current) => new Set([...current, ...(userLikes ?? []).map((like) => like.post_id)]));
    }
    setPosts((currentPosts) => pageNumber === 0 ? (data ?? []) : [...currentPosts, ...(data ?? [])]);
    setPage(pageNumber);
    setHasMore((data?.length ?? 0) === PAGE_SIZE);
    setIsLoading(false);
    setIsLoadingMore(false);
  }

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
    if (!userId || likingPostId || likedPostIds.has(id)) return;
    setLikingPostId(id);

    const { error } = await supabase.from("community_post_likes").insert({ post_id: id, user_id: userId });
    if (!error) {
      setPosts((currentPosts) => currentPosts.map((post) => post.id === id ? { ...post, likes_count: post.likes_count + 1 } : post));
      setLikedPostIds((current) => new Set(current).add(id));
    } else {
      setErrorMessage(error.code === "23505" ? "سبق أن سجلت إعجابك بهذا المنشور." : "تعذر تسجيل الإعجاب. حاول مرة أخرى.");
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
          type="button"
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          disabled={!userId}
          aria-expanded={showNewPostForm}
          aria-controls="new-community-post"
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-colors whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" aria-hidden="true" />
          <span>{userId ? "إضافة منشور جديد" : "سجل الدخول للنشر"}</span>
        </button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <form id="new-community-post" onSubmit={handleCreatePost} className="bg-slate-900 border border-emerald-500/40 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white">إضافة منشور جديد للمجتمع</h3>
          <div>
            <label htmlFor="community-post-title" className="sr-only">عنوان الموضوع</label>
            <input
              id="community-post-title"
              type="text"
              placeholder="عنوان الموضوع أو التجربة..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="community-post-content" className="sr-only">تفاصيل الموضوع</label>
            <textarea
              id="community-post-content"
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
      <div className="space-y-4" aria-live="polite" aria-busy={isLoading}>
        {isLoading ? <p className="text-center text-slate-400 py-8">جارٍ تحميل المنشورات...</p> : posts.length === 0 ? <p className="text-center text-slate-400 py-8">لا توجد منشورات بعد.</p> : posts.map((post) => (
          <article key={post.id} className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-4">
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
                type="button"
                onClick={() => handleLike(post.id)}
                disabled={!userId || likingPostId === post.id || likedPostIds.has(post.id)}
                aria-pressed={likedPostIds.has(post.id)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{likedPostIds.has(post.id) ? "تم تسجيل الإعجاب" : `إعجاب (${post.likes_count})`}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      {hasMore && !isLoading && (
        <button
          type="button"
          onClick={() => loadCommunity(page + 1)}
          disabled={isLoadingMore}
          className="mx-auto block rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:border-emerald-400 hover:text-emerald-300 disabled:opacity-50"
        >
          {isLoadingMore ? "جارٍ تحميل المزيد..." : "تحميل المزيد من المنشورات"}
        </button>
      )}
    </div>
  );
}
