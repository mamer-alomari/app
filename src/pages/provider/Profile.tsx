import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface BankingInfo {
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  accountType: 'checking' | 'savings';
}

interface PayoutInfo {
  frequency: 'weekly' | 'biweekly' | 'monthly';
  minimumAmount: number;
  payoutMethod: 'bank_transfer' | 'instant';
  lastPayout?: {
    amount: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
  };
}

interface GeneralInfo {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface BusinessInfo {
  companyName: string;
  ein: string;
  businessType: 'sole_proprietorship' | 'llc' | 'corporation';
  yearEstablished: number;
  insuranceInfo: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
    coverage: string;
  };
  licenses: Array<{
    type: string;
    number: string;
    expiryDate: string;
    state: string;
  }>;
}

interface Vehicle {
  id: string;
  type: 'truck' | 'van';
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  capacity: string;
  status: 'active' | 'maintenance' | 'inactive';
  lastMaintenance: string;
  nextMaintenance: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  rate: string;
  rateType: 'hourly' | 'fixed' | 'per_mile';
  available: boolean;
  minimumCharge: string;
}

interface ProviderProfile {
  general: GeneralInfo;
  business: BusinessInfo;
  vehicles: Vehicle[];
  services: Service[];
  banking: BankingInfo;
  payoutSettings: PayoutInfo;
  balance: {
    available: string;
    pending: string;
  };
}

const mockProfile: ProviderProfile = {
  general: {
    name: 'John Smith',
    email: 'john@smithmoving.com',
    phone: '(555) 123-4567',
    avatar: '/avatar.jpg',
    address: '123 Business St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001'
  },
  business: {
    companyName: 'Smith Moving Co.',
    ein: '12-3456789',
    businessType: 'llc',
    yearEstablished: 2020,
    insuranceInfo: {
      provider: 'MoveSafe Insurance',
      policyNumber: 'INS-123456',
      expiryDate: '2024-12-31',
      coverage: '$1,000,000'
    },
    licenses: [
      {
        type: 'Moving Company License',
        number: 'MCL-123456',
        expiryDate: '2024-12-31',
        state: 'NY'
      }
    ]
  },
  vehicles: [
    {
      id: 'V1',
      type: 'truck',
      make: 'Ford',
      model: 'F-650',
      year: 2022,
      licensePlate: 'ABC123',
      capacity: '26ft - 10,000 lbs',
      status: 'active',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15'
    },
    {
      id: 'V2',
      type: 'van',
      make: 'Mercedes-Benz',
      model: 'Sprinter',
      year: 2023,
      licensePlate: 'XYZ789',
      capacity: '16ft - 5,000 lbs',
      status: 'active',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01'
    }
  ],
  services: [
    {
      id: 'S1',
      name: 'Local Moving',
      description: 'Full-service local moving within city limits',
      rate: '150.00',
      rateType: 'hourly',
      available: true,
      minimumCharge: '300.00'
    },
    {
      id: 'S2',
      name: 'Long Distance Moving',
      description: 'Interstate moving services',
      rate: '2.50',
      rateType: 'per_mile',
      available: true,
      minimumCharge: '1,000.00'
    },
    {
      id: 'S3',
      name: 'Packing Services',
      description: 'Professional packing and unpacking',
      rate: '75.00',
      rateType: 'hourly',
      available: true,
      minimumCharge: '150.00'
    }
  ],
  banking: {
    accountName: 'Smith Moving Co.',
    accountNumber: '****4567',
    routingNumber: '****8901',
    bankName: 'Chase Bank',
    accountType: 'checking'
  },
  payoutSettings: {
    frequency: 'weekly',
    minimumAmount: 100,
    payoutMethod: 'bank_transfer',
    lastPayout: {
      amount: '2,450.00',
      date: '2024-02-15',
      status: 'completed'
    }
  },
  balance: {
    available: '1,250.00',
    pending: '750.00'
  }
};

type TabType = 'general' | 'business' | 'vehicles' | 'services' | 'payment';

