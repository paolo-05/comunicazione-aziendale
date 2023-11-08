import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@/components/layout";
import { constants } from "@/constants";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    if (window.sessionStorage.getItem(constants.appTokenName)) {
      window.sessionStorage.removeItem(constants.appTokenName);
    }
    router.push("/");
  });
  return (
    <Layout title="Logout">
      <h1>Logging you out...</h1>
    </Layout>
  );
}
