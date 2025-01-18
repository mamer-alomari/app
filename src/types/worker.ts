export type WorkerRole = 'mover' | 'driver' | 'foreman' | 'manager';
export type WorkerStatus = 'active' | 'inactive';

export interface WorkerDocuments {
  identification: string;
  ssnCard: string;
  driversLicense?: string;
}

export interface PayRate {
  hourly: number;
  overtime: number;
}

export interface WorkerPermissions {
  canAssignJobs: boolean;
  canAccessFinancials: boolean;
  canManageWorkers: boolean;
  canManageVehicles: boolean;
}

export interface Worker {
  id: string;
  workerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn: string;
  role: WorkerRole;
  status: WorkerStatus;
  hireDate: string;
  documents: WorkerDocuments;
  payRate: PayRate;
  workHours: any[]; // Define specific type if needed
  payStubs: any[]; // Define specific type if needed
  permissions: WorkerPermissions;
  supervisor?: string;
}