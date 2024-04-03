import { type RecentPostEdit } from '@/types/post';
import { Skeleton } from '../ui';
import React from 'react';
import { RecentEdit } from '../postComponents';

interface RecentEditsProps {
	lastEdits: RecentPostEdit[];
}

export const RecentEdits = ({ lastEdits }: RecentEditsProps): React.ReactElement => {
	return (
		<article className='p-6 rounded-lg group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10'>
			<div className='flex justify-between items-center mb-5 text-gray-500'>
				<span className='bg-info-100 text-info-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-info-200 dark:text-info-800'>
					<svg
						className='w-6 h-6 mr-1 text-gray-800'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							fillRule='evenodd'
							d='M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm5 2a1 1 0 0 0 0 2 1 1 0 1 0 0-2Zm4 0a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4 3a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm4 0a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4 3a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm4 0a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z'
							clipRule='evenodd'
						/>
					</svg>
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
