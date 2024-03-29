import { CategoryType } from '@/types/category';
import { type PostFormField, type PostFormProps, postSchema } from '@/types/post';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { init } from 'next/dist/compiled/webpack/webpack';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const usePostForm = ({ initialData }: PostFormProps) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<PostFormField>({
		defaultValues: {
			id: initialData?.id ?? -1,
			title: initialData?.title ?? '',
		},
		resolver: zodResolver(postSchema),
	});

	const [editorData, setEditorData] = useState<string>(initialData?.description ?? '<h2>Scrivi Qua</h2>');
	const [editorError, setEditorError] = useState<string>('');

	const [range, setRange] = useState<any>({
		startDate: initialData?.startDate ?? null,
		endDate: initialData?.endDate ?? null,
	});
	const [rangeError, setRangeError] = useState<string>('');

	const [value, setValue] = useState<any>({
		startDate: initialData?.actualDate ?? null,
		endDate: initialData?.actualDate ?? null,
	});
	const [valueError, setValueError] = useState<string>('');

	const [showImageModal, setShowImageModal] = useState(false);
	const [imageURL, setImageURL] = useState<string | null>(initialData?.imageURL ?? null);
	const [imageURLError, setImageURLError] = useState('');

	const [targets, setTargets] = useState<string[]>([]);
	const [targetsError, setTargetsError] = useState('');

	const handleRangeChange = (newValue: any): void => {
		setRange(newValue);
		setRangeError('');
	};

	const handleValueChange = (newValue: any): void => {
		setValue(newValue);
		setValueError('');
	};

	const handleEditorDataChange = (value: string): void => {
		setEditorData(value);
		setEditorError('');
	};

	const handleImageUrlChange = (value: string): void => {
		setImageURL(value);
		setImageURLError('');
	};

	const handleModalChange = (): void => {
		setShowImageModal(!showImageModal);
	};

	const onSubmit: SubmitHandler<PostFormField> = async (data) => {
		let errs = false;

		if (range.startDate === null || range.endDate === null) {
			setRangeError('Campo richiesto');
			errs = true;
		}
		if (value.startDate === null) {
			setValueError('Campo richiesto');
			errs = true;
		}
		if (editorData.length === 0) {
			setEditorError('Campo richiesto');
			errs = true;
		}

		if (value.startDate < range.endDate) {
			setValueError('La data effettiva di un evento deve essere dopo il suo range di visualizzazione');
			errs = true;
		}

		if (imageURL === null) {
			setImageURLError("L'immagine di copertina è un campo richiesto.");
			errs = true;
		}

		if (errs) {
			return;
		}

		if (initialData == null) {
			// new post
			await axios
				.post('/api/post/create', {
					title: data.title,
					description: editorData,
					actualDate: value.startDate,
					startDate: range.startDate,
					endDate: range.endDate,
					imageURL,
				})
				.catch(() => toast.error("Errore nella creazione dell'evento"))
				.finally(() => {
					void router.push('/dashboard');
					toast.success('Evento creato con sucesso!');
				});
		} else {
			// edit post
			await axios
				.put('/api/post/edit', {
					id: data.id,
					title: data.title,
					description: editorData,
					actualDate: value.startDate,
					startDate: range.startDate,
					endDate: range.endDate,
					imageURL,
				})
				.catch(() => toast.error("Errore nella modifica dell'evento"))
				.finally(() => {
					void router.push('/dashboard');
					toast.success('Evento modificato con successo!');
				});
		}
	};

	return {
		handleSubmit,
		onSubmit,
		register,
		errors,
		range,
		handleRangeChange,
		rangeError,
		value,
		handleValueChange,
		showImageModal,
		handleModalChange,
		imageURL,
		handleImageUrlChange,
		imageURLError,
		valueError,
		editorData,
		handleEditorDataChange,
		editorError,
		targets,
		setTargets,
		targetsError,
		setTargetsError,
		isSubmitting,
	};
};
