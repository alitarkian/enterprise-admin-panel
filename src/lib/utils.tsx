import { clsx, type ClassValue } from "clsx";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";

export const protocol =
  process.env.NODE_ENV === "production" ? "https" : "http";
export const rootDomain =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractSubdomainFromHost(request?: NextRequest): string | null {
  const host =
    request?.headers.get("host") ||
    (typeof window !== "undefined" ? window.location.host : "");
  const hostname = host.split(":")[0];

  if (hostname.includes("localhost")) {
    const match = hostname.match(/^([^.]+)\.localhost/);
    return match ? match[1] : null;
  }

  const root = rootDomain.split(":")[0];
  if (hostname !== root && hostname.endsWith(`.${root}`)) {
    return hostname.replace(`.${root}`, "");
  }

  return null;
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
