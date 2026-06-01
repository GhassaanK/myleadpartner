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
    slug: "how-to-run-meta-ads-for-service-business",
    title: "How to Run Meta Ads for a Service Business (Without Wasting Your Budget)",
    excerpt:
      "Most service businesses run Meta ads the same way e-commerce brands do. The economics are completely different. Here's how to build a campaign that actually generates clients.",
    date: "June 1, 2026",
    category: "Acquisition",
    readTime: "8 min read",
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
            More articles coming soon.
          </p>
        </div>
      </div>
    </main>
  );
}