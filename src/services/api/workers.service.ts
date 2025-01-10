import { BaseService } from './base.service';
import { Worker } from '../../types/worker';
import { AppError } from '../../utils/errorHandler';
import { supabase } from '../../lib/supabase';

class WorkerService extends BaseService {
  constructor() {
    super('workers');
  }

  async getWorkers() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          role:role_id(
            id,
            name,
            code,
            base_hourly_rate,
            overtime_rate,
            permissions
          ),
          supervisor:supervisor_id(
            id,
            first_name,
            last_name,
            role_id
          ),
          department:department_id(
            id,
            name,
            code
          )
        `);

      if (error) throw new AppError(error.message, 'DATABASE_ERROR');
      return data as Worker[];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getWorkerById(id: string) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          role:role_id(
            id,
            name,
            code,
            base_hourly_rate,
            overtime_rate,
            permissions
          ),
          supervisor:supervisor_id(
            id,
            first_name,
            last_name,
            role_id
          ),
          department:department_id(
            id,
            name,
            code
          ),
          documents:worker_documents(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw new AppError(error.message, 'DATABASE_ERROR');
      return data as Worker;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createWorker(data: Omit<Worker, 'id'>) {
    if (!data.firstName || !data.lastName || !data.email || !data.role) {
      throw new AppError('Missing required worker fields', 'VALIDATION_ERROR');
    }

    try {
      const { data: worker, error } = await supabase
        .from(this.tableName)
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          role_id: data.role,
          supervisor_id: data.supervisor,
          department_id: data.department,
          status: data.status || 'active',
          hire_date: data.hireDate || new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (error) throw new AppError(error.message, 'DATABASE_ERROR');
      return worker as Worker;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateWorker(id: string, data: Partial<Worker>) {
    return this.update<Worker>(id, data);
  }

  async getWorkerDocuments(id: string) {
    try {
      const { data, error } = await supabase
        .from('worker_documents')
        .select('*')
        .eq('worker_id', id);

      if (error) throw new AppError(error.message, 'DATABASE_ERROR');
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getWorkerTimeEntries(id: string, startDate?: string, endDate?: string) {
    try {
      let query = supabase
        .from('time_entries')
        .select('*')
        .eq('worker_id', id);

      if (startDate) {
        query = query.gte('clock_in', startDate);
      }
      if (endDate) {
        query = query.lte('clock_in', endDate);
      }

      const { data, error } = await query.order('clock_in', { ascending: false });

      if (error) throw new AppError(error.message, 'DATABASE_ERROR');
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export const workerService = new WorkerService();