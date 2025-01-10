import { useState } from 'react';
import { Vehicle } from '../../types/vehicle';
import { toast } from 'react-hot-toast';

interface AddVehicleModalProps {
  onSubmit: (vehicleData: Vehicle) => void;
  onClose: () => void;
}

export default function AddVehicleModal({ onSubmit, onClose }: AddVehicleModalProps) {
  const [vehicleData, setVehicleData] = useState<Partial<Vehicle>>({
    status: 'active'
  });
  const [insuranceDoc, setInsuranceDoc] = useState<File | null>(null);
  const [registrationDoc, setRegistrationDoc] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!vehicleData.make || !vehicleData.model || !vehicleData.year || 
        !vehicleData.vin || !vehicleData.licensePlate || !vehicleData.capacity ||
        !vehicleData.insurancePolicyNumber || !vehicleData.insuranceExpiry || 
        !vehicleData.registrationExpiry || !insuranceDoc || !registrationDoc) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create a complete vehicle object
    const newVehicle: Vehicle = {
      id: `V${Date.now()}`,
      ...vehicleData as Vehicle
    };

    onSubmit(newVehicle);
    toast.success('Vehicle added successfully');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Add New Vehicle</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <input
                type="text"
                value={vehicleData.make || ''}
                onChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                value={vehicleData.model || ''}
                onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                value={vehicleData.year || ''}
                onChange={(e) => setVehicleData({ ...vehicleData, year: Number(e.target.value) })}
                className="w-full p-2 border rounded-lg"
                min="1900"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VIN
              </label>
              <input
                type="text"
                value={vehicleData.vin || ''}
                onChange={(e) => setVehicleData({ ...vehicleData, vin: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Plate
              </label>
              <input
                type="text"
                value={vehicleData.licensePlate || ''}
                onChange={(e) => setVehicleData({ ...vehicleData, licensePlate: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <input
                type="text"
                value={vehicleData.capacity || ''}
                onChange={(e) => setVehicleData({ ...vehicleData, capacity: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., 26ft - 10,000 lbs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Policy Number
              </label>
              <input
                type="text"
                value={vehicleData.insurancePolicyNumber || ''}
                onChange={(e) => setVehicleData({ ...vehicleData, insurancePolicyNumber: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Expiry
              </label>
              <input
                type="date"
                value={vehicleData.insuranceExpiry || ''}
                onChange={(e) => setVehicleData({ ...vehicleData, insuranceExpiry: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Expiry
              </label>
              <input
                type="date"
                value={vehicleData.registrationExpiry || ''}
                onChange={(e) => setVehicleData({ ...vehicleData, registrationExpiry: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Document
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setInsuranceDoc(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Document
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setRegistrationDoc(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 rounded-lg"
            >
              Add Vehicle
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