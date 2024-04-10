import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { HigherRoleRequired } from './higherRoleRequired';
import { AdminRoleIcon, GoToIcon } from '../svg';

interface CategoryManagerProps {
	session: Session | null;
}

export const CategoryManager = ({ session }: CategoryManagerProps): React.ReactElement => {
	return (
		<article className='p-6 rounded-lg group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10'>
			<div className='flex justify-between items-center mb-5 text-gray-500'>
				<span className='bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800'>
					<AdminRoleIcon className='w-6 h-6 mr-1 text-gray-800' />
					Admin
				</span>
			</div>
			<h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition group-hover:text-secondary'>
				<Link href='/category' className='group-hover:text-secondary'>
					Gestione Categorie Target
				</Link>
			</h2>
			<p className='mb-5 font-light text-gray-500 dark:text-gray-400'>
				In questa sezione potrai creare, modificare, eliminare categorie, uttili per annunci personalizzati e per la
				mailing list.
			</p>
			<Link href='/category' className='flex items-center justify-between group-hover:text-secondary'>
				{session?.user.role === 1 ? (
					<>
						<span className='text-sm'>Vai!</span>
						<GoToIcon className='w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100' />
					</>
				) : (
					<HigherRoleRequired />
				)}
			</Link>
		</article>
	);
};
