import { useState } from 'react';
import { VehicleMaintenance } from '../../types/maintenance';
import { maintenanceService } from '../../services/api/maintenance.service';
import { toast } from 'react-hot-toast';

interface AddServiceRecordProps {
  vehicleId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddServiceRecord({ 
  vehicleId, 
  isOpen, 
  onClose,
  onSuccess 
}: AddServiceRecordProps) {
  const [formData, setFormData] = useState({
    type: 'routine' as const,
    serviceType: '',
    serviceDate: '',
    mileage: '',
    description: '',
    laborHours: '',
    laborCost: '',
    totalCost: '',
    performedBy: '',
    location: '',
    status: 'completed' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await maintenanceService.addMaintenanceRecord({
        ...formData,
        vehicleId,
        mileage: Number(formData.mileage),
        laborHours: Number(formData.laborHours),
        laborCost: Number(formData.laborCost),
        totalCost: Number(formData.totalCost),
      });
      toast.success('Service record added successfully');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to add service record');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Service Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Service Type</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg p-2"
              value={formData.serviceType}
              onChange={e => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              required
              className="w-full border rounded-lg p-2"
              value={formData.serviceDate}
              onChange={e => setFormData(prev => ({ ...prev, serviceDate: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mileage</label>
            <input
              type="number"
              required
              className="w-full border rounded-lg p-2"
              value={formData.mileage}
              onChange={e => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border rounded-lg p-2"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Add Record
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 