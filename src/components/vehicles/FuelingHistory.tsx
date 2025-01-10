import { useState } from 'react';
import { Vehicle } from '../../types/vehicle';
import { format } from 'date-fns';

interface FuelingHistoryProps {
  vehicle: Vehicle;
}

export default function FuelingHistory({ vehicle }: FuelingHistoryProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Fueling History</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Add Fuel Record
        </button>
      </div>

      <div className="space-y-4">
        {vehicle.fuelingHistory.map(record => (
          <div key={record.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{record.location}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(record.date), 'MMM d, yyyy')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">${record.totalCost.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{record.gallons} gal</p>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
              <p>Driver: {record.driver}</p>
              <p>Mileage: {record.mileage.toLocaleString()} mi</p>
              <p>${record.pricePerGallon.toFixed(2)}/gal</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}