import Header from '@/components/navbar';
import { Item } from '@/components/postComponents';
import { Container } from '@/components/ui';
import { usePost } from '@/hooks/post';
import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Post(): React.ReactElement {
	// since this page is used for both
	// authenticated users and not, we just use
	// the session from `next-auth`
	const { data: session } = useSession();

	const router = useRouter();
	const id = router.query.id;

	const { post } = usePost(id);

	return (
		<>
			<Head>
				<title>{post != null ? post?.title : 'Titolo Post'}</title>
			</Head>

			<main className={inter.className}>
				<Header session={session} />
				<div className='relative py-16 space-y-24'>
					<div
						aria-hidden='true'
						className='absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20'
					>
						<div className='blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700'></div>
						<div className='blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600'></div>
					</div>
					<Container>{post != null && <Item post={post} session={session} />}</Container>
				</div>
			</main>
		</>
	);
}
