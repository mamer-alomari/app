import { useState } from 'react';
import { format } from 'date-fns';
import type { ScheduledJob } from '../../data/mockScheduleData';

interface NewJobModalProps {
  selectedDate: Date;
  onSubmit: (jobData: Partial<ScheduledJob>) => void;
  onClose: () => void;
}

export default function NewJobModal({
  selectedDate,
  onSubmit,
  onClose
}: NewJobModalProps) {
  const [jobData, setJobData] = useState<Partial<ScheduledJob>>({
    date: format(selectedDate, 'yyyy-MM-dd'),
    startTime: '09:00',
    estimatedDuration: 4
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(jobData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Schedule New Job</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              value={jobData.customerName || ''}
              onChange={(e) => setJobData({ ...jobData, customerName: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={jobData.address || ''}
              onChange={(e) => setJobData({ ...jobData, address: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={jobData.date}
              onChange={(e) => setJobData({ ...jobData, date: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={jobData.startTime}
              onChange={(e) => setJobData({ ...jobData, startTime: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Duration (hours)
            </label>
            <input
              type="number"
              value={jobData.estimatedDuration}
              onChange={(e) => setJobData({ ...jobData, estimatedDuration: Number(e.target.value) })}
              min="1"
              max="8"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 rounded-lg"
            >
              Create Job
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-black py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}