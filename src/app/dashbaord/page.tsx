"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import TypeWriter from "../components/TypeWriter";

interface User {
  _id: string;
  email: string;
}

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login first.");
      setLoading(false);
      return;
    }

    api
      .get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          setError("Access denied. Admins only.");
        } else if (err.response?.status === 401) {
          setError("Invalid or expired token. Please login again.");
        } else {
          setError("Error fetching users.");
        }
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <TypeWriter text="Welcome to Admin Dashboard 🚀" />

      <h1 className="text-3xl mb-4 mt-4">Admin Panel</h1>
      <p className="mb-4">This is Admin Dashboard</p>
      console.log(object)

      {loading && <p>Loading users...</p>}

      {error && (
        <p className="text-red-500 font-semibold mb-4">{error}</p>
      )}

      {!loading && !error && users.length === 0 && (
        <p>No users found</p>
      )}

      {!loading && !error && users.map((u) => (
        <div key={u._id} className="border p-2 mb-2 rounded">
          {u.email}
        </div>
      ))}
    </div>
  );
}
