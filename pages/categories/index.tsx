import { SuccessAlert } from "@/components/alerts";
import { Item } from "@/components/categoryComponents";
import ListAllUsers from "@/components/list-all-users";
import Header from "@/components/navbar/";
import Container from "@/components/ui/container";
import { UserSecure } from "@/types/types";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function ListAll() {
  const router = useRouter();
  const { success } = router.query;

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  const [users, setUsers] = useState<Array<UserSecure> | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    axios
      .post("/api/category/get-all", {})
      .then((response: any) => {
        const users: Array<UserSecure> = response.data.message;
        setUsers(users);
      })
      .catch((err: any) => {});
  }, []);

  useEffect(() => {
    if (!success) return;

    setShowAlert(true);

    switch (success) {
      case "userCreated":
        setAlertMessage("Utente creato correttamente!");
        break;
      case "userUpdated":
        setAlertMessage("Utente aggiornato correttamente!");
        break;

      default:
        break;
    }
  }, [success]);

  useEffect(() => {
    if (session?.user.role === 0) {
      router.push("/dashboard");
    }
  }, [router, session?.user.role]);

  return (
    <>
      <Head>
        <title>Categorie Utenti</title>
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <Container>
          <div className="relative pt-36">
            <section className="bg-white dark:bg-gray-900 rounded-lg">
              <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Our Team
                  </h2>
                  <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                    Explore the whole collection of open-source web components
                    and elements built with the utility classes from Tailwind
                  </p>
                </div>
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                  <Item id={0} title={""} description={""} colour={""} />
                  <Item id={0} title={""} description={""} colour={""} />
                  <Item id={0} title={""} description={""} colour={""} />
                  <Item id={0} title={""} description={""} colour={""} />
                </div>
              </div>
            </section>
          </div>
        </Container>
      </main>
    </>
  );
}
