import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatPublishedAt,
  getPostBySlug,
  getPosts,
  postDescription,
} from "@/lib/posts";
import { defaultAuthor, siteName, siteUrl } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | My Lead Partner",
    };
  }

  const url = `${siteUrl}/blog/${post.slug}`;
  const description = postDescription(post);

  return {
    title: `${post.title} | My Lead Partner`,
    description,
    authors: [{ name: post.author || defaultAuthor }],
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      locale: "en_US",
      siteName,
      publishedTime: post.publishedAt,
      authors: [post.author || defaultAuthor],
      tags: post.tags,
      section: post.category,
      images: [
        {
          url: post.ogImagePath || `/blog-og/${post.slug}`,
          width: 1200,
          height: 630,
          alt: `${post.title} | My Lead Partner`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.ogImagePath || `/blog-og/${post.slug}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const url = `${siteUrl}/blog/${post.slug}`;
  const description = postDescription(post);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.ogImagePath || `${siteUrl}/blog-og/${post.slug}`,
    url,
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: post.author || defaultAuthor,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 md:py-16">
          <div className="mb-6 flex items-center gap-2">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium leading-relaxed text-[var(--text)] hover:opacity-90"
            >
              Back to blog
            </Link>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full bg-[var(--raised)] px-3 py-1 text-xs font-medium text-[var(--text)]">
              {post.category}
            </span>
            <span className="text-xs text-[var(--muted)]">{post.readTime}</span>
          </div>

          <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--secondary)]">
            By {post.author || defaultAuthor} · {formatPublishedAt(post.publishedAt)}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 md:py-16">
        <article className="prose prose-invert max-w-none space-y-6 text-[var(--text)]">
          <style>{`
            .prose h2 {
              font-family: var(--font-heading), Arial, sans-serif;
              font-size: 1.375rem;
              font-weight: 700;
              color: var(--text);
              line-height: 1.25;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
            }
            .prose h3 {
              font-family: var(--font-heading), Arial, sans-serif;
              font-size: 1.15rem;
              font-weight: 700;
              color: var(--text);
              line-height: 1.3;
              margin-top: 1.5rem;
              margin-bottom: 0.65rem;
            }
            .prose p {
              font-size: 1rem;
              line-height: 1.75;
              color: var(--secondary);
              margin-bottom: 1rem;
            }
            .prose ul,
            .prose ol {
              color: var(--secondary);
              margin-bottom: 1rem;
              padding-left: 1.25rem;
              line-height: 1.75;
            }
            .prose li {
              margin-bottom: 0.5rem;
            }
            .prose a {
              color: var(--accent);
              text-decoration: underline;
              text-underline-offset: 0.2em;
            }
            .prose strong {
              color: var(--text);
              font-weight: 600;
            }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <div className="mt-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h3 className="font-heading text-xl font-bold leading-snug text-[var(--text)]">
            Ready to build growth as a system?
          </h3>
          <p className="mt-2 text-base leading-relaxed text-[var(--secondary)]">
            My Lead Partner connects acquisition, web, content, and operating rhythm so growth does not sit in silos.
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-block rounded-md bg-[var(--accent)] px-4 py-2 font-medium text-[var(--background)] transition-opacity hover:opacity-90"
          >
            Book a discovery call
          </Link>
        </div>
      </div>
    </main>
  );
}
