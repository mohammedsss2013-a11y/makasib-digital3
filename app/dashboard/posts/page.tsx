import { MessageSquare } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function MyPostsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: posts } = user ? await supabase.from("community_posts").select("id, title, content, created_at").eq("user_id", user.id).order("created_at", { ascending: false }) : { data: [] };
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <MessageSquare className="w-4 h-4" />
          <span>لوحة تحكم المستخدم</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          مشاركاتي وتفاعلاتي في مجتمع مكاسب (My Posts & Responses)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          سجل استشاراتك وردودك ومشاركاتك المرفقة في مجتمع مكاسب الرقمي.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">{posts?.length ? posts.map((post) => <article key={post.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2"><div className="flex items-center justify-between text-xs"><span className="text-emerald-400 font-semibold">منشور في مجتمع مكاسب</span><time className="text-slate-500" dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString("ar-EG")}</time></div><h4 className="text-sm font-bold text-white">{post.title}</h4><p className="text-xs text-slate-400">{post.content}</p></article>) : <p className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">لم تنشر أي موضوع بعد.</p>}</div>
    </div>
  );
}
