import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === "myleadpartner.com") {
    const url = request.nextUrl.clone();
    url.hostname = "www.myleadpartner.com";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|favicon.png|robots.txt).*)"],
};
