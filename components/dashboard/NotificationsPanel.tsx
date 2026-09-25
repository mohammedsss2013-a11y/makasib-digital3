"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { DashboardNotification } from "@/utils/dashboard";

export function NotificationsPanel({ initialNotifications, userId }: { initialNotifications: DashboardNotification[]; userId: string }) {
  const supabase = useMemo(() => createClient(), []);
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((notification) => !notification.read_at).length;

  useEffect(() => {
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` }, (payload) => {
        setNotifications((current) => [payload.new as DashboardNotification, ...current].slice(0, 10));
      })
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [supabase, userId]);

  async function markAllRead() {
    const { error } = await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("user_id", userId).is("read_at", null);
    if (!error) setNotifications((current) => current.map((notification) => ({ ...notification, read_at: notification.read_at ?? new Date().toISOString() })));
  }

  return (
    <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-bold text-white"><Bell className="h-4 w-4 text-emerald-400" />التنبيهات <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">{unreadCount} جديد</span></div>
        {unreadCount > 0 && <button type="button" onClick={markAllRead} className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-emerald-300"><CheckCheck className="h-3.5 w-3.5" />تحديد الكل كمقروء</button>}
      </div>
      <div className="space-y-2">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs text-emerald-200">ستظهر هنا تحديثات التعليقات والدعم فور وصولها.</div>
        {notifications.map((notification) => <Link key={notification.id} href={notification.href ?? "/dashboard"} className={`block rounded-xl border p-4 transition-colors hover:border-emerald-500/40 ${notification.read_at ? "border-slate-800 bg-slate-950" : "border-emerald-500/30 bg-emerald-500/5"}`}><div className="flex items-center justify-between gap-3"><strong className="text-xs text-white">{notification.title}</strong><time className="text-[10px] text-slate-500" dateTime={notification.created_at}>{new Date(notification.created_at).toLocaleDateString("ar-EG")}</time></div><p className="mt-1 text-xs leading-6 text-slate-400">{notification.message}</p></Link>)}
      </div>
    </section>
  );
}