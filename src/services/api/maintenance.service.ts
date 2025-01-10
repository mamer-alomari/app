import { VehicleMaintenance } from '../../types/maintenance';
import { AppError } from '../../utils/errorHandler';
import { memoryDb } from '../../lib/memoryDb';

export const maintenanceService = {
  async getMaintenanceRecords(vehicleId: string): Promise<VehicleMaintenance[]> {
    try {
      return memoryDb.getMaintenanceRecords(vehicleId);
    } catch (error) {
      throw new AppError(
        'Failed to fetch maintenance records',
        'MAINTENANCE_FETCH_ERROR'
      );
    }
  },

  async addMaintenanceRecord(data: Omit<VehicleMaintenance, 'id'>): Promise<VehicleMaintenance> {
    try {
      // Validate required fields
      if (!data.vehicleId || !data.serviceType || !data.serviceDate || !data.mileage) {
        throw new AppError(
          'Missing required maintenance record fields',
          'MAINTENANCE_VALIDATION_ERROR'
        );
      }

      return memoryDb.addMaintenanceRecord(data.vehicleId, data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        'An error occurred while adding maintenance record',
        'MAINTENANCE_ADD_ERROR'
      );
    }
  }
};