"use client";

import { useState } from "react";
import { api } from "../../services/api";
import { Mail, Lock, User, Loader2, WifiOff } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("⚠️ All fields are required.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await api.post("/auth/register", { name, email, password });

      setSuccess("✅ Account created successfully. Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err: any) {
      if (!err.response) {
        setError("🚫 Server is not reachable. Please try again later.");
      } else {
        setError(
          err.response?.data?.message ||
            "❌ Email already exists or registration failed."
        );
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
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-white/70 mt-1">Join your AI Dashboard</p>
        </div>

        {error && (
          <div className="mb-5 flex items-center gap-2 p-3 rounded-lg bg-red-500/20 text-red-200 text-sm border border-red-400/30">
            <WifiOff className="w-4 h-4" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 p-3 rounded-lg bg-green-500/20 text-green-200 text-sm border border-green-400/30">
            {success}
          </div>
        )}

        <form onSubmit={register}>
          <div className="mb-4">
            <label className="text-white/80 text-sm">Full Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                value={name}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/40"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

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
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-white/70 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-white font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
