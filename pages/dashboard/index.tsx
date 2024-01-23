import { UserManager } from "@/components/dashboardActions";
import Header from "@/components/navbar/";
import Container from "@/components/ui/container";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";

export default function Dashboard() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        <Header session={session} />
        <section className="p-4 h-auto pt-20">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64">
                <Image
                  className=" max-h-64 rounded-lg"
                  alt="logo"
                  src={Logo}
                  width={512}
                  height={512}
                  placeholder="blur"
                />
              </div>
              <UserManager />
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64">
                Calendario
              </div>
            </div>
            <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
            </div>
            <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
              <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"></div>
            </div>
          </Container>
        </section>
        <div className="">
          <h1>Dashboard</h1>
          Id: {session?.user.id}
          <br />
          Name: {session?.user.name}
          <br />
          User role level: {session?.user.role}
          <br />
          Email: {session?.user.email}
        </div>
      </main>
    </>
  );
}
