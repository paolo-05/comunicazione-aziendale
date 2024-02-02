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
              <div className="py-8 px-4 mx-auto  lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                  <ul>
                    <li className="pb-3 sm:pb-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Marketing
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            descrizione marketing
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            IT
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            descrizione IT
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Amministratore
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            descrizione amministratore
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Thomas Lean
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            ""
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="pt-3 pb-0 sm:pt-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Lana Byrd
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            ""
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </main>
    </>
  );
}
