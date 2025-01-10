import { describe, it, expect } from 'vitest';
import { checkWorkerAvailability, getWorkerSchedule } from '../../utils/scheduleUtils';
import { format, addDays } from 'date-fns';

describe('Schedule Utils', () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

  describe('checkWorkerAvailability', () => {
    it('returns true when worker has no schedule', () => {
      const available = checkWorkerAvailability(
        'nonexistent-worker',
        today,
        '09:00',
        '17:00'
      );
      expect(available).toBe(true);
    });

    it('returns false when time slot overlaps with existing shift', () => {
      const available = checkWorkerAvailability(
        'W1', // Worker with existing shift
        today,
        '08:00',
        '10:00'
      );
      expect(available).toBe(false);
    });

    it('returns true when time slot does not overlap', () => {
      const available = checkWorkerAvailability(
        'W1',
        tomorrow, // Different day
        '09:00',
        '17:00'
      );
      expect(available).toBe(true);
    });
  });

  describe('getWorkerSchedule', () => {
    it('returns undefined for worker with no schedule', () => {
      const schedule = getWorkerSchedule('nonexistent-worker', today);
      expect(schedule).toBeUndefined();
    });

    it('returns schedule for worker on specific date', () => {
      const schedule = getWorkerSchedule('W1', today);
      expect(schedule).toBeDefined();
      expect(schedule?.startTime).toBe('09:00');
      expect(schedule?.endTime).toBe('17:00');
    });

    it('returns undefined when worker has no shift on date', () => {
      const schedule = getWorkerSchedule('W1', '2025-01-01');
      expect(schedule).toBeUndefined();
    });
  });
});