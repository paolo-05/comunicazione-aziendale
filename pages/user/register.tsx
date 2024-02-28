import { UserForm } from "@/components/forms/";
import Navbar from "@/components/navbar/";
import Container from "@/components/ui/container";
import { useRestrictedSession } from "@/hooks/session";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  const session = useRestrictedSession();

  return (
    <>
      <Head>
        <title>Registra un nuovo utente</title>
      </Head>
      <main className={inter.className}>
        <Navbar session={session} />
        <div className="min-h-screen flex items-center justify-center">
          <Container>
            <section className="bg-white dark:bg-gray-900 border border-gray-200 rounded-lg shadow dark:border-gray-700">
              <div className="py-8 px-10 mx-auto">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Registra un nuovo utente
                </h2>

                <UserForm initialUserData={null} />
              </div>
            </section>
          </Container>
        </div>
      </main>
    </>
  );
}
