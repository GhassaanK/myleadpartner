"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Script from 'next/script'


type Phase = {
  label: string;
  title: string;
  body: string;
};

type LeadFormProps = {
  compact?: boolean;
  source: string;
};

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const whatsappHref = "https://wa.me/923112887279";

const ecosystem = [
  {
    number: "01",
    title: "Performance Marketing",
    copy: "Paid acquisition on Meta, TikTok, and beyond. Built around unit economics, not vanity metrics. We scale what is profitable and cut what is not, before you have to ask.",
  },
  {
    number: "02",
    title: "Lead Generation",
    copy: "Full funnel pipeline development, from audience targeting to landing pages to follow-up sequences. We build the infrastructure, then we fill it.",
  },
  {
    number: "03",
    title: "Social Media Management",
    copy: "Organic content that builds brand equity and converts attention to trust. Not just posts, a presence that does real business work between your paid campaigns.",
  },
  {
    number: "04",
    title: "Web Development",
    copy: "Conversion built websites and landing pages. Fast, clean, and engineered for the specific job they need to do. Because traffic without a strong destination is just budget burned.",
  },
  {
    number: "05",
    title: "Growth Management",
    copy: "The connective layer. Strategy, reporting, prioritization, and decisions, managed by a partner who carries full context across every piece of work. This is where most agencies stop. It is where we start.",
  },
];

const phases: Phase[] = [
  {
    label: "Discovery & Diagnosis",
    title: "We learn your business before we touch your marketing.",
    body: "Weeks one and two are about understanding where the real leverage is. Revenue model, customer journey, current acquisition costs, conversion gaps. We map the full picture before writing a single brief.",
  },
  {
    label: "Foundation & Architecture",
    title: "We build the infrastructure that everything else runs on.",
    body: "Tracking, landing pages, creatives, content systems, funnel structure. This phase is slower and more deliberate than most clients expect. That is intentional. Fast campaigns on weak foundations do not scale.",
  },
  {
    label: "Launch & Iteration",
    title: "We move fast once the foundation is solid.",
    body: "Campaigns go live. Content ships. Data comes in. We run rapid iteration cycles, testing, learning, doubling down on what moves the number. Every week has a clear decision point.",
  },
  {
    label: "Scale & Compounding",
    title: "The work starts working for itself.",
    body: "Successful channels feed each other. Organic builds what paid starts. Systems reduce the cost of growth over time. By month four, the business has momentum that does not require constant reinvention to maintain.",
  },
];

const results = [
  {
    client: "Real Estate, Gulf Region",
    metric: "4.2x",
    value: 4.2,
    suffix: "x",
    context: "Qualified lead volume in 60 days",
    detail:
      "Full funnel build from content strategy through Meta acquisition. Targeting high net worth Gulf investors for a Turkish citizenship by investment program.",
  },
  {
    client: "E-commerce, Fashion",
    metric: "62%",
    value: 62,
    suffix: "%",
    context: "Drop in cost per purchase",
    detail:
      "Complete creative overhaul paired with landing page reconstruction and pixel setup. Same budget, structured better, the economics shifted in six weeks.",
  },
  {
    client: "Service Business, Local",
    metric: "80",
    value: 80,
    suffix: "",
    context: "Qualified enquiries per month",
    detail:
      "Built from scratch. No prior digital presence. Web, social, and lead generation infrastructure stood up in four weeks. Paid acquisition layered in at week five.",
  },
  {
    client: "B2B Services",
    metric: "3.8x",
    value: 3.8,
    suffix: "x",
    context: "Growth in monthly revenue, 90 day window",
    detail:
      "Repositioned brand presence, rebuilt the lead funnel, and ran tightly managed paid campaigns. Combined growth management kept everything moving in the same direction.",
  },
];

const notThis = [
  "A freelancer who disappears after delivery",
  "An agency optimizing for their retainer, not your revenue",
  "Campaigns running without a business strategy behind them",
  "Monthly reports that explain what happened, not what to do",
  "A different account manager every quarter",
  "Work that stops the moment a contract does",
];

const thisWay = [
  "A team that thinks like a co-founder, not a contractor",
  "Decisions made with your revenue in mind, not our scope of work",
  "Every channel built to feed every other channel",
  "Proactive, we spot the problem before you ask",
  "One team, one context, across the full picture",
  "Systems that outlast any single campaign",
];

