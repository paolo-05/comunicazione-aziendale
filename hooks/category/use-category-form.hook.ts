import { type CategoryFormFields, type CategoryFormModalProps, categoryFormSchema } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

export const useCategoryForm = ({ initialFormData, onClose }: CategoryFormModalProps) => {
	const router = useRouter();
	const [selectedColor, setSelectedColor] = useState<string>(initialFormData?.colour ?? 'red');

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<CategoryFormFields>({
		defaultValues: {
			id: initialFormData?.id ?? 0,
			name: initialFormData?.name ?? '',
			description: initialFormData?.description ?? '',
		},
		resolver: zodResolver(categoryFormSchema),
	});

	const onSubmit: SubmitHandler<CategoryFormFields> = async (data) => {
		if (initialFormData == null) {
			await axios.post('/api/category/create', { data, selectedColor });
		} else await axios.put('/api/category/edit', { data, selectedColor });
		// close the form
		onClose();
		router.reload();
	};

	return {
		setSelectedColor,
		register,
		handleSubmit,
		errors,
		isSubmitting,
		onSubmit,
	};
};
