"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import TypeWriter from "../components/TypeWriter";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data));
  }, []);

  return (
    
    <div className="p-6">
        <TypeWriter/>
        
      <h1 className="text-3xl mb-4">Admin Panel</h1>
      <p>this is Admin Dashboard</p>
      
      {users.map((u: any) => (
        <div key={u._id} className="border p-2 mb-2">
          {u.email}
        </div>
      ))}
    </div>
  );
}
