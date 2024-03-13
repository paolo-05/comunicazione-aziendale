import Header from '@/components/navbar';
import { PostForm } from '@/components/postComponents';
import Container from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { usePost } from '@/hooks/post';
import { useUnrestrictedSession } from '@/hooks/session';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const session = useUnrestrictedSession();
  const { post } = usePost(id);

  return (
    <>
      <Head>
        <title>Modifica di un annuncio</title>
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <Container>
          <div className="relative pt-36">
            {post ? <PostForm initialData={post} /> : <Skeleton />}
          </div>
        </Container>
      </main>
    </>
  );
}
