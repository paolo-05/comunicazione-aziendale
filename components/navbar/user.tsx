import { type Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface DiscordUserProps {
	session: Session | null;
}

export default function User({ session }: DiscordUserProps): React.ReactElement {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.stopPropagation();
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const handleCloseDropdown = (): void => {
			if (isMenuOpen) setIsMenuOpen(false);
		};

		document.addEventListener('click', handleCloseDropdown);

		return () => {
			document.removeEventListener('click', handleCloseDropdown);
		};
	}, [isMenuOpen]);

	if (session == null) {
		return (
			<div className='mt-12 lg:mt-0'>
				<div className='relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'>
					<button
						onClick={async () => {
							await signIn();
						}}
						type='button'
						className='relative text-sm font-semibold text-white'
					>
						<span className='ml-2'>Vai alla Dashboard</span>
					</button>
				</div>
			</div>
		);
	} else {
		const { user } = session;
		return (
			<div className='mt-12 lg:mt-0'>
				<div className='relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'>
					<button onClick={toggleDropdown} type='button' className='relative text-sm font-semibold text-white'>
						<span className='ml-2'>{user?.name}</span>
					</button>
				</div>

				<div
					className={`${
						!isMenuOpen && 'hidden'
					} absolute z-50 mt-4 w-56 rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 dark:bg-gray-800 `}
				>
					<div className='py-1'>
						<Link href='/user/profile'>
							<p className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 truncate hover:bg-gray-200 dark:hover:bg-gray-700'>
								Vai al tuo profilo
							</p>
						</Link>
					</div>
					<hr className='border border-solid border-gray-200 dark:border-gray-700' />
					<div className='py-1'>
						<Link
							href='/auth/signout'
							className='block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-200 dark:hover:bg-gray-700'
						>
							Logout
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
