import { describe, it, expect } from 'vitest';
import { jobsService } from '../../services/api/jobs.service';

describe('Jobs Service', () => {
  it('retrieves list of jobs', async () => {
    const jobs = await jobsService.getJobs();
    
    expect(Array.isArray(jobs)).toBe(true);
    expect(jobs.length).toBeGreaterThan(0);
    expect(jobs[0]).toHaveProperty('id');
    expect(jobs[0]).toHaveProperty('status');
    expect(jobs[0]).toHaveProperty('items');
  });

  it('retrieves job by id', async () => {
    const jobId = 'MOV-1234';
    const job = await jobsService.getJobById(jobId);
    
    expect(job).toHaveProperty('id', jobId);
    expect(job).toHaveProperty('status');
    expect(job).toHaveProperty('tracking');
  });

  it('tracks job location', async () => {
    const jobId = 'MOV-1234';
    const tracking = await jobsService.trackJob(jobId);
    
    expect(tracking).toHaveProperty('currentLocation');
    expect(tracking).toHaveProperty('estimatedArrival');
    expect(tracking).toHaveProperty('distance');
    expect(tracking).toHaveProperty('timeRemaining');
  });
});