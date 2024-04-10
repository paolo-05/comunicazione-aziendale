import { type UserSecure } from '@/types/user';
import { type Session } from 'next-auth';
import Link from 'next/link';
import { Skeleton } from '../ui';
import { Item } from './item';
import React from 'react';
import { CreateIcon } from '../svg';

interface ListAllUsersProps {
	users: UserSecure[] | null;
	session: Session | null;
}

export default function ListAllUsers({ users, session }: ListAllUsersProps): React.ReactElement {
	return (
		<section className='p-3 sm:p-5'>
			<div className='mx-auto max-w-screen-xl px-4 lg:px-12'>
				<div className='bg-white dark:bg-gray-800 relative shadow-md rounded-lg overflow-hidden'>
					<div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
						<div className='w-full md:w-1/2'>
							<div className='flex items-center'>
								<h1 className='mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white'>
									Mostrando tutti gli utenti registrati
								</h1>
							</div>
						</div>
						<div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'>
							<Link
								href='/user/register'
								type='button'
								className='flex items-center justify-center w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
							>
								<CreateIcon className='h-3.5 w-3.5 mr-2' />
								Registra un nuovo utente
							</Link>
						</div>
					</div>
					<div className='overflow-x-auto'>
						{users != null ? (
							<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
								<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
									<tr>
										<th scope='col' className='px-4 py-3'>
											Email
										</th>
										<th scope='col' className='px-4 py-3'>
											Nome
										</th>
										<th scope='col' className='px-4 py-3'>
											Cognome
										</th>
										<th scope='col' className='px-4 py-3'>
											ID
										</th>
										<th scope='col' className='px-4 py-3'>
											Ruolo
										</th>
										<th scope='col' className='px-4 py-3'>
											<span className='sr-only'>Actions</span>
										</th>
									</tr>
								</thead>
								<tbody>{users?.map((user, index) => <Item key={index} user={user} session={session} />)}</tbody>
							</table>
						) : (
							<Skeleton />
						)}
					</div>
					<nav
						className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4'
						aria-label='Table navigation'
					>
						<span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
							Mostrando <span className='font-semibold text-gray-900 dark:text-white'>1-10 </span>
							di <span className='font-semibold text-gray-900 dark:text-white'>{users?.length} </span>
						</span>
						<ul className='inline-flex items-stretch -space-x-px'>
							<li>
								<Link
									href='#'
									className='flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
								>
									<span className='sr-only'>Previous</span>
									<svg
										className='w-5 h-5'
										aria-hidden='true'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
											clipRule='evenodd'
										/>
									</svg>
								</Link>
							</li>
							<li>
								<Link
									href='#'
									aria-current='page'
									className='flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
								>
									1
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
								>
									...
								</Link>
							</li>
							<li>
								<Link
									href='#'
									className='flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
								>
									<span className='sr-only'>Next</span>
									<svg
										className='w-5 h-5'
										aria-hidden='true'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
											clipRule='evenodd'
										/>
									</svg>
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</section>
	);
}
