import { Worker } from '../../types/worker';
import { useState } from 'react';

interface WorkerDocumentsProps {
  worker: Worker;
}

export default function WorkerDocuments({ worker }: WorkerDocumentsProps) {
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  const handleUpload = (docType: string, file: File) => {
    // In a real app, this would upload the file to storage
    console.log(`Uploading ${docType}:`, file);
    setUploadingDoc(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identification */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">Identification</h3>
              <p className="text-sm text-gray-500">Government-issued ID</p>
            </div>
            <button
              onClick={() => setUploadingDoc('identification')}
              className="text-blue-600 text-sm"
            >
              Update
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Current file: {worker.documents.identification}</span>
            <button className="text-blue-600 text-sm">View</button>
          </div>
        </div>

        {/* SSN Card */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">SSN Card</h3>
              <p className="text-sm text-gray-500">Social Security Card</p>
            </div>
            <button
              onClick={() => setUploadingDoc('ssnCard')}
              className="text-blue-600 text-sm"
            >
              Update
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Current file: {worker.documents.ssnCard}</span>
            <button className="text-blue-600 text-sm">View</button>
          </div>
        </div>

        {/* Driver's License (if applicable) */}
        {worker.role === 'driver' && worker.documents.driversLicense && (
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Driver's License</h3>
                <p className="text-sm text-gray-500">
                  Expires: {worker.licenseExpiry}
                </p>
              </div>
              <button
                onClick={() => setUploadingDoc('driversLicense')}
                className="text-blue-600 text-sm"
              >
                Update
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Current file: {worker.documents.driversLicense}</span>
              <button className="text-blue-600 text-sm">View</button>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {uploadingDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Upload Document</h3>
            <div className="space-y-4">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleUpload(uploadingDoc, file);
                  }
                }}
                className="w-full p-2 border rounded-lg"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => setUploadingDoc(null)}
                  className="flex-1 bg-gray-200 text-black py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}