import { useCalendar } from '@/hooks/post';
import { type PostSummary } from '@/types/post';
import Link from 'next/link';
import React from 'react';

export const Calendar: React.FC = () => {
	const {
		firstDayOfWeek,
		year,
		month,
		daysInMonth,
		events,
		hoveredDay,
		handleDayHover,
		handleDayLeave,
		currentDay,
		goToCurrentMonth,
		goToNextMonth,
		goToPreviousMonth,
	} = useCalendar();

	const renderEmptyCells = (): JSX.Element[] => {
		const emptyCellsCount: number = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
		return Array.from({ length: emptyCellsCount }).map((_, index: number) => (
			<div key={`empty-${index}`} className='text-center text-gray-400'>
				{' '}
			</div>
		));
	};

	return (
		<div className='w-full bg-white dark:bg-gray-800 rounded-lg'>
			<div className='bg-primary-200 dark:bg-primary-700 p-4 rounded-t-lg'>
				{new Date(year, month).toLocaleString('it-IT', {
					month: 'long',
					year: 'numeric',
				})}
			</div>

			<div className='grid grid-cols-7 gap-1 p-4 text-gray-800 dark:text-gray-200'>
				<div className='text-center font-bold text-gray-900 dark:text-gray-100'>L</div>
				<div className='text-center font-bold text-gray-900 dark:text-gray-100'>M</div>
				<div className='text-center font-bold text-gray-900 dark:text-gray-100'>M</div>
				<div className='text-center font-bold text-gray-900 dark:text-gray-100'>G</div>
				<div className='text-center font-bold text-gray-900 dark:text-gray-100'>V</div>
				<div className='text-center font-bold text-gray-900 dark:text-gray-100'>S</div>
				<div className='text-center font-bold text-gray-900 dark:text-gray-100'>D</div>
				{renderEmptyCells()}
				{[...Array(daysInMonth).keys()].map((day: number) => {
					const currentDate: Date = new Date(year, month, day + 1);
					const formattedDate: string = currentDate.toISOString().split('T')[0];
					const dayEvents: PostSummary[] = events.filter((event) => event.actualDate.split('T')[0] === formattedDate);

					return (
						<div
							key={day}
							className='text-center relative cursor-pointer'
							onMouseEnter={() => {
								handleDayHover(day + 1);
							}}
							onMouseLeave={handleDayLeave}
						>
							<span
								className={`${dayEvents.length > 0 && 'underline'} ${
									day + 1 === currentDay && 'bg-primary-700 text-white font-bold rounded-lg p-1'
								} hover:text-secondary`}
							>
								{day + 1}
							</span>
							{hoveredDay === day + 1 && dayEvents.length > 0 && (
								<div className='z-50 absolute top-full left-0 bg-white dark:bg-gray-900 shadow-md p-2 rounded-md text-sm'>
									<ul className='list-disc pl-5'>
										{dayEvents.map((event) => (
											<li key={event.id}>
												{' '}
												<Link href={`/post/${event.id}`}>{event.title}</Link>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					);
				})}
			</div>
			<div className='flex justify-between px-4 pb-4'>
				<button
					onClick={goToPreviousMonth}
					className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded'
				>
					{'<'}
				</button>
				<button
					onClick={goToCurrentMonth}
					className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded'
				>
					Oggi
				</button>
				<button
					onClick={goToNextMonth}
					className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded'
				>
					{'>'}
				</button>
			</div>
		</div>
	);
};
