"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";

const ADMIN_EMAIL = "mohammed.sss2013@gmail.com";

export default function AdminNavButton({ userEmail }: { userEmail?: string | null }) {
  const normalizedEmail = userEmail?.trim().toLowerCase();
  const isAllowedAdmin = normalizedEmail === ADMIN_EMAIL.toLowerCase();

  if (!isAllowedAdmin) {
    return null;
  }

  return (
    <Link
      href="/admin"
      className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-3 py-2.5 text-xs font-bold text-white shadow-md shadow-red-500/20 transition-colors hover:bg-red-500 sm:px-4 sm:text-sm"
      title="لوحة التحكم الداخلية"
    >
      <ShieldAlert className="h-4 w-4" />
      <span className="hidden sm:inline">لوحة الإدارة</span>
    </Link>
  );
}
