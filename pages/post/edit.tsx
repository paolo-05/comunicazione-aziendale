import Header from '@/components/navbar';
import { PostForm } from '@/components/postComponents';
import { Container, Skeleton } from '@/components/ui';
import { useCategoryByPostId } from '@/hooks/category/use-category-by-post-id';
import { usePost } from '@/hooks/post';
import { useUnrestrictedSession } from '@/hooks/session';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Edit(): JSX.Element {
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
					<div className='relative pt-36'>{post != null ? <PostForm initialData={post} /> : <Skeleton />}</div>
				</Container>
			</main>
		</>
	);
}
