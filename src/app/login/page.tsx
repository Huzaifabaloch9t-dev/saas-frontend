"use client";

import { useState } from "react";
import { api } from "../../services/api";
import { Mail, Lock, Loader2, WifiOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    if (!email || !password) {
      setError("⚠️ Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard"; 
    } catch (err: any) {
      if (!err.response) {
        setError("🚫 Server is not reachable. Please try again later.");
      } else {
        setError(err.response?.data?.message || "Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/laptaop.png')",
        }}
      ></div>      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>      
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center text-2xl">
            🤖
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-white/70 mt-1">Login to your AI Dashboard</p>
        </div>
        {error && (
          <div className="mb-5 flex items-center gap-2 p-3 rounded-lg bg-red-500/20 text-red-200 text-sm border border-red-400/30">
            <WifiOff className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="text-white/80 text-sm">Email</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/40"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-white/80 text-sm">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/40"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={login}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-white/70 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-white font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
