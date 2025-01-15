import { BaseService } from './base.service';
import { VehicleFueling } from '../../types/maintenance';
import { AppError } from '../../utils/errorHandler';

class FuelingService extends BaseService<VehicleFueling> {
  constructor() {
    super('vehicle_fueling');
  }

  private validateFuelingRecord(data: Partial<VehicleFueling>) {
    const errors: string[] = [];

    // Required fields validation
    if (!data.vehicleId) errors.push('Vehicle ID is required');
    if (!data.date) errors.push('Date is required');
    if (typeof data.mileage !== 'number') errors.push('Mileage is required and must be a number');
    if (typeof data.gallons !== 'number') errors.push('Gallons is required and must be a number');
    if (typeof data.pricePerGallon !== 'number') errors.push('Price per gallon is required and must be a number');

    // Data type and range validations
    if (data.mileage && data.mileage < 0) {
      errors.push('Mileage cannot be negative');
    }

    if (data.gallons && data.gallons <= 0) {
      errors.push('Gallons must be greater than 0');
    }

    if (data.pricePerGallon && data.pricePerGallon <= 0) {
      errors.push('Price per gallon must be greater than 0');
    }

    // Fuel type validation
    const validFuelTypes = ['regular', 'premium', 'diesel', 'electric'];
    if (data.fuelType && !validFuelTypes.includes(data.fuelType)) {
      errors.push(`Invalid fuel type. Must be one of: ${validFuelTypes.join(', ')}`);
    }

    // Date validation
    if (data.date && new Date(data.date) > new Date()) {
      errors.push('Fueling date cannot be in the future');
    }

    if (errors.length > 0) {
      throw new AppError(errors.join('; '), 'VALIDATION_ERROR');
    }
  }

  async addFuelingRecord(data: Omit<VehicleFueling, 'id'>) {
    this.validateFuelingRecord(data);
    
    try {
      // Check if mileage is greater than last record
      const lastRecord = await this.query(
        `SELECT mileage FROM ${this.tableName}
         WHERE vehicle_id = $1
         ORDER BY date DESC
         LIMIT 1`,
        [data.vehicleId]
      );

      if (lastRecord?.[0]?.mileage >= data.mileage) {
        throw new AppError('New mileage must be greater than previous mileage', 'VALIDATION_ERROR');
      }

      const result = await this.create(data);

      // Update vehicle mileage
      await this.query(
        'UPDATE vehicles SET mileage = $1 WHERE id = $2',
        [data.mileage, data.vehicleId]
      );

      return result;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getFuelingHistory(vehicleId: string, startDate?: Date, endDate?: Date) {
    try {
      let query = `
        SELECT f.*, 
               u.first_name || ' ' || u.last_name as driver_name
        FROM ${this.tableName} f
        LEFT JOIN users u ON f.driver_id = u.id
        WHERE f.vehicle_id = $1
      `;
      const params: any[] = [vehicleId];

      if (startDate) {
        query += ' AND f.date >= $2';
        params.push(startDate);
      }
      if (endDate) {
        query += ' AND f.date <= $' + (params.length + 1);
        params.push(endDate);
      }

      query += ' ORDER BY f.date DESC';

      return await this.query(query, params);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getFuelEfficiency(vehicleId: string, startDate?: Date, endDate?: Date) {
    try {
      const records = await this.getFuelingHistory(vehicleId, startDate, endDate);
      
      if (records.length < 2) {
        return { mpg: 0, totalMiles: 0, totalGallons: 0 };
      }

      let totalMiles = 0;
      let totalGallons = 0;

      for (let i = 1; i < records.length; i++) {
        const milesDriven = records[i-1].mileage - records[i].mileage;
        if (milesDriven > 0) {
          totalMiles += milesDriven;
          totalGallons += records[i-1].gallons;
        }
      }

      return {
        mpg: totalGallons > 0 ? +(totalMiles / totalGallons).toFixed(2) : 0,
        totalMiles,
        totalGallons: +totalGallons.toFixed(2)
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export const fuelingService = new FuelingService();