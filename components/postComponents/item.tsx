import { type PostItemProps } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import DeletePostButton from './deletePostButton';
import React from 'react';
import { TargetCategories } from '../categoryComponents';
import { NavigationButtons } from './navigationButtons';
import { CalendarIcon, CreatedAtIcon, EditIcon, LastEditedIcon } from '../svg';

export const Item = ({ post, categories, session }: PostItemProps): React.ReactElement => {
	return (
		<div className='relative bg-gray-50 dark:bg-gray-900 py-6 lg:py-12 rounded-lg'>
			<div className='container px-4 md:px-6'>
				<NavigationButtons nextPostId={post.nextPostId} previousPostId={post.previousPostId} session={session} />
				<div className='grid items-center gap-6 grid-cols-3'>
					<div className='hidden lg:block'>
						<Image
							loading='lazy'
							alt='Cover Image'
							className='xs:mt-3 max-h-64 rounded-lg h-32 md:h-64 max-w-full w-full object-scale-down'
							height={500}
							width={500}
							src={post.imageURL}
						/>
					</div>
					<div className='space-y-2 text-center lg:text-left'>
						<h1 className='text-3xl font-bold tracking-tighter lg:text-5xl'>{post.title}</h1>
					</div>
					<div className='flex justify-center items-center'>
						<div className='grid gap-4'>
							<div className='grid gap-1'>
								<div className='flex items-center gap-2'>
									<CalendarIcon className='w-6 h-6 mr-2' />
									<span className='text-sm font-medium'>
										{new Date(post?.actualDate ?? '').toLocaleString('it-IT', {
											day: '2-digit',
											month: 'long',
											year: 'numeric',
										})}
									</span>
								</div>
							</div>
							<TargetCategories categories={categories} />
						</div>
					</div>
				</div>
				<div className='flex items-center justify-center mt-4'>
					<div className='text-center lg:text-left'>
						<dl>
							<dt className='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>Descrzione</dt>
							<dt
								className='mb-4 sm:mb-5 prose data-from-editor max-w-5xl prose-img:max-w-lg text-left'
								dangerouslySetInnerHTML={{
									__html: post?.description ?? '',
								}}
							></dt>
						</dl>
					</div>
				</div>
				<div className='flex items-center justify-center'>
					{session?.user != null && (
						<div className='flex items-center space-x-4'>
							<Link
								href={`/post/edit?id=${post.id}`}
								className='text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							>
								<EditIcon className='mr-1 -ml-1 w-5 h-5' />
								Modifica
							</Link>
							<DeletePostButton session={session} post={post} />
						</div>
					)}
				</div>
			</div>

			{session?.user != null && (
				<div className='absolute right-0 bottom-0 m-3 text-gray-800 dark:text-gray-200'>
					<h4 className='inline-flex items-start'>
						<CreatedAtIcon className='w-5 h-5 text-gray-800 mr-1 dark:text-gray-200' />
						Creato il:{' '}
						{new Date(post.created_at).toLocaleString('it-IT', {
							hour: '2-digit',
							minute: '2-digit',
							day: '2-digit',
							month: 'long',
							year: 'numeric',
						})}
					</h4>
					<br />
					<h4 className='inline-flex items-start'>
						<LastEditedIcon className='w-5 h-5 mr-1 text-gray-800 dark:text-gray-200' />
						Modificato
						{post.updated_at !== post.created_at ? ' il: ' : ': mai'}
						{post.updated_at !== post.created_at &&
							new Date(post.updated_at).toLocaleString('it-IT', {
								hour: '2-digit',
								minute: '2-digit',
								day: '2-digit',
								month: 'long',
								year: 'numeric',
							})}
					</h4>
				</div>
			)}
		</div>
	);
};
