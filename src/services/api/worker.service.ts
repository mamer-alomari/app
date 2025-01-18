import type { Worker } from '../../types/worker';
import { AppError } from '../../utils/errorHandler';
import { DatabaseService } from '../database/DatabaseService';

export class WorkerService {
  private dbService: DatabaseService = new DatabaseService();

  constructor() {
    // Removed redundant initialization
  }

  async addWorker(data: Omit<Worker, 'id'>): Promise<Worker> {
    // Check required fields
    if (!data.firstName || !data.lastName || !data.email) {
      throw new AppError('Missing required worker fields', 'VALIDATION_ERROR');
    }

    // Validate email format
    if (!this.validateEmail(data.email)) {
      throw new AppError('Invalid email format', 'VALIDATION_ERROR');
    }

    const id = `W-${Date.now()}${Math.random().toString(36).substr(2, 5)}`;
    const worker: Worker = { id, ...data };

    await this.dbService.run(
      'INSERT INTO workers (id, firstName, lastName, email, role, status) VALUES (?, ?, ?, ?, ?, ?)',
      [worker.id, worker.firstName, worker.lastName, worker.email, worker.role, worker.status]
    );

    return worker;
  }

  private validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
} 