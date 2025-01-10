import { VehicleMaintenance, VehicleFueling } from './maintenance';

export interface Vehicle {
  id: string;
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  registrationNumber: string;
  registrationExpiry: string;
  insurancePolicyNumber: string;
  insuranceExpiry: string;
  capacity: string;
  currentMileage: number;
  lastServiceMileage: number;
  nextServiceMileage: number;
  fuelType: 'gasoline' | 'diesel';
  fuelCapacity: number;
  currentFuelLevel: number;
  status: 'active' | 'maintenance' | 'inactive';
  maintenanceHistory: VehicleMaintenance[];
  fuelingHistory: VehicleFueling[];
  documents: {
    registration?: string;
    insurance?: string;
  };
}