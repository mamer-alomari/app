import { BaseService } from './base.service';
import { Vehicle } from '../../types/vehicle';
import { AppError } from '../../utils/errorHandler';

class VehicleService extends BaseService<Vehicle> {
  constructor() {
    super('vehicles');
  }

  async getVehicles() {
    try {
      console.log('Attempting to fetch vehicles...'); // Debug log
      const query = `
        SELECT 
          id, make, model, year, vin, 
          license_plate, status, mileage,
          created_at, updated_at
        FROM ${this.tableName}
        ORDER BY make ASC, model ASC
      `;
      console.log('Query:', query); // Debug log

      const vehicles = await this.query(query);
      console.log('Raw vehicles data:', vehicles); // Debug log

      if (!vehicles) {
        console.log('No vehicles found'); // Debug log
        return [];
      }

      // Transform the data if needed
      const transformedVehicles = vehicles.map(vehicle => ({
        ...vehicle,
        status: vehicle.status || 'active',
        mileage: vehicle.mileage || 0
      }));

      console.log('Transformed vehicles:', transformedVehicles); // Debug log
      return transformedVehicles;
    } catch (error) {
      console.error('Error in getVehicles:', error); // Debug log
      throw this.handleError(error);
    }
  }

  async addVehicle(data: Omit<Vehicle, 'id'>) {
    // Validate required fields
    if (!data.make || !data.model || !data.vin || !data.year) {
      throw new AppError('Missing required vehicle fields', 'VALIDATION_ERROR');
    }

    // Validate VIN format (17 characters)
    if (data.vin.length !== 17) {
      throw new AppError('Invalid VIN format - must be 17 characters', 'VALIDATION_ERROR');
    }

    // Validate year
    const currentYear = new Date().getFullYear();
    if (data.year < 1900 || data.year > currentYear + 1) {
      throw new AppError('Invalid vehicle year', 'VALIDATION_ERROR');
    }

    try {
      const result = await this.create({
        ...data,
        status: data.status || 'active',
        mileage: data.mileage || 0
      });
      console.log('Added vehicle result:', result); // Debug log
      return result;
    } catch (error) {
      console.error('Error in addVehicle:', error); // Debug log
      if (error instanceof Error && error.message.includes('unique constraint')) {
        throw new AppError('VIN already exists', 'VALIDATION_ERROR');
      }
      throw this.handleError(error);
    }
  }

  async getVehicleById(id: string) {
    try {
      const vehicle = await this.getById(id);
      if (!vehicle) {
        throw new AppError('Vehicle not found', 'NOT_FOUND');
      }
      return vehicle;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateVehicle(id: string, data: Partial<Vehicle>) {
    // Validate VIN if provided
    if (data.vin && data.vin.length !== 17) {
      throw new AppError('Invalid VIN format - must be 17 characters', 'VALIDATION_ERROR');
    }

    // Validate year if provided
    if (data.year) {
      const currentYear = new Date().getFullYear();
      if (data.year < 1900 || data.year > currentYear + 1) {
        throw new AppError('Invalid vehicle year', 'VALIDATION_ERROR');
      }
    }

    return this.update(id, data);
  }

  async deleteVehicle(id: string) {
    return this.delete(id);
  }
}

export const vehicleService = new VehicleService();