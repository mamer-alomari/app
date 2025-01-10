export type WorkerRole = 'mover' | 'driver' | 'foreman' | 'manager';

export interface Worker {
  id: string;
  workerId: string; // Employee ID number (auto-generated)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn: string;
  role: WorkerRole;
  licenseNumber?: string;
  licenseExpiry?: string;
  status: 'active' | 'inactive' | 'on_leave';
  hireDate: string;
  documents: {
    identification: string;
    ssnCard: string;
    driversLicense?: string;
  };
  payRate: {
    hourly: number;
    overtime: number;
  };
  workHours: WorkHours[];
  payStubs: PayStub[];
  supervisor?: string; // ID of the supervising foreman/manager
  permissions: {
    canAssignJobs: boolean;
    canAccessFinancials: boolean;
    canManageWorkers: boolean;
    canManageVehicles: boolean;
  };
}

export interface WorkHours {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string;
  regularHours: number;
  overtimeHours: number;
  jobId?: string;
  notes?: string;
}