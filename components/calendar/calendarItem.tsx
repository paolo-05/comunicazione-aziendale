import { PostSummary } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface CalendarItemProps {
	day: number;
	dayEvents: PostSummary[];
	currentDate: Date;
	actualDate: Date;
}

export const CalendarItem: React.FC<CalendarItemProps> = ({ day, dayEvents, currentDate, actualDate }) => {
	const [eventIndex, setEventIndex] = useState(0);

	const handleNextEvent = useCallback(() => {
		if (eventIndex < dayEvents.length - 1) {
			setEventIndex(eventIndex + 1);
		} else {
			setEventIndex(0);
		}
	}, [dayEvents.length, eventIndex]);

	useEffect(() => {
		const interval = setInterval(() => {
			handleNextEvent();
		}, 3000);

		return () => {
			clearInterval(interval);
		};
	}, [handleNextEvent]);

	const handlePreviousEvent = useCallback(() => {
		if (eventIndex > 0) {
			setEventIndex(eventIndex - 1);
		} else {
			setEventIndex(dayEvents.length - 1);
		}
	}, [dayEvents.length, eventIndex]);

	const renderDay = () => {
		if (dayEvents.length === 0) {
			return <div className='text-gray-400'>Nessun evento</div>;
		}

		if (dayEvents.length === 1) {
			return (
				<div className='flex items-center justify-between'>
					<Event dayEvents={dayEvents} eventIndex={0} />
				</div>
			);
		}

		return (
			<div className='flex items-center justify-between'>
				<button className='hover:text-secondary hover:bg-gray-200 dark:hover:bg-gray-600' onClick={handlePreviousEvent}>
					{'<'}
				</button>

				<Event dayEvents={dayEvents} eventIndex={eventIndex} />

				<button className='hover:text-secondary hover:bg-gray-200 dark:hover:bg-gray-600' onClick={handleNextEvent}>
					{'>'}
				</button>
			</div>
		);
	};

	return (
		<div
			className={`flex flex-col items-center justify-center rounded-lg p-2 ${
				currentDate.toDateString() == actualDate.toDateString()
					? 'bg-primary-700 text-white font-bold'
					: 'bg-gray-100 max-w-lg dark:bg-gray-700'
			}`}
		>
			<DayText day={day} />
			{renderDay()}
			{dayEvents.length > 1 && (
				<div className='flex flex-row items-center justify-center'>
					{dayEvents.map((event, index) => (
						<hr
							key={index}
							className={`h-1 my-2 w-6 mx-1 ${eventIndex === index ? 'dark:bg-white bg-black' : 'dark:bg-gray-300 bg-gray-600'}`}
						/>
					))}
				</div>
			)}
		</div>
	);
};

interface DayTextProps {
	day: number;
}

const DayText: React.FC<DayTextProps> = ({ day }) => (
	<span className='rounded-lg p-1 hover:text-secondary text-3xl'>{day}</span>
);

interface EventProps {
	dayEvents: PostSummary[];
	eventIndex: number;
}

const Event: React.FC<EventProps> = ({ dayEvents, eventIndex }) => (
	<div className='flex-row items-start justify-between m-1'>
		<hr className='h-px my-4 dark:bg-gray-200 border-0 bg-gray-700' />
		<Link href={`/post/${dayEvents[eventIndex].id}`}>
			<Image
				src={dayEvents[eventIndex].imageURL}
				alt={dayEvents[eventIndex].title}
				width={500}
				height={500}
				loading='lazy'
				className='rounded-lg'
			/>
			<hr className='h-px my-4 dark:bg-gray-200 border-0 bg-gray-700' />
			<h2 className='font-semibold underline'>{dayEvents[eventIndex].title}</h2>
		</Link>
	</div>
);
