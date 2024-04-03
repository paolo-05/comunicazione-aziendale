import { CategoryTypeWithUsers } from '@/types/category';
import Link from 'next/link';
import React from 'react';
import { Skeleton } from '../ui';

interface MailingListProps {
	categories: CategoryTypeWithUsers[];
	//categories: CategoryType[];
}

export const MailingList = ({ categories }: MailingListProps): React.ReactElement => {
	return (
		<article className='p-6 rounded-lg group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10'>
			<div className='flex justify-between items-center mb-5 text-gray-500'>
				<span className='bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800'>
					<svg
						className='w-6 h-6 mr-1 text-gray-800'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<path
							stroke='currentColor'
							strokeLinecap='square'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.1 1.9-.7-.7m5.6 5.6-.7-.7m-4.2 0-.7.7m5.6-5.6-.7.7M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
						/>
					</svg>
					Admin
				</span>
			</div>
			<h2 className='mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition group-hover:text-secondary'>
				<Link href='/mailing-list' className='group-hover:text-secondary'>
					Mailing List
				</Link>
			</h2>

			<div className='flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600'>
				<section>
					<h3 className='font-semibold'>Totale Categorie: </h3>
				</section>
				<span>{categories.length || 0}</span>
			</div>

			<div className='mt-3 flex justify-start'>
				<h3 className='font-medium'>Categorie e numero di utenti registrati ad ognuna:</h3>
			</div>

			<div className='mt-3 grid grid-flow-row md:grid-cols-2 sm:grid-cols-4 gap-4'>
				{categories.length ? (
					categories.map((category) => (
						<div
							className={`ring-4 ring-${category.colour}-800 dark:ring-${category.colour}-300 bg-gray-100 dark:bg-gray-700 rounded-lg py-8 flex flex-col items-center justify-center`}
							key={category.id}
						>
							<h1 className='font-semibold text-xl mb-3'>{category.name}</h1>
							<h4 className=' font-medium'>Iscritti: {category.users.length}</h4>
						</div>
					))
				) : (
					<Skeleton />
				)}
			</div>

			<Link href='/mailing-list' className='mt-3 flex items-center justify-between group-hover:text-secondary'>
				<span className='text-sm'>Aggiungi e rimuovi utenti</span>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='currentColor'
					className='w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100'
				>
					<path
						fillRule='evenodd'
						d='M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z'
						clipRule='evenodd'
					/>
				</svg>
			</Link>
		</article>
	);
};
