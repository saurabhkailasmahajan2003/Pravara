import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/owner/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold mb-1">Sign in</h1>
        <p className="text-xs text-slate-500 mb-4">Use your admin account to continue.</p>
        {error && <div className="mb-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block text-sm">
            <span className="text-slate-700">Email</span>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
          </label>
          <label className="block text-sm">
            <span className="text-slate-700">Password</span>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
          </label>
          <button disabled={loading} type="submit" className="w-full rounded-md bg-black text-white py-2 text-sm font-medium hover:bg-black disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
        </form>
      </div>
    </div>
  );
}
