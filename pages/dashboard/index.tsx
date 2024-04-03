import { CategoryManager, MailingList, PostManager, RecentEdits, UserManager } from '@/components/dashboardActions';
import Header from '@/components/navbar/';
import { Calendar, Container } from '@/components/ui';
import { useCategories, UseCategoriesAndAudiences } from '@/hooks/category';
import { useLastEdits, useNextFivePots } from '@/hooks/post';
import { useUnrestrictedSession } from '@/hooks/session';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Dashboard(): JSX.Element {
	const session = useUnrestrictedSession();

	const { posts } = useNextFivePots();

	const { lastEdits } = useLastEdits();

	const { categories } = UseCategoriesAndAudiences();

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
							<Image
								className='xs:mt-3 max-h-64 max-w-fit rounded-lg h-32 md:h-64'
								alt='logo'
								src='https://res.cloudinary.com/ddygcbsoz/image/upload/f_auto,q_auto/logo'
								width={512}
								height={512}
								loading='lazy'
								priority={false}
								placeholder='data:image/svg;base64,L3BsYWNlaG9sZGVyLnN2Zw=='
							/>
							<UserManager session={session} />
							<CategoryManager session={session} />

							<Calendar />
						</div>
						<PostManager posts={posts} session={session} />
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
							<RecentEdits lastEdits={lastEdits} />
							<MailingList categories={categories} />
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
