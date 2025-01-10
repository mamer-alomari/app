import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, parseISO, startOfWeek, endOfWeek } from 'date-fns';

interface Job {
  id: string;
  date: string;
  time: string;
  status: string;
}

interface CalendarProps {
  jobs: Job[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function Calendar({ jobs, selectedDate, onSelectDate }: CalendarProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  // Get all days including those from previous/next months
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getJobsForDate = (date: Date) => {
    return jobs.filter(job => 
      isSameDay(parseISO(job.date), date)
    );
  };

  const getDayClasses = (day: Date) => {
    const jobsOnDay = getJobsForDate(day);
    const isSelected = isSameDay(day, selectedDate);
    const isTodayDate = isToday(day);
    const isCurrentMonth = day.getMonth() === selectedDate.getMonth();

    return `
      aspect-square flex flex-col items-center justify-center p-1 relative cursor-pointer
      ${isSelected ? 'bg-black text-white' : 'hover:bg-gray-100'}
      ${isTodayDate && !isSelected ? 'text-blue-600 font-semibold' : ''}
      ${jobsOnDay.length > 0 && !isSelected ? 'border-2 border-blue-500' : ''}
      ${!isCurrentMonth ? 'text-gray-300' : ''}
      rounded-lg
    `;
  };

  const formatDayHeader = (day: string) => {
    return day.charAt(0);
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            const newDate = new Date(selectedDate);
            newDate.setMonth(newDate.getMonth() - 1);
            onSelectDate(newDate);
          }}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ‹
        </button>
        <h2 className="text-lg font-semibold">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => {
            const newDate = new Date(selectedDate);
            newDate.setMonth(newDate.getMonth() + 1);
            onSelectDate(newDate);
          }}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
          <div key={day} className="text-center text-xs text-gray-500 font-medium pb-2">
            {formatDayHeader(day)}
          </div>
        ))}

        {days.map(day => {
          const jobsOnDay = getJobsForDate(day);
          const isCurrentMonth = day.getMonth() === selectedDate.getMonth();

          return (
            <button
              key={day.toString()}
              onClick={() => onSelectDate(day)}
              className={getDayClasses(day)}
              disabled={!isCurrentMonth}
            >
              <span className="text-sm">{format(day, 'd')}</span>
              {jobsOnDay.length > 0 && (
                <div className="absolute bottom-1 flex gap-0.5">
                  {jobsOnDay.map((_, index) => (
                    <span
                      key={index}
                      className={`w-1 h-1 rounded-full ${
                        isSameDay(day, selectedDate) ? 'bg-white' : 'bg-blue-500'
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}