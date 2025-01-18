export type VehicleStatus = 'active' | 'maintenance' | 'retired';

export interface MaintenanceRecord {
  id: string;
  serviceType: string;
  serviceDate: string;
  mileage: number;
  description: string;
  totalCost: number;
  performedBy: string;
  nextServiceMileage: number;
  status: 'scheduled' | 'in_progress' | 'completed';
}

export interface FuelingRecord {
  id: string;
  date: string;
  location: string;
  gallons: number;
  pricePerGallon: number;
  totalCost: number;
  mileage: number;
  driver: string;
  fuelType: string;
}

export interface VehicleDocuments {
  registration: string;
  insurance: string;
}

export interface Vehicle {
  id: string;
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  registrationExpiry: string;
  insurancePolicyNumber: string;
  insuranceExpiry: string;
  capacity: string;
  mileage: number;
  status: VehicleStatus;
  maintenanceHistory: MaintenanceRecord[];
  fuelingHistory: FuelingRecord[];
  documents: VehicleDocuments;
}

export interface VehicleMaintenance {
  id: string;
  serviceType: string;
  serviceDate: string;
  mileage: number;
  description: string;
  totalCost: number;
  performedBy: string;
  nextServiceMileage: number;
  status: string;
}

export { VehicleMaintenance };