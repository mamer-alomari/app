import { describe, it, expect } from 'vitest';
import { mockWorkers, mockVehicles } from '../../data/resourceData';

describe('Resource Data', () => {
  describe('Mock Workers', () => {
    it('has correct worker data structure', () => {
      expect(mockWorkers).toBeInstanceOf(Array);
      expect(mockWorkers.length).toBeGreaterThan(0);

      const worker = mockWorkers[0];
      expect(worker).toHaveProperty('id');
      expect(worker).toHaveProperty('workerId');
      expect(worker).toHaveProperty('firstName');
      expect(worker).toHaveProperty('lastName');
      expect(worker).toHaveProperty('role');
      expect(worker).toHaveProperty('status');
      expect(worker).toHaveProperty('payRate');
      expect(worker).toHaveProperty('permissions');
    });

    it('has valid worker IDs', () => {
      mockWorkers.forEach(worker => {
        expect(worker.workerId).toMatch(/^[MFDR]24-\d{5}$/);
      });
    });

    it('has correct permissions based on role', () => {
      const manager = mockWorkers.find(w => w.role === 'manager');
      expect(manager?.permissions.canManageWorkers).toBe(true);
      expect(manager?.permissions.canAccessFinancials).toBe(true);

      const foreman = mockWorkers.find(w => w.role === 'foreman');
      expect(foreman?.permissions.canAssignJobs).toBe(true);
      expect(foreman?.permissions.canManageWorkers).toBe(false);
    });
  });

  describe('Mock Vehicles', () => {
    it('has correct vehicle data structure', () => {
      expect(mockVehicles).toBeInstanceOf(Array);
      expect(mockVehicles.length).toBeGreaterThan(0);

      const vehicle = mockVehicles[0];
      expect(vehicle).toHaveProperty('id');
      expect(vehicle).toHaveProperty('vehicleId');
      expect(vehicle).toHaveProperty('make');
      expect(vehicle).toHaveProperty('model');
      expect(vehicle).toHaveProperty('vin');
      expect(vehicle).toHaveProperty('status');
      expect(vehicle).toHaveProperty('documents');
    });

    it('has valid vehicle IDs', () => {
      mockVehicles.forEach(vehicle => {
        expect(vehicle.vehicleId).toMatch(/^(TRK|VAN)-\d{3}$/);
      });
    });

    it('has valid document paths', () => {
      mockVehicles.forEach(vehicle => {
        expect(vehicle.documents?.registration).toMatch(/^\/docs\/vehicles\/reg-.+\.pdf$/);
        expect(vehicle.documents?.insurance).toMatch(/^\/docs\/vehicles\/ins-.+\.pdf$/);
      });
    });
  });
});