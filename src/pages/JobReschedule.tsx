import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format, addDays, setHours, setMinutes } from 'date-fns';

export default function JobReschedule() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Calculate minimum date (today)
  const minDate = format(new Date(), 'yyyy-MM-dd');
  // Calculate maximum date (3 months from today)
  const maxDate = format(addDays(new Date(), 90), 'yyyy-MM-dd');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to update the job
    // For now, we'll just simulate success and navigate back
    
    navigate(`/job-remainder`);
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = setHours(setMinutes(new Date(), 0), 8); // 8 AM
    const end = setHours(setMinutes(new Date(), 0), 20); // 8 PM

    for (let time = start; time <= end; time = addDays(time, 0)) {
      time = setMinutes(time, time.getMinutes() + 30);
      slots.push(format(time, 'HH:mm'));
    }

    return slots;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Reschedule Job</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select New Date
          </label>
          <input
            type="date"
            min={minDate}
            max={maxDate}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select New Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          >
            <option value="">Select a time slot</option>
            {generateTimeSlots().map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-black text-white text-lg py-4 rounded-lg"
          >
            Confirm Reschedule
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-gray-200 text-black text-lg py-4 rounded-lg mt-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}