"use client";

import React from "react";
import { CategorySubnav } from "@/components/layout/CategorySubnav";
import { ARTICLE_SECTORS } from "@/lib/constants/sectors";

const finance = ARTICLE_SECTORS.find((sector) => sector.id === "finance")!;
const financeSubcategories = finance.branches.map((branch) => ({
  key: branch.slug,
  title: branch.title,
  icon: branch.icon,
  href: `/articles/finance/${branch.slug}`,
  topics: branch.topics.map((topic) => ({ title: topic.title, href: `/articles/finance/${branch.slug}?topic=${topic.slug}` })),
}));

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white dir-rtl">
      <CategorySubnav
        categoryName="المال والأعمال"
        mainHref="/finance"
        items={financeSubcategories}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </div>
    </div>
  );
}
