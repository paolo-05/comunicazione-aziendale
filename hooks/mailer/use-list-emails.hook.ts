import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useListEmails = () => {
	const router = useRouter();
	const [hoveredEmail, setHoveredEmail] = useState<string | null>(null);
	const [emailToRemove, setEmailToRemove] = useState<string | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [status, setStatus] = useState('idle');

	const deleteEmail = useCallback(() => {
		setStatus('deleting');
		axios
			.delete(`/api/category/delete-email?email=${emailToRemove}`)
			.then(() => {
				toast.info('Email rimossa');
				router.reload();
			})
			.catch(() => toast.error('Network error'))
			.finally(() => setStatus('idle'));
	}, [emailToRemove, router]);

	const handleModal = (confirm: boolean): void => {
		if (confirm && status !== 'deleting') {
			// delete the user
			deleteEmail();
		}
		setShowModal(false);
	};

	const toggleModal = (event: React.MouseEvent<HTMLButtonElement>, email: string): void => {
		setEmailToRemove(email);
		event.stopPropagation();
		setShowModal(!showModal);
	};
	return { showModal, toggleModal, handleModal, setHoveredEmail, hoveredEmail };
};
