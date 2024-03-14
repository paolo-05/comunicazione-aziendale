import { signOut } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import React, { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Logout(): JSX.Element {
	useEffect(() => {
		void signOut({ callbackUrl: '/' });
	}, []);
	return (
		<>
			<Head>
				<title>Logging you out...</title>
			</Head>
			<main className={inter.className}>
				<div className='min-h-screen flex items-center justify-center'>
					<h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
						Logging you out...
					</h1>
				</div>
			</main>
		</>
	);
}
