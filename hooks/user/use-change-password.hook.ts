import { type ChangePasswordFormFields, changePasswordSchema } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { type Session } from 'next-auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useChangePassword = (session: Session | null) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<ChangePasswordFormFields>({
		resolver: zodResolver(changePasswordSchema),
	});

	const [showPsw, setShowPsw] = useState(0);

	const handleShowPswChange = (): void => {
		setShowPsw(showPsw ^ 1);
	};

	const onSubmit: SubmitHandler<ChangePasswordFormFields> = async (data) => {
		if (data.newPsw !== data.confirmPsw) {
			setError('confirmPsw', {
				message: 'Le nuove password non corrispondono.',
			});
			toast.error('Le nuove password non corrispondono.');
			return;
		}

		try {
			await axios
				.put('/api/user/change-password', {
					email: session?.user.email,
					data,
				})
				.then(() => {
					void router.push('/user/profile');
					toast.success('Password cambiata correttamente.');
				});
		} catch (err) {
			setError('oldPsw', { message: 'La vecchia password non corrisponde.' });
			toast.error('La vecchia password non corrisponde.');
		}
	};

	return {
		register,
		handleSubmit,
		errors,
		isSubmitting,
		showPsw,
		handleShowPswChange,
		onSubmit,
	};
};
