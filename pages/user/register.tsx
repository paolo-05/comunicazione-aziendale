import Navbar from "@/components/navbar/index";
import UserForm from "@/components/forms/userForm";
import { UserSecure } from "@/types";
import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

const RegisterForm = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<UserSecure | null>(null);
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) router.push("/user/login");
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
  }, [router, cookies.token, setCookie]);

  return (
    <>
      <Head>
        <title>Registra un nuovo utente</title>
      </Head>
      <main className={inter.className}>
        <Navbar position={"sticky-top"} user={admin} />
        <UserForm initialUserData={null} />
      </main>
    </>
  );
};

export default RegisterForm;
