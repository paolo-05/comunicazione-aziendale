import { PostManager } from '@/components/dashboardActions';
import Header from '@/components/navbar/';
import Container from '@/components/ui/container';
import { useNextFivePots } from '@/hooks/post';
import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: session } = useSession();

  const { posts } = useNextFivePots();

  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <section className="space-y-40 mb-40">
          <Container>
            <div className="relative pt-36">
              <PostManager posts={posts} session={session} />
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
