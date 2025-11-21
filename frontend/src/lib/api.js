import { useAuth } from "../auth/AuthContext.jsx";

const DEFAULT_API_URL = "http://localhost:4000";

export function useApi() {
  const { token } = useAuth();
  const configuredBase = import.meta.env.VITE_API_URL?.trim();

  const base = (configuredBase || DEFAULT_API_URL).replace(/\/$/, "");

  async function request(path, options = {}) {
    if (!path?.startsWith("/")) {
      throw new Error(`API calls must start with "/". Received: ${path}`);
    }
    const res = await fetch(`${base}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `Request failed: ${res.status}`);
    }
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      const text = await res.text();
      throw new Error(`Expected JSON but received: ${text.slice(0, 120)}`);
    }
    return res.json();
  }

  return {
    get: (p) => request(p),
    post: (p, body) => request(p, { method: "POST", body: JSON.stringify(body) }),
    put: (p, body) => request(p, { method: "PUT", body: JSON.stringify(body) }),
    del: (p) => request(p, { method: "DELETE" }),
    baseUrl: base,
  };
}
