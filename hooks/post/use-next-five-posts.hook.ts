import { type PostType } from '@/types/post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useNextFivePots = () => {
	const [posts, setPosts] = useState<PostType[]>([]);

	useEffect(() => {
		axios
			.get('/api/post/get-next-five-sum')
			.then((res) => {
				setPosts(res.data.message as PostType[]);
			})
			.catch(() => toast.error('Network error'));
	}, []);

	return { posts };
};
