import { WorkerRole } from '../types/worker';

export function generateWorkerId(role: WorkerRole, sequence: number): string {
  const roleInitialMap: Record<WorkerRole, string> = {
    mover: 'M',
    foreman: 'F',
    driver: 'D',
    manager: 'R'
  };

  const roleInitial = roleInitialMap[role];
  const sequenceNumber = String(sequence).padStart(5, '0');
  
  return `${roleInitial}24-${sequenceNumber}`;
}