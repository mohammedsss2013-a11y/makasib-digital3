"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ArrowLeft, Eye, EyeOff, KeyRound, LoaderCircle, LogIn, ShieldCheck, Sparkles } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("error") === "email-unconfirmed") {
      setErrorMessage("أكد بريدك الإلكتروني من الرسالة المرسلة إليك قبل دخول لوحة التحكم.");
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (isSignUp && password !== confirmPassword) {
      setErrorMessage("كلمتا المرور غير متطابقتين.");
      return;
    }

    setIsSubmitting(true);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setErrorMessage("تعذر إنشاء الحساب. تأكد من البريد الإلكتروني وحاول مرة أخرى.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      if (data.session) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setSuccessMessage("تم إنشاء حسابك. تحقق من بريدك الإلكتروني لتفعيل الحساب.");
        setPassword("");
        setConfirmPassword("");
      }
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleOAuth(provider: "google" | "facebook") {
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      setErrorMessage("تعذر بدء التسجيل عبر هذا المزود. حاول مرة أخرى.");
      setIsSubmitting(false);
    }
  }

  function switchMode() {
    setIsSignUp((currentMode) => !currentMode);
    setErrorMessage("");
    setSuccessMessage("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <main className="relative flex min-h-[calc(100vh-13rem)] items-center justify-center overflow-hidden py-8 sm:py-14" dir="rtl">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 p-7 text-slate-950 sm:p-10 lg:p-12">
          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border-[24px] border-white/20" />
          <div className="absolute -right-20 top-16 h-44 w-44 rounded-full border-[18px] border-slate-950/10" />
          <div className="relative">
            <div className="mb-8 w-fit rounded-2xl bg-slate-950/90 px-3 py-2 shadow-xl">
              <BrandLogo compact />
            </div>
            <div className="hidden mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-emerald-300 shadow-xl">
              مـ
            </div>
            <p className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-950/60">
              <Sparkles className="h-4 w-4" /> مساحتك الرقمية
            </p>
            <h2 className="max-w-sm text-3xl font-black leading-tight sm:text-4xl">
              أفكار أوضح، قرارات أقوى، ومكاسب مستمرة.
            </h2>
            <p className="mt-5 max-w-sm text-sm font-medium leading-7 text-slate-950/70">
              عُد إلى أدواتك المحفوظة ومجتمعك المعرفي، وواصل بناء خطوتك التالية بثقة.
            </p>
          </div>
          <div className="relative mt-12 flex items-center gap-3 text-sm font-bold">
            <ShieldCheck className="h-5 w-5" />
            بياناتك محمية ومصممة لخصوصيتك
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              <KeyRound className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">{isSignUp ? "أنشئ حسابك الآن" : "مرحبًا بعودتك"}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {isSignUp ? "ابدأ رحلتك في عالم مكاسب رقمية خلال دقائق." : "سجّل دخولك للوصول إلى عالم مكاسب رقمية."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-200">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-200">
                  كلمة المرور
                </label>
                <span className="text-xs text-slate-500">6 أحرف على الأقل</span>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3.5 pl-12 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
                  placeholder={isSignUp ? "أنشئ كلمة مرور قوية" : "أدخل كلمة المرور"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition-colors hover:text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="confirm-password" className="mb-2 block text-sm font-semibold text-slate-200">
                  تأكيد كلمة المرور
                </label>
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
                  placeholder="أعد إدخال كلمة المرور"
                />
              </div>
            )}

            {errorMessage && (
              <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm leading-6 text-red-300">
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p role="status" className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm leading-6 text-emerald-200">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 font-black text-slate-950 transition-all hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
              <span>{isSubmitting ? (isSignUp ? "جارٍ إنشاء الحساب..." : "جارٍ تسجيل الدخول...") : (isSignUp ? "إنشاء الحساب" : "تسجيل الدخول")}</span>
              {!isSubmitting && <ArrowLeft className="h-4 w-4" />}
            </button>
          </form>

          <div className="my-7 flex items-center gap-3 text-xs text-slate-600">
            <span className="h-px flex-1 bg-slate-800" />
            <span>أو تابع باستخدام</span>
            <span className="h-px flex-1 bg-slate-800" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/40 py-3 text-sm font-bold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="text-base font-black text-white">G</span> Google
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("facebook")}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/40 py-3 text-sm font-bold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="text-base font-black text-blue-400">f</span> Facebook
            </button>
          </div>

          <p className="mt-7 text-center text-sm text-slate-400">
            {isSignUp ? "لديك حساب بالفعل؟" : "ليس لديك حساب؟"}{" "}
            <button type="button" onClick={switchMode} className="font-bold text-emerald-300 transition-colors hover:text-emerald-200">
              {isSignUp ? "تسجيل الدخول" : "إنشاء حساب جديد"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}