export interface Vehicle {
  id: string;
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  registrationNumber?: string;
  registrationExpiry: string;
  insurancePolicyNumber: string;
  insuranceExpiry: string;
  capacity: string;
  status: 'active' | 'maintenance' | 'inactive';
  documents?: {
    registration?: string;
    insurance?: string;
  };
}

export interface VehicleAssignment {
  id: string;
  vehicleId: string;
  jobId: string;
  driverId: string;
  startTime: string;
  endTime?: string;
  status: 'scheduled' | 'in_progress' | 'completed';
}

export interface VehicleMaintenance {
  id: string;
  vehicleId: string;
  serviceType: string;
  serviceDate: string;
  mileage?: number;
  description?: string;
  cost?: number;
  performedBy?: string;
  nextServiceDate?: string;
  nextServiceMileage?: number;
  status: 'scheduled' | 'in_progress' | 'completed';
}