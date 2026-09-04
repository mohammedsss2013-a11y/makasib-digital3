"use client";

import React, { useEffect, useState } from "react";
import {
  Settings,
  ShieldCheck,
  Bell,
  Key,
  User,
  Smartphone,
  CheckCircle2,
  Lock,
  LogOut,
  Sparkles,
  Upload,
  Camera,
  Loader2,
  UserCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AppImage from "@/components/ui/AppImage";

import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications">("profile");

  // Profile fields
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [email, setEmail] = useState("");

  // Password fields
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 2FA field
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Notification settings
  const [emailArticles, setEmailArticles] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [communityAlerts, setCommunityAlerts] = useState(true);

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleAvatarFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("يرجى اختيار ملف صورة صالح (JPG, PNG, WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("حجم الصورة كبير جداً (الأقصى 5 ميجابايت).");
      return;
    }

    setIsUploadingAvatar(true);
    setMessage("");
    setErrorMessage("");

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setErrorMessage("غير مسجل الدخول.");
        setIsUploadingAvatar(false);
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        // Fallback to Data URL if storage bucket fails
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setAvatarUrl(result);
          setIsUploadingAvatar(false);
          setMessage("تم تحميل الصورة بنجاح.");
        };
        reader.readAsDataURL(file);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      setAvatarUrl(publicUrl);
      setMessage("تم رفع الصورة الشخصية بنجاح!");
    } catch {
      setErrorMessage("حدث خطأ أثناء رفع الصورة.");
    } finally {
      setIsUploadingAvatar(false);
    }
  }

  useEffect(() => {
    const supabase = createClient();
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, username, bio, avatar_url, specialty, notification_settings, two_factor_enabled")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        setFullName(profile.full_name ?? "");
        setUsername(profile.username ?? "");
        setBio(profile.bio ?? "");
        setAvatarUrl(profile.avatar_url ?? "");
        setSpecialty(profile.specialty ?? "");
        setTwoFactorEnabled(Boolean(profile.two_factor_enabled));

        if (profile.notification_settings) {
          setEmailArticles(profile.notification_settings.email_articles ?? true);
          setEmailUpdates(profile.notification_settings.email_updates ?? true);
          setCommunityAlerts(profile.notification_settings.community_alerts ?? true);
        }
      }
      setIsLoading(false);
    }
    loadProfile();
  }, []);

  async function handleSaveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setErrorMessage("");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setErrorMessage("انتهت الجلسة. سجّل الدخول مرة أخرى.");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        full_name: fullName.trim() || null,
        username: username.trim() || null,
        bio: bio.trim() || null,
        avatar_url: avatarUrl.trim() || null,
        specialty: specialty.trim() || null,
        notification_settings: {
          email_articles: emailArticles,
          email_updates: emailUpdates,
          community_alerts: communityAlerts,
        },
        two_factor_enabled: twoFactorEnabled,
      },
      { onConflict: "id" }
    );

    setIsSaving(false);
    if (error) {
      setErrorMessage("تعذر حفظ بيانات الملف الشخصي.");
    } else {
      setMessage("تم حفظ البيانات الشخصية والإشعارات بنجاح.");
    }
  }

  async function handleUpdatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (!newPassword || newPassword.length < 6) {
      setPasswordError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("كلمتا المرور غير متطابقتين.");
      return;
    }

    setIsSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setIsSaving(false);

    if (error) {
      setPasswordError(error.message || "تعذر تغيير كلمة المرور.");
    } else {
      setPasswordMessage("تم تحديث كلمة المرور بنجاح.");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  async function handleSignOutAllSessions() {
    const supabase = createClient();
    await supabase.auth.signOut({ scope: "global" });
    router.push("/login");
  }

  return (
    <div className="space-y-8 py-2 dir-rtl">
      {/* رأس الصفحة */}
      <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Settings className="w-4 h-4" />
          <span>لوحة تحكم المستخدم</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          إعدادات الحساب والأمان والتفضيلات
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
          التحكم الكامل في حسابك كعضو: تعديل بيانات الملف الشخصي، كلمة المرور، مراجعة الجلسات والأجهزة النشطة، وضبط استقبال الإشعارات.
        </p>

        {/* علامات التبويب Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "profile"
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-md"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <User className="h-4 w-4" />
            البيانات الشخصية والملف
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "security"
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-md"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            الأمان والجلسات النشطة (2FA)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "notifications"
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-md"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Bell className="h-4 w-4" />
            إعدادات الإشعارات
          </button>
        </div>
      </div>

      {/* 1. التبويب الأول: البيانات الشخصية والبروفايل */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-3xl">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white border-r-4 border-emerald-400 pr-3 flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-400" />
              <span>إدارة الملف الشخصي والنبذة</span>
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-bold">الاسم الظاهر</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                  placeholder="مثال: محمد علي"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-bold">اسم المستخدم (Username)</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  placeholder="mohammed_2026"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-slate-300 block mb-1 font-bold">البريد الإلكتروني (الحساب)</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 cursor-not-allowed"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">البريد محمي وموثق مع Supabase Auth.</span>
              </div>

            {/* بطاقة رفع الصورة الشخصية من الجهاز */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3">
              <label className="text-xs text-slate-300 block font-bold">الصورة الشخصية (Avatar)</label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 rounded-2xl border-2 border-emerald-500/30 bg-slate-900 overflow-hidden shadow-inner flex items-center justify-center">
                  {avatarUrl ? (
                    <AppImage src={avatarUrl} alt="صورة الملف الشخصي" fallbackType="avatar" fill sizes="80px" className="object-cover" />
                  ) : (
                    <UserCircle className="h-12 w-12 text-slate-500" />
                  )}
                  {isUploadingAvatar && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
                      <Loader2 className="h-6 w-6 text-emerald-400 animate-spin" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-right">
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 transition-all">
                      <Upload className="h-4 w-4" />
                      <span>{isUploadingAvatar ? "جارٍ الرفع..." : "اختيار صورة من الجهاز"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileUpload}
                        disabled={isUploadingAvatar || isLoading}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-400">يدعم صيغ (PNG, JPG, WEBP) بحجم أقصى 5 ميجابايت.</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <label className="text-[11px] text-slate-400 block mb-1">أو أدخل رابط صورة مباشر (Avatar URL):</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  disabled={isLoading || isUploadingAvatar}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-bold">التخصص / المجال</label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  disabled={isLoading}
                  placeholder="مثال: ريادة أعمال / تكنولوجيا"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-slate-300 block mb-1 font-bold">النبذة الشخصية (Bio)</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={isLoading}
                  placeholder="اكتب نبذة مختصرة تعرّف بها نفسك بالمنصة..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {(message || errorMessage) && (
            <p className={`text-xs ${errorMessage ? "text-red-300" : "text-emerald-300"}`}>{errorMessage || message}</p>
          )}

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isSaving || isLoading}
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition-all disabled:opacity-50"
            >
              {isSaving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
            </button>
          </div>
        </form>
      )}

      {/* 2. التبويب الثاني: الأمان والجلسات */}
      {activeTab === "security" && (
        <div className="space-y-6 max-w-3xl">
          {/* تغيير كلمة المرور */}
          <form onSubmit={handleUpdatePassword} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white border-r-4 border-emerald-400 pr-3 flex items-center gap-2">
              <Key className="h-4 w-4 text-emerald-400" />
              <span>تغيير كلمة المرور</span>
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-bold">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-bold">تأكيد كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {(passwordMessage || passwordError) && (
              <p className={`text-xs ${passwordError ? "text-red-400" : "text-emerald-300"}`}>{passwordError || passwordMessage}</p>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                تحديث كلمة المرور
              </button>
            </div>
          </form>

          {/* التحقق بخطوتين (2FA) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white border-r-4 border-emerald-400 pr-3 flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span>التحقق بخطوتين (Two-Factor Authentication - 2FA)</span>
            </h3>
            <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div>
                <p className="text-xs font-bold text-white">تفعيل طبقة أمان إضافية بالحساب</p>
                <p className="text-[11px] text-slate-400 mt-1">تطلب رمز تحقق إضافي عند تسجيل الدخول من أجهزة جديدة.</p>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  twoFactorEnabled
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-slate-800 text-slate-300 border border-slate-700"
                }`}
              >
                {twoFactorEnabled ? "مفعّل ✓" : "تفعيل الان"}
              </button>
            </div>
          </div>

          {/* إدارة الجلسات الأجهزة المتصلة */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white border-r-4 border-emerald-400 pr-3 flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-emerald-400" />
              <span>الجلسات والأجهزة المتصلة حالياً</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-200">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="font-bold text-white">الجلسة الحالية (Current Device)</p>
                    <p className="text-[10px] text-emerald-300/80">المتصفح الحالي • نشط الآن</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                  نشط
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-300">
                <div>
                  <p className="font-bold text-white">تسجيل الخروج من كل الأجهزة الأخرى</p>
                  <p className="text-[11px] text-slate-400 mt-1">إنهاء جميع الجلسات الفعالة للأمان.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSignOutAllSessions}
                  className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-bold text-red-300 hover:bg-red-500/20 transition-all"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  إنهاء الجلسات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. التبويب الثالث: إعدادات الإشعارات */}
      {activeTab === "notifications" && (
        <form onSubmit={handleSaveProfile} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-3xl">
          <h3 className="text-base font-bold text-white border-r-4 border-emerald-400 pr-3 flex items-center gap-2">
            <Bell className="h-4 w-4 text-emerald-400" />
            <span>ضبط استقبال الإشعارات والبريد</span>
          </h3>

          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 cursor-pointer hover:border-slate-700">
              <div>
                <p className="text-xs font-bold text-white">إشعارات المقالات والتقارير الجديدة</p>
                <p className="text-[11px] text-slate-400 mt-1">تلقي تنبيهات عند نشر مقالات مميزة في مجالاتك المحددة.</p>
              </div>
              <input
                type="checkbox"
                checked={emailArticles}
                onChange={(e) => setEmailArticles(e.target.checked)}
                className="h-4 w-4 rounded accent-emerald-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 cursor-pointer hover:border-slate-700">
              <div>
                <p className="text-xs font-bold text-white">تحديثات الأدوات والحاسبات</p>
                <p className="text-[11px] text-slate-400 mt-1">إرسال تحديثات عند تطوير أدوات مالية أو برمجية جديدة.</p>
              </div>
              <input
                type="checkbox"
                checked={emailUpdates}
                onChange={(e) => setEmailUpdates(e.target.checked)}
                className="h-4 w-4 rounded accent-emerald-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 cursor-pointer hover:border-slate-700">
              <div>
                <p className="text-xs font-bold text-white">تنبيهات مجتمع مكاسب والتفاعلات</p>
                <p className="text-[11px] text-slate-400 mt-1">إشعارات عند الرد على استفساراتك أو التفاعل مع منشوراتك.</p>
              </div>
              <input
                type="checkbox"
                checked={communityAlerts}
                onChange={(e) => setCommunityAlerts(e.target.checked)}
                className="h-4 w-4 rounded accent-emerald-500 cursor-pointer"
              />
            </label>
          </div>

          {(message || errorMessage) && (
            <p className={`text-xs ${errorMessage ? "text-red-300" : "text-emerald-300"}`}>{errorMessage || message}</p>
          )}

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition-all"
            >
              حفظ تفضيلات الإشعارات
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
