import Layout from "@/components/layout";
import { useEffect } from "react";

import { constants } from "@/constants";

export default function Logout() {
  useEffect(() => {
    if (window.sessionStorage.getItem(constants.appTokenName)) {
      window.sessionStorage.removeItem(constants.appTokenName);
    }
    window.location.href = "/";
  }, []);
  return (
    <Layout title="Logout">
      <h1>Logging you out...</h1>
    </Layout>
  );
}
