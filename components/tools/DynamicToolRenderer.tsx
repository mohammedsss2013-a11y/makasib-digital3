"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { AlertTriangle, Loader2, Wrench } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type ToolComponent = ComponentType;

function ToolLoader() {
  return (
    <div className="flex min-h-48 w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50" dir="rtl" role="status" aria-live="polite">
      <span className="inline-flex items-center gap-2 text-sm text-slate-500">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        جاري تحميل الأداة التفاعلية...
      </span>
    </div>
  );
}

const toolsMap: Record<string, ToolComponent> = {
  "freelance-pricing-calculator": dynamic(
    () => import("@/components/tools/calculators/FreelancePricingCalculator").then((module) => module.FreelancePricingCalculator),
    { loading: () => <ToolLoader /> },
  ),
  "contract-generator": dynamic(
    () => import("@/components/tools/generators/ContractGenerator").then((module) => module.ContractGenerator),
    { loading: () => <ToolLoader /> },
  ),
};

function UnavailableTool({ slug, reason }: { slug: string; reason: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center text-amber-900" dir="rtl" role="status">
      <AlertTriangle className="mx-auto h-5 w-5 text-amber-600" aria-hidden="true" />
      <p className="mt-2 text-sm font-bold">الأداة غير متاحة حاليًا</p>
      <p className="mt-1 text-xs leading-6 text-amber-800">{reason}</p>
      <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-amber-700" dir="ltr">
        <Wrench className="h-3 w-3" aria-hidden="true" />
        {slug}
      </p>
    </div>
  );
}

export function DynamicToolRenderer({ slug }: { slug: string }) {
  const [verification, setVerification] = useState<{
    slug: string;
    status: "loading" | "active" | "unavailable" | "error";
  }>({ slug, status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function verifyTool() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("tools")
        .select("slug")
        .eq("slug", slug)
        .eq("status", "active")
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        setVerification({ slug, status: "error" });
      } else {
        setVerification({ slug, status: data ? "active" : "unavailable" });
      }
    }

    void verifyTool();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const status = verification.slug === slug ? verification.status : "loading";

  if (status === "loading") return <ToolLoader />;
  if (status === "error") return <UnavailableTool slug={slug} reason="تعذر التحقق من حالة الأداة. حاول تحديث الصفحة لاحقًا." />;
  if (status === "unavailable") return <UnavailableTool slug={slug} reason="الأداة غير موجودة أو تم إيقافها من لوحة التحكم." />;

  const ToolComponent = toolsMap[slug];
  if (!ToolComponent) {
    return <UnavailableTool slug={slug} reason="تم تسجيل الأداة في قاعدة البيانات، لكن واجهتها التفاعلية لم تُطوّر بعد." />;
  }

  return <ToolComponent />;
}
