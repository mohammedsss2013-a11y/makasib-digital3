import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { writeFileSync } from "node:fs";

dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) throw new Error("متغيرات Supabase غير موجودة");

const supabase = createClient(url, key);
const expectedSlugs = [
  "freelancing-and-micro-projects-guide", "e-commerce-and-digital-sales-guide", "digital-marketing-ad-roi-guide",
  "content-creation-economy-guide", "crypto-and-blockchain-essentials", "financial-productivity-hardware-guide",
  "ai-applications-and-systems-guide", "cybersecurity-and-digital-privacy-guide", "cloud-computing-remote-tools-guide",
  "digital-infrastructure-future-tech", "iot-and-emerging-technologies", "visual-and-written-content-creation-guide",
  "digital-industry-news-and-analysis", "visual-and-audio-podcasting-guide", "live-streaming-and-audience-engagement",
  "digital-entertainment-and-indie-gaming", "digital-life-management-and-organization", "digital-health-and-burnout-prevention",
  "continuous-digital-learning-and-skills", "future-digital-culture-and-self-building",
];

async function verify() {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, status, category, subcategory")
    .in("slug", expectedSlugs);
  if (error) throw new Error(error.message);

  const rows = data ?? [];
  const result = {
    total: rows.length,
    published: rows.filter((row) => row.status === "published").length,
    uniqueBranches: new Set(rows.map((row) => `${row.category}::${row.subcategory}`)).size,
    missingSlugs: expectedSlugs.filter((slug) => !rows.some((row) => row.slug === slug)),
    forbiddenFinanceAi: rows.filter((row) => row.subcategory?.includes("الذكاء الاصطناعي") && row.category === "المال والأعمال"),
    branches: rows.map((row) => ({ category: row.category, subcategory: row.subcategory, slug: row.slug })),
  };
  writeFileSync("seed-verification.json", JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
}

verify().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