export default function ProviderProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [profile, setProfile] = useState<ProviderProfile>(mockProfile);
  const [editing, setEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'general', label: 'General' },
    { id: 'business', label: 'Business' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'services', label: 'Services' },
    { id: 'payment', label: 'Payment' }
  ];

  const handleUpdateProfile = (section: keyof ProviderProfile, data: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
    toast.success('Profile updated successfully');
    setEditing(false);
    setEditingItem(null);
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mr-4">
              <img
                src={profile.general.avatar}
                alt={profile.general.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{profile.general.name}</h2>
              <p className="text-gray-500">{profile.general.email}</p>
            </div>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="text-blue-600 text-sm"
          >
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{profile.general.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">
              {profile.general.address}<br />
              {profile.general.city}, {profile.general.state} {profile.general.zipCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusinessTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold">{profile.business.companyName}</h2>
            <p className="text-gray-500">EIN: {profile.business.ein}</p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="text-blue-600 text-sm"
          >
            Edit Business Info
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500">Business Type</p>
            <p className="font-medium capitalize">
              {profile.business.businessType.replace('_', ' ')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Year Established</p>
            <p className="font-medium">{profile.business.yearEstablished}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Insurance Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Provider</p>
              <p className="font-medium">{profile.business.insuranceInfo.provider}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Policy Number</p>
              <p className="font-medium">{profile.business.insuranceInfo.policyNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Coverage</p>
              <p className="font-medium">{profile.business.insuranceInfo.coverage}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Expiry Date</p>
              <p className="font-medium">
                {new Date(profile.business.insuranceInfo.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Licenses</h3>
          <div className="space-y-4">
            {profile.business.licenses.map((license, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{license.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Number</p>
                    <p className="font-medium">{license.number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">State</p>
                    <p className="font-medium">{license.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p className="font-medium">
                      {new Date(license.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVehiclesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Fleet Management</h2>
        <button
          onClick={() => setEditingItem('new_vehicle')}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.vehicles.map(vehicle => (
          <div key={vehicle.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-sm text-gray-500">
                  License Plate: {vehicle.licensePlate}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                vehicle.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : vehicle.status === 'maintenance'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium capitalize">{vehicle.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="font-medium">{vehicle.capacity}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Last Maintenance</p>
                  <p className="font-medium">
                    {new Date(vehicle.lastMaintenance).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Maintenance</p>
                  <p className="font-medium">
                    {new Date(vehicle.nextMaintenance).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingItem(vehicle.id)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  const updatedVehicles = profile.vehicles.filter(v => v.id !== vehicle.id);
                  handleUpdateProfile('vehicles', updatedVehicles);
                }}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServicesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Services Offered</h2>
        <button
          onClick={() => setEditingItem('new_service')}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.services.map(service => (
          <div key={service.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={service.available}
                  onChange={() => {
                    const updatedServices = profile.services.map(s =>
                      s.id === service.id ? { ...s, available: !s.available } : s
                    );
                    handleUpdateProfile('services', updatedServices);
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Rate</p>
                <p className="font-medium">
                  ${service.rate}/{service.rateType.replace('_', ' ')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Minimum Charge</p>
                <p className="font-medium">${service.minimumCharge}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingItem(service.id)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  const updatedServices = profile.services.filter(s => s.id !== service.id);
                  handleUpdateProfile('services', updatedServices);
                }}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <button onClick={() => navigate('/provider/dashboard')} className="text-2xl mr-4">‹</button>
            <h1 className="text-2xl font-bold">Provider Profile</h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex -mb-px">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'general' && renderGeneralTab()}
        {activeTab === 'business' && renderBusinessTab()}
        {activeTab === 'vehicles' && renderVehiclesTab()}
        {activeTab === 'services' && renderServicesTab()}
        {activeTab === 'payment' && (
          <div className="space-y-8">
            {/* Payment tab content remains the same */}
          </div>
        )}
      </div>
    </div>
  );
}