const teamMembers = [
  {
    name: "Founder name coming soon",
    role: "Founder",
    bio: "Leads growth strategy, acquisition decisions, and the operating cadence behind each partnership.",
  },
  {
    name: "Partner name coming soon",
    role: "Growth Partner",
    bio: "Builds the funnel infrastructure, content systems, and execution rhythm that turn intent into pipeline.",
  },
];

const faqs = [
  {
    question: "How long are engagements?",
    answer:
      "Partnerships are built as monthly operating relationships, not one-off delivery sprints. We will replace this with your confirmed engagement terms.",
  },
  {
    question: "What happens during onboarding?",
    answer:
      "We start with diagnosis, tracking, funnel review, and a clear growth architecture before scaling execution. Final onboarding copy can be dropped in here.",
  },
  {
    question: "Do you work outside Pakistan?",
    answer:
      "Yes. We operate from Karachi and work with businesses across the GCC, South Asia, and remote-first markets.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing is custom by scope, channels, and operating depth. We will add your confirmed starting figure once you share it.",
  },
];


function Logo() {
  return (
    <a href="#" className="logo-mark" aria-label="My Lead Partner home">
      <Image
        className="logo-image logo-image-dark"
        src="/mlp-logo-white-cropped.png"
        alt="My Lead Partner"
        width={560}
        height={88}
        priority
      />
      <Image
        className="logo-image logo-image-light"
        src="/mlp-logo-black-cropped.png"
        alt="My Lead Partner"
        width={560}
        height={88}
        priority
      />
    </a>
  );
}

