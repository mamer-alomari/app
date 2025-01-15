import { TestDatabaseService } from '../database/TestDatabaseService';
import { AppError } from '../../utils/errorHandler';

export class BaseService<T> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected async query(sql: string, params: any[] = []) {
    try {
      console.log('Executing query:', sql); // Debug log
      console.log('With params:', params); // Debug log
      const result = await TestDatabaseService.query(sql, params);
      console.log('Query result:', result); // Debug log
      return result;
    } catch (error) {
      console.error('Error in base query:', error); // Debug log
      throw error;
    }
  }

  protected async execute(sql: string, params: any[] = []) {
    return TestDatabaseService.execute(sql, params);
  }

  async getAll() {
    return this.query(`SELECT * FROM ${this.tableName}`);
  }

  async getById(id: string) {
    const results = await this.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return results[0];
  }

  async create(data: Omit<T, 'id'>) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    
    const sql = `
      INSERT INTO ${this.tableName} (${columns})
      VALUES (${placeholders})
      RETURNING *
    `;
    
    return this.execute(sql, values);
  }

  async update(id: string, data: Partial<T>) {
    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(data), id];
    
    const sql = `
      UPDATE ${this.tableName}
      SET ${setClause}
      WHERE id = ?
      RETURNING *
    `;
    
    return this.execute(sql, values);
  }

  async delete(id: string) {
    const sql = `
      DELETE FROM ${this.tableName}
      WHERE id = ?
    `;
    
    await this.execute(sql, [id]);
    return true;
  }

  protected handleError(error: unknown): never {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      'DATABASE_ERROR'
    );
  }
}