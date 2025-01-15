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

describe('MaintenanceService', () => {
  const testMaintenance: Omit<VehicleMaintenance, 'id'> = {
    vehicleId: 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', // Using ID from seed data
    serviceDate: new Date().toISOString(),
    serviceType: 'oil_change',
    mileage: 15000,
    description: 'Regular oil change',
    cost: 89.99,
    performedBy: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', // Using ID from seed data
    nextServiceMileage: 18000
  };

  it('should add a new maintenance record', async () => {
    const record = await maintenanceService.addMaintenanceRecord(testMaintenance);
    expect(record).toHaveProperty('id');
    expect(record.serviceType).toBe(testMaintenance.serviceType);
  });

  it('should validate required fields', async () => {
    const invalidRecord = { ...testMaintenance, serviceType: undefined };
    await expect(maintenanceService.addMaintenanceRecord(invalidRecord as any))
      .rejects.toThrow('Missing required maintenance record fields');
  });

  it('should validate mileage values', async () => {
    const invalidRecord = { ...testMaintenance, mileage: -1 };
    await expect(maintenanceService.addMaintenanceRecord(invalidRecord))
      .rejects.toThrow('Mileage cannot be negative');
  });

  it('should validate next service mileage', async () => {
    const invalidRecord = { ...testMaintenance, nextServiceMileage: 14000 };
    await expect(maintenanceService.addMaintenanceRecord(invalidRecord))
      .rejects.toThrow('Next service mileage must be greater than current mileage');
  });

  it('should get maintenance records for a vehicle', async () => {
    const records = await maintenanceService.getMaintenanceRecords(testMaintenance.vehicleId);
    expect(Array.isArray(records)).toBe(true);
  });
});