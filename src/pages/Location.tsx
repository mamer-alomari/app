import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Location() {
  const navigate = useNavigate();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock distance calculation
    const mockData = {
      source,
      destination,
      distance: '50km',
      eta: '1:30 hr',
      price: '1,200.00'
    };
    navigate('/freight', { state: mockData });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Location Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Pickup Location
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Enter pickup address"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Delivery Location
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter delivery address"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white text-lg py-4 rounded-lg mt-4"
        >
          Calculate Quote ›
        </button>
      </form>
    </div>
  );
}