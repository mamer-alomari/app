import { BaseService } from './base.service';
import { Vehicle } from '../../types/vehicle';
import { AppError } from '../../utils/errorHandler';
import { supabase } from '../../lib/supabase';

class VehicleService extends BaseService<Vehicle> {
  constructor() {
    super('vehicles');
  }

  async getVehicles() {
    return this.getAll();
  }

  async getVehicleById(id: string) {
    return this.getById(id);
  }

  async createVehicle(data: Omit<Vehicle, 'id'>) {
    if (!data.make || !data.model || !data.vin) {
      throw new AppError('Missing required vehicle fields', 'VALIDATION_ERROR');
    }
    return this.create(data);
  }

  async updateVehicle(id: string, data: Partial<Vehicle>) {
    return this.update(id, data);
  }

  async getVehicleDocuments(id: string) {
    try {
      const { data, error } = await supabase
        .from('vehicle_documents')
        .select('*')
        .eq('vehicle_id', id);

      if (error) throw new AppError(error.message, 'DATABASE_ERROR');
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export const vehicleService = new VehicleService();