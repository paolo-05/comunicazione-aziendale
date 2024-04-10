import { type PostSummaryProps } from '@/types/post';
import Link from 'next/link';
import { DeadlineNearPosts } from '../postComponents';
import React from 'react';
import { GoToIcon, HrRoleIcon } from '../svg';

export const PostManager = ({ posts, session }: PostSummaryProps): React.ReactElement => {
	return (
		<article className='p-6 rounded-lg group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 mb-4'>
			{session?.user != null && (
				<div className='flex justify-between items-center mb-5 text-gray-500'>
					<span className='bg-info-100 text-info-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-info-200 dark:text-info-800'>
						<HrRoleIcon className='w-6 h-6 mr-1 text-gray-800' />
						HR
					</span>
					<Link
						href='/post/new'
						className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
					>
						Nuovo Annuncio
					</Link>
				</div>
			)}
			<h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition group-hover:text-secondary'>
				<Link href='/post/all' className='group-hover:text-secondary'>
					Eventi in scadenza
				</Link>
			</h2>

			<DeadlineNearPosts posts={posts} session={session} />

			<Link href='/post/all' className='flex items-center justify-between group-hover:text-secondary'>
				<span className='text-sm'>Vedi tutti</span>
				<GoToIcon className='w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100' />
			</Link>
		</article>
	);
};
