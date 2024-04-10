import { useDeleteCategory } from '@/hooks/category';
import { type CategoryItemProps } from '@/types/category';
import React from 'react';
import { Modal } from '../ui';

export const DeleteCategoryButton = ({ category }: CategoryItemProps): React.ReactElement => {
	const { showModal, status, handleModal, toggleModal } = useDeleteCategory(category);

	return (
		<>
			<Modal
				id={`delete${category?.id}`}
				show={showModal}
				content={`Procedere con l'eliminazione della categoria ${category.name}?`}
				discardText='Annulla'
				confirmText='Continua'
				confirmDisabled={status === 'delete'}
				action={handleModal}
			/>

			<button
				onClick={toggleModal}
				className='text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
			>
				Elimina
			</button>
		</>
	);
};
