import { NextRequest, NextResponse } from "next/server";
import { revalidateArticleAction, revalidateAllArticlesAction } from "@/actions/articles.action";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, subcategory, slug, secret } = body;

    // التحقق من مفتاح الحماية عند الاستدعاء من الويب هوك (اختياري)
    if (secret && process.env.REVALIDATION_SECRET && secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
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
