import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | My Lead Partner",
  description: "Learn about our data collection, usage, and your privacy rights at My Lead Partner. Based in Karachi, Pakistan.",
  openGraph: {
    title: "Privacy Policy | My Lead Partner",
    description: "Learn about our data collection, usage, and your privacy rights at My Lead Partner.",
    url: "https://myleadpartner.com/privacy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | My Lead Partner",
    description: "Learn about our data collection, usage, and your privacy rights at My Lead Partner.",
  },
  alternates: {
    canonical: "https://myleadpartner.com/privacy",
  },
};

// Static generation with revalidation for ISR (Incremental Static Regeneration)
export const revalidate = 86400; // Revalidate every 24 hours

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 md:py-16">
          <div className="mb-4 flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium text-[var(--text)] hover:opacity-90"
            >
              ← Back to home
            </Link>
          </div>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-[var(--secondary)]">My Lead Partner — Last updated: May 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8 md:py-12">
        <div className="prose prose-invert max-w-none space-y-8 text-[var(--text)]">
          <section>
            <h2 className="font-heading text-2xl font-bold text-[var(--text)]">Who We Are</h2>
            <p className="text-base leading-relaxed text-[var(--secondary)]">
              My Lead Partner is a growth operating partner working with businesses globally.
              We're based in Karachi, Pakistan. When you interact with our website or contact
              us about a partnership, you're dealing with us directly.
            </p>
            <p className="text-base leading-relaxed text-[var(--secondary)]">
              If you have questions about this policy, you can reach us at: hello@myleadpartner.com
            </p>
          </section>

          <section>
            <h2>What We Collect</h2>
            <h3 className="font-heading text-lg font-semibold text-[var(--text)]">Information you give us</h3>
            <p className="text-base leading-relaxed text-[var(--secondary)]">When you fill out the contact form or the discovery call form on our site, we collect:</p>
            <ul className="mt-2 list-inside space-y-2 text-[var(--secondary)]">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your company name (if provided)</li>
              <li>The growth priority you select</li>
              <li>Any notes or context you share in the message field</li>
            </ul>
            <p>We don't collect payment information through our website. Billing for client engagements is handled separately.</p>

            <h3 className="font-heading text-lg font-semibold text-[var(--text)]">Information collected automatically</h3>
            <p className="text-base leading-relaxed text-[var(--secondary)]">When you visit the site, standard web technologies collect certain data automatically. This includes:</p>
            <ul className="mt-2 list-inside space-y-2 text-[var(--secondary)]">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on them</li>
              <li>Referring URL (where you came from)</li>
              <li>Device type</li>
            </ul>
            <p className="text-base leading-relaxed text-[var(--secondary)]">We use this data to understand how the site is being used and to improve it. We don't sell it.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[var(--text)]">Cookies and tracking</h2>
            <p className="text-base leading-relaxed text-[var(--secondary)]">
              Our website may use cookies for basic analytics. If we run retargeting campaigns via
              Meta or other platforms, a pixel may be active on the site. That pixel collects
              anonymized behavioral data to help us show relevant ads to people who've visited the site.
            </p>
            <p className="text-base leading-relaxed text-[var(--secondary)]">
              You can disable cookies in your browser settings at any time. If you're in a region
              covered by GDPR, you have the right to opt out before any non-essential tracking begins.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[var(--text)]">How We Use Your Information</h2>
            <p className="text-base leading-relaxed text-[var(--secondary)]">We use what you share with us to:</p>
            <ul className="mt-2 list-inside space-y-2 text-[var(--secondary)]">
              <li>Respond to your inquiry</li>
              <li>Set up and schedule a discovery call if you request one</li>
              <li>Send follow-up information relevant to your growth situation</li>
              <li>Understand how people use our website so we can make it better</li>
            </ul>
            <p className="text-base leading-relaxed text-[var(--secondary)]">We don't use your information to send mass newsletters you didn't ask for, and we don't sell or share your contact details with third parties for their own marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[var(--text)]">Who We Share Data With</h2>
            <p className="text-base leading-relaxed text-[var(--secondary)]">We use a small set of third-party tools to operate the business. These may include:</p>
            <ul className="mt-2 list-inside space-y-2 text-[var(--secondary)]">
              <li>Email and CRM tools for managing conversations and follow-ups</li>
              <li>Analytics platforms (such as Google Analytics or similar) for website performance tracking</li>
              <li>Meta Business Suite if retargeting pixels are active</li>
              <li>Scheduling tools if you book a call through a third-party calendar link</li>
            </ul>
            <p className="text-base leading-relaxed text-[var(--secondary)]">Each of these tools has its own privacy policy. We only share the data these tools need to function. We don't transfer your data to parties outside of these operational contexts.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[var(--text)]">Data Retention</h2>
            <p className="text-base leading-relaxed text-[var(--secondary)]">We keep contact form submissions and conversation records for as long as the client relationship is active, plus a reasonable period afterward for business record purposes. If you'd like us to delete your data, email us and we'll handle it promptly.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[var(--text)]">Your Rights</h2>
            <p className="text-base leading-relaxed text-[var(--secondary)]">Depending on where you're located, you may have the right to:</p>
            <ul className="mt-2 list-inside space-y-2 text-[var(--secondary)]">
              <li>Access the personal data we hold about you</li>
              <li>Request that we correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to how we're using your data</li>
              <li>Withdraw consent for any processing based on consent</li>
            </ul>
            <p className="text-base leading-relaxed text-[var(--secondary)]">To exercise any of these rights, contact us at hello@myleadpartner.com. We'll respond within 30 days.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[var(--text)]">Children's Privacy</h2>
            <p className="text-base leading-relaxed text-[var(--secondary)]">Our services are directed at businesses and business owners. We don't knowingly collect information from anyone under the age of 16. If we become aware that we have, we'll delete it.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[var(--text)]">Changes to This Policy</h2>
            <p className="text-base leading-relaxed text-[var(--secondary)]">If we update this policy in a material way, we'll update the "Last updated" date at the top of this page. We won't notify you individually for minor wording changes, but significant updates to how we handle data will be noted clearly.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[var(--text)]">Contact</h2>
            <p className="text-base leading-relaxed text-[var(--secondary)]">If anything here is unclear or you have a concern, reach out directly:</p>
            <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-[var(--text)]"><strong>My Lead Partner</strong></p>
              <p className="mt-2 text-[var(--secondary)]">privacy@myleadpartner.com</p>
            </div>
          </section>
        </div>
      </div>

      <div className="h-16"></div>
    </main>
  );
}
