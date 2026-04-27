import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "../i18n-config";
import { extractSubdomain, getLocale } from "./lib/utils";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // maintenance
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    const url = request.nextUrl.clone();
    url.pathname = `/maintenance`;
    return NextResponse.rewrite(url);
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }

  const subdomain = extractSubdomain(request);
  // public pages → tenant rewrite
  if (subdomain) {
    const parts = pathname.split("/").filter(Boolean);
    const pageParts = parts.slice(1);
    const locale = getLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/subdomain/${subdomain}/${pageParts.join("/")}`;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
