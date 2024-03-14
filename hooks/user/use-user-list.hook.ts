import { type UserSecure } from '@/types/user';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

/**
 * This hook fetches the users and handles alert for CRUD operations
 * @returns an array containing the users
 */
export const useUserList = () => {
	const [users, setUsers] = useState<UserSecure[] | null>(null);

	useEffect(() => {
		axios
			.get('/api/user/list-all')
			.then((response: any) => {
				const users: UserSecure[] = response.data.message;
				setUsers(users);
			})
			.catch(() => toast.error('Network error'));
	}, []);

	return {
		users,
	};
};
