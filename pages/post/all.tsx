import { FullScreenCalendar } from '@/components/calendar';
import Header from '@/components/navbar/';
import { Container } from '@/components/ui';
import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function AllPosts(): JSX.Element {
	const { data: session } = useSession();

	return (
		<>
			<Head>
				<title>Tutti gli eventi</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<main className={inter.className}>
				<Header session={session} />
				<section className='space-y-40 mb-40'>
					<Container>
						<div className='relative pt-36'>
							<FullScreenCalendar />
						</div>
					</Container>
				</section>
			</main>
		</>
	);
}
