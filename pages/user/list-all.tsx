import ListAllUsers from "@/components/list-all-users";
import Header from "@/components/navbar/";
import Container from "@/components/ui/container";
import { UserSecure } from "@/types/types";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function ListAll() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  const [users, setUsers] = useState<Array<UserSecure> | null>(null);

  useEffect(() => {
    axios
      .post("/api/user/list-all", {})
      .then((response: any) => {
        const users: Array<UserSecure> = response.data.message;
        setUsers(users);
      })
      .catch((err: any) => console.log(err));
  }, []);

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
              <ListAllUsers users={users} session={session} />
            </div>
          </Container>
        </div>
      </main>
    </>
  );
}
