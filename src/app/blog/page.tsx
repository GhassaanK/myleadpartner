import Link from "next/link";

export const metadata = {
  title: "Blog | My Lead Partner",
  description:
    "Read insights on growth strategy, marketing operations, lead generation, and building scalable business systems.",
  openGraph: {
    title: "Blog | My Lead Partner",
    description:
      "Read insights on growth strategy, marketing operations, lead generation, and building scalable business systems.",
    url: "https://myleadpartner.com/blog",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | My Lead Partner",
    description: "Growth strategy and operations insights.",
  },
  alternates: {
    canonical: "https://myleadpartner.com/blog",
  },
  robots: "index, follow",
};

export const revalidate = 86400;

const articles = [
  {
    slug: "how-to-build-lead-generation-system",
    title: "How to Build a Lead Generation System for a Service Business",
    excerpt:
      "Most service businesses don't have a lead generation problem. They have a lead generation system problem.",
    date: "May 29, 2026",
    category: "Lead Generation",
    readTime: "14 min read",
  },
  {
    slug: "why-meta-ads-arent-scaling",
    title: "Why Your Meta Ads Aren't Scaling (And It's Probably Not the Algorithm)",
    excerpt:
      "You've scaled your Meta ads and results got worse. Cost per lead went up. Purchases dried up. Here's why -- and it's probably not the algorithm.",
    date: "May 27, 2026",
    category: "Acquisition",
    readTime: "12 min read",
  },
  {
    slug: "growth-architecture-vs-marketing-tactics",
    title: "Growth Architecture vs. Marketing Tactics: Why Most Businesses Get It Wrong",
    excerpt:
      "The difference between running campaigns and building systems. Why agencies focus on tactics when your business needs architecture.",
    date: "May 24, 2026",
    category: "Strategy",
    readTime: "8 min read",
  },
  {
    slug: "unit-economics-funnel-design",
    title: "Unit Economics: The Foundation of Funnel Design",
    excerpt:
      "How to structure your funnel around what actually matters: the cost per acquisition and lifetime value that drives profitability.",
    date: "May 18, 2026",
    category: "Operations",
    readTime: "10 min read",
  },
  {
    slug: "performance-marketing-beyond-roas",
    title: "Performance Marketing Beyond ROAS: Building Predictable Acquisition",
    excerpt:
      "ROAS is a vanity metric. Here's how to structure paid acquisition around the metrics that actually move your business.",
    date: "May 12, 2026",
    category: "Acquisition",
    readTime: "9 min read",
  },
  {
    slug: "lead-generation-infrastructure",
    title: "The Hidden Cost of Inefficient Lead Generation Infrastructure",
    excerpt:
      "Most businesses lose 40-60% of potential leads before they even see them. Here's how to build the right infrastructure.",
    date: "May 6, 2026",
    category: "Lead Generation",
    readTime: "7 min read",
  },
  {
    slug: "content-systems-compounding",
    title: "Content Systems That Compound: Building Organic Moats",
    excerpt:
      "How to structure content production so each piece works harder than the last, and feeds your paid channels.",
    date: "April 30, 2026",
    category: "Content",
    readTime: "11 min read",
  },
  {
    slug: "growth-operating-model",
    title: "The Growth Operating Model: How to Scale Without Chaos",
    excerpt:
      "A breakdown of how in-house growth teams operate, and how to replicate that structure in your business.",
    date: "April 24, 2026",
    category: "Operations",
    readTime: "12 min read",
  },
];

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    Strategy: "bg-[var(--raised)] text-[var(--text)]",
    Operations: "bg-[var(--raised)] text-[var(--text)]",
    Acquisition: "bg-[var(--accent-border)] text-[var(--accent)]",
    "Lead Generation": "bg-[var(--raised)] text-[var(--text)]",
    Content: "bg-[var(--raised)] text-[var(--text)]",
  };

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${colors[category] || colors.Strategy}`}>
      {category}
    </span>
  );
}

export default function Blog() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 md:py-16">
          <div className="mb-4 flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium text-[var(--text)] hover:opacity-90"
            >
              ← Back to home
            </Link>
          </div>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">Blog</h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--secondary)]">
            Insights on growth strategy, marketing operations, lead generation, and building scalable systems.
            Read how we think about business growth.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8 md:py-16">
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent-border)] hover:bg-[var(--raised)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <CategoryBadge category={article.category} />
                <span className="text-xs text-[var(--secondary)]">{article.readTime}</span>
              </div>

              <h2 className="font-heading text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                {article.title}
              </h2>

              <p className="mt-3 text-base leading-relaxed text-[var(--secondary)]">{article.excerpt}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-[var(--muted)]">{article.date}</span>
                <span className="text-sm text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                  Read article →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* More Coming */}
        <div className="mt-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="text-[var(--secondary)]">
            More articles coming soon. Subscribe to get notified about new insights.
          </p>
        </div>
      </div>
    </main>
  );
}
