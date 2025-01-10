import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressBook from '../components/customer/AddressBook';
import PreferencesSettings from '../components/customer/PreferencesSettings';
import NotificationSettings from '../components/customer/NotificationSettings';
import SecuritySettings from '../components/customer/SecuritySettings';

type TabType = 'profile' | 'addresses' | 'preferences' | 'notifications' | 'security';

export default function CustomerInfo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    avatar: '/avatar.jpg'
  });

  const tabs: { id: TabType; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Customer Information</h1>
      </div>

      {/* Profile Header */}
      <div className="bg-gray-50 p-4 flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {profileData.avatar ? (
            <img src={profileData.avatar} alt={profileData.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl">{profileData.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-lg">{profileData.name}</h2>
          <p className="text-gray-500">{profileData.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b overflow-x-auto">
        <div className="flex whitespace-nowrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <button
              type="button"
              className="w-full bg-black text-white text-lg py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'addresses' && <AddressBook />}
        {activeTab === 'preferences' && <PreferencesSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'security' && <SecuritySettings />}
      </div>
    </div>
  );
}