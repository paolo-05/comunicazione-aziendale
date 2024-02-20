import {
  CategoryManager,
  PostManager,
  UserManager,
} from "@/components/dashboardActions";
import Header from "@/components/navbar/";
import Calendar from "@/components/ui/calendar";
import Container from "@/components/ui/container";
import { useUnrestrictedSession } from "@/hooks/session/useUnrestrictedSession";
import Logo from "@/public/Logo.png";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
  const session = useUnrestrictedSession();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <section className="p-4 h-auto pt-20">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Image
                className="xs:mt-3 max-h-64 max-w-fit rounded-lg h-32 md:h-64"
                alt="logo"
                src={Logo}
                width={512}
                height={512}
                placeholder="blur"
              />
              <UserManager session={session} />
              <CategoryManager />

              <Calendar />
            </div>
            <PostManager />
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
      </main>
    </>
  );
}
