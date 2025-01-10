import { BaseService } from './base.service';
import { VehicleFueling } from '../../types/maintenance';
import { AppError } from '../../utils/errorHandler';
import { supabase } from '../../lib/supabase';

class FuelingService extends BaseService<VehicleFueling> {
  protected tableName: string;

  constructor() {
    super('vehicle_fueling');
    this.tableName = 'vehicle_fueling';
  }

  async getFuelingRecords(vehicleId: string) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          driver:driver_id(
            id,
            first_name,
            last_name
          )
        `)
        .eq('vehicle_id', vehicleId)
        .order('date', { ascending: false });

      if (error) throw new AppError(error.message, 'DATABASE_ERROR');
      return data as VehicleFueling[];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async addFuelingRecord(data: Omit<VehicleFueling, 'id'>) {
    try {
      const { data: result, error } = await supabase
        .rpc('add_vehicle_fueling', {
          p_vehicle_id: data.vehicleId,
          p_date: data.date,
          p_mileage: data.mileage,
          p_gallons: data.gallons,
          p_price_per_gallon: data.pricePerGallon,
          p_location: data.location,
          p_fuel_type: data.fuelType,
          p_full_tank: data.fullTank,
          p_driver_id: data.driver,
          p_notes: data.notes,
          p_receipt_path: data.receipt
        });

      if (error) throw new AppError(error.message, 'DATABASE_ERROR');
      return result as VehicleFueling;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getFuelEfficiency(vehicleId: string, startDate?: string, endDate?: string) {
    try {
      const { data, error } = await supabase
        .rpc('get_vehicle_fuel_efficiency', {
          p_vehicle_id: vehicleId,
          p_start_date: startDate,
          p_end_date: endDate
        });

      if (error) throw new AppError(error.message, 'DATABASE_ERROR');
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export const fuelingService = new FuelingService();