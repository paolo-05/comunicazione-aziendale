import ListAllUsers from "@/components/list-all-users";
import Header from "@/components/navbar/index";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<Array<UserSecure> | null>(null);

  const fetchUsers = useCallback(() => {
    axios
      .post("/api/user/list-all", {})
      .then((response: any) => {
        const users: Array<UserSecure> = response.data.message;
        setUsers(users);
        setLoading(false);
      })
      .catch((err: any) => console.log(err));
  }, []);

  useEffect(() => {
    if (loading) fetchUsers();

    return;
  }, [fetchUsers, loading]);

  return (
    <>
      <Head>
        <title>Visualizzando tutti gli utenti</title>
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <ListAllUsers users={users} session={session} />
      </main>
    </>
  );
}
