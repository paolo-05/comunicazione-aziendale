import Navbar from "@/components/navbar/index";
import UserForm from "@/components/ui/forms/userForm";
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
  const [user, setUser] = useState<UserSecure | null>(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) router.push("/user/login");
    axios
      .post("/api/user/resolve", { token: cookies.token })
      .then((response: any) => setUser(response.data.message))
      .catch((error: any) => console.log(error));
  }, [router, cookies.token]);

  return (
    <>
      <Head>
        <title>Registra un nuovo utente</title>
      </Head>
      <main className={inter.className}>
        <Navbar position={"sticky-top"} user={user} />
        <UserForm initialUserData={null} />
      </main>
    </>
  );
};

export default RegisterForm;
