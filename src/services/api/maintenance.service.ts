import { BaseService } from './base.service';
import { VehicleMaintenance } from '../../types/maintenance';
import { AppError } from '../../utils/errorHandler';

class MaintenanceService extends BaseService<VehicleMaintenance> {
  constructor() {
    super('vehicle_maintenance');
  }

  private validateMaintenanceRecord(data: Partial<VehicleMaintenance>) {
    const errors: string[] = [];

    // Required fields validation
    if (!data.vehicleId) errors.push('Vehicle ID is required');
    if (!data.serviceType) errors.push('Service type is required');
    if (!data.serviceDate) errors.push('Service date is required');
    if (typeof data.mileage !== 'number') errors.push('Mileage is required and must be a number');

    // Data type and range validations
    if (data.mileage && data.mileage < 0) {
      errors.push('Mileage cannot be negative');
    }

    if (data.nextServiceMileage && data.nextServiceMileage <= data.mileage) {
      errors.push('Next service mileage must be greater than current mileage');
    }

    if (data.nextServiceDate && new Date(data.nextServiceDate) <= new Date(data.serviceDate)) {
      errors.push('Next service date must be in the future');
    }

    // Service type validation
    const validServiceTypes = [
      'oil_change',
      'tire_rotation',
      'brake_service',
      'inspection',
      'repair',
      'maintenance'
    ];
    if (data.serviceType && !validServiceTypes.includes(data.serviceType)) {
      errors.push(`Invalid service type. Must be one of: ${validServiceTypes.join(', ')}`);
    }

    // Status validation
    const validStatuses = ['scheduled', 'in_progress', 'completed', 'cancelled'];
    if (data.status && !validStatuses.includes(data.status)) {
      errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    if (errors.length > 0) {
      throw new AppError(errors.join('; '), 'VALIDATION_ERROR');
    }
  }

  async addMaintenanceRecord(data: Omit<VehicleMaintenance, 'id'>) {
    this.validateMaintenanceRecord(data);
    
    try {
      const result = await this.create(data);
      
      // Update vehicle status if maintenance is in progress
      if (data.status === 'in_progress') {
        await this.query(
          'UPDATE vehicles SET status = $1 WHERE id = $2',
          ['maintenance', data.vehicleId]
        );
      }
      
      return result;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateMaintenanceRecord(id: string, data: Partial<VehicleMaintenance>) {
    this.validateMaintenanceRecord({ ...await this.getById(id), ...data });
    
    try {
      const result = await this.update(id, data);
      
      // Update vehicle status based on maintenance status
      if (data.status === 'completed') {
        await this.query(
          'UPDATE vehicles SET status = $1 WHERE id = $2',
          ['active', data.vehicleId]
        );
      }
      
      return result;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMaintenanceHistory(vehicleId: string) {
    try {
      return await this.query(
        `SELECT 
          m.*,
          u.first_name || ' ' || u.last_name as performed_by_name
         FROM ${this.tableName} m
         LEFT JOIN users u ON m.performed_by = u.id
         WHERE m.vehicle_id = $1
         ORDER BY m.service_date DESC`,
        [vehicleId]
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUpcomingMaintenance() {
    try {
      return await this.query(
        `SELECT 
          m.*,
          v.make,
          v.model,
          v.license_plate
         FROM ${this.tableName} m
         JOIN vehicles v ON m.vehicle_id = v.id
         WHERE m.status = 'scheduled'
         AND m.service_date > CURRENT_TIMESTAMP
         ORDER BY m.service_date ASC`
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export const maintenanceService = new MaintenanceService();