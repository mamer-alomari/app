import { BaseService } from './base.service';
import { Worker } from '../../types/worker';
import { AppError } from '../../utils/errorHandler';

class WorkerService extends BaseService<Worker> {
  constructor() {
    super('workers');
  }

  async getWorkers() {
    return this.getAll();
  }

  async getWorkerById(id: string) {
    return this.getById(id);
  }

  async addWorker(data: Omit<Worker, 'id'>) {
    if (!data.first_name || !data.last_name || !data.email) {
      throw new AppError('Missing required worker fields', 'VALIDATION_ERROR');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new AppError('Invalid email format', 'VALIDATION_ERROR');
    }

    try {
      return await this.create(data);
    } catch (error) {
      if (error instanceof Error && error.message.includes('unique constraint')) {
        throw new AppError('Email already exists', 'VALIDATION_ERROR');
      }
      throw this.handleError(error);
    }
  }

  async updateWorker(id: string, data: Partial<Worker>) {
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new AppError('Invalid email format', 'VALIDATION_ERROR');
      }
    }

    return this.update(id, data);
  }

  async deleteWorker(id: string) {
    return this.delete(id);
  }
}

export const workerService = new WorkerService(); 