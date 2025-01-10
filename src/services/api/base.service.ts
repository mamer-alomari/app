import { supabase } from '../../lib/supabase';
import { AppError } from '../../utils/errorHandler';

export class BaseService<T> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(): Promise<T[]> {
    try {
      const response = await fetch(`/api/${this.endpoint}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      return response.json();
    } catch (error) {
      throw new AppError(`Failed to fetch ${this.endpoint}`, `${this.endpoint.toUpperCase()}_FETCH_ERROR`);
    }
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    try {
      const response = await fetch(`/api/${this.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create');
      return response.json();
    } catch (error) {
      throw new AppError(`Failed to create ${this.endpoint}`, `${this.endpoint.toUpperCase()}_CREATE_ERROR`);
    }
  }
}