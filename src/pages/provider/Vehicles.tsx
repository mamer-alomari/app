import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vehicle } from '../../types/vehicle';
import { mockVehicles } from '../../data/vehicleData';
import VehicleList from '../../components/vehicles/VehicleList';
import AddVehicleModal from '../../components/vehicles/AddVehicleModal';
import { toast } from 'react-hot-toast';

export default function Vehicles() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);

  const handleAddVehicle = (vehicleData: Vehicle) => {
    setVehicles([...vehicles, vehicleData]);
    toast.success('Vehicle added successfully');
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => navigate('/provider/dashboard')} className="text-2xl mr-4">‹</button>
              <h1 className="text-2xl font-bold">Fleet Management</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Add Vehicle
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <VehicleList vehicles={vehicles} />
      </main>

      {showAddModal && (
        <AddVehicleModal
          onSubmit={handleAddVehicle}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}