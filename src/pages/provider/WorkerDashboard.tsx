import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Worker } from '../../types/worker';
import { mockWorkers } from '../../data/workerData';
import WorkerDetails from '../../components/workers/WorkerDetails';
import WorkerDocuments from '../../components/workers/WorkerDocuments';
import WorkerHours from '../../components/workers/WorkerHours';
import PayStubList from '../../components/workers/PayStubList';
import PayStubModal from '../../components/workers/PayStubModal';
import { PayStub } from '../../types/payroll';

type TabType = 'details' | 'documents' | 'hours' | 'pay';

export default function WorkerDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [showPayStub, setShowPayStub] = useState<PayStub | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundWorker = mockWorkers.find(w => w.id === id);
    if (foundWorker) {
      setWorker(foundWorker);
    }
  }, [id]);

  if (!worker) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="text-center">
          <p className="text-gray-500">Worker not found</p>
          <button
            onClick={() => navigate('/provider/workers')}
            className="mt-4 text-blue-500"
          >
            Return to Workers List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => navigate('/provider/workers')} className="text-2xl mr-4">‹</button>
              <div>
                <h1 className="text-2xl font-bold">{worker.firstName} {worker.lastName}</h1>
                <p className="text-gray-500">{worker.workerId} • {worker.role.toUpperCase()}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              worker.status === 'active'
                ? 'bg-green-100 text-green-800'
                : worker.status === 'on_leave'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {worker.status.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Current Hours */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Hours</h3>
            <div className="flex justify-between items-baseline">
              <p className="text-2xl font-bold">32.5</p>
              <p className="text-sm text-gray-500">This Week</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Next Shift</h3>
            <p className="text-2xl font-bold">Tomorrow</p>
            <p className="text-sm text-gray-500">9:00 AM - 5:00 PM</p>
          </div>

          {/* Total Earnings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Earnings</h3>
            <p className="text-2xl font-bold">$2,450.00</p>
            <p className="text-sm text-gray-500">Year to Date</p>
          </div>

          {/* Current Earnings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Earnings</h3>
            <p className="text-2xl font-bold">$750.00</p>
            <p className="text-sm text-gray-500">This Period</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <nav className="flex">
              {[
                { id: 'details', label: 'Details' },
                { id: 'documents', label: 'Documents' },
                { id: 'hours', label: 'Hours' },
                { id: 'pay', label: 'Pay' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'details' && <WorkerDetails worker={worker} />}
            {activeTab === 'documents' && <WorkerDocuments worker={worker} />}
            {activeTab === 'hours' && <WorkerHours hours={worker.workHours} onAddHours={() => {}} />}
            {activeTab === 'pay' && (
              <PayStubList
                payStubs={worker.payStubs}
                onViewPayStub={(payStub) => setShowPayStub(payStub)}
              />
            )}
          </div>
        </div>
      </div>

      {showPayStub && (
        <PayStubModal
          payStub={showPayStub}
          onClose={() => setShowPayStub(null)}
        />
      )}
    </div>
  );
}