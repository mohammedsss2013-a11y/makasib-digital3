"use client";

import React from "react";
import { Camera, Newspaper, Mic, Radio, Clapperboard } from "lucide-react";
import { CategorySubnav } from "@/components/layout/CategorySubnav";

const mediaSubcategories = [
  { key: "صناعة المحتوى المرئي والمكتوب", title: "صناعة المحتوى", href: "/articles/media/creation", icon: Camera },
  { key: "الأخبار والتحليلات", title: "الأخبار والتحليلات", href: "/articles/media/news", icon: Newspaper },
  { key: "البودكاست", title: "البودكاست", href: "/articles/media/podcasting", icon: Mic },
  { key: "البث المباشر", title: "البث المباشر", href: "/articles/media/streaming", icon: Radio },
  { key: "صناعة الألعاب والترفيه", title: "صناعة الألعاب", href: "/articles/media/gaming", icon: Clapperboard },
];

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white dir-rtl">
      <CategorySubnav
        categoryName="الإعلام الجديد"
        mainHref="/media"
        items={mediaSubcategories}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </div>
    </div>
  );
}
