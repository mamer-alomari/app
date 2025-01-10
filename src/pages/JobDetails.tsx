import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';

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

const mockJob: Job = {
  id: 'MOV-1234',
  date: '2024-02-15',
  time: '09:00',
  status: 'upcoming',
  items: ['2x Arm Chairs', '1x 3 Seater Sofa'],
  source: '940 Strooman Key. Apt 334',
  destination: '123 New Address St.',
  notes: 'Please handle with care'
};

export default function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <div>
          <h1 className="text-2xl font-bold">{mockJob.id}</h1>
          <p className="text-sm text-gray-500">
            {format(new Date(mockJob.date), 'MMMM d, yyyy')} at {mockJob.time}
          </p>
        </div>
        <span className={`${getStatusColor(mockJob.status)} text-white px-3 py-1 rounded-full text-sm ml-auto`}>
          {mockJob.status.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </span>
      </div>

      <div className="p-4 space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-2">Items</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ul className="list-disc list-inside">
              {mockJob.items.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Location Details</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Pickup Location</p>
              <p>{mockJob.source}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Delivery Location</p>
              <p>{mockJob.destination}</p>
            </div>
          </div>
        </section>

        {mockJob.notes && (
          <section>
            <h2 className="text-lg font-semibold mb-2">Notes</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{mockJob.notes}</p>
            </div>
          </section>
        )}

        {mockJob.status === 'upcoming' && (
          <div className="flex gap-4">
            <button
              onClick={() => setShowReschedule(true)}
              className="flex-1 bg-black text-white text-lg py-4 rounded-lg"
            >
              Reschedule
            </button>
            <button
              onClick={() => setShowCancel(true)}
              className="flex-1 bg-red-500 text-white text-lg py-4 rounded-lg"
            >
              Cancel Move
            </button>
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {showReschedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Reschedule Move</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Time
                </label>
                <input
                  type="time"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowReschedule(false)}
                  className="flex-1 bg-black text-white py-2 rounded-lg"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowReschedule(false)}
                  className="flex-1 bg-gray-200 text-black py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Cancel Move</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel this move? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCancel(false)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg"
              >
                Yes, Cancel Move
              </button>
              <button
                onClick={() => setShowCancel(false)}
                className="flex-1 bg-gray-200 text-black py-2 rounded-lg"
              >
                No, Keep Move
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}