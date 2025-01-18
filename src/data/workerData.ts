import { Worker, WorkerRole, PayRate } from '../types/worker';
import { generateWorkerId } from '../utils/idGenerator';

// Role-specific pay rates
const payRates: Record<WorkerRole, PayRate> = {
  mover: { hourly: 18, overtime: 27 },
  driver: { hourly: 22, overtime: 33 },
  foreman: { hourly: 25, overtime: 37.5 },
  manager: { hourly: 30, overtime: 45 }
};

// Sequence counters for each role
let sequences: Record<WorkerRole, number> = {
  mover: 1,
  driver: 1,
  foreman: 1,
  manager: 1
};

export const mockWorkers: Worker[] = [
  {
    id: 'W1',
    workerId: generateWorkerId('manager', 1),
    firstName: 'James',
    lastName: 'Smith',
    email: 'james.smith@example.com',
    phone: '(555) 111-1111',
    ssn: '***-**-1111',
    role: 'manager',
    status: 'active',
    hireDate: '2024-01-01',
    documents: {
      identification: '/docs/id-r24-00001.pdf',
      ssnCard: '/docs/ssn-r24-00001.pdf',
      driversLicense: '/docs/dl-r24-00001.pdf'
    },
    payRate: payRates.manager,
    workHours: [],
    payStubs: [],
    permissions: {
      canAssignJobs: true,
      canAccessFinancials: true,
      canManageWorkers: true,
      canManageVehicles: true
    }
  },
  {
    id: 'W2',
    workerId: generateWorkerId('foreman', 1),
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    phone: '(555) 222-2222',
    ssn: '***-**-2222',
    role: 'foreman',
    status: 'active',
    hireDate: '2024-01-01',
    documents: {
      identification: '/docs/id-f24-00001.pdf',
      ssnCard: '/docs/ssn-f24-00001.pdf'
    },
    payRate: payRates.foreman,
    workHours: [],
    payStubs: [],
    supervisor: 'W1',
    permissions: {
      canAssignJobs: true,
      canAccessFinancials: false,
      canManageWorkers: false,
      canManageVehicles: false
    }
  }
];