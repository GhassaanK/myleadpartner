import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const runtime = "edge";

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.title ?? titleFromSlug(slug);
  const category = post?.category ?? "My Lead Partner";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080A09",
          color: "#E8EDE6",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-100px",
            top: "64px",
            width: "430px",
            height: "430px",
            border: "1px solid rgba(0,217,110,0.22)",
            transform: "rotate(45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "132px",
            bottom: "-120px",
            width: "360px",
            height: "360px",
            border: "1px solid rgba(232,237,230,0.09)",
            transform: "rotate(45deg)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              border: "1px solid rgba(0,217,110,0.45)",
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ fontSize: "28px", letterSpacing: "0", fontWeight: 700 }}>
            My Lead Partner
          </div>
        </div>
        <div style={{ maxWidth: "840px", display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              color: "#00D96E",
              fontSize: "24px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: "76px",
              lineHeight: 0.96,
              fontWeight: 700,
              letterSpacing: "0",
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ color: "#7A8878", fontSize: "26px" }}>
          Growth systems, acquisition, and operating architecture.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
