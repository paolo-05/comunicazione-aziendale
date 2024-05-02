import { CategoryType } from '@/types/category';
import { UsersIcon } from '../svg';

interface TargetCategoriesProps {
	categories: CategoryType[];
}

export const TargetCategories = ({ categories }: TargetCategoriesProps) => {
	console.log(categories);

	return (
		<div className='grid gap-1'>
			<div className='flex items-center gap-3'>
				<UsersIcon className='w-6 h-6 mr-2' />
				{categories.map((category, index) => (
					<span
						key={index}
						className={`ring-${category.colour}-800 dark:ring-${category.colour}-300 text-xs font-medium ring-4 rounded-lg py-1 px-2 bg-gray-100 dark:bg-gray-800`}
					>
						{category.name}
					</span>
				))}
			</div>
		</div>
	);
};
