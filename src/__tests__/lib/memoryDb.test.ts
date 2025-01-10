import { describe, it, expect, beforeEach } from 'vitest';
import { memoryDb } from '../../lib/memoryDb';
import { mockVehicles } from '../../data/vehicleData';
import { mockWorkers } from '../../data/workerData';

describe('Memory Database', () => {
  beforeEach(() => {
    // Reset database before each test if needed
  });

  describe('Vehicle Operations', () => {
    it('gets all vehicles', () => {
      const vehicles = memoryDb.getAllVehicles();
      expect(vehicles).toHaveLength(mockVehicles.length);
      expect(vehicles[0]).toHaveProperty('id', mockVehicles[0].id);
    });

    it('gets vehicle by id', () => {
      const vehicle = memoryDb.getVehicle(mockVehicles[0].id);
      expect(vehicle).toBeDefined();
      expect(vehicle?.id).toBe(mockVehicles[0].id);
    });

    it('updates vehicle', () => {
      const update = { status: 'maintenance' as const };
      const updated = memoryDb.updateVehicle(mockVehicles[0].id, update);
      expect(updated.status).toBe('maintenance');
    });
  });

  describe('Worker Operations', () => {
    it('gets all workers', () => {
      const workers = memoryDb.getAllWorkers();
      expect(workers).toHaveLength(mockWorkers.length);
      expect(workers[0]).toHaveProperty('id', mockWorkers[0].id);
    });

    it('gets worker by id', () => {
      const worker = memoryDb.getWorker(mockWorkers[0].id);
      expect(worker).toBeDefined();
      expect(worker?.id).toBe(mockWorkers[0].id);
    });

    it('updates worker', () => {
      const update = { status: 'inactive' as const };
      const updated = memoryDb.updateWorker(mockWorkers[0].id, update);
      expect(updated.status).toBe('inactive');
    });
  });

  describe('Maintenance Operations', () => {
    it('adds and retrieves maintenance records', () => {
      const record = {
        vehicleId: mockVehicles[0].id,
        serviceType: 'Oil Change',
        serviceDate: '2024-02-20',
        mileage: 5000,
        description: 'Regular maintenance',
        totalCost: 150.00
      };

      const added = memoryDb.addMaintenanceRecord(mockVehicles[0].id, record);
      expect(added).toHaveProperty('id');
      expect(added.serviceType).toBe('Oil Change');

      const records = memoryDb.getMaintenanceRecords(mockVehicles[0].id);
      expect(records).toHaveLength(1);
      expect(records[0].serviceType).toBe('Oil Change');
    });
  });

  describe('Fueling Operations', () => {
    it('adds and retrieves fueling records', () => {
      const record = {
        vehicleId: mockVehicles[0].id,
        date: '2024-02-20',
        gallons: 50,
        pricePerGallon: 4.50,
        totalCost: 225.00,
        location: 'Gas Station A'
      };

      const added = memoryDb.addFuelingRecord(mockVehicles[0].id, record);
      expect(added).toHaveProperty('id');
      expect(added.totalCost).toBe(225.00);

      const records = memoryDb.getFuelingRecords(mockVehicles[0].id);
      expect(records).toHaveLength(1);
      expect(records[0].totalCost).toBe(225.00);
    });
  });
});