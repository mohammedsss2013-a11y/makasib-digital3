import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getArticlePath } from "@/lib/articlePaths";

interface BlogRedirectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogRedirectPage({ params }: BlogRedirectPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("id, category, subcategory, slug")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!post) notFound();
  redirect(getArticlePath(post));
}