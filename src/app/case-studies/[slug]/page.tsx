import Link from "next/link";
import { notFound } from "next/navigation";
import {
  caseStudyDescription,
  getCaseStudies,
  getCaseStudyBySlug,
} from "@/lib/case-studies";
import { siteName, siteUrl } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | My Lead Partner",
    };
  }

  const url = `${siteUrl}/case-studies/${caseStudy.slug}`;
  const description = caseStudyDescription(caseStudy);

  return {
    title: `${caseStudy.title} | My Lead Partner`,
    description,
    openGraph: {
      title: caseStudy.title,
      description,
      url,
      type: "article",
      locale: "en_US",
      siteName,
      publishedTime: caseStudy.publishedAt,
      section: caseStudy.category,
      tags: caseStudy.tags,
      images: caseStudy.coverImagePath
        ? [
            {
              url: caseStudy.coverImagePath,
              width: 1200,
              height: 630,
              alt: caseStudy.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.title,
      description,
      images: caseStudy.coverImagePath ? [caseStudy.coverImagePath] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const url = `${siteUrl}/case-studies/${caseStudy.slug}`;
  const description = caseStudyDescription(caseStudy);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description,
    datePublished: caseStudy.publishedAt,
    image: caseStudy.coverImagePath || undefined,
    url,
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    articleSection: caseStudy.category,
    keywords: caseStudy.tags.join(", "),
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 md:py-16">
          <div className="mb-6 flex items-center gap-2">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium leading-relaxed text-[var(--text)] hover:opacity-90"
            >
              Back to case studies
            </Link>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full bg-[var(--raised)] px-3 py-1 text-xs font-medium leading-relaxed text-[var(--text)]">
              {caseStudy.category}
            </span>
            {caseStudy.client && (
              <span className="text-xs leading-relaxed text-[var(--muted)]">
                {caseStudy.client}
              </span>
            )}
          </div>

          <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-end">
            <div>
              <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
                {caseStudy.title}
              </h1>
              {caseStudy.summary && (
                <p className="mt-5 text-base leading-relaxed text-[var(--secondary)] md:text-lg">
                  {caseStudy.summary}
                </p>
              )}
            </div>

            <div className="grid gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
              {caseStudy.highlightMetrics.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {caseStudy.highlightMetrics.map((metric) => (
                    <div key={`${metric.value}-${metric.label}`}>
                      <strong className="font-heading text-4xl font-bold leading-tight text-[var(--text)]">
                        {metric.value}
                      </strong>
                      {metric.label && (
                        <p className="mt-2 text-sm leading-relaxed text-[var(--secondary)]">
                          {metric.label}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="grid gap-2 border-t border-[var(--border)] pt-4 text-sm leading-relaxed text-[var(--secondary)]">
                {caseStudy.duration && <span>Timeline: {caseStudy.duration}</span>}
                {caseStudy.services.length > 0 && (
                  <span>Services: {caseStudy.services.join(", ")}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {caseStudy.coverImagePath && (
        <div className="mx-auto max-w-5xl px-6 pt-10 sm:px-8 md:pt-14">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <img
              src={caseStudy.coverImagePath}
              alt={caseStudy.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 md:py-16">
        <article className="case-study-prose prose prose-invert max-w-none text-[var(--text)]">
          <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
        </article>

        {caseStudy.galleryImages.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-2xl font-bold leading-tight text-[var(--text)]">
              Project Images
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {caseStudy.galleryImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]"
                >
                  <img
                    src={image}
                    alt={`${caseStudy.title} image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h3 className="font-heading text-xl font-bold leading-snug text-[var(--text)]">
            Want this kind of growth system?
          </h3>
          <p className="mt-2 text-base leading-relaxed text-[var(--secondary)]">
            My Lead Partner builds acquisition, web, content, and operating rhythm as one connected system.
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-block rounded-md bg-[var(--accent)] px-4 py-2 font-medium leading-relaxed text-[var(--background)] transition-opacity hover:opacity-90"
          >
            Book a discovery call
          </Link>
        </div>
      </div>
    </main>
  );
}
