import { useState } from 'react';
import { Vehicle } from '../../types/vehicle';
import { format } from 'date-fns';
import AddServiceRecord from './AddServiceRecord';

interface MaintenanceHistoryProps {
  vehicle: Vehicle;
}

export default function MaintenanceHistory({ vehicle }: MaintenanceHistoryProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Maintenance History</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Add Service Record
        </button>
      </div>

      <AddServiceRecord
        vehicleId={vehicle.id}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleSuccess}
      />

      <div className="space-y-4">
        {vehicle.maintenanceHistory.map(record => (
          <div key={record.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{record.serviceType}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(record.serviceDate), 'MMM d, yyyy')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">${record.totalCost.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{record.mileage.toLocaleString()} mi</p>
              </div>
            </div>
            <p className="text-gray-600">{record.description}</p>
            <div className="mt-2 flex justify-between items-center text-sm">
              <p className="text-gray-500">Performed by: {record.performedBy}</p>
              {record.nextServiceMileage && (
                <p className="text-gray-500">
                  Next service: {record.nextServiceMileage.toLocaleString()} mi
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}