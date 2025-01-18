import { beforeAll, afterAll } from 'vitest';
import { setupTestDb, teardownTestDb } from '../config/database.test';

beforeAll(async () => {
  await setupTestDb();
});

afterAll(async () => {
  await teardownTestDb();
});