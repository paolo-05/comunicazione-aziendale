import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function Logout() {
  const router = useRouter();
  const [cookies, _, removeCookie] = useCookies(["token"]);
  useEffect(() => {
    if (cookies.token) {
      removeCookie("token");
      router.push("/");
    }
  });
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
