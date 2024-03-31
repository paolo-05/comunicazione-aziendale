import { type PostItemProps } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import DeletePostButton from './deletePostButton';
import React from 'react';

export const Item = ({ post, categories, session }: PostItemProps): React.ReactElement => {
	return (
		<div className='relative bg-gray-50 dark:bg-gray-900 py-6 lg:py-12 rounded-lg'>
			<div className='container px-4 md:px-6'>
				<div className='grid items-center gap-6 lg:grid-cols-[1fr_900px]'>
					<div className='hidden lg:block'>
						<Image
							loading='lazy'
							alt='Cover Image'
							className='xs:mt-3 max-h-64 rounded-lg h-32 md:h-64'
							height={500}
							src={post.imageURL}
							width={500}
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
							{/* TO DO */}
							<div className='grid gap-1'>
								<div className='flex items-center gap-3'>
									<UsersIcon className='w-6 h-6 mr-2' />
									{categories?.map((category) => (
										<span
											key={category.id}
											className={`ring-${category.colour}-800 dark:ring-${category.colour}-300 text-xs font-medium ring-4 rounded-lg py-1 px-2 bg-gray-100 dark:bg-gray-800`}
										>
											{category.name}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className='text-center lg:text-left'>
						<dl>
							<dt className='mb-2 font-semibold leading-none text-gray-900 dark:text-white'>Descrzione</dt>
							<dt
								className='mb-4 sm:mb-5 prose data-from-editor'
								dangerouslySetInnerHTML={{
									__html: post?.description ?? '',
								}}
							></dt>
						</dl>
						{session?.user != null && (
							<div className='flex items-center space-x-4'>
								<Link
									href={`/post/edit?id=${post.id}`}
									className='text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
								>
									<svg
										aria-hidden='true'
										className='mr-1 -ml-1 w-5 h-5'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z'></path>
										<path
											fillRule='evenodd'
											d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
											clipRule='evenodd'
										></path>
									</svg>
									Modifica
								</Link>
								<DeletePostButton session={session} post={post} />
							</div>
						)}
					</div>
				</div>
			</div>
			{session?.user != null && (
				<div className='absolute right-0 bottom-0 m-3 text-gray-800 dark:text-gray-200'>
					<h4 className='inline-flex items-start'>
						<svg
							className='w-5 h-5 text-gray-800 mr-1 dark:text-gray-200'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
							/>
						</svg>
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
						<svg
							className='w-5 h-5 mr-1 text-gray-800 dark:text-gray-200'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m11.5 11.5 2.071 1.994M4 10h5m11 0h-1.5M12 7V4M7 7V4m10 3V4m-7 13H8v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L10 17Zm-5 3h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z'
							/>
						</svg>
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

function CalendarIcon(props: any): React.ReactElement {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<rect width='18' height='18' x='3' y='4' rx='2' ry='2' />
			<line x1='16' x2='16' y1='2' y2='6' />
			<line x1='8' x2='8' y1='2' y2='6' />
			<line x1='3' x2='21' y1='10' y2='10' />
		</svg>
	);
}

function UsersIcon(props: any): React.ReactElement {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
			<circle cx='9' cy='7' r='4' />
			<path d='M22 21v-2a4 4 0 0 0-3-3.87' />
			<path d='M16 3.13a4 4 0 0 1 0 7.75' />
		</svg>
	);
}
