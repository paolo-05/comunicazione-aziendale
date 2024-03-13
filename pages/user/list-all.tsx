import { SuccessAlert } from '@/components/alerts';
import ListAllUsers from '@/components/list-all-users';
import Header from '@/components/navbar/';
import Container from '@/components/ui/container';
import { useRestrictedSession } from '@/hooks/session';
import { useUserList } from '@/hooks/user';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function ListAll() {
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
