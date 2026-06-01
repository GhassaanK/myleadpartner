import Link from "next/link";
import { notFound } from "next/navigation";

const articlesData: Record<
  string,
  {
    title: string;
    description: string;
    category: string;
    date: string;
    readTime: string;
    author?: string;
    content: React.ReactNode;
  }
> = {
  "how-to-run-meta-ads-for-service-business": {
    title: "How to Run Meta Ads for a Service Business (Without Wasting Your Budget)",
    description:
      "Most service businesses run Meta ads the same way e-commerce brands do. The economics are completely different. Here's how to build a campaign that actually generates clients.",
    category: "Acquisition",
    date: "June 1, 2026",
    readTime: "8 min read",
    content: (
      <>
        <p>
          Most service businesses lose money on Meta ads in the first 30 days. Not because Meta doesn't work for them,
          but because they run it the same way an e-commerce brand would. The economics are completely different.
        </p>

        <p>
          An online store can sell directly from the ad. You can see if someone clicked and bought. The feedback loop
          is tight, and scaling is relatively straightforward. A service business doesn't work like that. You're selling
          a conversation, not a product. And that gap between "person saw your ad" and "person is now a paying client"
          is where most budgets disappear.
        </p>

        <p>Here's how to close that gap.</p>

        <h2>Understand What You're Actually Selling</h2>

        <p>
          Before touching Ads Manager, get this straight: you're not selling your service in the ad. You're selling
          the next step.
        </p>

        <p>
          For most service businesses, that next step is a call, a consultation, a quote, or a form submission. The
          ad's job is to get the right person to take that step. Everything else, your credentials, your process, your
          pricing, gets handled after the click.
        </p>

        <p>
          This distinction matters because it changes how you write copy, what offer you put in front of people, and
          how you measure success. If you're writing ad copy that tries to explain everything your business does in 125
          characters, you're doing it wrong.
        </p>

        <h2>Start With Lead Ads, Not Traffic Campaigns</h2>

        <p>
          When you're running Meta ads for a service business, Lead Ads (also called Instant Forms) are almost always
          the better starting point over sending traffic to a landing page.
        </p>

        <p>
          Here's why: friction kills conversion. Every additional step between someone seeing your ad and submitting
          their information is an opportunity for them to change their mind. With a Lead Ad, they fill out a form
          without ever leaving Facebook or Instagram. Meta pre-fills their name and email automatically. The barrier to
          entry drops, and you get more submissions per pound of ad spend.
        </p>

        <p>
          The trade-off is lead quality. Because it's so easy to submit, you'll get some people who weren't fully
          serious. That's manageable. You handle it in your follow-up process, not your targeting.
        </p>

        <p>
          For higher-ticket services (think: legal, financial advisory, consultancy), a landing page might be worth the
          extra friction precisely because it pre-qualifies people. But if you're generating leads for a local service,
          a trade, a clinic, or a real estate inquiry, start with Lead Ads.
        </p>

        <h2>Build Your Form to Filter, Not Just Collect</h2>

        <p>
          The default Meta Lead Ad form asks for name, email, and phone. That's fine for getting volume. It's terrible
          for getting quality.
        </p>

        <p>Add one or two qualifying questions. Not ten, two.</p>

        <p>Good examples:</p>

        <ul>
          <li>"What's your budget range for this project?" (with preset options)</li>
          <li>"When are you looking to start?" (immediately / within 3 months / just exploring)</li>
          <li>"Where is the property located?" (for real estate)</li>
          <li>"How many employees does your business have?" (for B2B services)</li>
        </ul>

        <p>
          You're not trying to replicate a qualification call in a form. You're just adding enough friction that
          someone who clicked by accident won't bother finishing. People who answer a follow-up question are
          meaningfully more likely to pick up the phone when you call.
        </p>

        <h2>The Offer Has to Be Specific</h2>

        <p>
          "Contact us to learn more" is not an offer. Neither is "Book a free consultation." Every service business on
          Meta is running a free consultation. It doesn't mean anything.
        </p>

        <p>A specific offer sounds like:</p>

        <ul>
          <li>"Get a free roof inspection before winter. We'll send you a written report within 48 hours."</li>
          <li>
            "Book a 30-minute strategy call. We'll map out a lead generation plan for your clinic before we get off
            the phone."
          </li>
          <li>"Request a quote today. We'll have it to you within 24 hours, itemised."</li>
        </ul>

        <p>
          The difference is specificity and delivery. You're telling them exactly what they'll get and when they'll
          get it. That's what makes someone pause mid-scroll and actually act.
        </p>

        <h2>Target Broad, Then Narrow</h2>

        <p>One of the most common mistakes service businesses make is over-targeting from the start.</p>

        <p>
          They layer on interest after interest (homeowners + DIY + renovation + this specific suburb) until the
          audience is tiny, the learning phase never completes, and the cost per lead is astronomical.
        </p>

        <p>
          Meta's algorithm is genuinely good at finding buyers inside a broad audience, especially once it has some
          conversion data to work with. Give it room to learn.
        </p>

        <p>Start with:</p>

        <ul>
          <li>Location targeting tight (your actual service area)</li>
          <li>Age range sensible for your buyer (don't run 18-65 if your client is 35-55)</li>
          <li>Interest targeting minimal or off entirely</li>
        </ul>

        <p>
          Let Meta find the converters. Once you have 50 or so leads and some conversion data flowing back into the
          pixel, you can layer on Lookalike Audiences built from your existing client list. That's when targeting gets
          sharp.
        </p>

        <h2>Follow Up Faster Than You Think You Need To</h2>

        <p>This is where most service business campaigns fall apart, and it has nothing to do with Meta.</p>

        <p>
          A lead comes in. Someone on your team gets to it the next morning. By then, the person has called three of
          your competitors, one of whom picked up in under five minutes, and you're starting from zero.
        </p>

        <p>
          Speed-to-lead is one of the strongest predictors of whether a lead converts. If you can follow up within 5
          minutes of a form submission, your contact rate goes up dramatically compared to following up an hour later.
          After that, it falls off a cliff.
        </p>

        <p>
          Set up an automatic text message the moment a lead submits. Something simple: "Hi [name], thanks for
          reaching out. This is [your name] from [business]. I'll give you a call in the next few minutes. If now's a
          good time, feel free to call me directly on [number]."
        </p>

        <p>That one automation will do more for your campaign results than almost any targeting change.</p>

        <h2>Watch the Right Numbers</h2>

        <p>
          Clicks and impressions don't tell you if the campaign is working. For a service business running lead
          generation, the numbers that matter are:
        </p>

        <p>
          <strong>Cost per lead.</strong> What you're paying for each form submission. This varies wildly by industry
          and audience, so benchmark it against what a client is worth to you, not against some generic average you
          read online.
        </p>

        <p>
          <strong>Lead-to-appointment rate.</strong> Of every 10 leads, how many actually book a call or agree to a
          visit? If this number is low, the problem is likely your follow-up process, not the campaign.
        </p>

        <p>
          <strong>Appointment-to-client rate.</strong> Of everyone who gets on a call, how many close? If this drops,
          the issue is usually offer, pricing, or the sales conversation itself.
        </p>

        <p>
          Track the full funnel. An ad that gets cheap leads but none of them convert is just as useless as an ad with
          no leads at all.
        </p>

        <h2>When to Scale and When to Stop</h2>

        <p>
          Don't scale a campaign that isn't working yet. That sounds obvious, but a lot of business owners see low
          volume and assume spending more will fix it. It won't.
        </p>

        <p>Before you increase budget, confirm:</p>

        <ul>
          <li>You're getting consistent lead volume</li>
          <li>Leads are answering the phone or responding to follow-up</li>
          <li>At least some leads are converting to paying clients</li>
        </ul>

        <p>
          Once you hit that point, increase the daily budget by 20 to 30% at a time. Doubling overnight resets the
          learning phase and tanks performance.
        </p>

        <p>
          If a campaign runs for three to four weeks and produces no viable leads at all, don't keep spending. Diagnose
          first. The issue is usually one of three things: the offer isn't compelling, the targeting is too narrow or
          too broad, or the follow-up is too slow.
        </p>

        <h2>The Honest Reality</h2>

        <p>
          Meta ads work for service businesses. But they work differently than most people expect, and they require
          more than just a running campaign.
        </p>

        <p>
          The businesses that see strong results are the ones treating ads as one part of a system: the right offer,
          the right audience, a landing page or form that converts, and a follow-up process that actually closes. Pull
          one of those pieces out and the whole thing underperforms.
        </p>

        <p>
          If you're spending money on Meta right now and not seeing leads that convert, it's rarely just the ad. It's
          usually the infrastructure around it.
        </p>
      </>
    ),
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    return {
      title: "Article Not Found | My Lead Partner",
    };
  }

  return {
    title: `${article.title} | My Lead Partner`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://myleadpartner.com/blog/${slug}`,
      type: "article",
      locale: "en_US",
      publishedTime: new Date(article.date).toISOString(),
      images: [
        {
          url: `/blog-og/${slug}`,
          width: 1200,
          height: 630,
          alt: `${article.title} | My Lead Partner`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [`/blog-og/${slug}`],
    },
    alternates: {
      canonical: `https://myleadpartner.com/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(articlesData).map((slug) => ({
    slug,
  }));
}

export const revalidate = 86400;

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 md:py-16">
          <div className="mb-6 flex items-center gap-2">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm font-medium text-[var(--text)] hover:opacity-90"
            >
              ← Back to blog
            </Link>
          </div>

          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-[var(--raised)] px-3 py-1 text-xs font-medium text-[var(--text)]">
              {article.category}
            </span>
            <span className="text-xs text-[var(--muted)]">{article.readTime}</span>
          </div>

          <h1 className="font-heading text-3xl font-bold md:text-4xl">{article.title}</h1>
          <p className="mt-4 text-sm text-[var(--secondary)]">{article.date}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 md:py-16">
        <article className="prose prose-invert max-w-none space-y-6 text-[var(--text)]">
          <style>{`
            .prose h2 {
              font-family: var(--font-heading), Arial, sans-serif;
              font-size: 1.375rem;
              font-weight: 700;
              color: var(--text);
              margin-top: 2rem;
              margin-bottom: 0.75rem;
            }
            .prose p {
              font-size: 1rem;
              line-height: 1.75;
              color: var(--secondary);
              margin-bottom: 1rem;
            }
            .prose ul {
              list-style-position: inside;
              color: var(--secondary);
              margin-bottom: 1rem;
              line-height: 1.75;
            }
            .prose li {
              margin-bottom: 0.5rem;
            }
            .prose strong {
              color: var(--text);
              font-weight: 600;
            }
          `}</style>
          {article.content}
        </article>

        {/* CTA */}
        <div className="mt-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h3 className="font-heading text-xl font-bold text-[var(--text)]">
            Ready to build a lead generation system that actually works?
          </h3>
          <p className="mt-2 text-base text-[var(--secondary)]">
            At My Lead Partner, we handle everything from campaign strategy to funnel infrastructure to follow-up
            systems, so you're not just running ads, you're running a machine that produces clients.
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-block rounded-md bg-[var(--accent)] px-4 py-2 font-medium text-[var(--background)] hover:opacity-90 transition-opacity"
          >
            Book a discovery call
          </Link>
        </div>
      </div>
    </main>
  );
}