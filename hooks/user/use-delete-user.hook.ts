import { type UserSecure } from '@/types/user';
import axios from 'axios';
import { type Session } from 'next-auth';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

/**
 * This hook handles the process of a user deletion
 * @param session the current admin session
 * @param user the user to delete
 * @returns utlities for showing modals
 */
export const useDeleteUser = (session: Session | null, user: UserSecure | null) => {
	const areTheyTheSamePerson = user?.id === session?.user.id;
	const router = useRouter();

	const [status, setStatus] = useState<'idle' | 'deleting'>('idle');
	const [showModal, setShowModal] = useState(false);

	const deleteUser = useCallback(() => {
		setStatus('deleting');
		axios
			.delete(`/api/user/delete/${user?.id}`)
			.then(() => {
				router.reload();
				toast.info('Utente eliminato');
			})
			.catch(() => toast.error('Network error'))
			.finally(() => {
				setStatus('idle');
			});
	}, [router, user?.id]);

	const handleModal = (confirm: boolean): void => {
		if (confirm && status !== 'deleting') {
			// delete the user
			deleteUser();
		}
		setShowModal(false);
	};

	const toggleModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.stopPropagation();
		setShowModal(!showModal);
	};

	return { showModal, handleModal, toggleModal, status, areTheyTheSamePerson };
};
