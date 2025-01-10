import { Vehicle, VehicleMaintenance, VehicleFueling } from '../types/vehicle';
import { Worker } from '../types/worker';
import { mockVehicles } from '../data/vehicleData';
import { mockWorkers } from '../data/workerData';

class MemoryDb {
  private vehicles: Map<string, Vehicle> = new Map();
  private workers: Map<string, Worker> = new Map();
  private maintenance: Map<string, VehicleMaintenance[]> = new Map();
  private fueling: Map<string, VehicleFueling[]> = new Map();

  constructor() {
    // Initialize with mock data
    mockVehicles.forEach(vehicle => {
      this.vehicles.set(vehicle.id, { ...vehicle });
    });

    mockWorkers.forEach(worker => {
      this.workers.set(worker.id, { ...worker });
    });
  }

  // Vehicle operations
  getVehicle(id: string): Vehicle | undefined {
    return this.vehicles.get(id);
  }

  getAllVehicles(): Vehicle[] {
    return Array.from(this.vehicles.values());
  }

  updateVehicle(id: string, data: Partial<Vehicle>): Vehicle {
    const vehicle = this.vehicles.get(id);
    if (!vehicle) throw new Error('Vehicle not found');
    
    const updated = { ...vehicle, ...data };
    this.vehicles.set(id, updated);
    return updated;
  }

  // Worker operations
  getWorker(id: string): Worker | undefined {
    return this.workers.get(id);
  }

  getAllWorkers(): Worker[] {
    return Array.from(this.workers.values());
  }

  updateWorker(id: string, data: Partial<Worker>): Worker {
    const worker = this.workers.get(id);
    if (!worker) throw new Error('Worker not found');
    
    const updated = { ...worker, ...data };
    this.workers.set(id, updated);
    return updated;
  }

  // Maintenance operations
  getMaintenanceRecords(vehicleId: string): VehicleMaintenance[] {
    return this.maintenance.get(vehicleId) || [];
  }

  addMaintenanceRecord(vehicleId: string, record: Omit<VehicleMaintenance, 'id'>): VehicleMaintenance {
    const records = this.maintenance.get(vehicleId) || [];
    const newRecord = {
      ...record,
      id: `M${Date.now()}${Math.random().toString(36).substr(2, 5)}`
    };
    
    records.push(newRecord);
    this.maintenance.set(vehicleId, records);
    return newRecord;
  }

  // Fueling operations
  getFuelingRecords(vehicleId: string): VehicleFueling[] {
    return this.fueling.get(vehicleId) || [];
  }

  addFuelingRecord(vehicleId: string, record: Omit<VehicleFueling, 'id'>): VehicleFueling {
    const records = this.fueling.get(vehicleId) || [];
    const newRecord = {
      ...record,
      id: `F${Date.now()}${Math.random().toString(36).substr(2, 5)}`
    };
    
    records.push(newRecord);
    this.fueling.set(vehicleId, records);
    return newRecord;
  }
}

// Create and export a singleton instance
export const memoryDb = new MemoryDb();