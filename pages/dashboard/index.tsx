import Navbar from "@/components/navbar/index";
import { UserSecure } from "@/types";
import axios from "axios";
import { error } from "console";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Dashboard() {
  const router = useRouter();
  const [cookies, setCookies] = useCookies(["token"]);
  const [admin, setAdmin] = useState<UserSecure | null>(null);

  useEffect(() => {
    if (!cookies.token) {
      router.push("/user/login");
      return;
    }
    axios
      .post("/api/user/resolve", { token: cookies.token })
      .then((response: any) => setAdmin(response.data.message))
      .catch((error: any) => console.log(error));
  }, [cookies.token, router]);

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
