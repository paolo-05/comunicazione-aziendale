import { PostSummary } from "@/types/postType";
import axios from "axios";
import { useEffect, useState } from "react";

export const useCalendar = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [currentDay] = useState(currentDate.getDate());
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [events, setEvents] = useState<PostSummary[]>([]);

  useEffect(() => {
    axios
      .get("/api/post/get-calendarized-events")
      .then((res) => setEvents(res.data.message));
  }, []);

  const goToPreviousMonth = () => {
    if (month === 0) {
      setYear((prevYear) => prevYear - 1);
      setMonth(11);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setYear((prevYear) => prevYear + 1);
      setMonth(0);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const goToCurrentMonth = () => {
    const currentDate = new Date();
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth());
  };

  const daysInMonth: number = new Date(year, month + 1, 0).getDate(); // Get total number of days in the month
  const firstDayOfWeek: number = new Date(year, month, 1).getDay(); // Get day of the week for the first day of the month (0 for Sunday, 1 for Monday, ..., 6 for Saturday)

  const handleDayHover = (day: number) => {
    setHoveredDay(day);
  };

  const handleDayLeave = () => {
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
    currentDate,
    currentDay,
    goToCurrentMonth,
    goToNextMonth,
    goToPreviousMonth,
  };
};
