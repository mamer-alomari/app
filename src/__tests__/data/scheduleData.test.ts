import { describe, it, expect } from 'vitest';
import { workerSchedules, vehicleSchedules } from '../../data/scheduleData';

describe('Schedule Data', () => {
  describe('Worker Schedules', () => {
    it('has valid worker schedules', () => {
      expect(workerSchedules).toBeInstanceOf(Array);
      expect(workerSchedules.length).toBeGreaterThan(0);

      const schedule = workerSchedules[0];
      expect(schedule).toHaveProperty('workerId');
      expect(schedule).toHaveProperty('shifts');
      expect(schedule.shifts).toBeInstanceOf(Array);
    });

    it('has valid shift data', () => {
      workerSchedules.forEach(schedule => {
        schedule.shifts.forEach(shift => {
          expect(shift).toHaveProperty('date');
          expect(shift).toHaveProperty('startTime');
          expect(shift).toHaveProperty('endTime');
          expect(shift.startTime).toMatch(/^\d{2}:\d{2}$/);
          expect(shift.endTime).toMatch(/^\d{2}:\d{2}$/);
        });
      });
    });

    it('has shifts with valid time ranges', () => {
      workerSchedules.forEach(schedule => {
        schedule.shifts.forEach(shift => {
          const startHour = parseInt(shift.startTime.split(':')[0]);
          const endHour = parseInt(shift.endTime.split(':')[0]);
          expect(startHour).toBeGreaterThanOrEqual(0);
          expect(startHour).toBeLessThan(24);
          expect(endHour).toBeGreaterThan(startHour);
          expect(endHour).toBeLessThanOrEqual(24);
        });
      });
    });
  });

  describe('Vehicle Schedules', () => {
    it('has valid vehicle schedules', () => {
      expect(vehicleSchedules).toBeInstanceOf(Array);
      expect(vehicleSchedules.length).toBeGreaterThan(0);

      const schedule = vehicleSchedules[0];
      expect(schedule).toHaveProperty('id');
      expect(schedule).toHaveProperty('vehicleId');
      expect(schedule).toHaveProperty('date');
      expect(schedule).toHaveProperty('tasks');
      expect(schedule.tasks).toBeInstanceOf(Array);
    });

    it('has valid task data', () => {
      vehicleSchedules.forEach(schedule => {
        expect(schedule.id).toMatch(/^[A-Z0-9]+$/);
        expect(schedule.vehicleId).toBeDefined();
        expect(schedule.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(schedule.tasks.length).toBeGreaterThan(0);
      });
    });
  });
}); 