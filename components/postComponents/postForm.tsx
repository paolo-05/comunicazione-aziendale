import { useCategories } from '@/hooks/category';
import { usePostForm } from '@/hooks/post';
import { type PostFormProps } from '@/types/post';
import dynamic from 'next/dynamic';
import React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { UploadCoverImageModal } from '.';
import { CloseIcon, CreateIcon, EditIcon, LoadingIcon, UploadImageIcon } from '../svg';
import { Modal } from '../ui';
import { useWakeUploader } from '@/hooks/media';

const CustomEditor = dynamic(
	async () => {
		return await import('@/components/customEditor');
	},
	{ ssr: false },
);

export const PostForm = ({ initialData }: PostFormProps): React.ReactElement => {
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

	// This isn't working
	const { loading } = useWakeUploader();

	const { categories } = useCategories();

	const renderSubmitButton = () => {
		if (isSubmitting) {
			return (
				<>
					<LoadingIcon className='me-1 -ms-1 w-5 h-5' />
					Caricamento
				</>
			);
		}

		if (!initialData) {
			return (
				<>
					<CreateIcon className='me-1 -ms-1 w-5 h-5' />
					Crea un nuovo annuncio
				</>
			);
		}

		return (
			<>
				<EditIcon className='me-1 -ms-1 w-5 h-5' />
				Modifica
			</>
		);
	};

	const renderDiscardButton = () => {
		if (isSubmitting) {
			return (
				<>
					<LoadingIcon className='me-1 -ms-1 w-5 h-5' />
					Caricamento
				</>
			);
		}
		return (
			<>
				<CloseIcon className='me-1 -ms-1 w-4 h-4' />
				Annulla
			</>
		);
	};

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
								<UploadImageIcon className='w-6 h-6 mr-2 text-gray-800 dark:text-white' />
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
							{renderSubmitButton()}
						</button>
						<button
							type='button'
							onClick={toggleDiscardModal}
							className='text-white inline-flex items-center bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800'
						>
							{renderDiscardButton()}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};
