"use client";

import { Clock, Heart, MessageSquare, Share2 } from "lucide-react";
import AppImage from "@/components/ui/AppImage";

export interface CommunityPostCardData {
  id: string;
  title: string;
  content: string;
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
};

export default function PostCard({ post, liked = false, likeDisabled = false, onLike }: PostCardProps) {
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
      </div>

      <footer className="flex items-center justify-between border-t border-[var(--border-main)] pt-3 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => onLike?.(post.id)} disabled={likeDisabled} aria-pressed={liked} className="flex min-h-11 items-center gap-1.5 transition-colors hover:text-emerald-500 dark:hover:text-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"><Heart className={`h-4 w-4 ${liked ? "fill-emerald-400 text-emerald-400" : ""}`} aria-hidden="true" /><span>{liked ? "تم تسجيل الإعجاب" : `إعجاب (${post.likes_count})`}</span></button>
          <span className="flex items-center gap-1.5"><MessageSquare className="h-4 w-4" aria-hidden="true" />نقاش</span>
        </div>
        <button type="button" aria-label="مشاركة المنشور" className="min-h-11 min-w-11 rounded-lg p-2 transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"><Share2 className="mx-auto h-4 w-4" aria-hidden="true" /></button>
      </footer>
    </article>
  );
}
