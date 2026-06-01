import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  email?: string;
  company?: string;
  priority?: string;
  message?: string;
  source?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 1200) : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LeadPayload | null;

  const lead = {
    name: clean(body?.name),
    email: clean(body?.email),
    company: clean(body?.company),
    priority: clean(body?.priority),
    message: clean(body?.message),
    source: clean(body?.source),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.email || !lead.email.includes("@")) {
    return NextResponse.json({ error: "Name and valid email are required." }, { status: 400 });
  }

  if (process.env.LEAD_WEBHOOK_URL) {
    const response = await fetch(process.env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Lead webhook failed." }, { status: 502 });
    }
  } else {
    const leadDir = join(process.cwd(), "lead-submissions");
    await mkdir(leadDir, { recursive: true });
    await appendFile(join(leadDir, "leads.jsonl"), `${JSON.stringify(lead)}\n`, "utf8");
  }

  return NextResponse.json({ ok: true });
}
