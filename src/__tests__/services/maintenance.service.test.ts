import { describe, it, expect, vi } from 'vitest';
import { maintenanceService } from '../../services/api/maintenance.service';
import { VehicleMaintenance } from '../../types/maintenance';

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => ({
            data: mockMaintenanceRecords,
            error: null
          })
        })
      }),
      insert: () => ({
        select: () => ({
          single: () => ({
            data: mockMaintenanceRecords[0],
            error: null
          })
        })
      })
    })
  })
}));

const mockMaintenanceRecords: VehicleMaintenance[] = [
  {
    id: 'M1',
    vehicleId: 'V1',
    type: 'routine',
    serviceType: 'Oil Change',
    serviceDate: '2024-01-15',
    mileage: 5000,
    description: 'Regular oil change and inspection',
    laborHours: 1.5,
    laborCost: 75.00,
    totalCost: 150.00,
    performedBy: 'Service Center A',
    location: 'Service Center A',
    nextServiceMileage: 10000,
    status: 'completed'
  }
];

describe('Maintenance Service', () => {
  it('retrieves maintenance records for a vehicle', async () => {
    const records = await maintenanceService.getMaintenanceRecords('V1');
    
    expect(records).toHaveLength(1);
    expect(records[0]).toHaveProperty('id', 'M1');
    expect(records[0]).toHaveProperty('serviceType', 'Oil Change');
  });

  it('adds a new maintenance record', async () => {
    const newRecord: Omit<VehicleMaintenance, 'id'> = {
      vehicleId: 'V1',
      type: 'routine',
      serviceType: 'Tire Rotation',
      serviceDate: '2024-02-15',
      mileage: 6000,
      description: 'Rotate and balance all tires',
      laborHours: 1.0,
      laborCost: 50.00,
      totalCost: 80.00,
      performedBy: 'Service Center B',
      location: 'Service Center B',
      nextServiceMileage: 11000,
      status: 'completed'
    };

    const record = await maintenanceService.addMaintenanceRecord(newRecord);
    
    expect(record).toHaveProperty('id');
    expect(record).toHaveProperty('serviceType', 'Oil Change');
    expect(record).toHaveProperty('status', 'completed');
  });
});