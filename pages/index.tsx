import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Loading from "@/components/ui/loading";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <div className="container">
          <h1 className="display-1">Homepage</h1>
          <Link href="/user/login">Login</Link>
          <Loading height={50} width={50} />
        </div>
        <Navbar position="fixed-bottom" shouldFetch={false} />
      </main>
    </>
  );
}
