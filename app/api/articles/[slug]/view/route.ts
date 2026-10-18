import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const VIEW_COOKIE_NAME = "article_viewed";
const VIEW_COOKIE_MAX_AGE = 24 * 60 * 60;

interface ArticleViewRouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(request: NextRequest, { params }: ArticleViewRouteContext) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "مصدر الطلب غير صالح" }, { status: 403 });
  }

  const { slug } = await params;
  if (!/^[\p{L}\p{N}][\p{L}\p{N}_-]{0,199}$/u.test(slug)) {
    return NextResponse.json({ error: "مسار المقال غير صالح" }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "بيانات الطلب غير صالحة" }, { status: 400 });
  }

  const articleId =
    payload && typeof payload === "object" && "articleId" in payload
      ? payload.articleId
      : undefined;
  if (typeof articleId !== "number" || !Number.isSafeInteger(articleId) || articleId < 1) {
    return NextResponse.json({ error: "معرّف المقال غير صالح" }, { status: 400 });
  }

  const cookiePath = `/api/articles/${encodeURIComponent(slug)}/view`;
  if (request.cookies.get(VIEW_COOKIE_NAME)?.value === String(articleId)) {
    return NextResponse.json(
      { counted: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const supabase = createAdminClient();
    const { data: viewsCount, error } = await supabase.rpc("increment_article_views", {
      p_article_id: articleId,
      p_article_slug: slug,
    });

    if (error) {
      console.error("تعذر زيادة عدد مشاهدات المقال:", error.message);
      return NextResponse.json({ error: "تعذر تسجيل المشاهدة" }, { status: 500 });
    }

    if (typeof viewsCount !== "number") {
      return NextResponse.json({ error: "المقال غير موجود أو غير منشور" }, { status: 404 });
    }

    const response = NextResponse.json(
      { counted: true, viewsCount },
      { headers: { "Cache-Control": "no-store" } },
    );
    response.cookies.set(VIEW_COOKIE_NAME, String(articleId), {
      httpOnly: true,
      maxAge: VIEW_COOKIE_MAX_AGE,
      path: cookiePath,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error) {
    console.error("تعذر إنشاء عميل تسجيل المشاهدات:", error);
    return NextResponse.json({ error: "تعذر تسجيل المشاهدة" }, { status: 500 });
  }
}
