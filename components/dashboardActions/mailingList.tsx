import { CategoryTypeWithUsers } from '@/types/category';
import Link from 'next/link';
import React from 'react';
import { Skeleton } from '../ui';
import { Session } from 'next-auth';
import { HigherRoleRequired } from './higherRoleRequired';
import { AdminRoleIcon, GoToIcon } from '../svg';

interface MailingListProps {
	session: Session | null;
	categories: CategoryTypeWithUsers[];
	loading: boolean;
}

export const MailingList = ({ session, categories, loading }: MailingListProps): React.ReactElement => {
	const renderCategories = (): JSX.Element => {
		if (loading) {
			return <Skeleton />;
		}

		if (categories.length === 0) {
			return (
				<div className='mt-3 flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600'>
					<section>
						<h3 className=' font-medium'> Non ci sono ancora categorie</h3>
					</section>
					<section>
						<Link
							href='/category'
							type='button'
							className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
						>
							Crea nuova categoria
						</Link>
					</section>
				</div>
			);
		}

		return (
			<div className='mt-3 grid grid-flow-row md:grid-cols-2 sm:grid-cols-4 gap-4'>
				{categories.map((category) => (
					<div
						className={`ring-4 ring-${category.colour}-800 dark:ring-${category.colour}-300 bg-gray-100 dark:bg-gray-700 rounded-lg py-8 flex flex-col items-center justify-center`}
						key={category.id}
					>
						<h1 className='max-w-full font-semibold text-xl mb-3 dark:text-gray-100 text-gray-900 truncate'>
							{category.name}
						</h1>
						<h4 className=' font-medium dark:text-gray-200 text-gray-800'>Iscritti: {category.users.length}</h4>
					</div>
				))}
			</div>
		);
	};

	return (
		<article className='p-6 rounded-lg group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10'>
			<div className='flex justify-between items-center mb-5 text-gray-500'>
				<span className='bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800'>
					<AdminRoleIcon className='w-6 h-6 mr-1 text-gray-800' />
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

			{renderCategories()}

			<Link href='/mailing-list' className='mt-3 flex items-center justify-between group-hover:text-secondary'>
				{session?.user.role === 1 ? (
					<>
						<span className='text-sm'>Aggiungi e rimuovi utenti</span>
						<GoToIcon className='w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100' />
					</>
				) : (
					<HigherRoleRequired />
				)}
			</Link>
		</article>
	);
};
