import Header from "@/components/navbar/";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  useEffect(() => {
    // fetch user
  }, []);

  return (
    <>
      <Head>
        <title>Modificando un utente</title>
      </Head>
      <main className={inter.className}>
        <Header session={session} />
      </main>
    </>
  );
}
