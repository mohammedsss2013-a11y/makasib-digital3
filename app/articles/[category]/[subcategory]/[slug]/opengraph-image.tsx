import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "مكاسب رقمية - منصة تمكين رقمي وتوجيه عملي";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ category: string; subcategory: string; slug: string }> }) {
  const resolvedParams = await params;
  const title = decodeURIComponent(resolvedParams.slug).replace(/-/g, " ");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#020617",
          backgroundImage: "radial-gradient(circle at 25px 25px, #059669 2%, transparent 0%), radial-gradient(circle at 75px 75px, #0f172a 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "60px 80px",
          color: "#ffffff",
          direction: "rtl",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            م
          </div>
          <span style={{ fontSize: "28px", fontWeight: "900", color: "#34d399" }}>مكاسب رقمية</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 16px",
              borderRadius: "50px",
              backgroundColor: "rgba(5, 150, 105, 0.15)",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              color: "#34d399",
              fontSize: "18px",
              fontWeight: "bold",
              width: "fit-content",
            }}
          >
            مقالة تطبيقية مميزة
          </div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "900",
              color: "#f8fafc",
              lineHeight: 1.3,
              margin: 0,
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {title}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #1e293b",
            paddingTop: "24px",
            color: "#94a3b8",
            fontSize: "18px",
          }}
        >
          <span>makasib.digital</span>
          <span>منصة تمكين رقمي وتوجيه عملي</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
