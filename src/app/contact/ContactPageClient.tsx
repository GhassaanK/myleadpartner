"use client";

import { useState } from "react";

const regions = [
  {
    id: "pakistan",
    name: "Pakistan",
    x: "67%",
    y: "49%",
    headline: "Karachi-based, Pakistan-wide",
    copy: "We work with service businesses, real estate teams, ecommerce operators, and B2B companies across Pakistan.",
    scope: "Karachi, Lahore, Islamabad, and remote-first teams",
  },
  {
    id: "gcc",
    name: "GCC",
    x: "59%",
    y: "50%",
    headline: "GCC growth support",
    copy: "We support businesses selling into or operating across Gulf markets, especially real estate, services, and high-value lead generation.",
    scope: "UAE, Saudi Arabia, Qatar, Bahrain, Oman, and Kuwait",
  },
  {
    id: "south-asia",
    name: "South Asia",
    x: "69%",
    y: "56%",
    headline: "South Asia campaigns",
    copy: "We build acquisition systems for regional audiences where trust, follow-up, and offer clarity matter as much as media buying.",
    scope: "Pakistan, India, Bangladesh, Sri Lanka, and nearby markets",
  },
  {
    id: "global",
    name: "Remote",
    x: "47%",
    y: "38%",
    headline: "Remote-first partnerships",
    copy: "Our operating model works async and cross-time-zone, with clear reporting, weekly decisions, and direct founder involvement.",
    scope: "Global teams serving English-speaking and regional markets",
  },
];

export function ContactPageClient() {
  const [activeRegion, setActiveRegion] = useState(regions[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "Contact page" }),
      });

      if (!response.ok) throw new Error("Lead submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Service Regions
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-4xl">
              Growth support across Pakistan, GCC, South Asia, and remote markets.
            </h2>
          </div>
        </div>

        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--background)]">
          <svg viewBox="0 0 1000 560" role="img" aria-label="Interactive world service map" className="h-full w-full">
            <rect width="1000" height="560" fill="var(--background)" />
            <path d="M126 209l72-54 90 20 39 70-31 66-86 16-78-36z" fill="var(--surface)" stroke="var(--border)" />
            <path d="M283 145l87-39 112 28 26 62-36 72-104 16-86-52z" fill="var(--surface)" stroke="var(--border)" />
            <path d="M500 175l84-40 126 23 78 56-28 92-108 28-112-43-66-54z" fill="var(--surface)" stroke="var(--border)" />
            <path d="M610 308l86-19 81 39 25 84-55 66-92-9-52-63z" fill="var(--surface)" stroke="var(--border)" />
            <path d="M776 355l66-35 83 26 28 68-45 54-76-7-55-43z" fill="var(--surface)" stroke="var(--border)" />
            <path d="M444 257l49-24 67 19 35 52-25 65-62 14-63-48z" fill="var(--surface)" stroke="var(--border)" />
            <g opacity="0.36">
              <path d="M0 280h1000M500 0v560" stroke="var(--border)" />
              <circle cx="500" cy="280" r="190" fill="none" stroke="var(--border)" />
              <circle cx="500" cy="280" r="310" fill="none" stroke="var(--border)" />
            </g>
          </svg>

          {regions.map((region) => (
            <button
              key={region.id}
              type="button"
              onClick={() => setActiveRegion(region)}
              className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)] transition-transform ${
                activeRegion.id === region.id ? "scale-150 bg-[var(--accent)]" : "bg-[var(--background)]"
              }`}
              style={{ left: region.x, top: region.y }}
              aria-label={`Show ${region.name}`}
            />
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {regions.map((region) => (
            <button
              key={region.id}
              type="button"
              onClick={() => setActiveRegion(region)}
              className={`rounded-full border px-4 py-2 text-sm font-bold leading-relaxed transition-colors ${
                activeRegion.id === region.id
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--background)]"
                  : "border-[var(--border)] text-[var(--secondary)]"
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        <article className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--background)] p-5">
          <h3 className="font-heading text-2xl font-bold leading-snug">{activeRegion.headline}</h3>
          <p className="mt-3 text-base leading-relaxed text-[var(--secondary)]">{activeRegion.copy}</p>
          <p className="mt-4 text-sm font-bold leading-relaxed text-[var(--text)]">{activeRegion.scope}</p>
        </article>
      </section>

      <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          Start a Conversation
        </p>
        <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-4xl">
          Tell us what you are trying to grow.
        </h2>
        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <label className="grid gap-2 text-sm text-[var(--secondary)]">
            Name
            <input className="min-h-12 border border-[var(--border)] bg-[var(--field)] px-3 text-[var(--text)] outline-none focus:border-[var(--accent)]" name="name" required autoComplete="name" />
          </label>
          <label className="grid gap-2 text-sm text-[var(--secondary)]">
            Email
            <input className="min-h-12 border border-[var(--border)] bg-[var(--field)] px-3 text-[var(--text)] outline-none focus:border-[var(--accent)]" name="email" type="email" required autoComplete="email" />
          </label>
          <label className="grid gap-2 text-sm text-[var(--secondary)]">
            Company
            <input className="min-h-12 border border-[var(--border)] bg-[var(--field)] px-3 text-[var(--text)] outline-none focus:border-[var(--accent)]" name="company" autoComplete="organization" />
          </label>
          <label className="grid gap-2 text-sm text-[var(--secondary)]">
            Growth priority
            <select className="min-h-12 border border-[var(--border)] bg-[var(--field)] px-3 text-[var(--text)] outline-none focus:border-[var(--accent)]" name="priority" defaultValue="Lead generation">
              <option>Lead generation</option>
              <option>Performance marketing</option>
              <option>Web development</option>
              <option>Social media management</option>
              <option>Growth management</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-[var(--secondary)]">
            Message
            <textarea className="min-h-32 resize-y border border-[var(--border)] bg-[var(--field)] px-3 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)]" name="message" placeholder="Where is growth getting stuck?" />
          </label>
          <button className="min-h-12 rounded-full bg-[var(--accent)] px-6 text-sm font-bold leading-relaxed text-[var(--background)] disabled:opacity-70" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          <p className="min-h-6 text-sm leading-relaxed text-[var(--secondary)]">
            {status === "success" && "Got it. We will respond within 24 hours."}
            {status === "error" && "Something blocked the form. Email hello@myleadpartner.com directly."}
          </p>
        </form>
      </section>
    </div>
  );
}
