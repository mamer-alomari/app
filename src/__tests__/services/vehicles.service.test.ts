import { vehicleService } from '../../services/api/vehicles.service';
import { Vehicle } from '../../types/vehicle';

describe('VehicleService', () => {
  const testVehicle: Omit<Vehicle, 'id'> = {
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    vin: '1HGCM82633A123456',
    license_plate: 'ABC123',
    status: 'active',
    mileage: 0
  };

  it('should add a new vehicle', async () => {
    const vehicle = await vehicleService.addVehicle(testVehicle);
    expect(vehicle).toHaveProperty('id');
    expect(vehicle.make).toBe(testVehicle.make);
    expect(vehicle.vin).toBe(testVehicle.vin);
  });

  it('should validate required fields', async () => {
    const invalidVehicle = { ...testVehicle, make: '' };
    await expect(vehicleService.addVehicle(invalidVehicle))
      .rejects.toThrow('Missing required vehicle fields');
  });

  it('should validate VIN format', async () => {
    const invalidVehicle = { ...testVehicle, vin: '123' };
    await expect(vehicleService.addVehicle(invalidVehicle))
      .rejects.toThrow('Invalid VIN format');
  });

  it('should validate year', async () => {
    const invalidVehicle = { ...testVehicle, year: 1800 };
    await expect(vehicleService.addVehicle(invalidVehicle))
      .rejects.toThrow('Invalid vehicle year');
  });

  it('should get all vehicles', async () => {
    const vehicles = await vehicleService.getVehicles();
    expect(Array.isArray(vehicles)).toBe(true);
    expect(vehicles.length).toBeGreaterThan(0);
  });

  it('should get vehicle by id', async () => {
    // First add a vehicle
    const newVehicle = await vehicleService.addVehicle(testVehicle);
    
    // Then retrieve it
    const vehicle = await vehicleService.getVehicleById(newVehicle.id);
    expect(vehicle).toBeDefined();
    expect(vehicle.vin).toBe(testVehicle.vin);
  });

  it('should update vehicle', async () => {
    // First add a vehicle
    const newVehicle = await vehicleService.addVehicle(testVehicle);
    
    // Then update it
    const updatedData = { mileage: 1000 };
    const updated = await vehicleService.updateVehicle(newVehicle.id, updatedData);
    expect(updated.mileage).toBe(1000);
  });
}); 