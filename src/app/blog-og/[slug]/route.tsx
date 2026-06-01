import { ImageResponse } from "next/og";

export const runtime = "edge";

const articleTitles: Record<string, { title: string; category: string }> = {
  "how-to-build-lead-generation-system": {
    title: "How to Build a Lead Generation System for a Service Business",
    category: "Lead Generation",
  },
  "why-meta-ads-arent-scaling": {
    title: "Why Your Meta Ads Aren't Scaling",
    category: "Acquisition",
  },
  "growth-architecture-vs-marketing-tactics": {
    title: "Growth Architecture vs. Marketing Tactics",
    category: "Strategy",
  },
  "unit-economics-funnel-design": {
    title: "Unit Economics: The Foundation of Funnel Design",
    category: "Operations",
  },
  "performance-marketing-beyond-roas": {
    title: "Performance Marketing Beyond ROAS",
    category: "Acquisition",
  },
  "lead-generation-infrastructure": {
    title: "The Hidden Cost of Inefficient Lead Generation Infrastructure",
    category: "Lead Generation",
  },
  "content-systems-compounding": {
    title: "Content Systems That Compound",
    category: "Content",
  },
  "growth-operating-model": {
    title: "The Growth Operating Model",
    category: "Operations",
  },
};

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleTitles[slug] ?? {
    title: "Growth Operations Insight",
    category: "My Lead Partner",
  };

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
            {article.category}
          </div>
          <div
            style={{
              fontSize: "76px",
              lineHeight: 0.96,
              fontWeight: 700,
              letterSpacing: "0",
            }}
          >
            {article.title}
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
