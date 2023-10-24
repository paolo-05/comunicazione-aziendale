import { useEffect } from "react";
import Layout from "@/components/layout";

export default function Logout() {
  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      window.sessionStorage.removeItem("token");
    }
    window.location.href = "/";
  }, []);
  return (
    <Layout title="Logout">
      <h1>Logging you out...</h1>
    </Layout>
  );
}
