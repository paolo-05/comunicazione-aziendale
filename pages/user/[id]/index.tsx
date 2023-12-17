import Navbar from "@/components/navbar/index";
import Loading from "@/components/ui/loadingSpinningCircle";
import UserForm from "@/components/userForm";
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
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const token = cookies.token;
    if (!token) {
      router.push("/user/login");
      return;
    }
    axios
      .post("/api/user/resolve", {
        token: token,
      })
      .then((response: any) => setAdmin(response.data.message))
      .catch((error: any) => console.log(error));
    axios
      .post("/api/user/get-by-id", {
        token: token,
        id: id,
      })
      .then((resp) => {
        setLoading(false);
        const user: UserSecure = resp.data.message;
        setUser(user);
      })
      .catch((error: any) => console.log(error));
  }, [cookies.token, id, router]);

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
