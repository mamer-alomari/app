import { Worker } from '../../types/worker';

interface WorkerDetailsProps {
  worker: Worker;
}

export default function WorkerDetails({ worker }: WorkerDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{worker.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{worker.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">SSN</p>
            <p className="font-medium">{worker.ssn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Hire Date</p>
            <p className="font-medium">{new Date(worker.hireDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Employment Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium capitalize">{worker.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pay Rate</p>
            <p className="font-medium">${worker.payRate.hourly}/hr (${worker.payRate.overtime}/hr OT)</p>
          </div>
          {worker.supervisor && (
            <div>
              <p className="text-sm text-gray-500">Supervisor</p>
              <p className="font-medium">{worker.supervisor}</p>
            </div>
          )}
        </div>
      </div>

      {worker.role === 'driver' && worker.licenseNumber && (
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Driver Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">License Number</p>
              <p className="font-medium">{worker.licenseNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">License Expiry</p>
              <p className="font-medium">{new Date(worker.licenseExpiry!).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Permissions</h2>
        <div className="space-y-2">
          {Object.entries(worker.permissions).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <span className={`w-4 h-4 rounded-full mr-2 ${
                value ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}