export interface Equipment {
  id: string;
  providerId: string;
  name: string;
  type: string;
  serialNumber?: string;
  status: 'available' | 'in_use' | 'maintenance' | 'retired';
  condition: 'new' | 'good' | 'fair' | 'poor';
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EquipmentAssignment {
  id: string;
  equipmentId: string;
  jobId: string;
  assignedBy: string;
  assignedAt: Date;
  unassignedBy?: string;
  unassignedAt?: Date;
}

export interface EquipmentMaintenance {
  id: string;
  equipmentId: string;
  maintenanceDate: Date;
  maintenanceType: string;
  description: string;
  performedBy: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}