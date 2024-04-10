import { CategoryTypeWithUsers } from '@/types/category';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const UseCategoriesAndAudiences = () => {
	const [categories, setCategories] = useState<CategoryTypeWithUsers[]>([]);
	const [loadingCategories, setLoadingCategories] = useState(true);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		axios
			.get('/api/category/get-categories-and-audiences')
			.then((res) => {
				setCategories(res.data.message);
				setLoadingCategories(false);
			})
			.catch(() => toast.error('Network error'));
	}, []);

	const handleEditCategoryTabOpened = (): void => {
		setShowModal(true);
	};

	const handleCloseModal = (): void => {
		setShowModal(false);
	};

	return { categories, loadingCategories, showModal, handleEditCategoryTabOpened, handleCloseModal };
};
