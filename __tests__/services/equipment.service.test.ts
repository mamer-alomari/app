import { equipmentService } from '../../src/services/api/equipment.service';
import { Equipment } from '../../src/types/equipment';

describe('Equipment Service', () => {
  let testEquipment: Equipment;

  beforeAll(async () => {
    // Insert test data
    testEquipment = await equipmentService.addEquipment({
      providerId: '22222222-2222-2222-2222-222222222222',
      name: 'Test Equipment',
      type: 'dolly',
      status: 'available',
      condition: 'new',
    });
  });

  afterAll(async () => {
    // Clean up test data
    await equipmentService.delete(testEquipment.id);
  });

  it('should add new equipment', async () => {
    const equipment = await equipmentService.getById(testEquipment.id);
    expect(equipment).toBeDefined();
    expect(equipment.name).toBe('Test Equipment');
  });

  it('should update equipment status', async () => {
    await equipmentService.updateEquipment(testEquipment.id, { status: 'in_use' });
    const updatedEquipment = await equipmentService.getById(testEquipment.id);
    expect(updatedEquipment.status).toBe('in_use');
  });

  it('should retrieve equipment by provider', async () => {
    const equipmentList = await equipmentService.getEquipmentByProvider(testEquipment.providerId);
    expect(equipmentList).toContainEqual(expect.objectContaining({ id: testEquipment.id }));
  });
}); 