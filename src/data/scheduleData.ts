import { format, addDays } from 'date-fns';

export interface WorkerSchedule {
  workerId: string;
  shifts: {
    date: string;
    startTime: string;
    endTime: string;
    jobId?: string;
  }[];
}

// Helper to generate dates
const today = new Date();
const formatDate = (daysToAdd: number) => format(addDays(today, daysToAdd), 'yyyy-MM-dd');

export const workerSchedules: WorkerSchedule[] = [
  {
    workerId: 'W1',
    shifts: [
      { date: formatDate(0), startTime: '09:00', endTime: '17:00', jobId: 'MOV-1234' },
      { date: formatDate(1), startTime: '09:00', endTime: '17:00', jobId: 'MOV-5678' },
      { date: formatDate(3), startTime: '09:00', endTime: '17:00' }
    ]
  },
  {
    workerId: 'W2',
    shifts: [
      { date: formatDate(0), startTime: '09:00', endTime: '17:00', jobId: 'MOV-1234' },
      { date: formatDate(2), startTime: '10:00', endTime: '18:00' },
      { date: formatDate(4), startTime: '09:00', endTime: '17:00' }
    ]
  },
  {
    workerId: 'W3',
    shifts: [
      { date: formatDate(0), startTime: '14:00', endTime: '22:00', jobId: 'MOV-5678' },
      { date: formatDate(1), startTime: '14:00', endTime: '22:00' },
      { date: formatDate(3), startTime: '14:00', endTime: '22:00' }
    ]
  },
  {
    workerId: 'W4',
    shifts: [
      { date: formatDate(1), startTime: '09:00', endTime: '17:00' },
      { date: formatDate(2), startTime: '09:00', endTime: '17:00' },
      { date: formatDate(4), startTime: '09:00', endTime: '17:00' }
    ]
  }
];