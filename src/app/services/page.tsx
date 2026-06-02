import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail, siteName, siteUrl } from "@/lib/site";

const services = [
  {
    id: "performance-marketing",
    name: "Performance Marketing",
    keyword: "performance marketing services",
    description:
      "Paid acquisition campaigns on Meta, TikTok, Google, and other growth channels, managed around revenue, cost per lead, cost per acquisition, and return on ad spend.",
    deliverables: [
      "Campaign strategy and media planning",
      "Meta, TikTok, and search campaign management",
      "Creative testing and offer iteration",
      "Conversion tracking, reporting, and budget decisions",
    ],
  },
  {
    id: "lead-generation",
    name: "Lead Generation",
    keyword: "lead generation services",
    description:
      "Full funnel lead generation for service businesses, real estate, B2B companies, and high-ticket offers that need qualified conversations instead of low-intent form fills.",
    deliverables: [
      "Lead funnel strategy",
      "Landing page and form structure",
      "Audience targeting and qualification logic",
      "Pipeline follow-up recommendations",
    ],
  },
  {
    id: "social-media-management",
    name: "Social Media Management",
    keyword: "social media management services",
    description:
      "Organic content systems that build trust, support paid campaigns, and keep your brand visible between direct-response pushes.",
    deliverables: [
      "Content strategy and monthly planning",
      "Short-form post and campaign concepts",
      "Brand voice and publishing rhythm",
      "Organic content aligned with acquisition goals",
    ],
  },
  {
    id: "web-development",
    name: "Web Development",
    keyword: "web development services",
    description:
      "Conversion-focused websites and landing pages built for speed, clarity, and the exact action your traffic needs to take.",
    deliverables: [
      "Landing pages and service websites",
      "Conversion copy and page structure",
      "Performance-conscious implementation",
      "Analytics, pixels, and event tracking setup",
    ],
  },
  {
    id: "digital-infrastructure",
    name: "Digital Infrastructure",
    keyword: "digital marketing infrastructure",
    description:
      "The tracking, reporting, landing-page, content, and campaign systems that make marketing easier to scale and easier to understand.",
    deliverables: [
      "Tracking architecture and pixel setup",
      "CRM and lead handoff recommendations",
      "Dashboard and reporting structure",
      "Campaign naming, testing, and operating rhythm",
    ],
  },
  {
    id: "growth-management",
    name: "Growth Management",
    keyword: "growth management services",
    description:
      "A senior operating layer across acquisition, content, web, and reporting so marketing decisions stay connected to the business model.",
    deliverables: [
      "Growth strategy and prioritization",
      "Weekly performance review rhythm",
      "Channel coordination and decision-making",
      "Roadmaps for scale, testing, and compounding",
    ],
  },
];

const faqs = [
  {
    question: "What services does My Lead Partner offer?",
    answer:
      "My Lead Partner offers performance marketing, lead generation, social media management, web development, digital infrastructure, and growth management as one connected growth system.",
  },
  {
    question: "Do you offer standalone lead generation services?",
    answer:
      "Yes. We can build and manage lead generation campaigns, but the best results usually come when lead generation is connected to landing pages, tracking, follow-up, and creative testing.",
  },
  {
    question: "Can you manage paid ads and build landing pages together?",
    answer:
      "Yes. We often manage paid acquisition and build the landing pages or funnels those campaigns send traffic to, because campaign performance depends heavily on the destination.",
  },
  {
    question: "Who are these services best for?",
    answer:
      "Our services are best for service businesses, real estate teams, B2B companies, ecommerce brands, and operators who want marketing tied to revenue instead of isolated deliverables.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Digital Marketing, Lead Generation & Growth Services | My Lead Partner",
  description:
    "My Lead Partner offers performance marketing, lead generation, social media management, web development, digital infrastructure, and growth management for businesses ready to scale.",
  keywords: [
    "digital marketing services",
    "performance marketing services",
    "lead generation services",
    "social media management services",
    "web development services",
    "growth management services",
    "marketing agency Karachi",
    "lead generation agency Pakistan",
    "GCC digital marketing services",
  ],
  openGraph: {
    title: "Digital Marketing, Lead Generation & Growth Services | My Lead Partner",
    description:
      "Performance marketing, lead generation, social media management, web development, digital infrastructure, and growth management under one operating system.",
    url: `${siteUrl}/services`,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/growth-operations-hero.png",
        width: 1200,
        height: 630,
        alt: "Growth operations workspace for digital marketing services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing, Lead Generation & Growth Services | My Lead Partner",
    description:
      "A connected growth system for paid acquisition, lead generation, content, web, and reporting.",
    images: ["/growth-operations-hero.png"],
  },
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing and Growth Services",
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      email: contactEmail,
    },
    areaServed: ["Pakistan", "GCC", "South Asia", "Global"],
    serviceType: services.map((service) => service.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "My Lead Partner Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          url: `${siteUrl}/services#${service.id}`,
        },
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/services`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      {[serviceJsonLd, faqJsonLd, breadcrumbJsonLd].map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}

      <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 md:py-20">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium leading-relaxed text-[var(--text)] hover:opacity-90"
            >
              Back to home
            </Link>
            <p className="mt-8 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Digital Marketing Services
            </p>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-tight md:text-6xl">
              Performance marketing, lead generation, web, and growth management under one system.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--secondary)] md:text-lg">
              My Lead Partner helps businesses scale with connected digital marketing services:
              paid acquisition, qualified lead generation, conversion-focused web development,
              organic content, digital infrastructure, and senior growth management.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-bold leading-relaxed text-[var(--background)]"
              >
                Book a Discovery Call
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border)] px-6 text-sm font-bold leading-relaxed text-[var(--text)]"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:px-8 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            What We Do
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
            Services built around the full path from attention to revenue.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--secondary)]">
            Most marketing problems are not isolated channel problems. Ads need better landing
            pages. Landing pages need clearer offers. Content needs to support acquisition.
            Reporting needs to show what to do next. Our service model connects the pieces.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                {service.keyword}
              </p>
              <h3 className="mt-4 font-heading text-2xl font-bold leading-snug text-[var(--text)]">
                {service.name}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[var(--secondary)]">
                {service.description}
              </p>
              <ul className="mt-5 grid gap-3">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="border-t border-[var(--border)] pt-3 text-sm leading-relaxed text-[var(--secondary)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:px-8 md:grid-cols-[0.85fr_1.15fr] md:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Our Process
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
              Strategy first, execution second, compounding always.
            </h2>
          </div>
          <div className="grid gap-4">
            {[
              ["01", "Diagnose", "We audit your offer, funnel, audience, tracking, content, and current acquisition economics."],
              ["02", "Build", "We set up the campaign structure, landing pages, creative system, reporting, and operating rhythm."],
              ["03", "Launch", "We run controlled campaigns, measure quality, and improve the path from click to qualified conversation."],
              ["04", "Scale", "We move budget and attention toward the channels, offers, and systems that compound."],
            ].map(([number, title, copy]) => (
              <div key={number} className="grid gap-4 border border-[var(--border)] bg-[var(--background)] p-5 sm:grid-cols-[64px_1fr]">
                <span className="font-heading text-3xl leading-tight text-[var(--accent)]">
                  {number}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold leading-snug">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--secondary)]">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Questions
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
              Service questions before we talk.
            </h2>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
                <h3 className="font-heading text-xl font-bold leading-snug">{faq.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--secondary)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight">
              Need a growth system, not scattered marketing tasks?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--secondary)]">
              Tell us what you are trying to grow. We will map the service mix that makes sense.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-bold leading-relaxed text-[var(--background)]"
          >
            Start the Conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
