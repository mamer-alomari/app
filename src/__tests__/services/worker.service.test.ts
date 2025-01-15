import { workerService } from '../../services/api/worker.service';
import { Worker } from '../../types/worker';

describe('WorkerService', () => {
  const testWorker: Omit<Worker, 'id'> = {
    first_name: 'Test',
    last_name: 'Worker',
    email: 'test.worker@example.com',
    phone: '555-0199',
    role: 'driver',
    status: 'active'
  };

  it('should add a new worker', async () => {
    const worker = await workerService.addWorker(testWorker);
    expect(worker).toHaveProperty('id');
    expect(worker.first_name).toBe(testWorker.first_name);
    expect(worker.email).toBe(testWorker.email);
  });

  it('should validate required fields', async () => {
    const invalidWorker = { ...testWorker, first_name: '' };
    await expect(workerService.addWorker(invalidWorker)).rejects.toThrow('Missing required worker fields');
  });

  it('should validate email format', async () => {
    const invalidWorker = { ...testWorker, email: 'invalid-email' };
    await expect(workerService.addWorker(invalidWorker)).rejects.toThrow('Invalid email format');
  });
}); 