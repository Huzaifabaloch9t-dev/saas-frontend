"use client";
import { api } from "@/services/api";

export default function Pricing() {
  const subscribe = async () => {
    const token = localStorage.getItem("token");
    const res = await api.post("/stripe/create-checkout-session", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.href = res.data.url;
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl mb-6">Pro Plan</h1>
      <p className="mb-6">$10 / month</p>
      console.log(object)
      <button onClick={subscribe} className="btn">Upgrade</button>
    </div>
  );
}
