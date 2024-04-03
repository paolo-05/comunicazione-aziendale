import { CategoryTypeWithUsers } from '@/types/category';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const UseCategoriesAndAudiences = () => {
	const [categories, setCategories] = useState<CategoryTypeWithUsers[]>([]);

	useEffect(() => {
		axios
			.get('/api/category/get-categories-and-audiences')
			.then((res) => setCategories(res.data.message))
			.catch((err) => toast.error('Network error'));
	}, []);

	return { categories };
};
