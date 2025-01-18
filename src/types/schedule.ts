export interface WorkerShift {
  date: string;
  startTime: string;
  endTime: string;
  jobId?: string;
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
} 