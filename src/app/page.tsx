import type { Metadata } from "next";
import { headers } from "next/headers";
import { HomePageClient } from "./page-client";
import { contactEmail, siteName, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "My Lead Partner | Your Embedded Growth Partner",
  description:
    "Tired of agencies that deliver reports but not revenue? My Lead Partner embeds into your business as a growth partner, handling ads, lead gen, web, and strategy as one integrated system.",
  openGraph: {
    title: "My Lead Partner | Your Embedded Growth Partner",
    description:
      "My Lead Partner embeds into your business as a growth partner. Paid ads, lead generation, web development, and strategy operating as one system, not separate vendors.",
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "My Lead Partner | Your Embedded Growth Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Lead Partner | Your Embedded Growth Partner",
    description:
      "We build the system that scales your business. Paid ads, lead gen, web, and growth management under one partnership.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function Home() {
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country") ?? "UNKNOWN";
  const isPakistan = country === "PK";

  const pricingText = isPakistan
    ? "We work on custom monthly retainers. Our services start from as low as PKR 60,000."
    : "We work on custom monthly retainers. Our services start from as low as $499.";

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    email: contactEmail,
    logo: `${siteUrl}/mlp-logo-white-cropped.png`,
    sameAs: [
      "https://www.linkedin.com/company/my-lead-partner",
      "https://www.instagram.com/myleadpartner",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomePageClient pricingText={pricingText} />
    </>
  );
}
