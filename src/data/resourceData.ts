import { Resource } from '../types/resource';
import { mockWorkers } from './workerData';
import { mockVehicles } from './vehicleData';
import { mockItems } from './mockItems';
import { workerSchedules, vehicleSchedules } from './scheduleData';

// Export all mock data
export {
  mockWorkers,
  mockVehicles,
  mockItems,
  workerSchedules,
  vehicleSchedules
};

// Resource-specific mock data
export const mockResources: Resource[] = [
  {
    id: 'R1',
    name: 'Oil Filter',
    type: 'Part',
    quantity: 10,
  },
  {
    id: 'R2',
    name: 'Brake Pads',
    type: 'Part',
    quantity: 15,
  }
];