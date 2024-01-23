import { SuccessAlert } from "@/components/alerts";
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
      .post("/api/user/list-all", {})
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
        <title>Visualizzando tutti gli utenti</title>
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <div className="space-y-40 mb-40">
          <Container>
            <div className="relative pt-36">
              <SuccessAlert
                show={showAlert}
                message={alertMessage}
                onClose={() => setShowAlert(false)}
              />
              <ListAllUsers users={users} session={session} />
            </div>
          </Container>
        </div>
      </main>
    </>
  );
}
