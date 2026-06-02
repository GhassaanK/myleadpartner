import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail, siteName, siteUrl } from "@/lib/site";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Contact My Lead Partner | Growth Marketing Partner in Pakistan, GCC & South Asia",
  description:
    "Contact My Lead Partner for performance marketing, lead generation, web development, social media management, and growth management across Pakistan, GCC, South Asia, and remote markets.",
  keywords: [
    "contact marketing agency Pakistan",
    "growth marketing partner Karachi",
    "lead generation agency GCC",
    "digital marketing agency Pakistan contact",
    "performance marketing consultation",
  ],
  openGraph: {
    title: "Contact My Lead Partner | Growth Marketing Partner",
    description:
      "Start a conversation about performance marketing, lead generation, web, content, and growth management.",
    url: `${siteUrl}/contact`,
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact My Lead Partner",
    description: "Talk to a growth partner serving Pakistan, GCC, South Asia, and remote markets.",
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact My Lead Partner",
    url: `${siteUrl}/contact`,
    about: "Performance marketing, lead generation, social media management, web development, and growth management.",
    mainEntity: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      email: contactEmail,
      areaServed: ["Pakistan", "GCC", "South Asia", "Global"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contactEmail,
        telephone: "+923112887279",
        areaServed: ["PK", "AE", "SA", "QA", "BH", "OM", "KW"],
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      {[contactJsonLd, breadcrumbJsonLd].map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}

      <section className="border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 md:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium leading-relaxed text-[var(--text)] hover:opacity-90"
          >
            Back to home
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Contact
          </p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-tight md:text-6xl">
            Work with a growth partner serving Pakistan, GCC, South Asia, and remote markets.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--secondary)] md:text-lg">
            Reach out when you need performance marketing, lead generation, web development,
            social media management, or growth management connected into one operating rhythm.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/services" className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-bold leading-relaxed text-[var(--text)]">
              Explore Services
            </Link>
            <Link href="/about" className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-bold leading-relaxed text-[var(--text)]">
              About Us
            </Link>
            <Link href="/case-studies" className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-bold leading-relaxed text-[var(--text)]">
              Case Studies
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-8 md:py-16">
        <ContactPageClient />
      </section>
    </main>
  );
}
