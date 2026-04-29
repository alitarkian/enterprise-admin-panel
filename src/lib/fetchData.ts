import { API_ENDPOINTS } from "./endpoints";

export async function fetchData(url: string, options: RequestInit = {}) {
  let accessToken = localStorage.getItem("access_token");

  const headers = new Headers({
    "X-Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID || "",
    "X-Client-Secret": process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
    "Accept-Language": localStorage.getItem("locale") || "en",
    "X-Tenant-Schema": localStorage.getItem("tenant") || "",
    "Content-Type": "application/json",

    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  });

  let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (response.status === 401) {
    console.log("Access token expired! refresh token");

    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("Session_Expired");
    }

    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      },
    );

    if (!refreshRes.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      throw new Error("Session_Expired");
    }

    const refreshData = await refreshRes.json();
    localStorage.setItem("access_token", refreshData.access_token);

    headers.set("Authorization", `Bearer ${refreshData.access_token}`);
    response = await fetch(url, { ...options, headers });
  }

  return response;
}
