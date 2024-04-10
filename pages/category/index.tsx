import { CategoryFormModal, ListAll, NoCategoriesYet } from '@/components/categoryComponents';
import Header from '@/components/navbar';
import { Container } from '@/components/ui';
import { useCategories } from '@/hooks/category';
import { useRestrictedSession } from '@/hooks/session';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Category(): JSX.Element {
	const session = useRestrictedSession();

	const { categories, showModal, categoryToEdit, handleEditCategoryTabOpened, setShowModal, handleCloseModal } =
		useCategories();

	return (
		<>
			<Head>
				<title>Categorie di utenti</title>
			</Head>
			<main className={inter.className}>
				{showModal && (
					<CategoryFormModal initialFormData={categoryToEdit} show={showModal} onClose={handleCloseModal} />
				)}
				<Header session={session} />
				<section className='relative pt-36'>
					<Container>
						<div className='bg-gray-100 dark:bg-gray-900 rounded-lg'>
							<section className='w-full h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-800 shadow-md rounded-t-lg'>
								<h1 className='text-2xl font-semibold text-gray-900 dark:text-gray-100'>Categorie di utenti</h1>
								<button
									type='button'
									onClick={() => {
										setShowModal(true);
									}}
									className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
								>
									Crea nuova categoria
								</button>
							</section>
							<section className='p-6'>
								<p className='text-gray-700 dark:text-gray-300 mb-4'>
									La creazione di categorie ti aiuta a organizzare i tuoi dipendenti in base al loro roulo in azienda e
									alla loro fascia di età. Permette una mirata comunicazione e una migliore gestione degli utenti.
								</p>
								{categories?.length === 0 ? (
									<NoCategoriesYet setShowModal={setShowModal} />
								) : (
									<ListAll session={session} categories={categories} setEditCategory={handleEditCategoryTabOpened} />
								)}
							</section>
						</div>
					</Container>
				</section>
			</main>
		</>
	);
}
