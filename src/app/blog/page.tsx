import Link from "next/link";
import { formatPublishedAt, getPosts, postDescription } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export const metadata = {
  title: "Blog | My Lead Partner",
  description:
    "Read insights on growth strategy, marketing operations, lead generation, and building scalable business systems.",
  openGraph: {
    title: "Blog | My Lead Partner",
    description:
      "Read insights on growth strategy, marketing operations, lead generation, and building scalable business systems.",
    url: `${siteUrl}/blog`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | My Lead Partner",
    description: "Growth strategy and operations insights.",
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  robots: "index, follow",
};

export const revalidate = 300;

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

export default async function Blog() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 md:py-16">
          <div className="mb-4 flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium text-[var(--text)] hover:opacity-90"
            >
              Back to home
            </Link>
          </div>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">Blog</h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--secondary)]">
            Insights on growth strategy, marketing operations, lead generation, and building scalable systems.
            Read how we think about business growth.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8 md:py-16">
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent-border)] hover:bg-[var(--raised)]"
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <CategoryBadge category={post.category} />
                  <span className="text-xs text-[var(--secondary)]">{post.readTime}</span>
                </div>

                <h2 className="font-heading text-xl font-bold text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                  {post.title}
                </h2>

                <p className="mt-3 text-base leading-relaxed text-[var(--secondary)]">
                  {postDescription(post)}
                </p>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-xs text-[var(--muted)]">{formatPublishedAt(post.publishedAt)}</span>
                  <span className="text-sm text-[var(--accent)] transition-transform group-hover:translate-x-1">
                    Read article
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-t border-[var(--border)] pt-8">
            <p className="text-[var(--secondary)]">No articles are published yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
