import { HomePageClient } from "./page-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://myleadpartner.com"),

  title: "My Lead Partner | Performance Marketing & Lead Generation Agency",
  description:
    "Tired of agencies that deliver reports but not revenue? My Lead Partner embeds into your business as a growth partner — handling ads, lead gen, web, and strategy as one integrated system.",

  openGraph: {
    title: "My Lead Partner | Performance Marketing & Lead Generation Agency",
    description:
      "My Lead Partner embeds into your business as a growth partner. Paid ads, lead generation, web development, and strategy — operating as one system, not separate vendors.",
    url: "https://myleadpartner.com",
    siteName: "My Lead Partner",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "My Lead Partner — Performance Marketing & Lead Generation Agency",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "My Lead Partner | Performance Marketing & Lead Generation Agency",
    description:
      "We build the system that scales your business. Paid ads, lead gen, web, and growth management under one partnership.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://myleadpartner.com",
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

export const revalidate = 86400;

export default function Home() {
  return <HomePageClient />;
}