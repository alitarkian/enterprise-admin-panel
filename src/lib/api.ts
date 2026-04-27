const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

type ApiOptions = Omit<RequestInit, "headers"> & {
  tenant?: string;
  language?: string;
  cookies?: Record<string, string>; // key: cookie name, value: cookie value
};

export async function apiFetch(path: string, options: ApiOptions = {}) {
  const { tenant, language, cookies, ...rest } = options;

  let cookieHeader = "";
  if (cookies) {
    cookieHeader = Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
  }

  const headers = new Headers({
    "X-Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID || "",
    "X-Client-Secret": process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
    "Accept-Language": language || "en",
    "X-Tenant-Schema": tenant || "",
    "Content-Type": "application/json",

    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
  });

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers,
    cache: "no-store",
  });
  if (!res.ok) {
    const errorText = await res.text();
    // throw new Error(`API request failed: ${res.status} ${errorText}`);
    return null;
  }

  return res.json();
}
