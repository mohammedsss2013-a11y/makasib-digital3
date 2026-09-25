"use client";

import { Clock, Heart, MessageSquare, Share2 } from "lucide-react";
import AppImage from "@/components/ui/AppImage";
import { CommentsSection } from "@/components/community/CommentsSection";
import type { Json } from "@/types/database.types";

export interface CommunityPostCardData {
  id: string;
  title: string;
  content: string;
  attached_tool_data?: Json | null;
  created_at: string;
  likes_count: number;
  author: {
    full_name: string;
    avatar_url?: string | null;
    role_title?: string | null;
  };
}

type PostCardProps = {
  post: CommunityPostCardData;
  liked?: boolean;
  likeDisabled?: boolean;
  onLike?: (id: string) => void;
  userId?: string | null;
};

export default function PostCard({ post, liked = false, likeDisabled = false, onLike, userId = null }: PostCardProps) {
  const attachedToolData = post.attached_tool_data && typeof post.attached_tool_data === "object" && !Array.isArray(post.attached_tool_data)
    ? post.attached_tool_data
    : null;

  return (
    <article className="space-y-4 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-5 transition-colors hover:border-emerald-500/50" dir="rtl">
      <header className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--border-main)] bg-[var(--bg-muted)]">
            <AppImage src={post.author.avatar_url} alt="" fallbackType="avatar" fill sizes="40px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-[var(--text-main)]">{post.author.full_name || "عضو مكاسب"}</h2>
            {post.author.role_title && <p className="text-xs font-medium text-emerald-500 dark:text-emerald-400">{post.author.role_title}</p>}
          </div>
        </div>
        <time dateTime={post.created_at} className="flex shrink-0 items-center gap-1 text-xs text-[var(--text-subtle)]"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{new Date(post.created_at).toLocaleDateString("ar-EG")}</time>
      </header>

      <div className="space-y-2">
        <h3 className="text-base font-bold leading-7 text-[var(--text-main)]">{post.title}</h3>
        <p className="whitespace-pre-line text-sm leading-7 text-[var(--text-muted)]">{post.content}</p>
        {attachedToolData && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
            <p className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400">نتيجة أداة مرفقة</p>
            <div className="mt-2 grid gap-1 sm:grid-cols-2">
              {Object.entries(attachedToolData).filter(([key]) => key !== "toolSlug").slice(-4).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-2 text-[10px]"><span className="text-[var(--text-subtle)]">{key}</span><strong className="text-[var(--text-main)]">{String(value)}</strong></div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="flex items-center justify-between border-t border-[var(--border-main)] pt-3 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => onLike?.(post.id)} disabled={likeDisabled} aria-pressed={liked} className="flex min-h-11 items-center gap-1.5 transition-colors hover:text-emerald-500 dark:hover:text-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"><Heart className={`h-4 w-4 ${liked ? "fill-emerald-400 text-emerald-400" : ""}`} aria-hidden="true" /><span>{liked ? "تم تسجيل الإعجاب" : `إعجاب (${post.likes_count})`}</span></button>
          <span className="flex items-center gap-1.5"><MessageSquare className="h-4 w-4" aria-hidden="true" />نقاش</span>
        </div>
        <button type="button" aria-label="مشاركة المنشور" className="min-h-11 min-w-11 rounded-lg p-2 transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"><Share2 className="mx-auto h-4 w-4" aria-hidden="true" /></button>
      </footer>
      <CommentsSection postId={post.id} userId={userId} />
    </article>
  );
}
