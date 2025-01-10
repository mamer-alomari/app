export interface ScheduledJob {
  id: string;
  customerName: string;
  address: string;
  date: string;
  startTime: string;
  estimatedDuration: number; // in hours
  status: 'scheduled' | 'in_progress' | 'completed';
  assignedWorkers: string[];
  assignedVehicle?: string;
}

export const mockScheduledJobs: ScheduledJob[] = [
  {
    id: 'MOV-1234',
    customerName: 'John Smith',
    address: '123 Main St, New York, NY',
    date: '2024-02-20',
    startTime: '09:00',
    estimatedDuration: 4,
    status: 'scheduled',
    assignedWorkers: ['W1', 'W2'],
    assignedVehicle: 'V1'
  },
  {
    id: 'MOV-5678',
    customerName: 'Sarah Johnson',
    address: '456 Park Ave, New York, NY',
    date: '2024-02-20',
    startTime: '14:00',
    estimatedDuration: 3,
    status: 'scheduled',
    assignedWorkers: ['W3', 'W4'],
    assignedVehicle: 'V2'
  },
  {
    id: 'MOV-9012',
    customerName: 'Mike Brown',
    address: '789 Broadway, New York, NY',
    date: '2024-02-22',
    startTime: '10:00',
    estimatedDuration: 6,
    status: 'scheduled',
    assignedWorkers: ['W1', 'W5'],
    assignedVehicle: 'V1'
  }
];