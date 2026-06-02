import Link from "next/link";
import {
  caseStudyDescription,
  getCaseStudies,
} from "@/lib/case-studies";
import { siteUrl } from "@/lib/site";

export const metadata = {
  title: "Case Studies | My Lead Partner",
  description:
    "See how My Lead Partner builds acquisition, content, web, and operating systems that compound.",
  openGraph: {
    title: "Case Studies | My Lead Partner",
    description:
      "See how My Lead Partner builds acquisition, content, web, and operating systems that compound.",
    url: `${siteUrl}/case-studies`,
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: `${siteUrl}/case-studies`,
  },
  robots: "index, follow",
};

export const revalidate = 300;

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 md:py-16">
          <div className="mb-4 flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium leading-relaxed text-[var(--text)] hover:opacity-90"
            >
              Back to home
            </Link>
          </div>
          <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
            Case Studies
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--secondary)]">
            Real growth systems built across acquisition, web, content, and operating rhythm.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 md:py-16">
        {caseStudies.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.id}
                href={`/case-studies/${caseStudy.slug}`}
                className="group overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] transition-all hover:border-[var(--accent-border)] hover:bg-[var(--raised)]"
              >
                {caseStudy.coverImagePath && (
                  <div className="relative aspect-[16/10] border-b border-[var(--border)] bg-[var(--field)]">
                    <img
                      src={caseStudy.coverImagePath}
                      alt={caseStudy.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[var(--raised)] px-3 py-1 text-xs font-medium leading-relaxed text-[var(--text)]">
                      {caseStudy.category}
                    </span>
                    {caseStudy.duration && (
                      <span className="text-xs leading-relaxed text-[var(--muted)]">
                        {caseStudy.duration}
                      </span>
                    )}
                  </div>
                  <h2 className="font-heading text-2xl font-bold leading-snug text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                    {caseStudy.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[var(--secondary)]">
                    {caseStudyDescription(caseStudy)}
                  </p>
                  {caseStudy.highlightMetrics.length > 0 && (
                    <div className="mt-6 grid gap-3 border-t border-[var(--border)] pt-5 sm:grid-cols-2">
                      {caseStudy.highlightMetrics.map((metric) => (
                        <div key={`${caseStudy.id}-${metric.value}-${metric.label}`}>
                          <strong className="font-heading text-3xl font-bold leading-tight text-[var(--text)]">
                            {metric.value}
                          </strong>
                          {metric.label && (
                            <p className="mt-1 text-sm leading-relaxed text-[var(--secondary)]">
                              {metric.label}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-t border-[var(--border)] pt-8">
            <p className="text-base leading-relaxed text-[var(--secondary)]">
              No case studies are published yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
