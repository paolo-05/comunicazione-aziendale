import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <div className="container">
          <h1 className="display-1">Homepage</h1>
          <Link href="/user/login">Login</Link>
        </div>
      </main>
    </>
  );
}
