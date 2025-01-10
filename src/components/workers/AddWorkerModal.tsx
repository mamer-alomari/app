import { useState } from 'react';
import { Worker, WorkerRole } from '../../types/worker';
import { generateWorkerId } from '../../utils/idGenerator';
import { toast } from 'react-hot-toast';

interface AddWorkerModalProps {
  onSubmit: (workerData: Worker) => void;
  onClose: () => void;
}

export default function AddWorkerModal({ onSubmit, onClose }: AddWorkerModalProps) {
  const [workerData, setWorkerData] = useState<Partial<Worker>>({
    role: 'mover',
    status: 'active',
    workHours: [],
    payStubs: []
  });
  const [identificationDoc, setIdentificationDoc] = useState<File | null>(null);
  const [ssnDoc, setSsnDoc] = useState<File | null>(null);
  const [licenseDoc, setLicenseDoc] = useState<File | null>(null);

  const roleOptions: WorkerRole[] = ['mover', 'driver', 'foreman', 'manager'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!workerData.firstName || !workerData.lastName || !workerData.email || 
        !workerData.phone || !workerData.ssn || !identificationDoc || !ssnDoc) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (workerData.role === 'driver' && (!workerData.licenseNumber || !workerData.licenseExpiry || !licenseDoc)) {
      toast.error('Driver\'s license information is required for drivers');
      return;
    }

    // Create a complete worker object
    const newWorker: Worker = {
      id: `W${Date.now()}`,
      workerId: generateWorkerId(workerData.role!, 1), // Sequence will be managed by backend
      firstName: workerData.firstName!,
      lastName: workerData.lastName!,
      email: workerData.email!,
      phone: workerData.phone!,
      ssn: workerData.ssn!,
      role: workerData.role!,
      status: workerData.status!,
      hireDate: new Date().toISOString().split('T')[0],
      documents: {
        identification: `/docs/id-${workerData.workerId}.pdf`,
        ssnCard: `/docs/ssn-${workerData.workerId}.pdf`,
        ...(workerData.role === 'driver' ? {
          driversLicense: `/docs/license-${workerData.workerId}.pdf`
        } : {})
      },
      payRate: {
        hourly: 0,
        overtime: 0
      },
      workHours: [],
      payStubs: [],
      permissions: {
        canAssignJobs: workerData.role === 'manager' || workerData.role === 'foreman',
        canAccessFinancials: workerData.role === 'manager',
        canManageWorkers: workerData.role === 'manager',
        canManageVehicles: workerData.role === 'manager'
      },
      ...(workerData.licenseNumber && {
        licenseNumber: workerData.licenseNumber,
        licenseExpiry: workerData.licenseExpiry
      })
    };

    onSubmit(newWorker);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Add New Worker</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={workerData.firstName || ''}
                onChange={(e) => setWorkerData({ ...workerData, firstName: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={workerData.lastName || ''}
                onChange={(e) => setWorkerData({ ...workerData, lastName: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={workerData.email || ''}
                onChange={(e) => setWorkerData({ ...workerData, email: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={workerData.phone || ''}
                onChange={(e) => setWorkerData({ ...workerData, phone: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={workerData.role || 'mover'}
                onChange={(e) => setWorkerData({ ...workerData, role: e.target.value as WorkerRole })}
                className="w-full p-2 border rounded-lg"
                required
              >
                {roleOptions.map(role => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SSN
              </label>
              <input
                type="text"
                value={workerData.ssn || ''}
                onChange={(e) => setWorkerData({ ...workerData, ssn: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="XXX-XX-XXXX"
                required
              />
            </div>
          </div>

          {workerData.role === 'driver' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Driver's License Number
                </label>
                <input
                  type="text"
                  value={workerData.licenseNumber || ''}
                  onChange={(e) => setWorkerData({ ...workerData, licenseNumber: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  License Expiry
                </label>
                <input
                  type="date"
                  value={workerData.licenseExpiry || ''}
                  onChange={(e) => setWorkerData({ ...workerData, licenseExpiry: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Document
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setIdentificationDoc(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SSN Card
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setSsnDoc(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          {workerData.role === 'driver' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Driver's License
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setLicenseDoc(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 rounded-lg"
            >
              Add Worker
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-black py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}