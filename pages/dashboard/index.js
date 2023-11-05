import Link from "next/link";
import { useEffect, useState } from "react";

import Layout from "@/components/layout";
import Navbar from "@/components/navbar";

export default function Dashboard() {
  return (
    <Layout title="Admin Dashboard">
      <Navbar />
      <div className="container mt-3">
        <h1>Dashboard</h1>
      </div>
    </Layout>
  );
}
