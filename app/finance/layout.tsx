"use client";

import React from "react";
import { BriefcaseBusiness, ShoppingCart, Megaphone, BadgePercent, Bitcoin, Building2 } from "lucide-react";
import { CategorySubnav } from "@/components/layout/CategorySubnav";

const financeSubcategories = [
  { key: "العمل الحر والخدمات", title: "العمل الحر", href: "/finance?sub=freelancing", icon: BriefcaseBusiness },
  { key: "التجارة الإلكترونية", title: "التجارة الإلكترونية", href: "/finance?sub=ecommerce", icon: ShoppingCart },
  { key: "التسويق الرقمي", title: "التسويق الرقمي", href: "/finance?sub=marketing", icon: Megaphone },
  { key: "اقتصاد صناعة المحتوى", title: "صناعة المحتوى", href: "/finance?sub=content-economy", icon: BadgePercent },
  { key: "العملات الرقمية والبلوكشين", title: "العملات الرقمية", href: "/finance?sub=crypto", icon: Bitcoin },
  { key: "العتاد والإنتاجية المالية", title: "العتاد والإنتاجية", href: "/finance?sub=hardware", icon: Building2 },
];

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
