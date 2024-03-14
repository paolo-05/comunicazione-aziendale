import Header from '@/components/navbar';
import { PostForm } from '@/components/postComponents';
import { Container } from '@/components/ui';
import { useUnrestrictedSession } from '@/hooks/session';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function New(): JSX.Element {
	const session = useUnrestrictedSession();

	return (
		<>
			<Head>
				<title>Creazione di un nuovo annuncio</title>
			</Head>
			<main className={inter.className}>
				<Header session={session} />
				<Container>
					<div className='relative pt-36'>
						<PostForm initialData={null} />
					</div>
				</Container>
			</main>
		</>
	);
}
