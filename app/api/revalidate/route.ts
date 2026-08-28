import { NextRequest, NextResponse } from "next/server";
import { revalidateArticleAction, revalidateAllArticlesAction } from "@/actions/articles.action";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, subcategory, slug, secret } = body;

    const configuredSecret = process.env.REVALIDATION_SECRET;
    if (!configuredSecret || secret !== configuredSecret) {
      return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
    }

    if (
      (category !== undefined && typeof category !== "string") ||
      (subcategory !== undefined && typeof subcategory !== "string") ||
      (slug !== undefined && typeof slug !== "string") ||
      (typeof category === "string" && category.length > 100) ||
      (typeof subcategory === "string" && subcategory.length > 100) ||
      (typeof slug === "string" && slug.length > 150)
    ) {
      return NextResponse.json({ message: "Invalid revalidation payload" }, { status: 400 });
    }

    if (category && subcategory && slug) {
      const result = await revalidateArticleAction(category, subcategory, slug);
      return NextResponse.json(result);
    }

    const result = await revalidateAllArticlesAction();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
