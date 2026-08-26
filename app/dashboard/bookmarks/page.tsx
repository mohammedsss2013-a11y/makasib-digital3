import { Bookmark } from "lucide-react";
import { getDashboardData } from "@/utils/dashboard";
import { SavedToolsList } from "@/components/dashboard/SavedToolsList";

export default async function BookmarksPage() {
  const { savedTools } = await getDashboardData();

  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Bookmark className="w-4 h-4" />
          <span>لوحة تحكم المستخدم</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          قائمة المفضلة السريعة (Pinned Bookmarks)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          الصفحات والمقالات والأدوات المفضلة لديك للوصول الفوري إليها بزر واحد.
        </p>
      </div>

      <SavedToolsList initialTools={savedTools} />
    </div>
  );
}
