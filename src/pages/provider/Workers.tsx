import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Worker } from '../../types/worker';
import { mockWorkers } from '../../data/workerData';
import WorkerList from '../../components/workers/WorkerList';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function Workers() {
  const navigate = useNavigate();
  const [loading] = useState(false);
  const [workers] = useState<Worker[]>(mockWorkers);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => navigate('/provider/dashboard')} className="text-2xl mr-4">‹</button>
              <h1 className="text-2xl font-bold">Workers Management</h1>
            </div>
            <button
              onClick={() => navigate('/provider/workers/new')}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Add Worker
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <WorkerList workers={workers} />
      </main>
    </div>
  );
}