"use client";

import React from "react";
import { Target, HeartPulse, BookOpen, Sparkles } from "lucide-react";
import { CategorySubnav } from "@/components/layout/CategorySubnav";

const digitalLifestyleSubcategories = [
  { key: "إدارة الحياة الرقمية", title: "إدارة الحياة الرقمية", href: "/digital-lifestyle?sub=life-management", icon: Target },
  { key: "الصحة الرقمية", title: "الصحة الرقمية", href: "/digital-lifestyle?sub=health", icon: HeartPulse },
  { key: "التعليم والتعلم الرقمي", title: "التعليم والتعلم", href: "/digital-lifestyle?sub=learning", icon: BookOpen },
  { key: "الثقافة الرقمية", title: "الثقافة الرقمية", href: "/digital-lifestyle?sub=culture", icon: Sparkles },
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
