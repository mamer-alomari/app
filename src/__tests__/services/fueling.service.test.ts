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

describe('Fueling Service', () => {
  it('retrieves fueling records for a vehicle', async () => {
    const records = await fuelingService.getFuelingRecords('V1');
    
    expect(records).toHaveLength(1);
    expect(records[0]).toHaveProperty('id', 'F1');
    expect(records[0]).toHaveProperty('totalCost', 225.00);
  });

  it('adds a new fueling record', async () => {
    const newRecord: Omit<VehicleFueling, 'id'> = {
      vehicleId: 'V1',
      date: '2024-02-16',
      mileage: 5500,
      gallons: 45,
      pricePerGallon: 4.45,
      totalCost: 200.25,
      location: 'Mobile Station #456',
      fuelType: 'diesel',
      fullTank: true,
      driver: 'David Wilson'
    };

    const record = await fuelingService.addFuelingRecord(newRecord);
    
    expect(record).toHaveProperty('id');
    expect(record).toHaveProperty('location', 'Shell Station #123');
    expect(record).toHaveProperty('totalCost', 225.00);
  });
});