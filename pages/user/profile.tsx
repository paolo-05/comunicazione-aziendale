import Header from "@/components/navbar";
import Container from "@/components/ui/container";
import { useUnrestrictedSession } from "@/hooks/session";
import Avatar from "@/public/default-avatar.jpg";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Profile() {
  const session = useUnrestrictedSession();

  return (
    <>
      <Head>
        <title>Il tuo Profilo</title>
      </Head>

      <main className={inter.className}>
        <Header session={session} />
        <div className="relative py-16 space-y-40">
          <div
            aria-hidden="true"
            className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          </div>
          <Container>
            <div className="relative">
              <div className="flex items-center justify-center -space-x-2">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-end px-4 pt-4"></div>
                  <div className="flex flex-col items-center pb-10">
                    <Image
                      className="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src={Avatar}
                      alt="User Avatar"
                      width={512}
                      height={512}
                      placeholder="blur"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {session?.user.name}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {session?.user.role === 1 ? "Admin" : "HR"}
                    </span>
                    <div className="flex mt-4 md:mt-6">
                      <Link
                        href="/auth/change-password"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Cambia Password
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
}
