import { useState } from 'react';
import { WorkHours } from '../../types/worker';
import { format } from 'date-fns';

interface WorkerHoursProps {
  hours: WorkHours[];
  onAddHours: (hours: WorkHours) => void;
}

export default function WorkerHours({ hours, onAddHours }: WorkerHoursProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHours, setNewHours] = useState<Partial<WorkHours>>({
    date: format(new Date(), 'yyyy-MM-dd')
  });

  const calculateHours = (clockIn: string, clockOut: string) => {
    const start = new Date(`2000-01-01T${clockIn}`);
    const end = new Date(`2000-01-01T${clockOut}`);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // hours
    const regularHours = Math.min(8, diff);
    const overtimeHours = Math.max(0, diff - 8);
    return { regularHours, overtimeHours };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHours.clockIn || !newHours.clockOut) return;

    const { regularHours, overtimeHours } = calculateHours(
      newHours.clockIn,
      newHours.clockOut
    );

    const hoursEntry: WorkHours = {
      id: `H${Date.now()}`,
      date: newHours.date!,
      clockIn: newHours.clockIn,
      clockOut: newHours.clockOut,
      regularHours,
      overtimeHours,
      jobId: newHours.jobId,
      notes: newHours.notes
    };

    onAddHours(hoursEntry);
    setShowAddModal(false);
    setNewHours({ date: format(new Date(), 'yyyy-MM-dd') });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Work Hours</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-3 py-1 rounded-lg text-sm"
        >
          Add Hours
        </button>
      </div>

      <div className="space-y-2">
        {hours.map(entry => (
          <div key={entry.id} className="border rounded-lg p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{format(new Date(entry.date), 'MMM d, yyyy')}</p>
                <p className="text-sm text-gray-500">
                  {entry.clockIn} - {entry.clockOut}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">Regular: {entry.regularHours}h</p>
                {entry.overtimeHours > 0 && (
                  <p className="text-sm text-orange-600">OT: {entry.overtimeHours}h</p>
                )}
              </div>
            </div>
            {entry.jobId && (
              <p className="text-sm text-gray-500 mt-1">Job: {entry.jobId}</p>
            )}
            {entry.notes && (
              <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
            )}
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add Work Hours</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newHours.date}
                  onChange={e => setNewHours({ ...newHours, date: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Clock In
                  </label>
                  <input
                    type="time"
                    value={newHours.clockIn}
                    onChange={e => setNewHours({ ...newHours, clockIn: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Clock Out
                  </label>
                  <input
                    type="time"
                    value={newHours.clockOut}
                    onChange={e => setNewHours({ ...newHours, clockOut: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job ID (optional)
                </label>
                <input
                  type="text"
                  value={newHours.jobId || ''}
                  onChange={e => setNewHours({ ...newHours, jobId: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., MOV-1234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={newHours.notes || ''}
                  onChange={e => setNewHours({ ...newHours, notes: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  rows={2}
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-2 rounded-lg"
                >
                  Add Hours
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-black py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}