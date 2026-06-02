import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { contactEmail, siteName, siteUrl } from "@/lib/site";

const principles = [
  "We think in revenue systems, not isolated marketing deliverables.",
  "We keep strategy, execution, reporting, and prioritization connected.",
  "We work directly with operators so decisions stay close to the business.",
  "We build infrastructure that compounds beyond a single campaign.",
];

const capabilities = [
  "Performance marketing",
  "Lead generation",
  "Social media management",
  "Web development",
  "Digital infrastructure",
  "Growth management",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "About My Lead Partner | Embedded Growth Operators for Serious Businesses",
  description:
    "Learn about My Lead Partner, a Karachi-based growth operating partner helping businesses scale through performance marketing, lead generation, web, content, and growth management.",
  keywords: [
    "about My Lead Partner",
    "growth operating partner",
    "Karachi marketing agency",
    "performance marketing team Pakistan",
    "lead generation partner GCC",
    "digital growth operators",
  ],
  openGraph: {
    title: "About My Lead Partner | Embedded Growth Operators",
    description:
      "A founder-led growth partner connecting acquisition, content, web, reporting, and business strategy.",
    url: `${siteUrl}/about`,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/growth-operations-hero.png",
        width: 1200,
        height: 630,
        alt: "My Lead Partner growth operations workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About My Lead Partner",
    description: "Meet the growth operators behind My Lead Partner.",
    images: ["/growth-operations-hero.png"],
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About My Lead Partner",
    url: `${siteUrl}/about`,
    description:
      "My Lead Partner is a growth operating partner helping businesses scale through performance marketing, lead generation, web development, social media management, digital infrastructure, and growth management.",
    mainEntity: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      email: contactEmail,
      foundingLocation: {
        "@type": "Place",
        name: "Karachi, Pakistan",
      },
      areaServed: ["Pakistan", "GCC", "South Asia", "Global"],
      knowsAbout: capabilities,
      sameAs: [
        "https://www.linkedin.com/company/my-lead-partner",
        "https://www.instagram.com/myleadpartner",
      ],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      {[aboutJsonLd, breadcrumbJsonLd].map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}

      <section className="border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:px-8 md:grid-cols-[1fr_0.9fr] md:items-center md:py-20">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium leading-relaxed text-[var(--text)] hover:opacity-90"
            >
              Back to home
            </Link>
            <p className="mt-8 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              About Us
            </p>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-tight md:text-6xl">
              We are not an agency built around deliverables. We are growth operators built around momentum.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--secondary)] md:text-lg">
              My Lead Partner is a founder-led growth operating partner based in Karachi and serving
              Pakistan, GCC, South Asia, and remote-first businesses. We connect performance marketing,
              lead generation, web development, content, reporting, and growth management so marketing
              works as one system.
            </p>
          </div>
          <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <div className="relative aspect-[4/5] border-r border-[var(--border)]">
              <Image src="/Ghassaan-portrait.png" alt="Ghassaan, Co-Founder and Growth Lead at My Lead Partner" fill sizes="(max-width: 768px) 50vw, 280px" className="object-cover object-top" />
            </div>
            <div className="relative aspect-[4/5]">
              <Image src="/Akram-portrait.png" alt="Akram Shams, Co-Founder and Creative Lead at My Lead Partner" fill sizes="(max-width: 768px) 50vw, 280px" className="object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              What We Believe
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
              Most growth problems are architecture problems.
            </h2>
          </div>
          <div className="grid gap-4">
            {principles.map((principle, index) => (
              <article key={principle} className="grid gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 sm:grid-cols-[54px_1fr]">
                <span className="font-heading text-3xl leading-tight text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-relaxed text-[var(--secondary)]">{principle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 sm:px-8 md:grid-cols-2 md:py-20">
          <article className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Ghassaan
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight">
              Co-Founder & Growth Lead
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--secondary)]">
              Ghassaan leads the growth infrastructure across engagements: paid acquisition,
              web, funnels, reporting, and the operating systems that turn marketing activity
              into measurable pipeline.
            </p>
          </article>
          <article className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Akram Shams
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight">
              Co-Founder & Creative Lead
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--secondary)]">
              Akram leads client relationships, creative direction, and execution standards,
              keeping the work close to the business outcome instead of drifting into generic
              marketing output.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              What We Connect
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
              One team carrying context across every growth lever.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <Link
                key={capability}
                href="/services"
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 text-base font-bold leading-relaxed text-[var(--text)] transition-colors hover:border-[var(--accent-border)]"
              >
                {capability}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight">
              Ready to build growth with more structure?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--secondary)]">
              Learn how we work, see the services, or start the conversation directly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/services" className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-bold leading-relaxed text-[var(--text)]">
              Services
            </Link>
            <Link href="/case-studies" className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-bold leading-relaxed text-[var(--text)]">
              Case Studies
            </Link>
            <Link href="/contact" className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-bold leading-relaxed text-[var(--background)]">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
