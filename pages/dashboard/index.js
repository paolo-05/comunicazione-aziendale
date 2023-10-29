import { useState, useEffect } from "react";
import Link from "next/link";

import Layout from "@/components/layout";
import Navbar from "@/components/navbar";

import { constants } from "@/constants";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.sessionStorage.getItem(constants.appTokenName);
    if (!token) {
      return (window.location.href = "/user/login");
    }
    const fetchUser = async () => {
      const response = await fetch("/api/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (response.status === 200) {
        const data = await response.json();
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
      <Navbar />
      <div className="container mt-3">
        <h1>Dashboard</h1>
        {user ? (
          <div>
            <h2>{user.name + " " + user.lastname}</h2>
            <h3>{user.email}</h3>
            <h4>{user.id}</h4>
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
      </div>
    </Layout>
  );
}
