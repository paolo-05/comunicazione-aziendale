import Loading from "@/components/ui/loading";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Logout() {
  const router = useRouter();
  const [cookies, setCookie, removeCookies] = useCookies(["token"]);
  useEffect(() => {
    removeCookies("token");
    router.push("/");
  });
  return (
    <div className="container">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h1 className="display-1">Logging you out...</h1>
        <Loading height={150} width={150} />
      </div>
    </div>
  );
}
