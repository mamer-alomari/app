import { useState, useEffect } from 'react';
import { Worker, Vehicle } from '../../types/worker';
import { checkWorkerAvailability } from '../../utils/scheduleUtils';

interface AssignmentModalProps {
  jobId: string;
  date: string;
  workers: Worker[];
  vehicles: Vehicle[];
  onAssign: (jobId: string, data: {
    workers: string[];
    vehicle: string;
    estimatedDuration: number;
  }) => void;
  onClose: () => void;
}

export default function AssignmentModal({
  jobId,
  date,
  workers,
  vehicles,
  onAssign,
  onClose
}: AssignmentModalProps) {
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [startTime, setStartTime] = useState('09:00');
  const [estimatedDuration, setEstimatedDuration] = useState(4);
  const [error, setError] = useState<string | null>(null);

  // Calculate end time based on start time and duration
  const endTime = (() => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + estimatedDuration * 60;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  })();

  // Check worker availability
  const availableWorkers = workers.filter(worker =>
    checkWorkerAvailability(worker.id, date, startTime, endTime)
  );

  const unavailableWorkers = workers.filter(worker =>
    !checkWorkerAvailability(worker.id, date, startTime, endTime)
  );

  const handleSubmit = () => {
    // Validate duration
    if (estimatedDuration > 8) {
      setError('Jobs longer than 8 hours need to be split into multiple days');
      return;
    }

    // Validate worker count
    if (selectedWorkers.length < 2) {
      setError('Please select at least 2 workers');
      return;
    }

    // Validate vehicle selection
    if (!selectedVehicle) {
      setError('Please select a vehicle');
      return;
    }

    onAssign(jobId, {
      workers: selectedWorkers,
      vehicle: selectedVehicle,
      estimatedDuration
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Assign Resources</h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Duration (hours)
            </label>
            <input
              type="number"
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(Number(e.target.value))}
              min="1"
              max="8"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Workers (min 2)
            </label>
            <div className="space-y-2">
              {availableWorkers.map(worker => (
                <label key={worker.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedWorkers.includes(worker.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedWorkers([...selectedWorkers, worker.id]);
                      } else {
                        setSelectedWorkers(selectedWorkers.filter(id => id !== worker.id));
                      }
                    }}
                    className="mr-2"
                  />
                  <span>{worker.firstName} {worker.lastName} ({worker.role})</span>
                </label>
              ))}
              {unavailableWorkers.map(worker => (
                <div key={worker.id} className="flex items-center text-gray-400">
                  <input
                    type="checkbox"
                    disabled
                    className="mr-2"
                  />
                  <span>
                    {worker.firstName} {worker.lastName} ({worker.role}) - Unavailable
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Vehicle
            </label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select a vehicle</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} ({vehicle.capacity})
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-black text-white py-2 rounded-lg"
            >
              Assign Resources
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-black py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}