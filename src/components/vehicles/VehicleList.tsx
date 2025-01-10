import { useNavigate } from 'react-router-dom';
import { Vehicle } from '../../types/vehicle';

interface VehicleListProps {
  vehicles: Vehicle[];
}

export default function VehicleList({ vehicles }: VehicleListProps) {
  const navigate = useNavigate();

  const handleVehicleClick = (vehicleId: string) => {
    navigate(`/provider/vehicles/${vehicleId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map(vehicle => (
        <div 
          key={vehicle.id}
          onClick={() => handleVehicleClick(vehicle.id)}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-sm text-gray-500">ID: {vehicle.vehicleId}</p>
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
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Next Service</p>
                <p className="font-medium">{vehicle.nextServiceMileage?.toLocaleString()} mi</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/provider/vehicles/${vehicle.id}/maintenance`);
                }}
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}