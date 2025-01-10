import { format, parseISO, isWithinInterval } from 'date-fns';
import { workerSchedules } from '../data/scheduleData';

/**
 * Check if a worker is available for a given time slot
 */
export function checkWorkerAvailability(
  workerId: string,
  date: string,
  startTime: string,
  endTime: string
): boolean {
  const schedule = workerSchedules.find(s => s.workerId === workerId);
  if (!schedule) return true; // No schedule means available

  const targetStart = parseISO(`${date}T${startTime}`);
  const targetEnd = parseISO(`${date}T${endTime}`);

  return !schedule.shifts.some(shift => {
    if (shift.date !== date) return false;
    const shiftStart = parseISO(`${shift.date}T${shift.startTime}`);
    const shiftEnd = parseISO(`${shift.date}T${shift.endTime}`);
    return hasTimeOverlap(targetStart, targetEnd, shiftStart, shiftEnd);
  });
}

/**
 * Check if two time intervals overlap
 */
function hasTimeOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return (
    isWithinInterval(start1, { start: start2, end: end2 }) ||
    isWithinInterval(end1, { start: start2, end: end2 }) ||
    isWithinInterval(start2, { start: start1, end: end1 })
  );
}

/**
 * Get a worker's schedule for a specific date
 */
export function getWorkerSchedule(workerId: string, date: string) {
  const schedule = workerSchedules.find(s => s.workerId === workerId);
  return schedule?.shifts.find(shift => shift.date === date);
}