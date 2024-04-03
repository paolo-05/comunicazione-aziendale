import { useRouter } from 'next/router';
import { type PostType } from '@/types/post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CategoryType } from '@/types/category';

/**
 * This hook fetches from the api a post by a given id.
 * @param id the post's id to fetch
 * @returns `PostType`
 */
export const usePost = () => {
	const router = useRouter();
	const { id } = router.query;

	const [post, setPost] = useState<PostType | null>();
	const [categories, setCategories] = useState<CategoryType[]>();

	useEffect(() => {
		const fetchPostData = async (): Promise<void> => {
			try {
				const postResponse = await axios.get(`/api/post/${id}`);
				setPost(postResponse.data.message as PostType);

				const categoriesResponse = await axios.get(`/api/category/get-by-post-id?postId=${id}`);
				setCategories(categoriesResponse.data.message as CategoryType[]);
			} catch (error) {
				toast.error('Evento non trovato.');
				router.push('/');
			}
		};

		if (id !== undefined) {
			fetchPostData();
		}
	}, [id, router]);

	return {
		post,
		categories,
	};
};
