import { useAddEmailForm } from '@/hooks/mailer';
import { CategoryTypeWithUsers } from '@/types/category';
import { CloseIcon, CreateIcon, LoadingIcon } from '../svg';

interface AddEmailsFormModalProps {
	categories: CategoryTypeWithUsers[];
	show: boolean;
	onClose: () => void;
}

export const AddEmailsFormModal = ({ categories, show, onClose }: AddEmailsFormModalProps) => {
	const { selectedCategory, handleSubmit, register, errors, isSubmitting, handleOptionChange, onSubmit, targetsError } =
		useAddEmailForm({ onClose });

	const renderSubmitButton = () => {
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
				<CreateIcon className='me-1 -ms-1 w-5 h-5' />
				Aggiungi
			</>
		);
	};

	if (!show) return <></>;

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
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Registrando una nuova e-mail</h3>
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
							<label htmlFor='email' className='block mb-2 text-base font-medium text-gray-900 dark:text-white'>
								Email (richiesto)
							</label>
							<input
								type='text'
								id='email'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='jon.doe@example.com'
								{...register('email')}
							/>
							{errors.email != null && (
								<p className='mt-2 text-sm text-red-600 dark:text-red-500'>{errors.email.message}</p>
							)}
						</div>
						<div className='col-span-2 sm:col-span-1'>
							<span className='block mb-2 text-base font-medium text-gray-900 dark:text-white'>
								A quale categoria appartiene? (richiesto)
							</span>

							<section className='bg-gray-100 dark:bg-gray-700 max-w-fit rounded-lg p-1'>
								{categories.length > 0 &&
									categories.map((category) => (
										<div key={category.id} className='m-1 p-1'>
											<input
												checked={selectedCategory === category.id}
												type='radio'
												name={category.name}
												id={category.name}
												value={category.id}
												onChange={handleOptionChange}
												className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
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
