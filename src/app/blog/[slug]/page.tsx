import Link from "next/link";
import { notFound } from "next/navigation";

// Article data - in production, this would come from a database or CMS
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
  "why-meta-ads-arent-scaling": {
    title: "Why Your Meta Ads Aren't Scaling (And It's Probably Not the Algorithm)",
    description:
      "You've been running Meta ads and had a decent start. Now you've scaled the budget and results got worse. Cost per lead went up. Purchases dried up. The problem isn't the algorithm -- it's structural.",
    category: "Acquisition",
    date: "May 27, 2026",
    readTime: "12 min read",
    content: (
      <>
        <p>
          You've been running Meta ads for a few months. Maybe you even had a decent start -- a campaign that got
          leads, a product that moved. So you did the logical thing: you increased the budget. And then, slowly or all
          at once, the results got worse.
        </p>

        <p>
          Cost per lead went up. Purchases dried up. You got the same Meta ad account dashboard but completely different
          numbers. You might have hired a freelancer to fix it, or watched three YouTube tutorials, or just started
          testing new creatives hoping something would click.
        </p>

        <p>
          This is one of the most common places SMB owners get stuck with Meta ads. Not at the start, when everything is
          fresh and the algorithm is exploring. Not at the end, when a business has real scale. Right in the middle,
          where you've proven it works but can't get it to grow.
        </p>

        <p>
          <strong>The problem, almost every time, isn't the algorithm. It's the structure underneath the campaigns.</strong>
        </p>

        <h3>The scaling problem isn't random</h3>

        <p>
          When a Meta campaign works at a small budget and breaks when you scale it, most business owners assume Meta
          is being unpredictable. The platform has a reputation for this, and that reputation isn't entirely unfair. But
          the more common explanation is structural.
        </p>

        <p>
          Meta's ad system is built around an auction. Every time someone is eligible to see an ad, hundreds of
          advertisers are competing for that impression. When your budget is small, you're only bidding in a narrow
          slice of that auction, typically the lowest-cost, highest-fit slice. The algorithm finds your best possible
          audience within the constraints of your budget and your creative.
        </p>

        <p>
          When you scale the budget without changing anything else, you're telling the algorithm to find more people at
          the same cost. But your best audience is already being reached. So the system starts reaching the next tier,
          people who are slightly less likely to convert, and your cost per result climbs.
        </p>

        <p>
          This isn't a glitch. It's how the auction works. Scaling requires the underlying economics to hold at a wider
          audience, which means your offer, your creative, and your funnel all have to be strong enough to convert people
          who aren't already primed to buy.
        </p>

        <p>Most aren't.</p>

        <h3>Reason 1: Your creative is doing all the work your offer should be doing</h3>

        <p>
          A common pattern with small business Meta ads: one creative hits well, everything else is mediocre, and the
          whole account rides on that one ad until it fatigues.
        </p>

        <p>
          When that happens, the natural response is to make more creative. Try new videos, new copy, new hooks. And
          creative does matter -- it's the single biggest variable in Meta performance after audience. But if every piece
          of creative you produce has to do the job of educating the prospect, building trust, explaining the offer, and
          closing -- you're asking too much of a 30-second video.
        </p>

        <p>
          Strong creative amplifies a strong offer. It doesn't replace one.
        </p>

        <p>
          If your Meta ads need to do a lot of explaining before someone will click, that's usually a signal that the
          offer itself isn't clear enough. Not that it's a bad product or service -- just that the value hasn't been
          distilled into something immediately obvious.
        </p>

        <p>The fix isn't always a new creative direction. Sometimes it's writing a cleaner offer statement first, then
          building creatives around that.</p>

        <h3>Reason 2: You're sending paid traffic to a page that wasn't built for it</h3>

        <p>
          This one is responsible for more wasted Meta budget than almost anything else, and it's invisible unless you're
          watching the right numbers.
        </p>

        <p>
          Paid traffic and organic traffic behave differently. Someone who finds your website through a Google search has
          already expressed intent -- they typed a query, they chose your result, they arrived with a specific question in
          mind. Paid traffic on Meta is the opposite. You interrupted someone mid-scroll. They weren't looking for you.
          They saw something that caught their attention and clicked, but their intent level at that moment is much
          lower.
        </p>

        <p>
          A homepage that's designed to explain your business to people who already know they need what you sell will not
          convert paid traffic at the same rate.
        </p>

        <p>
          What paid traffic needs is a landing page with one job. Not a full navigation menu. Not five different
          services explained. One offer, one audience, one action. The page should answer three questions within the first
          few seconds: what is this, is it for me, what do I do next.
        </p>

        <p>
          If your Meta ads are running to your homepage, or to a product page that was built for browsing, the issue
          isn't the ads. The issue is where the ad is sending people.
        </p>

        <h3>Reason 3: Your campaign structure is fighting itself</h3>

        <p>
          Meta's algorithm needs data to optimize. When an ad set doesn't get enough conversions in a week, the system
          stays in learning phase indefinitely and never finds its footing. The standard benchmark Meta uses internally is
          50 conversion events per ad set per week -- that's the point at which the system has enough signal to start
          delivering more efficiently.
        </p>

        <p>
          Most small business accounts are fragmented in a way that makes this impossible. Too many ad sets, each with too
          small a budget, each competing for the same audience in the same auction. The result is an account where no
          individual campaign ever gets enough data to optimize, so performance is permanently volatile.
        </p>

        <p>
          This gets worse when advertisers layer in too many targeting variables -- detailed interests, narrow custom
          audiences, aggressive exclusions -- because each layer reduces the pool the algorithm can work with. Meta's own
          guidance for a few years has been to consolidate and let the system do the targeting. That's not always the
          right call, but for accounts spending under $5,000 per month, tight targeting often hurts more than it helps.
        </p>

        <p>
          The fix is consolidation: fewer ad sets, more budget per ad set, broader audience targeting, and giving the
          algorithm time to exit learning phase before making changes.
        </p>

        <h3>Reason 4: You're optimizing for the wrong event</h3>

        <p>
          What you tell Meta to optimize for determines who Meta shows your ads to.
        </p>

        <p>
          If your campaign is optimized for link clicks, Meta will find people who click on things. If it's optimized for
          landing page views, it'll find people who actually wait for the page to load. If it's optimized for purchases,
          it'll find people who are more likely to buy. These are meaningfully different audiences.
        </p>

        <p>
          The mistake that kills scaling potential is optimizing for a high-volume event (clicks, video views, leads)
          when what you actually need is a down-funnel event (purchases, qualified leads, phone calls). You get a lot of
          cheap activity that never converts, and you can't understand why the numbers look good in Ads Manager but the
          business isn't growing.
        </p>

        <p>
          The right optimization event is the one closest to actual revenue that still gets enough volume to feed the
          algorithm. For a business spending under $2,000 per month, that might mean optimizing for leads rather than
          purchases. For a business spending more, optimizing for purchases or even initiated checkouts usually produces
          better downstream results despite higher up-front CPMs.
        </p>

        <h3>Reason 5: The attribution window is hiding what's actually working</h3>

        <p>
          Meta's default attribution is a 7-day click, 1-day view window. That means if someone clicks your ad today and
          buys next Tuesday, Meta reports that purchase as coming from the ad. But it also means if someone simply views
          your ad without clicking and then goes directly to your website the next day, Meta counts that too.
        </p>

        <p>
          The problem is that this attribution window doesn't match how most purchase decisions actually happen. For
          high-consideration products, the window between first touch and conversion is often 2 to 4 weeks. For
          low-consideration products, it might be hours. When the attribution window doesn't reflect your actual customer
          journey, you're making budget decisions on data that doesn't represent reality.
        </p>

        <p>
          Businesses that scale Meta ads successfully spend time understanding where their sales actually come from --
          not just what Meta's dashboard says. That usually means running some form of post-purchase survey ("How did you
          hear about us?"), using UTM parameters properly, and cross-referencing Meta data against actual CRM or sales
          data rather than trusting the platform's self-reported numbers entirely.
        </p>

        <p>
          Meta has an obvious incentive to show attribution numbers that justify your ad spend. That doesn't mean the
          platform isn't working -- it means you should verify independently.
        </p>

        <h3>Reason 6: There's no system catching the leads after they click</h3>

        <p>
          This one isn't a Meta problem at all. But it kills Meta performance because it makes the whole investment
          invisible.
        </p>

        <p>
          A lead comes in from an ad. Nobody follows up for 48 hours. The prospect has already moved on, gotten three
          quotes from competitors, or just forgotten why they enquired. The business owner looks at the Meta results,
          sees leads but no revenue, and concludes the ads aren't working.
        </p>

        <p>The ads worked. The follow-up didn't.</p>

        <p>
          For service businesses especially, speed to lead is one of the highest-leverage variables in the whole funnel.
          If your business takes more than a few hours to respond to an inbound enquiry, you're losing a significant
          portion of the leads your ads are generating -- and the campaigns look worse than they are.
        </p>

        <p>
          Before scaling Meta spend, it's worth asking an honest question: if the ads suddenly generated three times as
          many leads tomorrow, does the business have a system to handle that? An email sequence, a CRM, someone checking
          a shared inbox? If not, more budget won't fix the problem.
        </p>

        <h3>What scaling actually requires</h3>

        <p>
          Scaling Meta ads isn't a matter of finding the right audience or the magic creative formula. It's about building
          a system where every part is strong enough to handle more volume.
        </p>

        <p>That means:</p>

        <ul>
          <li>An offer that's clear and compelling without explanation</li>
          <li>A landing page with one job</li>
          <li>A campaign structure that gives the algorithm room to work</li>
          <li>Optimization events that map to real business outcomes</li>
          <li>Attribution data you actually trust</li>
          <li>A follow-up process that treats every lead like it cost money to generate, because it did</li>
        </ul>

        <p>
          When those pieces are in place, increasing budget tends to work. When they aren't, the algorithm isn't the
          problem. It's doing exactly what it was designed to do -- finding the best result it can within the constraints
          it's been given.
        </p>

        <p>
          Most businesses that struggle to scale ads are giving the algorithm a flawed brief and expecting a different
          result.
        </p>

        <h3>A note on testing</h3>

        <p>
          One thing that doesn't get said enough: real creative testing on Meta requires volume. An ad set that gets 200
          impressions and no purchases hasn't told you anything meaningful about whether the creative works. Statistical
          significance on Meta tests typically requires several hundred to a few thousand impressions per variant,
          depending on your conversion rate.
        </p>

        <p>
          This means businesses with small budgets have to make peace with the fact that testing is slow. You can run two
          creatives simultaneously, wait two weeks, look at the one that's performing better, and iterate -- but you can't
          know after 48 hours whether something works. Pulling creatives early because they didn't immediately perform is
          one of the fastest ways to end up with an account full of inconclusive data.
        </p>

        <p>Patience with testing and decisiveness with scaling are two different skills. The best-performing accounts
          tend to be deliberate about both.</p>

        <h3>The honest answer about what this takes</h3>

        <p>
          Getting Meta ads to scale isn't complicated in theory. In practice, it requires attention to a lot of variables
          at once, and it requires the kind of judgment that comes from having seen the same patterns fail across enough
          accounts to recognize them early.
        </p>

        <p>
          If you're an SMB owner running ads yourself, the most valuable thing you can do right now is audit where in the
          funnel the drop-off is actually happening. Not in Ads Manager -- in the real world. Is the problem that people
          aren't clicking? That they're clicking but not converting on the page? That they're enquiring but not buying?
          Each of those is a different fix, and treating them the same way is how businesses end up spending more and
          getting less.
        </p>

        <p>Find the actual break point. Fix that first. Then scale.</p>
      </>
    ),
  },
  "growth-architecture-vs-marketing-tactics": {
    title: "Growth Architecture vs. Marketing Tactics: Why Most Businesses Get It Wrong",
    description:
      "The difference between running campaigns and building systems. Why agencies focus on tactics when your business needs architecture.",
    category: "Strategy",
    date: "May 24, 2026",
    readTime: "8 min read",
    content: (
      <>
        <p>
          There's a fundamental misalignment in how most businesses approach growth. They hire agencies to run campaigns,
          when what they actually need is someone to build architecture.
        </p>

        <p>
          A tactic is a single lever pulled in isolation. A campaign launched. A piece of content created. An ad set
          tested. Tactics feel productive in the moment. You can measure them. You can see the output.
        </p>

        <p>
          Architecture is the system these tactics operate within. It's the funnel structure that converts attention to
          revenue. It's the tracking system that tells you which customers are profitable. It's the content strategy
          that feeds both paid and organic channels. It's the operational layer that keeps all the moving parts moving
          in the same direction.
        </p>

        <h3>Why agencies optimize for tactics</h3>

        <p>
          Agencies are optimized to sell deliverables. A campaign plan. A month of paid ads. A content calendar. These
          are tangible outputs that justify a contract. They're also easy to invoice for.
        </p>

        <p>
          What they're not optimized for is thinking beyond the scope of work they were hired to do. If you hire someone
          to run paid ads, they'll run paid ads. They won't necessarily think about how those ads connect to your
          content strategy, or your landing page performance, or your sales process.
        </p>

        <p>
          That's not malice. It's just how the incentive structure works. They deliver what they were paid to deliver,
          then move on.
        </p>

        <h3>Why your business needs architecture instead</h3>

        <p>
          Growth that compounds happens when every lever feeds the next one. Paid acquisition brings in volume. Landing
          pages convert that volume. Email sequences build relationships with those leads. Content builds trust between
          campaigns. Organic amplifies what paid started.
        </p>

        <p>
          When these operate in silos, you lose 60% of the potential impact. When they operate as one system, each lever
          makes the others more efficient.
        </p>

        <p>
          That's the difference between a business that grows with constant campaign effort, and one that grows with
          momentum. One where cost per acquisition drops month over month, not because you found a new lever, but
          because all the levers are working together.
        </p>

        <p>
          That's architecture. And it's what actually moves the number.
        </p>
      </>
    ),
  },
  "unit-economics-funnel-design": {
    title: "Unit Economics: The Foundation of Funnel Design",
    description:
      "How to structure your funnel around what actually matters: the cost per acquisition and lifetime value that drives profitability.",
    category: "Operations",
    date: "May 18, 2026",
    readTime: "10 min read",
    content: (
      <>
        <p>
          Most growth teams design funnels backwards. They start with the channel (paid ads, organic, partnerships).
          Then they build a landing page. Then they measure if it converts. Then they optimize the conversion rate.
        </p>

        <p>
          This approach misses the entire point of a funnel. A funnel isn't designed to maximize conversions. It's
          designed to acquire customers profitably.
        </p>

        <h3>The unit economics framework</h3>

        <p>
          Every customer has three numbers:
        </p>

        <ul>
          <li>
            <strong>Cost to acquire:</strong> What you spend on ads, content, and operations to bring them in
          </li>
          <li>
            <strong>Revenue per customer:</strong> What that customer pays you, first transaction and beyond
          </li>
          <li>
            <strong>Margin:</strong> Revenue minus cost of goods or services, minus acquisition cost
          </li>
        </ul>

        <p>
          If your acquisition cost is $50, average customer revenue is $100, and margin is 40%, you're profitable. If
          it's the other way around, you're not. No amount of optimization changes that.
        </p>

        <h3>How this changes funnel design</h3>

        <p>
          When you know your unit economics, you design the funnel to hit them. Not maximize conversion rate. Hit the
          CAC that makes the business work.
        </p>

        <p>
          Sometimes that means a longer sales cycle. Sometimes it means smaller initial transactions that lead to
          bigger ones. Sometimes it means you don't do paid ads at all, because the CAC doesn't work at scale.
        </p>

        <p>
          The funnel serves the math. Not the other way around.
        </p>
      </>
    ),
  },
  "performance-marketing-beyond-roas": {
    title: "Performance Marketing Beyond ROAS: Building Predictable Acquisition",
    description:
      "ROAS is a vanity metric. Here's how to structure paid acquisition around the metrics that actually move your business.",
    category: "Acquisition",
    date: "May 12, 2026",
    readTime: "9 min read",
    content: (
      <>
        <p>
          ROAS (Return on Ad Spend) is the most misleading metric in performance marketing. Everyone optimizes for it.
          Almost nobody uses it correctly.
        </p>

        <p>
          Here's why: ROAS tells you the revenue per dollar spent on ads. It's useful for comparing creative or
          audiences in a single campaign. But as a business metric, it's incomplete.
        </p>

        <h3>The ROAS trap</h3>

        <p>
          A 2x ROAS sounds good. $1 in ads generates $2 in revenue. But that $2 is gross revenue. If your margins are
          30%, that $2 is really $0.60 of profit. Your cost to acquire is $1. You're losing money.
        </p>

        <p>
          Worse, ROAS doesn't account for repeat purchases, lifetime value, or the efficiency of your entire acquisition
          operation. A 2x ROAS campaign that brings in high-quality repeat customers is different from one that brings
          in one-off buyers. But the metric looks the same.
        </p>

        <h3>What to measure instead</h3>

        <p>
          Design your paid acquisition around three numbers:
        </p>

        <ul>
          <li>
            <strong>Cost per qualified lead:</strong> Not just form fills, but leads that fit your ICP and have
            buying intent
          </li>
          <li>
            <strong>Conversion rate from lead to customer:</strong> What percentage of those leads actually become
            paying customers
          </li>
          <li>
            <strong>Customer acquisition cost vs. lifetime value:</strong> The ratio that determines if paid works at
            all
          </li>
        </ul>

        <p>
          When these three metrics are healthy, ROAS takes care of itself. When they're not, no amount of optimization
          helps.
        </p>
      </>
    ),
  },
  "lead-generation-infrastructure": {
    title: "The Hidden Cost of Inefficient Lead Generation Infrastructure",
    description:
      "Most businesses lose 40-60% of potential leads before they even see them. Here's how to build the right infrastructure.",
    category: "Lead Generation",
    date: "May 6, 2026",
    readTime: "7 min read",
    content: (
      <>
        <p>
          Lead generation infrastructure is unsexy. It's tracking pixels and CRM integration and email sequences and
          lead scoring. Nobody gets excited about it. Everyone overlooks it.
        </p>

        <p>
          That oversight costs most businesses thousands per month.
        </p>

        <h3>Where leads disappear</h3>

        <p>
          A typical lead journey: Someone clicks an ad. Lands on a landing page. Fills out a form. Then what?
        </p>

        <ul>
          <li>
            <strong>Lost in the CRM:</strong> The lead never makes it into your system, or sits there unqualified
          </li>
          <li>
            <strong>No follow-up:</strong> Nobody calls within 24 hours (studies show you lose 90% of leads if you
            wait that long)
          </li>
          <li>
            <strong>Wrong person:</strong> Sales team doesn't know if it's qualified, so treats it as low priority
          </li>
          <li>
            <strong>No context:</strong> Sales team doesn't know where the lead came from or what problem they were
            interested in
          </li>
          <li>
            <strong>Abandoned in the funnel:</strong> Lead enters a generic nurture sequence instead of one targeted to
            their segment
          </li>
        </ul>

        <p>
          Most of these are infrastructure problems, not people problems. They're fixable.
        </p>

        <h3>Building real infrastructure</h3>

        <p>
          Infrastructure means:
        </p>

        <ul>
          <li>
            Automated immediate follow-up (call, email, or SMS within an hour)
          </li>
          <li>
            Lead scoring that tells sales which ones matter
          </li>
          <li>
            Context on every lead (what ad they clicked, what keyword, what page they landed on)
          </li>
          <li>
            Targeted nurture based on where they came from
          </li>
          <li>
            Regular reporting on where leads are lost
          </li>
        </ul>

        <p>
          When this infrastructure exists, lead volume from the same paid spend can 2x or 3x. Not because you're
          running better ads. Because you're not losing them after they arrive.
        </p>
      </>
    ),
  },
  "content-systems-compounding": {
    title: "Content Systems That Compound: Building Organic Moats",
    description:
      "How to structure content production so each piece works harder than the last, and feeds your paid channels.",
    category: "Content",
    date: "April 30, 2026",
    readTime: "11 min read",
    content: (
      <>
        <p>
          Most content strategies operate at a loss. You produce 100 pieces of content per year, 95 of which have no
          lasting impact. They ship. They disappear. You produce more next month.
        </p>

        <p>
          A systems-based content strategy is different. Each piece works harder. Each piece feeds into the next. By
          month three, you have compounding organic reach. By month six, you have a moat.
        </p>

        <h3>The compounding model</h3>

        <p>
          Instead of "publish content," think "build a content library that ranks, builds trust, and feeds acquisition."
        </p>

        <p>
          Each piece of content has three lives:
        </p>

        <ul>
          <li>
            <strong>Immediate:</strong> It gets distributed to your audience (social, email, paid)
          </li>
          <li>
            <strong>Organic:</strong> It ranks in search results for 6-12 months, bringing passive traffic
          </li>
          <li>
            <strong>Leverage:</strong> It feeds into other content, becomes a case study, gets repurposed into other
            formats
          </li>
        </ul>

        <p>
          The third life is where compounding happens. One piece of content doesn't just work once. It works a hundred
          times.
        </p>

        <h3>Structuring for compounding</h3>

        <p>
          Publish fewer pieces, better. Focus on topics with:
        </p>

        <ul>
          <li>Search volume (people are looking for this)</li>
          <li>Evergreen value (it doesn't age)</li>
          <li>Connection to your service (it leads somewhere for your business)</li>
        </ul>

        <p>
          Then leverage each piece: social clips, email summaries, case studies, webinars, client examples. Each
          derivative has its own audience.
        </p>

        <p>
          By month 12, you have 50 pieces of content. Each one is generating organic traffic. Each one is feeding paid
          campaigns. That's a moat.
        </p>
      </>
    ),
  },
  "growth-operating-model": {
    title: "The Growth Operating Model: How to Scale Without Chaos",
    description:
      "A breakdown of how in-house growth teams operate, and how to replicate that structure in your business.",
    category: "Operations",
    date: "April 24, 2026",
    readTime: "12 min read",
    content: (
      <>
        <p>
          The best growth happens at companies with a growth operating model. Not just people working on growth, but a
          system for how decisions get made, how channels feed each other, how accountability flows.
        </p>

        <p>
          Most companies don't have this. They have marketing people who do marketing things. Sales people who do sales
          things. Product people who work in isolation. That's not a growth operating model. That's silos.
        </p>

        <h3>What a real model looks like</h3>

        <p>
          A growth operating model has these layers:
        </p>

        <ul>
          <li>
            <strong>Strategy layer:</strong> Clear metrics for the business. What does growth look like? Revenue
            targets. Customer acquisition targets. Channel mix.
          </li>
          <li>
            <strong>Execution layer:</strong> People and systems running each channel. Paid. Content. Sales. But they're
            not siloed.
          </li>
          <li>
            <strong>Reporting layer:</strong> Weekly dashboards showing: What moved? What didn't? What's next?
          </li>
          <li>
            <strong>Decision layer:</strong> Weekly meetings where strategy, execution, and reporting connect. Where
            decisions get made on what to do next.
          </li>
        </ul>

        <p>
          The magic isn't the people. It's the system that keeps them coordinated.
        </p>

        <h3>How to implement</h3>

        <p>
          Start with the reporting layer. Get everyone in the room once per week to look at the same numbers. Not five
          different dashboards. One dashboard. One set of metrics everyone agrees on.
        </p>

        <p>
          From there, you'll see where channels aren't connected. Where decisions have to change because the data moved.
          Where the model needs adjustment.
        </p>

        <p>
          That's a growth operating model in action.
        </p>
      </>
    ),
  },
  "how-to-build-lead-generation-system": {
    title: "How to Build a Lead Generation System for a Service Business",
    description:
      "Most service businesses don't have a lead generation problem. They have a lead generation system problem. There's a difference.",
    category: "Lead Generation",
    date: "May 29, 2026",
    readTime: "14 min read",
    content: (
      <>
        <p>
          Most service businesses don't have a lead generation problem. They have a lead generation <em>system</em> problem.
        </p>

        <p>
          There's a difference. A problem implies something is broken. A system problem means nothing was ever built in
          the first place -- the business has been running on referrals, word of mouth, and the occasional burst of
          activity from a campaign someone ran once and then forgot about.
        </p>

        <p>
          That works until it doesn't. And when it stops working, there's nothing to fix because there's nothing to point
          to.
        </p>

        <p>
          This article is about building the thing you can point to. A lead generation system for a service business:
          what it looks like, what it needs, and how the pieces connect.
        </p>

        <h2>What a system actually means</h2>

        <p>
          Before getting into tactics, it's worth being clear on what separates a system from a collection of marketing
          activities.
        </p>

        <p>
          A marketing activity is something you do. Run ads for a month. Post on Instagram three times a week. Send an
          email to your list. These are actions, and they can produce results. But when you stop doing them, the results
          stop too.
        </p>

        <p>
          A system is something that runs. It has inputs (traffic, attention, referrals), a process (qualification,
          nurturing, conversion), and outputs (booked calls, enquiries, signed clients) that don't require you to manually
          intervene every single time.
        </p>

        <p>
          The reason this distinction matters is that most small service businesses spend all their energy on activities
          and never build the underlying system. So growth is always episodic. Good month, quiet month, panic, campaign,
          good month again. The cycle is exhausting and it compounds stress rather than revenue.
        </p>

        <p>
          A working lead generation system breaks that cycle. It doesn't eliminate the need for marketing -- it makes the
          marketing you do more durable.
        </p>

        <h2>The four components every service business system needs</h2>

        <p>
          A lead generation system for a service business has four parts. They're not interchangeable, and skipping any of
          them is why most attempts at "fixing" lead gen fall apart within 90 days.
        </p>

        <ul>
          <li><strong>1. A traffic source</strong></li>
          <li><strong>2. A capture mechanism</strong></li>
          <li><strong>3. A qualification and nurture process</strong></li>
          <li><strong>4. A conversion point</strong></li>
        </ul>

        <p>
          Most businesses have one or two of these. The work is connecting all four so that someone moving through the
          system doesn't fall out between steps.
        </p>

        <h2>Component 1: Traffic -- where attention comes from</h2>

        <p>
          Traffic is the top of the system. It's how people find out you exist.
        </p>

        <p>
          For a service business, there are four realistic traffic sources worth building around:
        </p>

        <p>
          <strong>Paid traffic</strong> is fast and controllable. You set a budget, you run ads, people see them. Meta
          ads, Google Search ads, and LinkedIn ads are the most common options for service businesses depending on who
          they're targeting. Paid traffic's weakness is that it stops the moment you stop paying. It's fuel, not an
          engine.
        </p>

        <p>
          <strong>Organic social</strong> is slower but compounds. Consistent content on the platform where your target
          clients actually spend time builds familiarity and trust over months. A landscaping company posting weekly on
          Facebook, a consultancy sharing insights on LinkedIn, a wedding planner building an audience on Instagram --
          these all work, but they work on a 6-to-12-month timeline, not a 6-week one. If you need leads now, organic
          social alone won't solve it.
        </p>

        <p>
          <strong>Search (SEO)</strong> is the highest-intent traffic source available. Someone typing "commercial
          cleaning company in Dubai" or "meta ads agency for ecommerce" into Google is actively looking for what you
          sell. Ranking for those queries takes time and content, but the leads it produces are already qualified before
          they arrive. For service businesses with a content strategy, SEO is the traffic source with the best long-term
          economics.
        </p>

        <p>
          <strong>Referrals</strong> are often underestimated as a system. Most service businesses get referrals passively
          -- a happy client mentions you to someone. That's not a system. A referral system is deliberate: you identify
          your best past clients, you ask them directly, you make it easy with a clear referral process, and you follow
          up. It sounds obvious because it is. Few businesses actually do it consistently.
        </p>

        <p>
          You don't need all four working at once. Most service businesses should start with one paid source for
          immediate volume and one organic source for compounding returns. Add more once the rest of the system is solid
          enough to handle the traffic.
        </p>

        <h2>Component 2: Capture -- turning attention into a contact</h2>

        <p>
          Traffic without capture is just awareness. Awareness is nice. Contacts are useful.
        </p>

        <p>
          Capture is the mechanism that converts someone who's seen your content, clicked your ad, or visited your
          website into someone you can actually follow up with.
        </p>

        <p>
          For most service businesses, capture happens in one of three ways:
        </p>

        <p>
          <strong>A lead form</strong> -- Someone fills out a form requesting a call, a quote, or more information.
          Simple, direct, and the most common mechanism for service businesses. The form should ask for the minimum
          information needed to qualify the lead. Name, email, phone, and one qualifying question (budget range, project
          type, timeline) is usually enough. Longer forms reduce volume. Shorter forms reduce quality. Find the balance for
          your specific business.
        </p>

        <p>
          <strong>A lead magnet</strong> -- Something valuable given in exchange for an email address. A free guide, a
          checklist, a template, a short video training. This works well for service businesses where the buying decision
          has a longer consideration window. A business owner who downloads your "10-point checklist for evaluating a
          marketing agency" has self-identified as someone who might hire a marketing agency. That's a useful signal.
        </p>

        <p>
          <strong>A direct message or DM funnel</strong> -- Common on Instagram and Facebook, where a piece of content
          drives people to send a message, and then an automated or manual conversation qualifies them. This works
          particularly well for high-touch service businesses where the relationship is part of the product.
        </p>

        <p>
          Whatever capture mechanism you use, it needs one thing above all else: a specific destination. Not your
          homepage. Not your "services" page. A dedicated page or flow with one purpose. The more you ask someone to
          figure out what to do next on their own, the more likely they are to leave.
        </p>

        <h2>Component 3: Qualification and nurture -- the part most businesses skip entirely</h2>

        <p>
          This is where most service business lead generation systems break down.
        </p>

        <p>
          A lead comes in. Someone follows up once or twice. The lead doesn't immediately book. The business moves on.
        </p>

        <p>
          That lead isn't dead. It's just not ready yet.
        </p>

        <p>
          Depending on what you sell and who you sell it to, the average time between first enquiry and signed contract
          for a service business can be anywhere from two days to six months. If your only follow-up mechanism is a manual
          email you send when you remember to, you're losing the majority of your pipeline to slower attrition.
        </p>

        <p>
          Qualification means understanding which leads are actually worth your time. Not every enquiry is a good fit. A
          simple qualification framework -- the right company size, the right budget, the right urgency -- saves you from
          spending hours on calls that go nowhere. You can qualify through the lead form itself, through an automated email
          sequence that asks a few questions, or through a short discovery call.
        </p>

        <p>
          Nurture means staying in contact with leads who are interested but not yet ready. This doesn't have to be
          complicated. A five-email sequence sent over three weeks, each one providing something useful (a case study, an
          answer to a common question, a relevant article), keeps you present while the prospect moves through their own
          decision-making process.
        </p>

        <p>
          The businesses that win the most clients in competitive service markets aren't always the best at the work.
          They're the best at staying in contact long enough for the prospect to be ready.
        </p>

        <h2>Component 4: Conversion -- the moment that actually matters</h2>

        <p>
          Conversion is where a lead becomes a client.
        </p>

        <p>
          For most service businesses, this is a sales call or a proposal. And this is where a lot of work upstream gets
          wasted, because the conversion step is handled inconsistently.
        </p>

        <p>
          No script. No clear structure. No defined next step at the end. The call goes well, the prospect says they'll
          think about it, and then nothing happens.
        </p>

        <p>
          A conversion process for a service business doesn't need to be complicated, but it does need to be repeatable:
        </p>

        <p>
          The discovery call should have a defined structure. Understand the problem first, then explain what you do, then
          make it clear what working together looks like. The call should end with a clear next step -- a proposal date, a
          follow-up call, or a decision on the spot.
        </p>

        <p>
          The proposal or offer should be specific. Not a ten-page document that exhausts the prospect before they sign. A
          clear scope, a clear price, a clear timeline, and a clear answer to "what happens when I say yes."
        </p>

        <p>
          The follow-up after a proposal should happen within 48 hours if you haven't heard back. Not to push. To ask if
          there are questions. Most proposals that don't convert don't die because the prospect decided no -- they die
          because the conversation stopped.
        </p>

        <h2>How to connect the four components</h2>

        <p>
          Having all four components is one thing. Having them connected is what makes it a system.
        </p>

        <p>
          Here's what a connected system looks like for a typical service business:
        </p>

        <p>
          A Meta ad targeting local business owners drives traffic to a dedicated landing page. The page has one offer --
          a free 30-minute growth audit -- and a short form. The form collects name, email, phone, and one question about
          their current biggest challenge.
        </p>

        <p>
          When someone submits the form, three things happen automatically: they receive a confirmation email with the call
          booking link, they're added to a short email nurture sequence in case they don't book immediately, and the
          business owner gets a notification with the lead's details.
        </p>

        <p>
          The growth audit call follows a defined structure. At the end, if there's a fit, the business owner sends a
          proposal within 24 hours. If the prospect goes quiet, a two-email follow-up sequence goes out over the next week.
        </p>

        <p>
          Every lead that comes in through this system gets the same experience, regardless of whether the business owner
          is having a busy week or a slow one. That consistency is what makes it a system rather than a series of good
          intentions.
        </p>

        <h2>The tools you need (and the ones you don't)</h2>

        <p>
          Service business owners have a tendency to over-complicate the tools layer and under-invest in the strategy
          layer. You don't need a $500/month CRM to run a functional lead generation system. You need tools that do five
          things:
        </p>

        <ul>
          <li>Capture leads (a form builder or landing page tool)</li>
          <li>Send automated emails (any basic email marketing platform)</li>
          <li>Book calls (a scheduling tool like Calendly)</li>
          <li>Track your pipeline (a spreadsheet works fine until you're at 30+ leads per month)</li>
          <li>Run paid ads if you're using paid traffic (Meta Ads Manager, Google Ads)</li>
        </ul>

        <p>
          That's it. The tools are not the bottleneck. The strategy and the consistency are.
        </p>

        <p>
          Where businesses go wrong is spending weeks choosing a CRM, setting up automations, and building dashboards
          before they've generated a single lead. Build the simplest version that works first. Add complexity when the
          volume demands it.
        </p>

        <h2>What to build first</h2>

        <p>
          If you're starting from nothing, here's the order that makes the most sense:
        </p>

        <p>
          <strong>Week one and two:</strong> Define your offer and your target client. Not in vague terms -- specifically.
          Who is the person you want to book a call with, what is their problem, and what exactly do you do about it? This
          sounds like strategy work, not lead gen work, but every piece of the system depends on having a clear answer to
          these questions.
        </p>

        <p>
          <strong>Week three:</strong> Build a landing page with a single offer. A call booking, a lead form, a free
          resource in exchange for an email. Keep it simple. Get it live.
        </p>

        <p>
          <strong>Week four:</strong> Set up a basic email sequence for people who opt in but don't book. Three to five
          emails, each one useful on its own.
        </p>

        <p>
          <strong>Week five:</strong> Drive traffic. Start with the channel that makes most sense for your business and
          budget. If you have a marketing budget, paid ads are the fastest path to volume. If you don't, organic content
          and direct outreach.
        </p>

        <p>
          <strong>Ongoing:</strong> Review your conversion rate at each stage every two weeks. Where are people dropping
          out? Fix that stage first before adding more traffic.
        </p>

        <h2>The mistake that resets all of this</h2>

        <p>
          The most common thing that stops a lead generation system from working isn't the setup. It's what happens in
          month two.
        </p>

        <p>
          Things start working. Leads come in. The business gets busier. And then the system gets neglected because
          there's actual client work to do. The email sequence stops getting updated. The landing page doesn't get tested.
          The ad campaigns don't get reviewed. Slowly, performance drops, and the business is back to relying on word of
          mouth and occasional bursts of activity.
        </p>

        <p>
          A lead generation system isn't a one-time build. It's an ongoing operation. Someone needs to own it -- checking
          performance weekly, updating creatives, adjusting follow-up sequences based on what's working. That doesn't have
          to be a full-time job, but it does have to be someone's job.
        </p>

        <p>
          For most small service businesses, that's the real constraint. Not the strategy. Not the budget. The bandwidth to
          operate the system consistently while also delivering the work.
        </p>

        <p>
          Which is, honestly, the reason growth partners exist.
        </p>

        <h2>One number to track above everything else</h2>

        <p>
          If you're only tracking one metric in your lead generation system, track <strong>cost per qualified lead</strong>
          -- not cost per click, not cost per form submission, but the cost to get someone on a call who could actually
          become a client.
        </p>

        <p>
          Everything else is upstream of that number. High cost per qualified lead means something in your targeting, your
          creative, or your capture mechanism is attracting the wrong people or repelling the right ones. Low cost per
          qualified lead with a low close rate means the conversion step is the problem. High cost per qualified lead with a
          high close rate means you need more volume at the top.
        </p>

        <p>
          The number tells you where to look. Most service businesses don't track it because it requires connecting the ad
          platform data to the actual sales data. That extra step is worth it. It's the difference between optimizing the
          part of the funnel that looks bad in a dashboard and optimizing the part that's actually costing you revenue.
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
            .prose h3 {
              font-family: var(--font-heading), Arial, sans-serif;
              font-size: 1.25rem;
              font-weight: 700;
              color: var(--text);
              margin-top: 1.75rem;
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
          <h3 className="font-heading text-xl font-bold text-[var(--text)]">Ready to build your growth architecture?</h3>
          <p className="mt-2 text-base text-[var(--secondary)]">
            Let's talk about how to structure growth as a system, not a series of campaigns.
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-block rounded-md bg-[var(--accent)] px-4 py-2 font-medium text-[var(--background)] hover:opacity-90 transition-opacity"
          >
            Start a conversation
          </Link>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="font-heading text-xl font-bold text-[var(--text)] mb-6">More from the blog</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(articlesData)
              .filter(([s]) => s !== slug)
              .slice(0, 2)
              .map(([s, a]) => (
                <Link
                  key={s}
                  href={`/blog/${s}`}
                  className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--accent-border)] hover:bg-[var(--raised)]"
                >
                  <span className="text-xs text-[var(--accent)]">{a.category}</span>
                  <h4 className="font-heading mt-2 text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                    {a.title}
                  </h4>
                  <p className="mt-2 text-xs text-[var(--muted)]">{a.date}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
