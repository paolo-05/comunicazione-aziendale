import { RecentPostEdit } from '@/types/post';

type RecentEditProps = {
	edit: RecentPostEdit;
};

export const RecentEdit = ({ edit }: RecentEditProps): React.ReactElement => {
	return (
		<div className='flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600'>
			<section>
				<h3 className='font-semibold'>{edit.title}</h3>
				<p className='text-sm text-gray-400'>
					Modificato da {edit.name} {edit.lastName}
				</p>
			</section>
			<time className='text-sm'>
				{new Date(edit.updated_at).toLocaleString('it-IT', {
					hour: '2-digit',
					minute: '2-digit',
					day: '2-digit',
					month: 'long',
					year: 'numeric',
				})}
			</time>
		</div>
	);
};
