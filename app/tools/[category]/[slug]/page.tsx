import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { CalculatorWorkspace } from "@/components/dashboard/CalculatorWorkspace";
import { TOOLS_REGISTRY } from "@/config/toolsRegistry";
import { ToolActions } from "@/components/tools/ToolActions";

interface ToolPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function DynamicToolPage({ params }: ToolPageProps) {
  const { category, slug } = await params;
  const tool = TOOLS_REGISTRY.find((item) => item.category === category && item.slug === slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="min-h-screen py-4 text-slate-100 dir-rtl" dir="rtl">
      <div className="mx-auto mb-8 max-w-5xl">
        <Link
          href="/tools"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-emerald-400"
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة إلى صندوق الأدوات</span>
        </Link>

        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:flex-row sm:items-center">
          <div>
            <span className="rounded-full border border-emerald-800 bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-400">
              {tool.categoryLabel}
            </span>
            <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
              {tool.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">{tool.description}</p>
          </div>

          <ToolActions toolSlug={tool.slug} toolTitle={tool.title} />
        </div>
      </div>

      <div className="mx-auto max-w-5xl">
        <CalculatorWorkspace />
      </div>
    </div>
  );
}
