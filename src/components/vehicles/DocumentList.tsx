import { useState } from 'react';
import { Vehicle } from '../../types/vehicle';

interface DocumentListProps {
  vehicle: Vehicle;
}

export default function DocumentList({ vehicle }: DocumentListProps) {
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Vehicle Documents</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registration */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">Registration</h3>
              <p className="text-sm text-gray-500">
                Expires: {new Date(vehicle.registrationExpiry).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setUploadingDoc('registration')}
              className="text-blue-600 text-sm"
            >
              Update
            </button>
          </div>
          {vehicle.documents?.registration && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Current file: {vehicle.documents.registration}</span>
              <button className="text-blue-600 text-sm">View</button>
            </div>
          )}
        </div>

        {/* Insurance */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">Insurance</h3>
              <p className="text-sm text-gray-500">
                Expires: {new Date(vehicle.insuranceExpiry).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setUploadingDoc('insurance')}
              className="text-blue-600 text-sm"
            >
              Update
            </button>
          </div>
          {vehicle.documents?.insurance && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Current file: {vehicle.documents.insurance}</span>
              <button className="text-blue-600 text-sm">View</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}