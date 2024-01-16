import { signOut } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Logout() {
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);
  return (
    <>
      <Head>
        <title>Logging you out...</title>
      </Head>
      <main className={inter.className}>
        <div className="container">
          <div className="position-absolute top-50 start-50 translate-middle">
            <h1 className="display-1">Logging you out...</h1>
          </div>
        </div>
      </main>
    </>
  );
}
