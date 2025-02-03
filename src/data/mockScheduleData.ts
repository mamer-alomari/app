import { VehicleSchedule } from '../types/schedule';

export const mockScheduleData: VehicleSchedule[] = [
  {
    id: 'MS1',
    vehicleId: '44444444-4444-4444-4444-444444444444',
    date: '2024-03-20',
    tasks: ['Oil Change']
  }
];

export interface ScheduledJob {
  id: string;
  customerName: string;
  address: string;
  date: string;
  startTime: string;
  estimatedDuration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  assignedWorkers: string[];
  assignedVehicle?: string;
}

export const mockScheduledJobs: ScheduledJob[] = [
  {
    id: 'MOV-001',
    customerName: 'John Smith',
    address: '123 Main St, Anytown, USA',
    date: '2024-03-20',
    startTime: '09:00',
    estimatedDuration: 4,
    status: 'scheduled',
    assignedWorkers: ['W001', 'W002'],
    assignedVehicle: 'V001'
  },
  {
    id: 'MOV-002',
    customerName: 'Jane Doe',
    address: '456 Oak Ave, Somewhere, USA',
    date: '2024-03-20',
    startTime: '14:00',
    estimatedDuration: 3,
    status: 'scheduled',
    assignedWorkers: [],
  },
  {
    id: 'MOV-003',
    customerName: 'Bob Wilson',
    address: '789 Pine Rd, Elsewhere, USA',
    date: '2024-03-21',
    startTime: '10:00',
    estimatedDuration: 5,
    status: 'scheduled',
    assignedWorkers: ['W003'],
    assignedVehicle: 'V002'
  }
];