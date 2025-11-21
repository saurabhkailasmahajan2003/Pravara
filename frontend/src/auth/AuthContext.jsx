import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  });

  useEffect(() => {
    if (token) localStorage.setItem("token", token); else localStorage.removeItem("token");
  }, [token]);
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user)); else localStorage.removeItem("user");
  }, [user]);

  async function login(credentials) {
    const base = import.meta.env.VITE_API_URL;
    if (base) {
      const res = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      setToken(data.token || "");
      setUser(data.user || { email: credentials.email });
      return;
    }
    setToken("demo-token");
    setUser({ email: credentials.email || "demo@example.com" });
  }

  function logout() {
    setToken("");
    setUser(null);
  }

  const value = useMemo(() => ({ token, user, login, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }) {
  const { token } = useAuth();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
