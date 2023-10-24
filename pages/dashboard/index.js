import { useState, useEffect } from "react";
import Link from "next/link";

import Layout from "@/components/layout";

import "./../global.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (!token) {
      return (window.location.href = "/login");
    }
    const fetchUser = async () => {
      const response = await fetch("/api/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setUser(data.message);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    };
    fetchUser().catch(console.error);
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <h3>{user.email}</h3>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <p>
        <Link href="/user/logout">Logout</Link>
      </p>
      <p>
        <Link href="/user/register">Registra un nuovo utente</Link>
      </p>
    </Layout>
  );
}
