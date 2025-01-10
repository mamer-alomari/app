import { Worker } from '../../types/worker';
import { useNavigate } from 'react-router-dom';

interface WorkerListProps {
  workers: Worker[];
}

export default function WorkerList({ workers }: WorkerListProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workers.map(worker => (
        <div 
          key={worker.id}
          onClick={() => navigate(`/provider/workers/${worker.id}`)}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">
                {worker.firstName} {worker.lastName}
              </h3>
              <p className="text-sm text-gray-500">{worker.workerId}</p>
              <p className="text-sm text-gray-500 capitalize">{worker.role}</p>
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
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/provider/workers/${worker.id}/documents`);
                }}
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                View Documents
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}