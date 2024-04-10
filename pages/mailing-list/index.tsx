import { NoCategoriesYet, ListAll, AddEmailsFormModal } from '@/components/mailerComponents';
import Header from '@/components/navbar';
import { Container, Skeleton } from '@/components/ui';
import { UseCategoriesAndAudiences } from '@/hooks/category';
import { useRestrictedSession } from '@/hooks/session';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function MailingList() {
	const session = useRestrictedSession();

	const { categories, loadingCategories, showModal, handleEditCategoryTabOpened, handleCloseModal } =
		UseCategoriesAndAudiences();

	const renderCategories = () => {
		if (loadingCategories) {
			return <Skeleton />;
		}

		if (categories.length === 0) {
			return <NoCategoriesYet />;
		}

		return <ListAll categories={categories} />;
	};

	return (
		<>
			<Head>
				<title>Categorie di utenti</title>
			</Head>
			<main className={inter.className}>
				{showModal && <AddEmailsFormModal categories={categories} show={showModal} onClose={handleCloseModal} />}
				<Header session={session} />
				<section className='relative pt-36'>
					<Container>
						<div className='bg-gray-100 dark:bg-gray-900 rounded-lg'>
							<section className='w-full h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-800 shadow-md rounded-t-lg'>
								<h1 className='text-2xl font-semibold text-gray-900 dark:text-gray-100'>Categorie di utenti</h1>
								{categories.length > 0 && (
									<button
										type='button'
										onClick={handleEditCategoryTabOpened}
										className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
									>
										Registra una nuova email in una categoria
									</button>
								)}
							</section>
							<section className='p-6'>
								<p className='text-gray-700 dark:text-gray-300 mb-4'>
									Aggiungere email a una categoria ti permette di inviare comunicazioni mirate ai tuoi dipendenti.
								</p>
								{renderCategories()}
							</section>
						</div>
					</Container>
				</section>
			</main>
		</>
	);
}
