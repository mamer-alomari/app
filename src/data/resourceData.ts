import { Worker } from '../types/worker';
import { Vehicle } from '../types/vehicle';
import { generateWorkerId } from '../utils/idGenerator';

// Role-specific pay rates
const payRates = {
  mover: { hourly: 18, overtime: 27 },
  driver: { hourly: 22, overtime: 33 },
  foreman: { hourly: 25, overtime: 37.5 },
  manager: { hourly: 30, overtime: 45 }
};

// Create mock workers
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
    licenseNumber: 'DL123456',
    licenseExpiry: '2024-12-31',
    status: 'active',
    hireDate: '2024-01-01',
    documents: {
      identification: '/docs/id-m24-00001.pdf',
      ssnCard: '/docs/ssn-m24-00001.pdf',
      driversLicense: '/docs/dl-m24-00001.pdf'
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

// Create mock vehicles
export const mockVehicles: Vehicle[] = [
  {
    id: 'V1',
    vehicleId: 'TRK-001',
    make: 'Ford',
    model: 'F-650',
    year: 2022,
    vin: '1HGCM82633A123456',
    licensePlate: 'ABC123',
    registrationNumber: 'REG123456',
    registrationExpiry: '2024-12-31',
    insurancePolicyNumber: 'INS123456',
    insuranceExpiry: '2024-12-31',
    capacity: '26ft - 10,000 lbs',
    status: 'active',
    documents: {
      registration: '/docs/vehicles/reg-trk-001.pdf',
      insurance: '/docs/vehicles/ins-trk-001.pdf'
    }
  },
  {
    id: 'V2',
    vehicleId: 'VAN-001',
    make: 'Mercedes-Benz',
    model: 'Sprinter',
    year: 2023,
    vin: '2MGCM82633A789012',
    licensePlate: 'XYZ789',
    registrationNumber: 'REG789012',
    registrationExpiry: '2024-12-31',
    insurancePolicyNumber: 'INS789012',
    insuranceExpiry: '2024-12-31',
    capacity: '16ft - 5,000 lbs',
    status: 'active',
    documents: {
      registration: '/docs/vehicles/reg-van-001.pdf',
      insurance: '/docs/vehicles/ins-van-001.pdf'
    }
  }
];