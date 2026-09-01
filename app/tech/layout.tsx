"use client";

import React from "react";
import { Bot, LockKeyhole, CloudCog, Gauge, BrainCircuit } from "lucide-react";
import { CategorySubnav } from "@/components/layout/CategorySubnav";

const techSubcategories = [
  { key: "تطبيقات الذكاء الاصطناعي", title: "الذكاء الاصطناعي", href: "/articles/tech/ai-apps", icon: Bot },
  { key: "الأمن السيبراني", title: "الأمن السيبراني", href: "/articles/tech/cybersecurity", icon: LockKeyhole },
  { key: "الحوسبة السحابية", title: "السحابة والعمل عن بُعد", href: "/articles/tech/cloud-remote", icon: CloudCog },
  { key: "البنية التحتية", title: "البنية التقنية", href: "/articles/tech/infra", icon: Gauge },
  { key: "الإنترنت والتقنيات الناشئة", title: "التقنيات الناشئة", href: "/articles/tech/iot-emerging", icon: BrainCircuit },
];

export default function TechLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white dir-rtl">
      <CategorySubnav
        categoryName="التكنولوجيا والابتكار"
        mainHref="/tech"
        items={techSubcategories}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </div>
    </div>
  );
}
