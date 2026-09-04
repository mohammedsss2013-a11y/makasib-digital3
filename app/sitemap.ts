import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { getArticlePath } from "@/lib/articlePaths";
import { env } from "@/lib/env";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://makasib.digital";

  const paths = [
    "",
    "/finance",
    "/finance/freelancing",
    "/finance/ecommerce",
    "/finance/marketing",
    "/finance/content-economy",
    "/finance/crypto",
    "/finance/hardware",
    "/tech",
    "/tech/ai-apps",
    "/tech/cybersecurity",
    "/tech/cloud-remote",
    "/tech/infra",
    "/tech/iot-emerging",
    "/media",
    "/media/creation",
    "/media/news",
    "/media/podcasting",
    "/media/streaming",
    "/media/gaming",
    "/digital-lifestyle",
    "/digital-lifestyle/life-management",
    "/digital-lifestyle/health",
    "/digital-lifestyle/psychology",
    "/digital-lifestyle/learning",
    "/digital-lifestyle/culture",
    "/community",
    "/community/consultations",
    "/community/tool-results",
    "/community/topics",
    "/community/directory",
    "/about",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/faq",
    "/contact",
    "/sitemap",
  ];

  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, category, subcategory, created_at, status")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const staticEntries: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));

  const postEntries = (posts || []).map((post) => ({
    url: `${baseUrl}${getArticlePath(post)}`,
    lastModified: post.created_at ? new Date(post.created_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
