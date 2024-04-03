import Header from '@/components/navbar';
import { PostForm } from '@/components/postComponents';
import { Container, Skeleton } from '@/components/ui';
import { usePost } from '@/hooks/post';
import { useUnrestrictedSession } from '@/hooks/session';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Edit(): JSX.Element {
	const session = useUnrestrictedSession();
	const { post } = usePost();

	return (
		<>
			<Head>
				<title>Modifica di un annuncio</title>
			</Head>
			<main className={inter.className}>
				<Header session={session} />
				<Container>
					<div className='relative pt-36'>{post != null ? <PostForm initialData={post} /> : <Skeleton />}</div>
				</Container>
			</main>
		</>
	);
}
