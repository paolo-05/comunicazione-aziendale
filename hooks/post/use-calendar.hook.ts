import { type PostSummary } from '@/types/post';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useCalendar = () => {
	const actualDate = new Date();
	const [year, setYear] = useState(actualDate.getFullYear());
	const [month, setMonth] = useState(actualDate.getMonth());
	const [currentDay] = useState(actualDate.getDate());
	const [hoveredDay, setHoveredDay] = useState<number | null>(null);
	const [events, setEvents] = useState<PostSummary[]>([]);

	useEffect(() => {
		axios
			.get('/api/post/get-calendarized-events')
			.then((res) => {
				setEvents(res.data.message as PostSummary[]);
			})
			.catch(() => toast.error('Network error'));
	}, []);

	const goToPreviousMonth = (): void => {
		if (month === 0) {
			setYear((prevYear) => prevYear - 1);
			setMonth(11);
		} else {
			setMonth((prevMonth) => prevMonth - 1);
		}
	};

	const goToNextMonth = (): void => {
		if (month === 11) {
			setYear((prevYear) => prevYear + 1);
			setMonth(0);
		} else {
			setMonth((prevMonth) => prevMonth + 1);
		}
	};

	const goToCurrentMonth = (): void => {
		const actualDate = new Date();
		setYear(actualDate.getFullYear());
		setMonth(actualDate.getMonth());
	};

	const daysInMonth: number = new Date(year, month + 1, 0).getDate(); // Get total number of days in the month
	const firstDayOfWeek: number = new Date(year, month, 1).getDay(); // Get day of the week for the first day of the month (0 for Sunday, 1 for Monday, ..., 6 for Saturday)

	const handleDayHover = (day: number): void => {
		setHoveredDay(day);
	};

	const handleDayLeave = (): void => {
		setHoveredDay(null);
	};

	return {
		firstDayOfWeek,
		year,
		month,
		daysInMonth,
		events,
		hoveredDay,
		handleDayHover,
		handleDayLeave,
		actualDate,
		currentDay,
		goToCurrentMonth,
		goToNextMonth,
		goToPreviousMonth,
	};
};
