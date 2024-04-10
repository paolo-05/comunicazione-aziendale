import { useDeletePost } from '@/hooks/post';
import { type PostItemProps } from '@/types/post';
import React from 'react';
import { TrashBinIcon } from '../svg';
import { Modal } from '../ui';

export default function DeletePostButton({ post }: PostItemProps): React.ReactElement {
	const { showModal, status, handleModal, toggleModal } = useDeletePost(post);

	return (
		<>
			<Modal
				id={`delete${post?.id}`}
				show={showModal}
				content={`Procedere con l'eliminazione del post ${post?.title}?`}
				discardText='Annulla'
				confirmText='Continua'
				confirmDisabled={status === 'delete'}
				action={handleModal}
			/>

			<button
				onClick={toggleModal}
				type='button'
				className='inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900'
			>
				<TrashBinIcon className='mr-1 w-6 h-6 text-white' />
				Elimina
			</button>
		</>
	);
}
