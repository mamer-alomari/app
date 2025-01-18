import { format, parseISO, isWithinInterval } from 'date-fns';
import { workerSchedules } from '../data/scheduleData';
import { WorkerSchedule } from '../types/schedule';

/**
 * Check if a worker is available for a given time slot
 */
export function checkWorkerAvailability(
  workerSchedule: WorkerSchedule,
  date: string,
  startTime: string,
  endTime: string
): boolean {
  // If worker has no shifts, they're available
  if (!workerSchedule.shifts.length) {
    return true;
  }

  const newStart = new Date(`${date}T${startTime}`).getTime();
  const newEnd = new Date(`${date}T${endTime}`).getTime();

  // Check each existing shift for overlap
  return !workerSchedule.shifts.some(shift => {
    // Only check shifts on the same date
    if (shift.date !== date) {
      return false;
    }

    const shiftStart = new Date(`${shift.date}T${shift.startTime}`).getTime();
    const shiftEnd = new Date(`${shift.date}T${shift.endTime}`).getTime();

    // Check for overlap
    return (
      (newStart >= shiftStart && newStart < shiftEnd) || // New shift starts during existing shift
      (newEnd > shiftStart && newEnd <= shiftEnd) || // New shift ends during existing shift
      (newStart <= shiftStart && newEnd >= shiftEnd) // New shift completely contains existing shift
    );
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