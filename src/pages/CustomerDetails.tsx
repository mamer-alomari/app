import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: string;
  destination: string;
  billingAddress: string;
}

export default function CustomerDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [info, setInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    source: '',
    destination: '',
    billingAddress: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculate mock distance and price
    const mockData = {
      ...info,
      distance: '50km',
      eta: '1:30 hr',
      price: '1,200.00'
    };
    navigate('/freight', { state: mockData });
  };

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    setInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Customer Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Personal Information */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={info.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full p-4 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={info.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full p-4 border rounded-lg"
                required
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={info.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-4 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={info.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-4 border rounded-lg"
                required
              />
            </div>
          </div>
        </section>

        {/* Moving Details */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Moving Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Address
              </label>
              <input
                type="text"
                value={info.source}
                onChange={(e) => handleChange('source', e.target.value)}
                className="w-full p-4 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                value={info.destination}
                onChange={(e) => handleChange('destination', e.target.value)}
                className="w-full p-4 border rounded-lg"
                required
              />
            </div>
          </div>
        </section>

        {/* Billing Information */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Billing Address
            </label>
            <input
              type="text"
              value={info.billingAddress}
              onChange={(e) => handleChange('billingAddress', e.target.value)}
              className="w-full p-4 border rounded-lg"
              required
            />
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-black text-white text-lg py-4 rounded-lg mt-8"
        >
          Continue to Quote ›
        </button>
      </form>
    </div>
  );
}