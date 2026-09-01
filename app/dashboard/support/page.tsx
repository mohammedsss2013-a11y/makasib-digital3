import Link from "next/link";
import { Headphones, HelpCircle, MessageSquarePlus, Send, Ticket, CheckCircle2, Clock } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: string;
  message: string;
  created_at: string;
}

export default async function SupportPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: tickets } = user
    ? await supabase
        .from("support_tickets")
        .select("id, subject, category, status, message, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  const userTickets = (tickets ?? []) as SupportTicket[];

  async function createTicketAction(formData: FormData) {
    "use server";
    const supabaseServer = await createClient();
    const { data: { user: currentUser } } = await supabaseServer.auth.getUser();
    if (!currentUser) return;

    const subject = formData.get("subject")?.toString().trim();
    const category = formData.get("category")?.toString().trim() || "general";
    const message = formData.get("message")?.toString().trim();

    if (!subject || !message) return;

    await supabaseServer.from("support_tickets").insert({
      user_id: currentUser.id,
      subject,
      category,
      message,
      status: "open",
    });
  }

  return (
    <div className="space-y-8 py-2 dir-rtl">
      {/* رأس الصفحة */}
      <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Headphones className="w-4 h-4" />
          <span>الدعم والمساعدة للمستخدمين</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          نظام تذاكر الدعم الفني والاستفسارات
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
          أهلاً بك في مراسلة فريق الإدارة. يمكنك فتح تذكرة استفسار جديدة ومتابعة التذاكر السابقة أو مراجعة الأسئلة الشائعة.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* 1. نموذج إنشاء تذكرة جديدة */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-base font-bold text-white border-r-4 border-emerald-400 pr-3 flex items-center gap-2">
            <MessageSquarePlus className="h-4 w-4 text-emerald-400" />
            <span>إنشاء تذكرة دعم جديدة</span>
          </h2>

          <form action={createTicketAction} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">موضوع الاستفسار / التذكرة</label>
              <input
                name="subject"
                required
                placeholder="مثال: استفسار حول حاسبة التمويل أو أداة برمجية"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">قسم الاستفسار</label>
              <select
                name="category"
                defaultValue="general"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="general">استفسار عام</option>
                <option value="tools">الأدوات والحاسبات</option>
                <option value="account">حسابي والأمان</option>
                <option value="feedback">اقتراح وتطوير</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">تفاصيل الرسالة</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="اكتب تفاصيل استفسارك وسيتم الرد عليك سريعا..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs py-3 rounded-xl transition-all"
            >
              <Send className="h-4 w-4" />
              <span>إرسال التذكرة للإدارة</span>
            </button>
          </form>
        </div>

        {/* 2. سجل تذاكر المستخدم الحالية والأسئلة الشائعة */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white border-r-4 border-emerald-400 pr-3 flex items-center gap-2">
              <Ticket className="h-4 w-4 text-emerald-400" />
              <span>تذاكري السابقة ({userTickets.length})</span>
            </h2>

            {userTickets.length ? (
              <div className="space-y-3">
                {userTickets.map((t) => (
                  <div key={t.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white">{t.subject}</p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === "closed"
                            ? "bg-slate-800 text-slate-400"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {t.status === "open" ? "مفتوحة" : "مغلقة"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{t.message}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span>القسم: {t.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(t.created_at).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-6 border border-dashed border-slate-800 rounded-xl">
                لا توجد تذاكر مفتوحة حالياً. يمكنك إنشاء تذكرة من النموذج المجاور.
              </p>
            )}
          </div>

          {/* قسم الأسئلة الشائعة السريع */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-emerald-400" />
                <span>الأسئلة الشائعة (FAQ)</span>
              </h2>
              <Link href="/faq" className="text-xs font-bold text-emerald-300 hover:text-emerald-200">
                عرض المركز الكامل
              </Link>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <details className="group rounded-xl border border-slate-800 bg-slate-950 p-3">
                <summary className="cursor-pointer font-bold text-white group-open:text-emerald-400">
                  كيف أحفظ نتائج الحاسبات والأدوات؟
                </summary>
                <p className="mt-2 text-slate-400 leading-relaxed">
                  يمكنك النقر على زر &quot;حفظ النتيجة&quot; في أي أداة حاسبة، وسوف تُحفظ تلقائياً في حسابك برابط &quot;المفضلة والنتائج&quot;.
                </p>
              </details>

              <details className="group rounded-xl border border-slate-800 bg-slate-950 p-3">
                <summary className="cursor-pointer font-bold text-white group-open:text-emerald-400">
                  ما هي صلاحيات حساب المستخدم العادي؟
                </summary>
                <p className="mt-2 text-slate-400 leading-relaxed">
                  يحظى العضو بصلاحيات حفظ النتائج، تعديل الملف الشخصي، تغيير كلمة المرور، مراجعة الجلسات النشطة، والتفاعل بالمجتمع.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
