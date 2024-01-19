// import UserForm from "@/components/forms/userForm";
import Navbar from "@/components/navbar/";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const RegisterForm = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  return (
    <>
      <Head>
        <title>Registra un nuovo utente</title>
      </Head>
      <main className={inter.className}>
        <Navbar session={session} />
        {/* <UserForm initialUserData={null} /> */}
      </main>
    </>
  );
};

export default RegisterForm;
