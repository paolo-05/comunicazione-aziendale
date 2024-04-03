import { CategoryType } from '@/types/category';

interface TargetCategoriesProps {
	categories: CategoryType[] | undefined;
}

export const TargetCategories = ({ categories }: TargetCategoriesProps) => {
	return (
		<div className='grid gap-1'>
			<div className='flex items-center gap-3'>
				<UsersIcon className='w-6 h-6 mr-2' />
				{categories?.map((category) => (
					<span
						key={category.id}
						className={`ring-${category.colour}-800 dark:ring-${category.colour}-300 text-xs font-medium ring-4 rounded-lg py-1 px-2 bg-gray-100 dark:bg-gray-800`}
					>
						{category.name}
					</span>
				))}
			</div>
		</div>
	);
};

function UsersIcon(props: any): React.ReactElement {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
			<circle cx='9' cy='7' r='4' />
			<path d='M22 21v-2a4 4 0 0 0-3-3.87' />
			<path d='M16 3.13a4 4 0 0 1 0 7.75' />
		</svg>
	);
}
