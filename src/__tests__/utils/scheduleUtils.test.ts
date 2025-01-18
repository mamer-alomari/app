import { describe, it, expect } from 'vitest';
import { checkWorkerAvailability } from '../../utils/scheduleUtils';
import { WorkerSchedule } from '../../types/schedule';

describe('Schedule Utils', () => {
  describe('checkWorkerAvailability', () => {
    it('returns true when worker has no schedule', () => {
      const workerSchedule: WorkerSchedule = {
        workerId: 'W1',
        shifts: []
      };
      const available = checkWorkerAvailability(
        workerSchedule,
        '2024-03-20',
        '09:00',
        '17:00'
      );
      expect(available).toBe(true);
    });

    it('returns false when time slot overlaps with existing shift', () => {
      const workerSchedule: WorkerSchedule = {
        workerId: 'W1',
        shifts: [
          {
            date: '2024-03-20',
            startTime: '09:00',
            endTime: '17:00'
          }
        ]
      };
      const available = checkWorkerAvailability(
        workerSchedule,
        '2024-03-20',
        '13:00',
        '18:00'
      );
      expect(available).toBe(false);
    });

    it('returns true when time slot does not overlap', () => {
      const workerSchedule: WorkerSchedule = {
        workerId: 'W1',
        shifts: [
          {
            date: '2024-03-20',
            startTime: '09:00',
            endTime: '12:00'
          }
        ]
      };
      const available = checkWorkerAvailability(
        workerSchedule,
        '2024-03-20',
        '13:00',
        '17:00'
      );
      expect(available).toBe(true);
    });
  });
});