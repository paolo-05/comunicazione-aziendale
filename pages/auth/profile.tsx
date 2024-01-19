import Header from "@/components/navbar";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Profile() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      signIn();
    },
  });

  return (
    <>
      <Head>
        <title>Il tuo Profilo</title>
      </Head>

      <main className={inter.className}>
        <Header session={session} />
      </main>
    </>
  );
}
