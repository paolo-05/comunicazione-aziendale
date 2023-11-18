import Loading from "@/components/loading";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    if (window.sessionStorage.getItem(process.env.APP_TOKEN_NAME!)) {
      window.sessionStorage.removeItem(process.env.APP_TOKEN_NAME!);
    }
    router.push("/");
  });
  return (
    <div>
      <h1 className="display-1">Logging you out...</h1>
      <Loading/>
    </div>
  );
}
