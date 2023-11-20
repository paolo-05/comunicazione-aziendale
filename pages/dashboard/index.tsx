import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar position={"sticky-top"} shouldFetch={true} />
      <div className="container mt-3">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}
