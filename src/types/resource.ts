export interface Resource {
  id: string;
  name: string;
  type: string;
  quantity: number;
  status: 'available' | 'in_use' | 'maintenance';
  lastUpdated: string;
}

export interface MockItem {
  id: string;
  name: string;
  type: string;
  available: boolean;
}

export interface ResourceAssignment {
  id: string;
  resourceId: string;
  jobId: string;
  assignedAt: string;
  returnedAt?: string;
  status: 'assigned' | 'returned';
}