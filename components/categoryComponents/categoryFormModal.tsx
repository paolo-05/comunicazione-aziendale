import { useCategoryForm } from '@/hooks/category';
import { type CategoryFormModalProps } from '@/types/category';
import React from 'react';
import { ColorPicker } from '../forms';
import { CloseIcon, CreateIcon, LoadingIcon } from '../svg';

export const CategoryFormModal = ({ initialFormData, show, onClose }: CategoryFormModalProps): React.ReactElement => {
	const { setSelectedColor, register, handleSubmit, errors, isSubmitting, onSubmit } = useCategoryForm({
		initialFormData,
		show,
		onClose,
	});

	const renderSubmitButton = () => {
		if (isSubmitting) {
			return (
				<>
					<LoadingIcon className='me-1 -ms-1 w-5 h-5' />
					Caricamento
				</>
			);
		}
		if (!initialFormData) {
			return (
				<>
					<CreateIcon className='me-1 -ms-1 w-5 h-5' />
					Crea una nuova categoria
				</>
			);
		}
		return (
			<>
				<CreateIcon className='me-1 -ms-1 w-5 h-5' />
				Modifica
			</>
		);
	};

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
						<CloseIcon className='w-3 h-3' />
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
						{renderSubmitButton()}
					</button>
				</form>
			</div>
		</div>
	);
};
