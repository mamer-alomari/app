export interface VehicleMaintenance {
  id: string;
  vehicleId: string;
  type: 'routine' | 'repair' | 'inspection';
  serviceType: string;
  serviceDate: string;
  mileage: number;
  description: string;
  parts?: {
    name: string;
    quantity: number;
    cost: number;
  }[];
  laborHours: number;
  laborCost: number;
  totalCost: number;
  performedBy: string;
  location: string;
  nextServiceDate?: string;
  nextServiceMileage?: number;
  notes?: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  documents?: string[];
}

export interface VehicleFueling {
  id: string;
  vehicleId: string;
  date: string;
  mileage: number;
  gallons: number;
  pricePerGallon: number;
  totalCost: number;
  location: string;
  fuelType: 'gasoline' | 'diesel';
  fullTank: boolean;
  driver: string;
  notes?: string;
  receipt?: string;
}