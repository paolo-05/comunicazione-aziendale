import { type PostType } from '@/types/post';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export const useDeletePost = (post: PostType) => {
	const router = useRouter();

	const [status, setStatus] = useState('idle');
	const [showModal, setShowModal] = useState(false);

	const deletePost = useCallback(() => {
		setStatus('deleting');
		axios
			.delete(`/api/post/delete/${post?.id}`)
			.then(() => {
				void router.push('/dashboard');
				toast.info('Evento eliminato');
			})
			.catch(() => toast.error('Network error'))
			.finally(() => {
				setStatus('idle');
			});
	}, [post?.id, router]);

	const handleModal = (confirm: boolean): void => {
		if (confirm && status !== 'deleting') {
			// delete the user
			deletePost();
		}
		setShowModal(false);
	};

	const toggleModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.stopPropagation();
		setShowModal(!showModal);
	};

	return {
		showModal,
		status,
		handleModal,
		toggleModal,
	};
};
