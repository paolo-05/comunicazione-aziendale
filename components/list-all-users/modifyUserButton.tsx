import { type UserItemProps } from '@/types/user';
import Link from 'next/link';
import React from 'react';

export default function ModifyUserButton({ user, session }: UserItemProps): React.ReactElement {
	const areTheyTheSamePerson = session?.user.id === user?.id;
	return (
		<ul className='py-1 text-sm text-gray-700 dark:text-gray-200'>
			<li>
				<Link
					href={areTheyTheSamePerson ? '/user/list-all' : `/user/edit?id=${user?.id}`}
					className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
				>
					{areTheyTheSamePerson ? 'Non modificabile' : 'Modifica'}
				</Link>
			</li>
		</ul>
	);
}
