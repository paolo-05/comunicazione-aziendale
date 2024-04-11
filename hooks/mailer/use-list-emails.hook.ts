import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

interface EmailCategory {
	email: string;
	categoryId: number;
}

export const useListEmails = () => {
	const router = useRouter();
	const [hoveredEmail, setHoveredEmail] = useState<EmailCategory | null>(null);
	const [emailToRemove, setEmailToRemove] = useState<EmailCategory | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [status, setStatus] = useState('idle');

	const deleteEmail = useCallback(() => {
		setStatus('deleting');
		axios
			.delete(`/api/mailer/delete-email?email=${emailToRemove?.email}&categoryId=${emailToRemove?.categoryId}`)
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

	const toggleModal = (event: React.MouseEvent<HTMLButtonElement>, email: string, categoryId: number): void => {
		setEmailToRemove({ email, categoryId });
		event.stopPropagation();
		setShowModal(!showModal);
	};
	return { showModal, toggleModal, handleModal, setHoveredEmail, hoveredEmail };
};
