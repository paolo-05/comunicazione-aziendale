import { UserForm } from "@/components/forms/";
import Header from "@/components/navbar/";
import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { UserSecure } from "@/types/types";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  const [user, setUser] = useState<UserSecure | null>(null);

  useEffect(() => {
    if (id === undefined) return;

    if (id === session?.user.id) {
      router.push("/dashboard");
    }

    axios
      .post("/api/user/get-by-id", { userId: id })
      .then((res) => setUser(res.data.message))
      .catch((err) => console.log(err));
  }, [id, router, session?.user.id]);

  useEffect(() => {
    if (session?.user.role === 0) {
      router.push("/dashboard");
    }
  }, [router, session?.user.role]);

  return (
    <>
      <Head>
        <title>Modificando un utente</title>
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <div className="min-h-screen flex items-center justify-center">
          <Container>
            <section className="bg-white dark:bg-gray-900 border border-gray-200 rounded-lg shadow dark:border-gray-700">
              <div className="py-8 px-10 mx-auto">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Aggiorna un utente
                </h2>

                {user ? <UserForm initialUserData={user} /> : <Skeleton />}
              </div>
            </section>
          </Container>
        </div>
      </main>
    </>
  );
}
