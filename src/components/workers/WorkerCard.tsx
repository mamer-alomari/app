import { useNavigate } from 'react-router-dom';
import { Worker } from '../../types/worker';

interface WorkerCardProps {
  worker: Worker;
}

export default function WorkerCard({ worker }: WorkerCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/provider/workers/${worker.id}`);
  };

  const handleViewDocuments = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(`/provider/workers/${worker.id}`, { state: { activeTab: 'documents' } });
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg hover:text-blue-600">
            {worker.firstName} {worker.lastName}
          </h3>
          <p className="text-sm text-gray-500">ID: {worker.workerId}</p>
          <p className="text-sm text-gray-500">{worker.role.toUpperCase()}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
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

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Hired: {new Date(worker.hireDate).toLocaleDateString()}
          </p>
          <div className="flex gap-2">
            <button 
              onClick={handleViewDocuments}
              className="text-blue-600 text-sm hover:text-blue-800"
            >
              View Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}