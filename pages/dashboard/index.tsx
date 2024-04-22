import { SmallCalendar } from '@/components/calendar';
import {
	CategoryManager,
	Logos,
	MailingList,
	PostManager,
	RecentEdits,
	UserManager,
} from '@/components/dashboardActions';
import Header from '@/components/navbar/';
import { Container } from '@/components/ui';
import { UseCategoriesAndAudiences } from '@/hooks/category';
import { useLastEdits, useNextFivePots } from '@/hooks/post';
import { useUnrestrictedSession } from '@/hooks/session';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Dashboard(): JSX.Element {
	const session = useUnrestrictedSession();

	const { posts } = useNextFivePots();

	const { lastEdits } = useLastEdits();

	const { categories, loadingCategories } = UseCategoriesAndAudiences();

	return (
		<>
			<Head>
				<title>Dashboard</title>
			</Head>
			<main className={inter.className}>
				<Header session={session} />
				<section className='p-4 h-auto pt-20'>
					<Container>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
							<Logos />

							<UserManager session={session} />
							<CategoryManager session={session} />

							<SmallCalendar />
						</div>
						<PostManager posts={posts} session={session} />
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
							<RecentEdits lastEdits={lastEdits} />
							<MailingList session={session} categories={categories} loading={loadingCategories} />
						</div>
						{/* Placeholders for more features */}
						{/* <div className='border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4'></div>
						<div className='grid grid-cols-2 gap-4'>
							<div className='border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72'></div>
							<div className='border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72'></div>
							<div className='border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72'></div>
							<div className='border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72'></div>
						</div> */}
					</Container>
				</section>
			</main>
		</>
	);
}
