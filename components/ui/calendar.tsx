import React, { useState, useEffect } from "react";
import axios from "axios";

interface Event {
  id: number;
  title: string;
  actualDate: string;
}

const Calendar: React.FC = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [currentDay] = useState(currentDate.getDate());
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

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

  const renderEmptyCells = (): JSX.Element[] => {
    const emptyCellsCount: number =
      firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    return Array.from({ length: emptyCellsCount }).map((_, index: number) => (
      <div key={`empty-${index}`} className="text-center text-gray-400">
        {" "}
      </div>
    ));
  };

  const handleDayHover = (day: number) => {
    setHoveredDay(day);
  };

  const handleDayLeave = () => {
    setHoveredDay(null);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg">
      <div className="bg-primary-200 dark:bg-primary-700 p-4 rounded-t-lg">
        {new Date(year, month).toLocaleString("it-IT", {
          month: "long",
          year: "numeric",
        })}
      </div>

      <div className="grid grid-cols-7 gap-1 p-4 text-gray-800 dark:text-gray-200">
        <div className="text-center font-bold text-gray-900 dark:text-gray-100">
          L
        </div>
        <div className="text-center font-bold text-gray-900 dark:text-gray-100">
          M
        </div>
        <div className="text-center font-bold text-gray-900 dark:text-gray-100">
          M
        </div>
        <div className="text-center font-bold text-gray-900 dark:text-gray-100">
          G
        </div>
        <div className="text-center font-bold text-gray-900 dark:text-gray-100">
          V
        </div>
        <div className="text-center font-bold text-gray-900 dark:text-gray-100">
          S
        </div>
        <div className="text-center font-bold text-gray-900 dark:text-gray-100">
          D
        </div>
        {renderEmptyCells()}
        {[...Array(daysInMonth).keys()].map((day: number) => {
          const currentDate: Date = new Date(year, month, day + 1);
          const formattedDate: string = currentDate.toISOString().split("T")[0];
          const event: Event | undefined = events.find(
            (event) => event.actualDate.split("T")[0] === formattedDate
          );

          return (
            <div
              key={day}
              className="text-center relative cursor-pointer"
              onMouseEnter={() => handleDayHover(day + 1)}
              onMouseLeave={handleDayLeave}
            >
              <span
                className={`${event && "underline"} ${
                  day + 1 === currentDay &&
                  "bg-primary-700 text-white font-bold"
                } ${
                  day + 1 === currentDay ? "font-bold" : ""
                } hover:text-secondary`}
              >
                {day + 1}
              </span>
              {hoveredDay === day + 1 && (
                <div className="z-50 absolute top-full left-0 bg-white dark:bg-gray-900 shadow-md p-2 rounded-md text-sm">
                  {event ? event.title : "No events"}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between px-4 pb-4">
        <button
          onClick={goToPreviousMonth}
          className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
        >
          {"<"}
        </button>
        <button
          onClick={goToCurrentMonth}
          className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
        >
          Oggi
        </button>
        <button
          onClick={goToNextMonth}
          className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Calendar;
