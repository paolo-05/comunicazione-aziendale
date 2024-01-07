import Navbar from "@/components/navbar/index";
import UserForm from "@/components/forms/userForm";
import Loading from "@/components/ui/loadingSpinningCircle";
import { UserSecure } from "@/types";
import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  const router = useRouter();
  const id = router.query.id;

  const [loading, setLoading] = useState<boolean>(true);
  const [admin, setAdmin] = useState<UserSecure | null>(null);
  const [user, setUser] = useState<UserSecure | null>(null);
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    const token = cookies.token;
    if (!token) {
      router.push("/auth/signin");
      return;
    }
    axios
      .post("/api/user/resolve", {
        token: token,
      })
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
    axios
      .post("/api/user/get-by-id", {
        token: token,
        id: id,
      })
      .then((resp: any) => {
        const user: UserSecure = resp.data.message;
        setUser(user);
        setLoading(false);
      })
      .catch((error: any) => console.log(error));
  }, [cookies.token, id, router, setCookie]);

  return (
    <>
      <Head>
        <title>
          Modificando {admin?.name} {admin?.lastName}
        </title>
      </Head>
      <main className={inter.className}>
        <Navbar position={"sticky-top"} user={admin} />
        {loading || !user ? (
          <Loading height={150} width={150} />
        ) : (
          <UserForm initialUserData={user} />
        )}
      </main>
    </>
  );
}
