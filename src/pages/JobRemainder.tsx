import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/schedule/Calendar';
import NotificationSettings from '../components/schedule/NotificationSettings';
import { format, parseISO } from 'date-fns';

interface Job {
  id: string;
  date: string;
  time: string;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  items: string[];
  source: string;
  destination: string;
  notes?: string;
}

const mockJobs: Job[] = [
  {
    id: 'MOV-1234',
    date: '2024-02-15',
    time: '09:00',
    status: 'upcoming',
    items: ['2x Arm Chairs', '1x 3 Seater Sofa'],
    source: '940 Strooman Key. Apt 334',
    destination: '123 New Address St.',
    notes: 'Please handle with care'
  },
  {
    id: 'MOV-5678',
    date: '2024-02-20',
    time: '14:00',
    status: 'upcoming',
    items: ['1x Dining Table', '4x Dining Chairs'],
    source: '555 Main St.',
    destination: '777 New Ave.',
    notes: 'Fragile items'
  }
];

type ViewType = 'calendar' | 'list' | 'settings';

export default function JobRemainder() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewType>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const jobsForSelectedDate = mockJobs.filter(job => 
    format(parseISO(job.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Schedule</h1>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setView('settings')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="border-b">
        <div className="flex">
          <button
            onClick={() => setView('calendar')}
            className={`flex-1 py-3 text-center border-b-2 ${
              view === 'calendar'
                ? 'border-black text-black font-semibold'
                : 'border-transparent text-gray-500'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex-1 py-3 text-center border-b-2 ${
              view === 'list'
                ? 'border-black text-black font-semibold'
                : 'border-transparent text-gray-500'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      <div className="p-4">
        {view === 'calendar' && (
          <div>
            <Calendar
              jobs={mockJobs}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
            {jobsForSelectedDate.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold mb-2">
                  Jobs for {format(selectedDate, 'MMMM d, yyyy')}
                </h2>
                {jobsForSelectedDate.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'list' && (
          <div className="space-y-4">
            {mockJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {view === 'settings' && (
          <NotificationSettings />
        )}
      </div>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  const navigate = useNavigate();

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleReschedule = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/job-reschedule/${job.id}`);
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold">{job.id}</h3>
          <p className="text-sm text-gray-500">
            {job.date} at {job.time}
          </p>
        </div>
        <span className={`${getStatusColor(job.status)} text-white px-2 py-1 rounded-full text-xs`}>
          {job.status.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </span>
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-sm text-gray-500">Items:</p>
          <p className="text-sm">{job.items.join(', ')}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-gray-500">From:</p>
            <p className="text-sm truncate">{job.source}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">To:</p>
            <p className="text-sm truncate">{job.destination}</p>
          </div>
        </div>

        {job.notes && (
          <div>
            <p className="text-sm text-gray-500">Notes:</p>
            <p className="text-sm">{job.notes}</p>
          </div>
        )}

        {job.status === 'upcoming' && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleReschedule}
              className="flex-1 bg-black text-white py-2 rounded-lg text-sm"
            >
              Reschedule
            </button>
          </div>
        )}
      </div>
    </div>
  );
}