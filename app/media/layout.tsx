"use client";

import React from "react";
import { CategorySubnav } from "@/components/layout/CategorySubnav";
import { ARTICLE_SECTORS } from "@/lib/constants/sectors";

const media = ARTICLE_SECTORS.find((sector) => sector.id === "media")!;
const mediaSubcategories = media.branches.map((branch) => ({
  key: branch.slug,
  title: branch.title,
  icon: branch.icon,
  href: `/articles/media/${branch.slug}`,
  topics: branch.topics.map((topic) => ({ title: topic.title, href: `/articles/media/${branch.slug}?topic=${topic.slug}` })),
}));

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
