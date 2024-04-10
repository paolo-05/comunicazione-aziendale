import Link from 'next/link';

export const NoCategoriesYet = () => (
	<section className='bg-white dark:bg-gray-900'>
		<div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
			<div className='mx-auto max-w-screen-md sm:text-center'>
				<h2 className='mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white'>
					In questo momento non ci sono categorie!
				</h2>
				<p className='mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400'></p>
				<div className='items-center mx-auto mb-1 space-y-4 max-w-screen-sm sm:flex sm:space-y-0'>
					<div className='relative w-full'>
						<Link
							href='/category'
							type='button'
							className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
						>
							Crea nuova categoria
						</Link>
					</div>
				</div>
			</div>
		</div>
	</section>
);
