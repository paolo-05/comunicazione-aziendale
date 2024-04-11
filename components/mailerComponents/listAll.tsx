import { useListEmails } from '@/hooks/mailer';
import { CategoryTypeWithUsers } from '@/types/category';
import { Modal } from '../ui';
import { TrashBinIcon } from '../svg';

interface ListAllProps {
	categories: CategoryTypeWithUsers[];
}

export const ListAll = ({ categories }: ListAllProps) => {
	const { showModal, toggleModal, handleModal, setHoveredEmail, hoveredEmail } = useListEmails();

	const renderCategoryEmails = (category: CategoryTypeWithUsers): JSX.Element => {
		if (category.users.length === 0) {
			return (
				<div className='text-sm font-light text-gray-900 dark:text-gray-100'>Non ci sono iscritti al momento...</div>
			);
		}

		return (
			<div className='bg-gray-200 dark:bg-gray-700 p-2 rounded-md w-80 truncate'>
				<Modal
					id={'deleteEmailModal'}
					show={showModal}
					content={'Vuoi davvero rimuovere questa email?'}
					discardText={'Annulla'}
					confirmText={'Conferma'}
					confirmDisabled={false}
					action={handleModal}
				/>
				{category.users.map((user, index) => (
					<div
						key={index}
						onMouseEnter={() => setHoveredEmail({ email: user.email, categoryId: category.id })}
						onMouseLeave={() => setHoveredEmail(null)}
						className='flex items-start justify-between w-full p-2 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-300 ease-in-out my-1'
					>
						<p key={index} className='text-sm'>
							{user.email}
						</p>
						{hoveredEmail?.email === user.email && hoveredEmail.categoryId === category.id && (
							<button onClick={(e) => toggleModal(e, user.email, category.id)}>
								<TrashBinIcon className='ms-1 w-6 h-6 text-red-500 dark:text-red-400 cursor-pointer' />
							</button>
						)}
					</div>
				))}
			</div>
		);
	};

	return (
		<div className='mt-3 grid grid-flow-row lg:grid-cols-2 min-md:grid-cols-4 gap-4'>
			{categories.map((category) => (
				<div
					className={`ring-4 ring-${category.colour}-800 dark:ring-${category.colour}-300 bg-gray-100 dark:bg-gray-800 rounded-lg py-8 flex flex-col items-center justify-center`}
					key={category.id}
				>
					<h1 className=' font-extrabold text-2xl mb-3 dark:text-gray-100 text-gray-900'>{category.name}</h1>

					<h4 className='font-semibold text-xl dark:text-gray-200 text-gray-800'>Iscritti: </h4>

					{renderCategoryEmails(category)}
				</div>
			))}
		</div>
	);
};
