import Navbar from "@/components/navbar/index";
import { UserSecure } from "@/types";
import axios from "axios";
import { error } from "console";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Dashboard() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const [admin, setAdmin] = useState<UserSecure | null>(null);

  useEffect(() => {
    if (!cookies.token) {
      router.push("/auth/signin");
      return;
    }
    axios
      .post("/api/user/resolve", { token: cookies.token })
      .then((response: any) => {
        const cookie = response.data.cookies.split("=")[1];
        setCookie("token", cookie, {
          path: "/",
          // secure: true,
          // sameSite: true,
          maxAge: 3600,
        });
        setAdmin(response.data.message);
      })
      .catch((error: any) => console.log(error));
  }, [cookies.token, router, setCookie]);

  return (
    <>
      <main>
        <Navbar position={"sticky-top"} user={admin} />
        <div className="container mt-3">
          <h1>Dashboard</h1>
        </div>
      </main>
    </>
  );
}
