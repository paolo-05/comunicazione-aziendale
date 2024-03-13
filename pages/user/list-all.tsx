import ListAllUsers from "@/components/list-all-users";
import Header from "@/components/navbar/";
import { Container } from "@/components/ui";
import { useRestrictedSession } from "@/hooks/session";
import { useUserList } from "@/hooks/user";
import { Inter } from "next/font/google";
import Head from "next/head";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function ListAll(): JSX.Element {
  const session = useRestrictedSession();
  const { users } = useUserList();

  return (
    <>
      <Head>
        <title>Visualizzando tutti gli utenti</title>
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <Container>
          <div className="relative pt-36">
            <ListAllUsers users={users} session={session} />
          </div>
        </Container>
      </main>
    </>
  );
}
