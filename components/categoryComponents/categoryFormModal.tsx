import { useCategoryForm } from '@/hooks/category';
import { type CategoryFormModalProps } from '@/types/category';
import React from 'react';
import { ColorPicker } from '../forms';

export const CategoryFormModal = ({ initialFormData, show, onClose }: CategoryFormModalProps): React.ReactElement => {
	const { setSelectedColor, register, handleSubmit, errors, isSubmitting, onSubmit } = useCategoryForm({
		initialFormData,
		show,
		onClose,
	});

	if (!show) return <>Loading...</>;

	return (
		<div
			tabIndex={-1}
			aria-hidden='true'
			className={`${
				!show && 'hidden'
			} fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50`}
		>
			<div className='relative bg-white rounded-lg shadow dark:bg-gray-800'>
				<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
						{initialFormData != null
							? `Modificando la categoria ${initialFormData.name}`
							: 'Creando una nuova categoria'}
					</h3>
					<button
						type='button'
						className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
						onClick={onClose}
					>
						<svg className='w-3 h-3' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
							/>
						</svg>
						<span className='sr-only'>Close modal</span>
					</button>
				</div>
				<form className='p-4 md:p-5' onSubmit={handleSubmit(onSubmit)}>
					<div className='grid gap-4 mb-4 grid-cols-2'>
						<div className='col-span-2 sm:col-span-1'>
							<input type='hidden' {...register('id')} />
							<label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Nome (richiesto)
							</label>
							<input
								type='text'
								id='name'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Marketing'
								{...register('name')}
							/>
							{errors.name != null && (
								<p className='mt-2 text-sm text-red-600 dark:text-red-500'>{errors.name.message}</p>
							)}
						</div>
						<div className='col-span-2 sm:col-span-1'>
							<ColorPicker
								change={(value: string) => {
									setSelectedColor(value);
								}}
								initialColor={initialFormData != null ? initialFormData.colour : 'red'}
							/>
						</div>
						<div className='col-span-2'>
							<label htmlFor='description' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Descrizione Categoria (richiesto)
							</label>
							<textarea
								id='description'
								{...register('description')}
								rows={4}
								className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Scrivi la descrizione qua'
							></textarea>
						</div>
					</div>
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
						) : initialFormData !== null ? (
							<>
								<svg className='me-1 -ms-1 w-5 h-5' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
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
								Crea una nuova categoria
							</>
						)}
					</button>
				</form>
			</div>
		</div>
	);
};
