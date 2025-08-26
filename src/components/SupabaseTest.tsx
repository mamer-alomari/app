import React, { useState, useEffect } from 'react';
import { seedSupabaseData } from '../scripts/seedSupabase';
import { companyService } from '../services/supabase/company.service';
import { workerService } from '../services/supabase/worker.service';
import { vehicleService } from '../services/supabase/vehicle.service';

const SupabaseTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [data, setData] = useState<any>(null);

  const handleSeedData = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const result = await seedSupabaseData();
      setMessage('Test data created successfully!');
      setData(result);
    } catch (error) {
      setMessage('Error creating test data: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const companies = await companyService.getAllCompanies();
      const workers = await workerService.getAllWorkers();
      const vehicles = await vehicleService.getAllVehicles();
      
      setData({ companies, workers, vehicles });
      setMessage('Data fetched successfully!');
    } catch (error) {
      setMessage('Error fetching data: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Supabase Test</h2>
      
      <div className="space-x-4 mb-4">
        <button 
          onClick={handleSeedData} 
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Test Data'}
        </button>
        
        <button 
          onClick={handleFetchData} 
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Fetching...' : 'Fetch All Data'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded mb-4 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      {data && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Data:</h3>
          <pre className="overflow-auto text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SupabaseTest; 