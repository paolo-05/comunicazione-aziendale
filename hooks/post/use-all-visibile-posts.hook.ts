import { VisibilePostType } from '@/types/post';
import axios from 'axios';
import { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useAllVisiblePosts = () => {
	const today = new Date();
	const [posts, setPosts] = useState<VisibilePostType[]>([]);

	useEffect(() => {
		axios
			.get('/api/post/list-all')
			.then((res) => {
				setPosts(res.data.message as VisibilePostType[]);
			})
			.catch(() => toast.error('Network error'));
	}, []);

	return { posts, today };
};
