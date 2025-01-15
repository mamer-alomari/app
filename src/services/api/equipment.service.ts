import { BaseService } from './base.service';
import { Equipment, EquipmentAssignment } from '../../types/equipment';
import { AppError } from '../../utils/errorHandler';

class EquipmentService extends BaseService<Equipment> {
  constructor() {
    super('equipment');
  }

  private validateEquipment(data: Partial<Equipment>) {
    const errors: string[] = [];

    // Required fields validation
    if (!data.providerId) errors.push('Provider ID is required');
    if (!data.name) errors.push('Equipment name is required');
    if (!data.type) errors.push('Equipment type is required');

    // Status validation
    const validStatuses = ['available', 'in_use', 'maintenance', 'retired'];
    if (data.status && !validStatuses.includes(data.status)) {
      errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    // Condition validation
    const validConditions = ['new', 'good', 'fair', 'poor'];
    if (data.condition && !validConditions.includes(data.condition)) {
      errors.push(`Invalid condition. Must be one of: ${validConditions.join(', ')}`);
    }

    // Date validations
    if (data.lastMaintenanceDate && new Date(data.lastMaintenanceDate) > new Date()) {
      errors.push('Last maintenance date cannot be in the future');
    }

    if (data.nextMaintenanceDate && data.lastMaintenanceDate &&
        new Date(data.nextMaintenanceDate) <= new Date(data.lastMaintenanceDate)) {
      errors.push('Next maintenance date must be after last maintenance date');
    }

    if (errors.length > 0) {
      throw new AppError(errors.join('; '), 'VALIDATION_ERROR');
    }
  }

  async addEquipment(data: Omit<Equipment, 'id'>) {
    this.validateEquipment(data);
    
    try {
      return await this.create({
        ...data,
        status: data.status || 'available',
        condition: data.condition || 'new'
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateEquipment(id: string, data: Partial<Equipment>) {
    const currentEquipment = await this.getById(id);
    if (!currentEquipment) {
      throw new AppError('Equipment not found', 'NOT_FOUND');
    }

    this.validateEquipment({ ...currentEquipment, ...data });
    
    try {
      return await this.update(id, data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getEquipmentByProvider(providerId: string) {
    try {
      return await this.query(
        `SELECT 
          e.*,
          COALESCE(a.assigned_to_job, false) as is_assigned,
          COALESCE(a.job_id, NULL) as current_job_id
         FROM ${this.tableName} e
         LEFT JOIN equipment_assignments a ON e.id = a.equipment_id
         WHERE e.provider_id = $1
         ORDER BY e.name ASC`,
        [providerId]
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAvailableEquipment(providerId: string) {
    try {
      return await this.query(
        `SELECT * FROM ${this.tableName}
         WHERE provider_id = $1
         AND status = 'available'
         ORDER BY name ASC`,
        [providerId]
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async assignEquipment(equipmentId: string, jobId: string, workerId: string) {
    try {
      // Check if equipment is available
      const equipment = await this.getById(equipmentId);
      if (!equipment) {
        throw new AppError('Equipment not found', 'NOT_FOUND');
      }
      if (equipment.status !== 'available') {
        throw new AppError('Equipment is not available', 'VALIDATION_ERROR');
      }

      // Create assignment record
      await this.query(
        `INSERT INTO equipment_assignments (
          equipment_id, job_id, assigned_by, assigned_at
        ) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
        [equipmentId, jobId, workerId]
      );

      // Update equipment status
      await this.update(equipmentId, { status: 'in_use' });

      return { success: true };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async unassignEquipment(equipmentId: string, workerId: string) {
    try {
      // Check if equipment exists and is assigned
      const equipment = await this.getById(equipmentId);
      if (!equipment) {
        throw new AppError('Equipment not found', 'NOT_FOUND');
      }
      if (equipment.status !== 'in_use') {
        throw new AppError('Equipment is not currently assigned', 'VALIDATION_ERROR');
      }

      // Update assignment record
      await this.query(
        `UPDATE equipment_assignments 
         SET unassigned_by = $1, unassigned_at = CURRENT_TIMESTAMP
         WHERE equipment_id = $2 AND unassigned_at IS NULL`,
        [workerId, equipmentId]
      );

      // Update equipment status
      await this.update(equipmentId, { status: 'available' });

      return { success: true };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async scheduleMaintenanceForEquipment(equipmentId: string, maintenanceDate: Date, notes?: string) {
    try {
      const equipment = await this.getById(equipmentId);
      if (!equipment) {
        throw new AppError('Equipment not found', 'NOT_FOUND');
      }

      if (maintenanceDate <= new Date()) {
        throw new AppError('Maintenance date must be in the future', 'VALIDATION_ERROR');
      }

      await this.update(equipmentId, {
        status: 'maintenance',
        nextMaintenanceDate: maintenanceDate,
        notes: notes || equipment.notes
      });

      return { success: true };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMaintenanceHistory(equipmentId: string) {
    try {
      return await this.query(
        `SELECT 
          m.*,
          u.first_name || ' ' || u.last_name as performed_by_name
         FROM equipment_maintenance m
         LEFT JOIN users u ON m.performed_by = u.id
         WHERE m.equipment_id = $1
         ORDER BY m.maintenance_date DESC`,
        [equipmentId]
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAssignmentHistory(equipmentId: string) {
    try {
      return await this.query(
        `SELECT 
          a.*,
          j.job_number,
          u1.first_name || ' ' || u1.last_name as assigned_by_name,
          u2.first_name || ' ' || u2.last_name as unassigned_by_name
         FROM equipment_assignments a
         LEFT JOIN jobs j ON a.job_id = j.id
         LEFT JOIN users u1 ON a.assigned_by = u1.id
         LEFT JOIN users u2 ON a.unassigned_by = u2.id
         WHERE a.equipment_id = $1
         ORDER BY a.assigned_at DESC`,
        [equipmentId]
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export const equipmentService = new EquipmentService(); 