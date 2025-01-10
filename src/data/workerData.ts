import { Worker, WorkerRole } from '../types/worker';
import { generateWorkerId } from '../utils/idGenerator';

// Role-specific pay rates
const payRates = {
  mover: { hourly: 18, overtime: 27 },
  driver: { hourly: 22, overtime: 33 },
  foreman: { hourly: 25, overtime: 37.5 },
  manager: { hourly: 30, overtime: 45 }
};

// Sequence counters for each role
let sequences = {
  mover: 1,
  driver: 1,
  foreman: 1,
  manager: 1
};

function createWorker(
  role: WorkerRole,
  firstName: string,
  lastName: string,
  options: Partial<Worker> = {}
): Worker {
  const workerId = generateWorkerId(role, sequences[role]++);
  
  return {
    id: `W${Date.now()}${Math.random().toString(36).substr(2, 5)}`,
    workerId,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    phone: '(555) 123-4567',
    ssn: '***-**-' + Math.floor(1000 + Math.random() * 9000).toString(),
    role,
    status: 'active',
    hireDate: '2024-01-01',
    documents: {
      identification: `/docs/id-${workerId}.pdf`,
      ssnCard: `/docs/ssn-${workerId}.pdf`,
      ...(role === 'driver' ? { driversLicense: `/docs/license-${workerId}.pdf` } : {})
    },
    payRate: payRates[role],
    workHours: [],
    payStubs: [],
    permissions: {
      canAssignJobs: role === 'manager' || role === 'foreman',
      canAccessFinancials: role === 'manager',
      canManageWorkers: role === 'manager',
      canManageVehicles: role === 'manager'
    },
    ...options
  };
}

export const mockWorkers: Worker[] = [
  // Managers
  createWorker('manager', 'James', 'Smith', {
    licenseNumber: 'DL123456',
    licenseExpiry: '2024-12-31'
  }),
  
  // Foremen
  createWorker('foreman', 'Robert', 'Johnson', {
    supervisor: 'M24-00001'
  }),
  createWorker('foreman', 'Michael', 'Williams', {
    supervisor: 'M24-00001'
  }),
  
  // Drivers
  createWorker('driver', 'John', 'Driver', {
    licenseNumber: 'DL789012',
    licenseExpiry: '2024-12-31',
    supervisor: 'F24-00001'
  }),
  createWorker('driver', 'David', 'Wilson', {
    licenseNumber: 'DL345678',
    licenseExpiry: '2024-12-31',
    supervisor: 'F24-00002'
  }),
  
  // Movers
  createWorker('mover', 'Mike', 'Brown', {
    supervisor: 'F24-00001'
  }),
  createWorker('mover', 'Chris', 'Davis', {
    supervisor: 'F24-00001'
  }),
  createWorker('mover', 'Brian', 'Miller', {
    supervisor: 'F24-00002'
  }),
  createWorker('mover', 'Kevin', 'Anderson', {
    supervisor: 'F24-00002'
  })
];