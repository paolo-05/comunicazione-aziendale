import { type RecentPostEdit } from '@/types/post';
import { Skeleton } from '../ui';
import React from 'react';
import { RecentEdit } from '../postComponents';
import { HrRoleIcon } from '../svg';

interface RecentEditsProps {
	lastEdits: RecentPostEdit[];
}

export const RecentEdits = ({ lastEdits }: RecentEditsProps): React.ReactElement => {
	return (
		<article className='p-6 rounded-lg group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10'>
			<div className='flex justify-between items-center mb-5 text-gray-500'>
				<span className='bg-info-100 text-info-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-info-200 dark:text-info-800'>
					<HrRoleIcon className='w-6 h-6 mr-1 text-gray-800' />
					HR
				</span>
			</div>
			<div className='max-w-7xl mx-auto'>
				<h2 className='mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition group-hover:text-secondary'>
					Modifiche recenti agli annunci
				</h2>
				<div className='flex flex-col gap-4'>
					{lastEdits.length > 0 ? lastEdits.map((edit, index) => <RecentEdit key={index} edit={edit} />) : <Skeleton />}
				</div>
			</div>
		</article>
	);
};
