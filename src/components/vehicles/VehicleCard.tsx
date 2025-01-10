import { Vehicle } from '../../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-gray-500">VIN: {vehicle.vin}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          vehicle.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : vehicle.status === 'maintenance'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">License Plate</p>
          <p className="font-medium">{vehicle.licensePlate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Capacity</p>
          <p className="font-medium">{vehicle.capacity}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Insurance Policy</p>
            <p className="font-medium">{vehicle.insurancePolicyNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Insurance Expiry</p>
            <p className="font-medium">{new Date(vehicle.insuranceExpiry).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="border-t mt-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Registration Expiry</p>
            <p className="font-medium">{new Date(vehicle.registrationExpiry).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2 justify-end">
            <button className="text-blue-600 text-sm">View Documents</button>
            <button className="text-blue-600 text-sm">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}