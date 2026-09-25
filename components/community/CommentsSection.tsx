"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { MessageCircle, Reply, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface CommentRecord {
  id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  author: { full_name: string | null };
}

export function CommentsSection({ postId, userId }: { postId: string; userId: string | null }) {
  const supabase = useMemo(() => createClient(), []);
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void loadComments();
  }, [postId]);

  async function loadComments() {
    const { data } = await supabase
      .from("community_post_comments")
      .select("id, post_id, user_id, parent_id, content, created_at")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    const rows = data ?? [];
    const userIds = [...new Set(rows.map((comment) => comment.user_id))];
    const { data: profiles } = userIds.length
      ? await supabase.from("public_profiles").select("id, full_name").in("id", userIds)
      : { data: [] };
    const names = new Map((profiles ?? []).map((profile) => [profile.id, profile.full_name]));
    setComments(rows.map((comment) => ({ ...comment, author: { full_name: names.get(comment.user_id) ?? "عضو مكاسب" } })));
  }

  async function submitComment(event: FormEvent) {
    event.preventDefault();
    if (!userId || !content.trim() || loading) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("community_post_comments")
      .insert({ post_id: postId, user_id: userId, parent_id: replyTo, content: content.trim() })
      .select("id, post_id, user_id, parent_id, content, created_at")
      .single();
    if (!error && data) {
      setComments((current) => [...current, { ...data, author: { full_name: "أنت" } }]);
      setContent("");
      setReplyTo(null);
      setExpanded(true);
    }
    setLoading(false);
  }

  const roots = comments.filter((comment) => !comment.parent_id);
  const replies = (commentId: string) => comments.filter((comment) => comment.parent_id === commentId);

  return (
    <div className="border-t border-[var(--border-main)] pt-3" dir="rtl">
      <button type="button" onClick={() => setExpanded((value) => !value)} className="flex min-h-11 items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent-primary)]">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        نقاش ({comments.length})
      </button>
      {expanded && (
        <div className="mt-3 space-y-3">
          {!comments.length && <p className="text-xs text-[var(--text-subtle)]">ابدأ أول نقاش حول هذا المنشور.</p>}
          {roots.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <div className="rounded-xl bg-[var(--bg-muted)]/60 p-3">
                <div className="flex items-center justify-between gap-2 text-[10px] text-[var(--text-subtle)]">
                  <strong className="text-[var(--text-main)]">{comment.author.full_name}</strong>
                  <time dateTime={comment.created_at}>{new Date(comment.created_at).toLocaleDateString("ar-EG")}</time>
                </div>
                <p className="mt-1 whitespace-pre-line text-xs leading-6 text-[var(--text-muted)]">{comment.content}</p>
                {userId && <button type="button" onClick={() => setReplyTo(comment.id)} className="mt-2 inline-flex items-center gap-1 text-[10px] text-[var(--accent-primary)]"><Reply className="h-3 w-3" />رد</button>}
              </div>
              <div className="mr-4 space-y-2 border-r border-[var(--border-main)] pr-3">
                {replies(comment.id).map((reply) => <div key={reply.id} className="rounded-xl bg-[var(--bg-muted)]/40 p-3"><strong className="text-[10px] text-[var(--text-main)]">{reply.author.full_name}</strong><p className="mt-1 text-xs leading-6 text-[var(--text-muted)]">{reply.content}</p></div>)}
              </div>
            </div>
          ))}
          {userId ? (
            <form onSubmit={submitComment} className="flex items-end gap-2">
              <label className="sr-only" htmlFor={`comment-${postId}`}>اكتب تعليقاً</label>
              <textarea id={`comment-${postId}`} value={content} onChange={(event) => setContent(event.target.value)} rows={2} maxLength={2000} placeholder={replyTo ? "اكتب ردك..." : "اكتب تعليقاً..."} className="min-w-0 flex-1 rounded-xl border border-[var(--border-main)] bg-[var(--bg-muted)] px-3 py-2 text-xs text-[var(--text-main)] outline-none focus:border-[var(--accent-primary)]" />
              <button type="submit" disabled={loading || !content.trim()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-primary)] text-white disabled:opacity-50" aria-label="إرسال التعليق"><Send className="h-4 w-4" /></button>
            </form>
          ) : <p className="text-xs text-[var(--text-subtle)]">سجل الدخول للمشاركة في النقاش.</p>}
        </div>
      )}
    </div>
  );
}