import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Vehicle } from '../../types/vehicle';
import { mockVehicles } from '../../data/vehicleData';
import VehicleDetails from '../../components/vehicles/VehicleDetails';
import MaintenanceHistory from '../../components/vehicles/MaintenanceHistory';
import FuelingHistory from '../../components/vehicles/FuelingHistory';
import DocumentList from '../../components/vehicles/DocumentList';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

type TabType = 'details' | 'maintenance' | 'fueling' | 'documents';

export default function VehicleDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('details');

  useEffect(() => {
    // In a real app, this would be an API call
    const loadVehicle = async () => {
      try {
        const foundVehicle = mockVehicles.find(v => v.id === id);
        if (foundVehicle) {
          setVehicle(foundVehicle);
        }
      } catch (error) {
        console.error('Error loading vehicle:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="text-center">
          <p className="text-gray-500">Vehicle not found</p>
          <button
            onClick={() => navigate('/provider/vehicles')}
            className="mt-4 text-blue-500"
          >
            Return to Vehicle List
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
              <button onClick={() => navigate('/provider/vehicles')} className="text-2xl mr-4">‹</button>
              <div>
                <h1 className="text-2xl font-bold">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                <p className="text-gray-500">{vehicle.vehicleId}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              vehicle.status === 'active'
                ? 'bg-green-100 text-green-800'
                : vehicle.status === 'maintenance'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <nav className="flex">
              {[
                { id: 'details', label: 'Details' },
                { id: 'maintenance', label: 'Maintenance' },
                { id: 'fueling', label: 'Fueling' },
                { id: 'documents', label: 'Documents' }
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
            {activeTab === 'details' && <VehicleDetails vehicle={vehicle} />}
            {activeTab === 'maintenance' && <MaintenanceHistory vehicle={vehicle} />}
            {activeTab === 'fueling' && <FuelingHistory vehicle={vehicle} />}
            {activeTab === 'documents' && <DocumentList vehicle={vehicle} />}
          </div>
        </div>
      </div>
    </div>
  );
}