import { maintenanceService } from '../../src/services/api/maintenance.service';
import { VehicleMaintenance } from '../../src/types/maintenance';

describe('Maintenance Service', () => {
  let testMaintenance: VehicleMaintenance;

  beforeAll(async () => {
    // Insert test data
    testMaintenance = await maintenanceService.addMaintenanceRecord({
      vehicleId: '44444444-4444-4444-4444-444444444444',
      serviceType: 'oil_change',
      serviceDate: new Date(),
      mileage: 15000,
      description: 'Initial oil change',
      status: 'scheduled',
    });
  });

  afterAll(async () => {
    // Clean up test data
    await maintenanceService.delete(testMaintenance.id);
  });

  it('should add a new maintenance record', async () => {
    const maintenance = await maintenanceService.getById(testMaintenance.id);
    expect(maintenance).toBeDefined();
    expect(maintenance.serviceType).toBe('oil_change');
  });

  it('should update maintenance status', async () => {
    await maintenanceService.updateMaintenanceRecord(testMaintenance.id, { status: 'completed' });
    const updatedMaintenance = await maintenanceService.getById(testMaintenance.id);
    expect(updatedMaintenance.status).toBe('completed');
  });

  it('should retrieve maintenance history for a vehicle', async () => {
    const history = await maintenanceService.getMaintenanceHistory(testMaintenance.vehicleId);
    expect(history).toContainEqual(expect.objectContaining({ id: testMaintenance.id }));
  });
}); 