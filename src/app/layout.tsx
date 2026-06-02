import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "My Lead Partner | Growth Operating Partner",
  description:
    "My Lead Partner helps businesses scale through performance marketing, lead generation, web development, digital infrastructure, and growth management.",
  openGraph: {
    title: "My Lead Partner | Growth Operating Partner",
    description:
      "My Lead Partner helps businesses scale through performance marketing, lead generation, web development, digital infrastructure, and growth management.",
    url: siteUrl,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Lead Partner | Growth Operating Partner",
    description: "My Lead Partner helps businesses scale through performance marketing and growth management.",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: "index, follow",
  creator: "My Lead Partner",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "My Lead Partner",
  url: siteUrl,
  telephone: "+923112887279",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  areaServed: ["Pakistan", "GCC", "South Asia"],
  serviceType: [
    "Performance Marketing",
    "Lead Generation",
    "Social Media Management",
    "Web Development",
    "Digital Infrastructure",
    "Growth Management",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+923112887279",
    url: `${siteUrl}/#contact`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
