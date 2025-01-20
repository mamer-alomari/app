export interface WorkerShift {
  id: string;
  workerId: string;
  date: string;
  startTime: string;
  endTime: string;
  jobId?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

export interface WorkerSchedule {
  workerId: string;
  shifts: WorkerShift[];
}

export interface VehicleSchedule {
  id: string;
  vehicleId: string;
  date: string;
  tasks: string[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
} 