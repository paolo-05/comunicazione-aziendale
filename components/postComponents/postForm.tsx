import { useCategories } from '@/hooks/category';
import { usePostForm } from '@/hooks/post';
import { type PostFormProps } from '@/types/post';
import dynamic from 'next/dynamic';
import React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { UploadCoverImageModal } from '.';
import { useRouter } from 'next/router';
import { Modal } from '../ui';

const CustomEditor = dynamic(
	async () => {
		return await import('@/components/customEditor');
	},
	{ ssr: false },
);

export const PostForm = ({ initialData }: PostFormProps): React.ReactElement => {
	const router = useRouter();

	const {
		handleSubmit,
		onSubmit,
		register,
		errors,
		range,
		handleRangeChange,
		rangeError,
		value,
		handleValueChange,
		showImageModal,
		handleImageModalChange,
		imageURL,
		handleImageUrlChange,
		imageURLError,
		valueError,
		editorData,
		handleEditorDataChange,
		editorError,
		targets,
		handleCheckboxChange,
		targetsError,
		isSubmitting,
		showDiscardModal,
		toggleDiscardModal,
		handleDiscard,
	} = usePostForm({ initialData });

	const { categories } = useCategories();

	return (
		<section className='bg-white dark:bg-gray-900 border border-gray-200 rounded-lg shadow dark:border-gray-700'>
			<Modal
				id='discard'
				show={showDiscardModal}
				content='Tutte le modifiche andranno perse, sei sicuro di voler uscire?'
				discardText={'Annulla'}
				confirmText={'Si, voglio uscire'}
				confirmDisabled={false}
				action={handleDiscard}
			/>

			<UploadCoverImageModal
				show={showImageModal}
				onClose={handleImageModalChange}
				setImageURL={handleImageUrlChange}
				imageURL={initialData?.imageURL ?? null}
			/>

			<div className='py-8 px-10 mx-auto'>
				<h2 className='mb-4 text-xl font-bold text-gray-900 dark:text-white'>Creazione nuovo annuncio</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='grid gap-4 sm:grid-cols-2 sm:gap-6 mb-4'>
						<div className='sm:col-span-2'>
							<input type='hidden' id='id' {...register('id')} />
							<label htmlFor='titoloA' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Titolo (richiesto)
							</label>
							<input
								id='titoloA'
								{...register('title')}
								type='text'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Gita Aziendale'
							/>
							{errors.title != null && (
								<p className='mt-2 text-sm text-red-600 dark:text-red-500'>{errors.title.message}</p>
							)}
						</div>
						<div className='sm:col-span-2'>
							<label htmlFor='dataRange' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Range di visibilità
							</label>
							<Datepicker
								i18n='it'
								startFrom={new Date()}
								separator='~'
								placeholder='25/01/2023 ~ 26/02/2023'
								primaryColor='green'
								value={range}
								onChange={handleRangeChange}
								displayFormat='DD/MM/YYYY'
								startWeekOn='mon'
								inputId='dataRange'
								inputClassName='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							/>
							{rangeError.length > 0 && <p className='mt-2 text-sm text-red-600 dark:text-red-500'>{rangeError}</p>}
						</div>
						<div className='w-full'>
							<label htmlFor='dataStart' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Data effettiva evento
							</label>
							<Datepicker
								i18n='it'
								placeholder='25/12/2024'
								primaryColor='green'
								value={value}
								onChange={handleValueChange}
								displayFormat='DD/MM/YYYY'
								startWeekOn='mon'
								inputId='dataStart'
								useRange={false}
								asSingle={true}
								inputClassName='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							/>
							{valueError.length > 0 && <p className='mt-2 text-sm text-red-600 dark:text-red-500'>{valueError}</p>}
						</div>
						<div className='w-full'>
							<span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Immagine di copertina
							</span>
							<button
								type='button'
								className='text-white bg-secondary hover:bg-secondary/90 focus:ring-4 focus:outline-none focus:ring-secondary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-secondary/55 me-2 mb-2'
								onClick={handleImageModalChange}
							>
								<svg
									className='w-6 h-6 mr-2 text-gray-800 dark:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path fillRule='evenodd' d='M13 10c0-.6.4-1 1-1a1 1 0 1 1 0 2 1 1 0 0 1-1-1Z' clipRule='evenodd' />
									<path
										fillRule='evenodd'
										d='M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12c0 .6-.2 1-.6 1.4a1 1 0 0 1-.9.6H4a2 2 0 0 1-2-2V6Zm6.9 12 3.8-5.4-4-4.3a1 1 0 0 0-1.5.1L4 13V6h16v10l-3.3-3.7a1 1 0 0 0-1.5.1l-4 5.6H8.9Z'
										clipRule='evenodd'
									/>
								</svg>
								{initialData != null ? 'Cambia Immagine' : 'Carica'}
							</button>
							{imageURL != null && initialData?.imageURL !== imageURL && (
								<p className='mt-2 text-sm text-gray-700 dark:text-gray-300'>
									Bene, hai caricato l&apos;immagine di copertina!
								</p>
							)}
							{imageURLError.length > 0 && (
								<p className='mt-2 text-sm text-red-600 dark:text-red-500'>{imageURLError}</p>
							)}
						</div>

						<div className='w-full'>
							<span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Descrizione</span>
							<div className=' max-w-full' id='descrizione'>
								<CustomEditor initialData={editorData} setData={handleEditorDataChange} />
							</div>
							{editorError.length > 0 && <p className='mt-2 text-sm text-red-600 dark:text-red-500'>{editorError}</p>}
						</div>
						<div className='w-full'>
							<span>Categorie Target</span>
							<section className='bg-gray-100 dark:bg-gray-800 max-w-fit rounded-lg p-1'>
								{categories.length > 0 &&
									categories.map((category) => (
										<div key={category.id} className='m-1 p-1'>
											<input
												checked={targets.includes(category.id)}
												type='checkbox'
												name={category.name}
												id={category.name}
												value={category.id}
												onChange={handleCheckboxChange}
												className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
											/>
											<label
												htmlFor={category.name}
												className={`bg-${category.colour}-300 dark:bg-${category.colour}-800 ms-1 px-3 py-1 rounded-lg`}
											>
												{category.name}
											</label>
										</div>
									))}
							</section>
							{targetsError.length > 0 && <p className='mt-2 text-sm text-red-600 dark:text-red-500'>{targetsError}</p>}
						</div>
					</div>
					<div className='flex justify-start gap-1'>
						<button
							type='submit'
							className='text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
						>
							{isSubmitting ? (
								<>
									<svg
										className='me-1 -ms-1 w-5 h-5'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M10 11h2v5m-2 0h4m-2.6-8.5h0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
										/>
									</svg>
									Caricamento
								</>
							) : initialData != null ? (
								<>
									<svg
										className='me-1 -ms-1 w-5 h-5'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2'
										/>
									</svg>
									Modifica
								</>
							) : (
								<>
									<svg
										className='me-1 -ms-1 w-5 h-5'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
											clipRule='evenodd'
										></path>
									</svg>
									Crea un nuovo annuncio
								</>
							)}
						</button>
						<button
							type='button'
							onClick={toggleDiscardModal}
							className='text-white inline-flex items-center bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800'
						>
							{isSubmitting ? (
								<>
									<svg
										className='me-1 -ms-1 w-5 h-5'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M10 11h2v5m-2 0h4m-2.6-8.5h0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
										/>
									</svg>
									Caricamento
								</>
							) : (
								<>
									<svg
										className='me-1 -ms-1 w-5 h-5'
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
											d='M6 18 17.94 6M18 18 6.06 6'
										/>
									</svg>
									Annulla
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};
