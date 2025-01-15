import { getTestDb } from '../../config/database.test';
import { AppError } from '../../utils/errorHandler';

export class TestDatabaseService {
  static async query(sql: string, params: any[] = []) {
    try {
      console.log('TestDatabaseService executing query:', sql); // Debug log
      console.log('With params:', params); // Debug log
      const db = await getTestDb();
      const result = await db.all(sql, params);
      console.log('TestDatabaseService result:', result); // Debug log
      return result;
    } catch (error) {
      console.error('Error in TestDatabaseService query:', error); // Debug log
      throw new AppError(
        error instanceof Error ? error.message : 'Database error',
        'DATABASE_ERROR'
      );
    }
  }

  static async execute(sql: string, params: any[] = []) {
    try {
      console.log('TestDatabaseService executing:', sql); // Debug log
      console.log('With params:', params); // Debug log
      const db = await getTestDb();
      const result = await db.run(sql, params);
      console.log('TestDatabaseService execute result:', result); // Debug log
      return result;
    } catch (error) {
      console.error('Error in TestDatabaseService execute:', error); // Debug log
      throw new AppError(
        error instanceof Error ? error.message : 'Database error',
        'DATABASE_ERROR'
      );
    }
  }
} 