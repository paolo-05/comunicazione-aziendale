import React, { useState, useEffect } from "react";

interface Event {
  date: string;
  summary: string;
}

const Calendar: React.FC = () => {
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(1); // January is 0, February is 1, ..., December is 11
  const [events, setEvents] = useState<Event[]>([]);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  useEffect(() => {
    // Simulated fetch of events data
    // Replace this with your actual data fetching logic
    const fetchEventsData = async () => {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Example events data for demonstration
      const eventData: Event[] = [
        { date: "2024-02-03", summary: "Meeting with clients" },
        { date: "2024-02-10", summary: "Birthday party" },
        { date: "2024-02-15", summary: "Project deadline" },
      ];
      setEvents(eventData);
    };

    fetchEventsData();
  }, [year, month]);

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
        {new Date(year, month).toLocaleString("default", {
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
            (event) => event.date === formattedDate
          );

          return (
            <div
              key={day}
              className="text-center relative cursor-pointer"
              onMouseEnter={() => handleDayHover(day + 1)}
              onMouseLeave={handleDayLeave}
            >
              <span className={`${event && "underline"} hover:text-secondary`}>
                {day + 1}
              </span>
              {hoveredDay === day + 1 && (
                <div className="z-50 absolute top-full left-0 bg-white dark:bg-gray-900 shadow-md p-2 rounded-md text-sm">
                  {event ? event.summary : "No events"}
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
