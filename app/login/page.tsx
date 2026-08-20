"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, LoaderCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center py-10" dir="rtl">
      <section className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <LogIn className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">تسجيل الدخول</h1>
            <p className="text-sm text-slate-400 mt-1">ادخل إلى حسابك في مكاسب رقمية</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-2">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-200 mb-2">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              autoComplete="current-password"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400"
              placeholder="أدخل كلمة المرور"
            />
          </div>

          {errorMessage && (
            <p role="alert" className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-400 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl py-3 flex items-center justify-center gap-2 transition-colors"
          >
            {isSubmitting ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
            <span>{isSubmitting ? "جارٍ تسجيل الدخول..." : "دخول"}</span>
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          ليس لديك حساب؟ <Link href="/contact" className="text-emerald-400 hover:text-emerald-300">تواصل معنا</Link>
        </p>
      </section>
    </main>
  );
}