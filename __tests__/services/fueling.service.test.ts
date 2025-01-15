import { fuelingService } from '../../src/services/api/fueling.service';
import { VehicleFueling } from '../../src/types/maintenance';

describe('Fueling Service', () => {
  let testFueling: VehicleFueling;

  beforeAll(async () => {
    // Insert test data
    testFueling = await fuelingService.addFuelingRecord({
      vehicleId: '44444444-4444-4444-4444-444444444444',
      driverId: '33333333-3333-3333-3333-333333333333',
      date: new Date(),
      mileage: 15500,
      gallons: 10.5,
      pricePerGallon: 3.25,
      fuelType: 'regular',
      location: 'Test Station',
    });
  });

  afterAll(async () => {
    // Clean up test data
    await fuelingService.delete(testFueling.id);
  });

  it('should add a new fueling record', async () => {
    const fueling = await fuelingService.getById(testFueling.id);
    expect(fueling).toBeDefined();
    expect(fueling.gallons).toBe(10.5);
  });

  it('should calculate fuel efficiency', async () => {
    const efficiency = await fuelingService.getFuelEfficiency(testFueling.vehicleId);
    expect(efficiency.mpg).toBeGreaterThan(0);
  });

  it('should retrieve fueling history for a vehicle', async () => {
    const history = await fuelingService.getFuelingHistory(testFueling.vehicleId);
    expect(history).toContainEqual(expect.objectContaining({ id: testFueling.id }));
  });
}); 