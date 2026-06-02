import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function verifyAdminRequest(request: Request) {
  const authHeader = request.headers.get("authorization");
  const idToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!idToken || !apiKey) return false;

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      },
    );

    if (!response.ok) return false;

    const data = (await response.json()) as {
      users?: Array<{ email?: string }>;
    };
    const email = data.users?.[0]?.email;
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    return Boolean(email && (!adminEmail || email === adminEmail));
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  if (body.type === "blob.generate-client-token") {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const isCaseStudyPath = pathname.startsWith("case-studies/");
        if (!isCaseStudyPath) {
          throw new Error("Uploads must use the case-studies folder.");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
          maximumSizeInBytes: 8 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 },
    );
  }
}
