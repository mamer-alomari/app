import { Vehicle } from '../../types/vehicle';
import { format } from 'date-fns';

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Vehicle Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Vehicle ID</p>
            <p className="font-medium">{vehicle.vehicleId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">VIN</p>
            <p className="font-medium">{vehicle.vin}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">License Plate</p>
            <p className="font-medium">{vehicle.licensePlate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Capacity</p>
            <p className="font-medium">{vehicle.capacity}</p>
          </div>
        </div>
      </div>

      {/* Mileage & Service */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Mileage & Service</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Current Mileage</p>
            <p className="font-medium">{vehicle.currentMileage.toLocaleString()} mi</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Service</p>
            <p className="font-medium">{vehicle.lastServiceMileage.toLocaleString()} mi</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Next Service Due</p>
            <p className="font-medium">{vehicle.nextServiceMileage.toLocaleString()} mi</p>
          </div>
        </div>
      </div>

      {/* Fuel Information */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Fuel Information</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Fuel Type</p>
            <p className="font-medium capitalize">{vehicle.fuelType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tank Capacity</p>
            <p className="font-medium">{vehicle.fuelCapacity} gal</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Level</p>
            <div className="flex items-center">
              <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(vehicle.currentFuelLevel / vehicle.fuelCapacity) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">
                {Math.round((vehicle.currentFuelLevel / vehicle.fuelCapacity) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Maintenance */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Recent Maintenance</h2>
        <div className="space-y-4">
          {vehicle.maintenanceHistory.slice(0, 3).map(maintenance => (
            <div key={maintenance.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{maintenance.serviceType}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(maintenance.serviceDate), 'MMM d, yyyy')}
                  </p>
                </div>
                <p className="font-medium">${maintenance.totalCost.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-600 mt-2">{maintenance.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Fueling */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Recent Fueling</h2>
        <div className="space-y-4">
          {vehicle.fuelingHistory.slice(0, 3).map(fueling => (
            <div key={fueling.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{fueling.location}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(fueling.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${fueling.totalCost.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{fueling.gallons} gal</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}