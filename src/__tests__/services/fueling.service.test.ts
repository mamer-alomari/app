import { describe, it, expect, vi } from 'vitest';
import { fuelingService } from '../../services/api/fueling.service';
import { VehicleFueling } from '../../types/maintenance';

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => ({
            data: mockFuelingRecords,
            error: null
          })
        })
      }),
      insert: () => ({
        select: () => ({
          single: () => ({
            data: mockFuelingRecords[0],
            error: null
          })
        })
      })
    })
  })
}));

const mockFuelingRecords: VehicleFueling[] = [
  {
    id: 'F1',
    vehicleId: 'V1',
    date: '2024-02-15',
    mileage: 5000,
    gallons: 50,
    pricePerGallon: 4.50,
    totalCost: 225.00,
    location: 'Shell Station #123',
    fuelType: 'diesel',
    fullTank: true,
    driver: 'John Driver'
  }
];

describe('FuelingService', () => {
  const testFueling: Omit<VehicleFueling, 'id'> = {
    vehicleId: 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', // Using ID from seed data
    date: new Date().toISOString(),
    mileage: 15000,
    gallons: 15.5,
    pricePerGallon: 3.45,
    location: 'Test Station',
    fuelType: 'gasoline',
    fullTank: true,
    driverId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Using ID from seed data
    notes: 'Test fueling'
  };

  it('should add a new fueling record', async () => {
    const record = await fuelingService.addFuelingRecord(testFueling);
    expect(record).toHaveProperty('id');
    expect(record.gallons).toBe(testFueling.gallons);
  });

  it('should validate required fields', async () => {
    const invalidRecord = { ...testFueling, gallons: undefined };
    await expect(fuelingService.addFuelingRecord(invalidRecord as any))
      .rejects.toThrow('Missing required fueling record fields');
  });

  it('should validate positive values', async () => {
    const invalidRecord = { ...testFueling, gallons: -1 };
    await expect(fuelingService.addFuelingRecord(invalidRecord))
      .rejects.toThrow('Gallons and price must be greater than 0');
  });

  it('should get fueling records for a vehicle', async () => {
    const records = await fuelingService.getFuelingRecords(testFueling.vehicleId);
    expect(Array.isArray(records)).toBe(true);
  });
});