import { type PostSummaryProps } from '@/types/post';
import { useRouter } from 'next/router';
import React from 'react';

export const DeadlineNearPosts = ({ posts }: PostSummaryProps): React.ReactElement => {
	const router = useRouter();

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg my-4'>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th scope='col' className='px-6 py-3'>
							Titolo
						</th>
						<th scope='col' className='px-6 py-3'>
							Data di pubblicazione
						</th>
						<th scope='col' className='px-6 py-3'>
							Data effettiva
						</th>
						<th scope='col' className='px-6 py-3'>
							Visibile fino al
						</th>
					</tr>
				</thead>
				<tbody>
					{posts.length > 0 ? (
						posts.map((post) => (
							<tr
								key={post.id}
								className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
								onClick={async () => await router.push(`/post/${post.id}`)}
							>
								<th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
									{post.title}
								</th>
								<td className='px-6 py-4'>{new Date(post.startDate).toLocaleDateString('it')}</td>
								<td className='px-6 py-4'>{new Date(post.actualDate).toLocaleDateString('it')}</td>
								<td className='px-6 py-4'>{new Date(post.endDate).toLocaleDateString('it')}</td>
							</tr>
						))
					) : (
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
							<th
								scope='row'
								rowSpan={4}
								className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
							>
								Non ci sono eventi in scadenza al momento
							</th>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