function LeadButton({
  children,
  className,
  source,
}: {
  children: React.ReactNode;
  className: string;
  source: string;
}) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("open-lead-form", { detail: source }));
      }}
    >
      {children}
    </button>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const syncTheme = () => {
      const next = window.localStorage.getItem("mlp-theme") === "light" ? "light" : "dark";
      setTheme(next);
      document.documentElement.dataset.theme = next;
    };

    const frame = requestAnimationFrame(syncTheme);
    window.addEventListener("mlp-theme-change", syncTheme);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mlp-theme-change", syncTheme);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("mlp-theme", next);
    window.dispatchEvent(new Event("mlp-theme-change"));
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} version`}
      onClick={toggleTheme}
    >
      <span />
      <strong>{theme === "dark" ? "Light" : "Dark"}</strong>
    </button>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M16.01 4.8c-6.02 0-10.92 4.86-10.92 10.84 0 1.9.5 3.75 1.45 5.38L5 26.64l5.8-1.5a10.98 10.98 0 0 0 5.21 1.32c6.03 0 10.93-4.86 10.93-10.84S22.04 4.8 16.01 4.8Zm0 19.82c-1.63 0-3.22-.43-4.62-1.24l-.33-.2-3.44.9.92-3.32-.22-.35a8.85 8.85 0 0 1-1.39-4.77c0-4.96 4.07-9 9.08-9s9.08 4.04 9.08 9-4.07 8.98-9.08 8.98Zm4.98-6.73c-.27-.13-1.62-.8-1.87-.89-.25-.1-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.31.41-.46.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.13-.61-1.46-.84-2-.22-.53-.45-.45-.61-.46h-.52c-.18 0-.47.07-.72.34-.25.27-.95.92-.95 2.25s.98 2.62 1.12 2.8c.14.18 1.94 2.94 4.7 4.12.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.63.23-1.18.16-1.3-.07-.1-.25-.17-.52-.3Z"
      />
    </svg>
  );
}

function WhatsAppLink({ className = "" }: { className?: string }) {
  return (
    <a
      className={`whatsapp-link ${className}`}
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Us"
    >
      <WhatsAppIcon />
      <span>WhatsApp Us</span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <ThemeToggle />
          <WhatsAppLink />
          <LeadButton className="nav-cta" source="Navigation CTA">
            Book a Discovery Call
          </LeadButton>
        </nav>
        <button
          className="menu-button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      <motion.div
        className="mobile-menu"
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto", y: 0 },
          closed: { opacity: 0, pointerEvents: "none", y: -16 },
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <ThemeToggle />
        <WhatsAppLink />
        <button
          className="mobile-cta"
          type="button"
          onClick={() => {
            setOpen(false);
            window.dispatchEvent(
              new CustomEvent("open-lead-form", { detail: "Mobile menu CTA" }),
            );
          }}
        >
          Book a Discovery Call
        </button>
      </motion.div>
    </header>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return <p className="section-tag">{children}</p>;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeroImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 5]);

  return (
    <motion.div ref={ref} className="hero-image-frame" style={{ y, rotate }}>
      <Image
        src="/growth-operations-hero.png"
        alt="A growth operations workspace with campaign metrics, funnel notes, and lead infrastructure"
        width={1792}
        height={1024}
        sizes="(max-width: 560px) 360px, (max-width: 900px) calc(100vw - 40px), 438px"
        quality={82}
        priority
      />
      <div className="hero-image-caption">
        <span>Operating System</span>
        <strong>Acquisition, content, web, and pipeline moving together.</strong>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="page-grid hero-grid">
        <div className="hero-copy">
          <Reveal>
            <SectionTag>Growth Partnership</SectionTag>
            <h1 id="hero-title">
              We don&apos;t run campaigns.
              <span>
                We build the <br className="mobile-break" />
                engine
              </span>
              that scales your business.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="hero-sub">
              My Lead Partner embeds into your business as a growth operator.
              Strategy, execution, systems, and acquisition, all moving
              together, under one partnership.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="hero-actions">
            <LeadButton className="primary-button" source="Hero primary CTA">
              Book a Discovery Call
            </LeadButton>
            <a className="secondary-button" href="#how-it-works">
              See How It Works
            </a>
          </Reveal>
        </div>
        <HeroImage />
      </div>
      <Reveal delay={0.28} className="stat-row">
        {[
          ["3 to 12x", "Return on ad spend, avg. first 90 days"],
          ["Full-Stack", "Acquisition, content, web, and ops, one team"],
          ["Embedded", "We operate inside your business, not outside it"],
        ].map(([stat, copy]) => (
          <div key={stat} className="stat-card">
            <strong>{stat}</strong>
            <span>{copy}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Positioning() {
  return (
    <section className="section positioning-section" id="difference">
      <div className="page-grid positioning-grid">
        <Reveal className="positioning-heading">
          <SectionTag>The Difference</SectionTag>
          <h2>Most agencies hand you deliverables. We hand you momentum.</h2>
        </Reveal>
        <Reveal delay={0.12} className="editorial-copy">
          <p>
            Vendors deliver what they were paid to deliver. A campaign, a post,
            a website. Then they invoice you, and the work sits there,
            disconnected from the broader picture of your business.
          </p>
          <p>
            We work differently. Every channel, system, and piece of content we
            build is part of a deliberate growth architecture. We carry context
            between channels, between months, and between decisions. We think in
            compounding systems, not one-off outputs.
          </p>
          <p>
            The result is a business that grows with structure behind it, not
            just activity in front of it.
          </p>
          <div className="pill-row">
            {[
              "Strategy",
              "Execution",
              "Systems",
              "Acquisition",
              "Digital Infrastructure",
              "Growth Management",
            ].map((pill) => (
              <span key={pill}>{pill}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contrast() {
  return (
    <section className="section contrast-section">
      <div className="page-grid">
        <Reveal className="contrast-header">
          <SectionTag>What This Actually Means</SectionTag>
        </Reveal>
        <div className="contrast-grid">
          <Reveal className="contrast-panel muted-panel">
            <h3>Not This</h3>
            <ul>
              {notThis.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.14} className="contrast-panel active-panel">
            <h3>This</h3>
            <ul>
              {thisWay.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section className="section ecosystem-section" id="services">
      <div className="page-grid section-intro">
        <Reveal>
          <SectionTag>The Growth Ecosystem</SectionTag>
          <h2>Five capabilities. One integrated system.</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p>
            We built our service model the way a high-performing in-house team
            operates, not as separate functions, but as interconnected levers
            that compound on each other.
          </p>
        </Reveal>
      </div>
      <div className="ecosystem-stack">
        {ecosystem.map((item, index) => (
          <Reveal key={item.number} delay={index * 0.05} className="eco-card">
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto-section">
      <Reveal>
        <blockquote>
          Most businesses don&apos;t have a marketing problem.
          <span>They have a growth architecture problem.</span>
          That&apos;s the one we solve.
        </blockquote>
      </Reveal>
    </section>
  );
}

function Partnership() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const media = window.matchMedia("(min-width: 901px)");
    if (!media.matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=2400",
        pin: ".phase-pin",
        scrub: true,
        onUpdate: (self) => {
          const next = Math.min(3, Math.floor(self.progress * phases.length));
          setActive(next);
          gsap.to(track, {
            yPercent: next * -25,
            duration: 0.55,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section partnership-section" id="how-it-works">
      <div className="phase-pin">
        <div className="page-grid phase-grid">
          <div className="phase-copy">
            <SectionTag>How We Work</SectionTag>
            <h2>The partnership builds in layers.</h2>
            <p>
              We don&apos;t onboard clients and run the same playbook. We build
              a model specific to your business, then we grow it with you over
              time.
            </p>
            <div className="phase-index" aria-label="Phase progress">
              {phases.map((phase, index) => (
                <button
                  key={phase.label}
                  className={active === index ? "active" : ""}
                  aria-label={`Phase ${index + 1}`}
                  type="button"
                  onClick={() => setActive(index)}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
          <div className="phase-window">
            <div ref={trackRef} className="phase-track">
              {phases.map((phase, index) => (
                <article key={phase.label} className="phase-card">
                  <span>PHASE {String(index + 1).padStart(2, "0")}</span>
                  <p className="phase-label">{phase.label}</p>
                  <h3>{phase.title}</h3>
                  <p>{phase.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="section team-section">
      <div className="page-grid section-intro">
        <Reveal>
          <SectionTag>About The Team</SectionTag>
          <h2>Built by operators who stay close to the work.</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p>
            Founder names, one-line bios, and final photography will be added
            here. The section is structured now so the final content drops in
            cleanly without changing the page rhythm.
          </p>
        </Reveal>
      </div>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <Reveal key={member.name} delay={index * 0.08} className="team-card">
            <div className="team-photo" aria-hidden="true">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div>
              <span>{member.role}</span>
              <h3>{member.name}</h3>
              <p>{member.bio}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Counter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const duration = 1300;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Results() {
  return (
    <section className="section results-section" id="work">
      <div className="page-grid section-intro">
        <Reveal>
          <SectionTag>Impact</SectionTag>
          <h2>Built to produce real business outcomes.</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p>
            Not impressions. Not follower counts. Revenue, leads, and growth
            that shows up in the business.
          </p>
        </Reveal>
      </div>
      <div className="results-grid">
        {results.map((result, index) => (
          <Reveal key={result.client} delay={index * 0.06} className="result-card">
            <p>{result.client}</p>
            <strong>
              <Counter
                value={result.value}
                suffix={result.suffix}
                decimals={result.metric.includes(".") ? 1 : 0}
              />
            </strong>
            <span>{result.context}</span>
            <small>{result.detail}</small>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {

  return (

    <section className="section testimonials-section">
      <div className="page-grid section-intro">
        <Reveal>
          <SectionTag>Testimonials</SectionTag>
          <h2>What our partners say.</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p>
            Real feedback from businesses we have worked closely with.
          </p>
        </Reveal>
      </div>
      <Reveal className="testimonial-panel">
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div
          className="elfsight-app-5a3f98b1-e605-4645-8509-f997a9921154"
          data-elfsight-app-lazy
          style={{ width: "100%" }}
        />
      </Reveal>
    </section>
  );

}

function FAQ({ pricingText }: { pricingText: string }) {
  return (
    <section className="section faq-section">
      <div className="page-grid section-intro">
        <Reveal>
          <SectionTag>Questions</SectionTag>
          <h2>The practical details before we talk.</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="pricing-signal">
            {pricingText}
          </p>
        </Reveal>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <Reveal key={item.question} delay={index * 0.04}>
            <details className="faq-item">
              <summary>
                <span>{item.question}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta-section" id="contact">
      <div className="page-grid cta-grid">
        <Reveal>
          <SectionTag>Let&apos;s Talk</SectionTag>
          <h2>Your business is ready to grow. We&apos;re ready to build that with you.</h2>
        </Reveal>
        <Reveal delay={0.12} className="cta-copy">
          <p>
            We take a small number of partnerships at a time. If you&apos;re
            thinking about serious, sustained growth, this is a good
            conversation to start.
          </p>
          <div className="hero-actions">
            <LeadButton className="primary-button" source="CTA primary button">
              Book a Discovery Call
            </LeadButton>
            <a className="secondary-button" href="#work">
              See Our Work First
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-inner">
        <div className="footer-topline">
          <Logo />
          <div className="footer-contact-row">
            <span>Karachi, PK, Serving GCC & South Asia</span>
            <WhatsAppLink className="footer-whatsapp" />
          </div>
        </div>
        <div className="footer-stage">
          <div>
            <SectionTag>Next Move</SectionTag>
            <p>Growth does not need more noise. It needs an operating rhythm.</p>
          </div>
          <div className="footer-capture">
            <LeadForm source="Footer lead form" compact />
          </div>
        </div>
        <div className="footer-system" aria-hidden="true">
          <span>Strategy</span>
          <span>Acquisition</span>
          <span>Infrastructure</span>
          <span>Execution</span>
          <span>Compounding</span>
        </div>
        <div className="footer-bottom">
          <span>Built for serious operators.</span>
          <div className="flex items-center gap-4">
            <span>© 2026 My Lead Partner. All rights reserved.</span>
            <Link href="/blog" className="text-[var(--secondary)] hover:text-[var(--text)] transition-colors">
              Blog
            </Link>
            <Link href="/privacy" className="text-[var(--secondary)] hover:text-[var(--text)] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LeadForm({ compact = false, source }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source }),
      });

      if (!response.ok) throw new Error("Lead submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={`lead-form ${compact ? "lead-form-compact" : ""}`} onSubmit={onSubmit}>
      <input type="hidden" name="source" value={source} />
      <label>
        <span>Name</span>
        <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
      </label>
      {!compact && (
        <label>
          <span>Company</span>
          <input name="company" type="text" autoComplete="organization" placeholder="Company name" />
        </label>
      )}
      <label>
        <span>Growth priority</span>
        <select name="priority" defaultValue="Lead generation">
          <option>Lead generation</option>
          <option>Performance marketing</option>
          <option>Web infrastructure</option>
          <option>Growth management</option>
        </select>
      </label>
      <label className="lead-form-message">
        <span>What should we help you build?</span>
        <textarea
          name="message"
          rows={compact ? 3 : 4}
          placeholder="Tell us where growth is getting stuck."
        />
      </label>
      <button className="primary-button" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending" : "Send the Signal"}
      </button>
      <p className={`form-status ${status}`}>
        {status === "success" && "Got it. We'll be in touch within 24 hours."}
        {status === "error" && "Something blocked the submission. Email hello@myleadpartner.com."}
      </p>
    </form>
  );
}

function LeadModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("Website CTA");

  useEffect(() => {
    const openForm = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setSource(customEvent.detail || "Website CTA");
      setOpen(true);
    };
    window.addEventListener("open-lead-form", openForm);
    return () => window.removeEventListener("open-lead-form", openForm);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.div
      className="lead-modal"
      initial={false}
      animate={open ? "open" : "closed"}
      variants={{
        open: { opacity: 1, pointerEvents: "auto" },
        closed: { opacity: 0, pointerEvents: "none" },
      }}
      transition={{ duration: 0.28 }}
      aria-hidden={!open}
    >
      <button className="modal-scrim" type="button" aria-label="Close form" onClick={() => setOpen(false)} />
      <motion.div
        className="lead-modal-panel"
        variants={{
          open: { y: 0, scale: 1 },
          closed: { y: 24, scale: 0.98 },
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="modal-close" type="button" onClick={() => setOpen(false)}>
          Close
        </button>
        <SectionTag>Book a Discovery Call</SectionTag>
        <h2>Tell us where growth needs more structure.</h2>
        <LeadForm source={source} />
      </motion.div>
    </motion.div>
  );
}

export function HomePageClient({ pricingText }: { pricingText: string }) {
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      window.setTimeout(() => target?.scrollIntoView({ block: "start" }), 250);
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Positioning />
        <Contrast />
        <Ecosystem />
        <Manifesto />
        <Partnership />
        <Team />
        <Results />
        <Testimonials />
        <FAQ pricingText={pricingText} />
        <CTA />
      </main>
      <Footer />
      <LeadModal />
    </>
  );
}
