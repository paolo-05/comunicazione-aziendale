import { CategoryType } from '@/types/category';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useCategoryByPostId = (postId: string | any) => {
	const [categories, setCategories] = useState<CategoryType[]>([]);

	useEffect(() => {
		axios
			.get(`/api/category/get-by-post-id?postId=${postId}`)
			.then((res) => {
				setCategories(res.data.message);
			})
			.catch((err) => toast.error('Network error'));
	}, [postId]);

	return { categories };
};
