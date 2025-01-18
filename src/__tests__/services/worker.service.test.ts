import { describe, expect, it, vi } from 'vitest';
import { WorkerService } from '../../services/api/worker.service';
import { Worker } from '../../types/worker';
import { generateWorkerId } from '../../utils/idGenerator';

// Mock the DatabaseService
vi.mock('../../database/DatabaseService', () => {
  return {
    DatabaseService: vi.fn().mockImplementation(() => {
      return {
        run: vi.fn().mockResolvedValue(true)
      };
    })
  };
});

describe('WorkerService', () => {
  const workerService = new WorkerService();

  it('should add a new worker', async () => {
    const newWorker: Omit<Worker, 'id'> = {
      workerId: generateWorkerId('mover', 1),
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '555-1234',
      ssn: '***-**-1234',
      role: 'mover',
      status: 'active',
      hireDate: '2024-01-01',
      documents: {
        identification: '/docs/id-M24-00001.pdf',
        ssnCard: '/docs/ssn-M24-00001.pdf'
      },
      payRate: { hourly: 18, overtime: 27 },
      workHours: [],
      payStubs: [],
      permissions: {
        canAssignJobs: false,
        canAccessFinancials: false,
        canManageWorkers: false,
        canManageVehicles: false
      }
    };

    const worker = await workerService.addWorker(newWorker);
    expect(worker).toHaveProperty('id');
    expect(worker.firstName).toBe('Jane');
  });

  it('should validate required fields', async () => {
    const invalidWorker = {} as Omit<Worker, 'id'>;
    await expect(workerService.addWorker(invalidWorker))
      .rejects.toThrow('Missing required worker fields');
  });

  it('should validate email format', async () => {
    const invalidWorker: Omit<Worker, 'id'> = {
      workerId: generateWorkerId('mover', 2),
      firstName: 'Test',
      lastName: 'User',
      email: 'invalid-email',
      phone: '555-1234',
      ssn: '***-**-1234',
      role: 'mover',
      status: 'active',
      hireDate: '2024-01-01',
      documents: {
        identification: '/docs/id-M24-00002.pdf',
        ssnCard: '/docs/ssn-M24-00002.pdf'
      },
      payRate: { hourly: 18, overtime: 27 },
      workHours: [],
      payStubs: [],
      permissions: {
        canAssignJobs: false,
        canAccessFinancials: false,
        canManageWorkers: false,
        canManageVehicles: false
      }
    };

    await expect(workerService.addWorker(invalidWorker))
      .rejects.toThrow('Invalid email format');
  });
}); 