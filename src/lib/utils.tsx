import { clsx, type ClassValue } from "clsx";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "@/i18n-config";

export const protocol =
  process.env.NODE_ENV === "production" ? "https" : "http";
export const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = Array.from(i18n.locales);

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function extractSubdomain(request?: NextRequest): string | null {
  const host =
    request?.headers.get("host") ||
    (typeof window !== "undefined" ? window.location.host : "");
  const hostname = host.split(":")[0];

  if (hostname.includes("localhost")) {
    const match = hostname.match(/^([^.]+)\.localhost/);
    return match ? match[1] : process.env.NEXT_PUBLIC_DEFAULT_LANDING;
  }

  const root = rootDomain.split(":")[0];
  if (hostname !== root && hostname.endsWith(`.${root}`)) {
    return hostname.replace(`.${root}`, "");
  }

  return process.env.NEXT_PUBLIC_DEFAULT_LANDING;
}

const RTL_LANGS = ["fa", "ar", "ku"];

export function isRtl(lang: string) {
  return RTL_LANGS.includes(lang);
}

export function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export const protectedRoutes = ["/dashboard", "/profile", "/settings", "/apps"];
export const authRoutes = ["/sign-in", "/sign-up"];
export const publicRoutes = ["/"];
