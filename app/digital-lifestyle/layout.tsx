"use client";

import React from "react";
import { Target, HeartPulse, Brain, BookOpen, SunMedium, Sparkles } from "lucide-react";
import { CategorySubnav } from "@/components/layout/CategorySubnav";

const digitalLifestyleSubcategories = [
  { key: "إدارة الحياة الرقمية", title: "إدارة الحياة الرقمية", href: "/articles/digital-lifestyle/life-management", icon: Target },
  { key: "الصحة الرقمية", title: "الصحة الرقمية", href: "/articles/digital-lifestyle/health", icon: HeartPulse },
  { key: "علم النفس الرقمي", title: "علم النفس الرقمي", href: "/articles/digital-lifestyle/psychology", icon: Brain },
  { key: "التعليم والتعلم الرقمي", title: "التعليم والتعلم", href: "/articles/digital-lifestyle/learning", icon: BookOpen },
  { key: "فلسفة العصر الرقمي", title: "فلسفة العصر الرقمي", href: "/articles/digital-lifestyle/philosophy", icon: SunMedium },
  { key: "الثقافة الرقمية", title: "الثقافة الرقمية", href: "/articles/digital-lifestyle/culture", icon: Sparkles },
];

export default function DigitalLifestyleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white dir-rtl">
      <CategorySubnav
        categoryName="رقميون"
        mainHref="/digital-lifestyle"
        items={digitalLifestyleSubcategories}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </div>
    </div>
  );
}
