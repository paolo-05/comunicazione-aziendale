import { AddEmailFormFields, addEmailFormSchema } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AddEmailsFormModalProps {
	onClose: () => void;
}

export const useAddEmailForm = ({ onClose }: AddEmailsFormModalProps) => {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState<number | null>();
	const [targetsError, setTargetsError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AddEmailFormFields>({ resolver: zodResolver(addEmailFormSchema) });

	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedCategory(Number(event.target.value));
	};

	const onSubmit: SubmitHandler<AddEmailFormFields> = async (data) => {
		if (!selectedCategory) {
			setTargetsError('Seleziona una categoria di appartenenza.');
			return;
		}
		const res = await axios.post('/api/mailer/add-email', { email: data.email, selectedCategory });
		if (res.status == 201) {
			onClose();
			router.reload();
		}
	};

	return { selectedCategory, handleSubmit, register, errors, isSubmitting, handleOptionChange, onSubmit, targetsError };
};
