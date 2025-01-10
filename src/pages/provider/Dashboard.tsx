import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

interface DashboardButton {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
}

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [userName, setUserName] = useState(user?.name || 'Service Provider');

  const dashboardButtons: DashboardButton[] = [
    {
      id: 'jobs',
      title: 'Active Jobs',
      description: 'View and manage current jobs',
      path: '/provider/jobs',
      icon: '🚚'
    },
    {
      id: 'schedule',
      title: 'Schedule',
      description: 'Manage your work schedule',
      path: '/provider/schedule',
      icon: '📅'
    },
    {
      id: 'earnings',
      title: 'Earnings',
      description: 'View your earnings and payouts',
      path: '/provider/earnings',
      icon: '💰'
    },
    {
      id: 'workers',
      title: 'Workers',
      description: 'Manage workers and documents',
      path: '/provider/workers',
      icon: '👥'
    },
    {
      id: 'vehicles',
      title: 'Vehicles',
      description: 'Manage your fleet and documents',
      path: '/provider/vehicles',
      icon: '🚛'
    },
    {
      id: 'warehouse',
      title: 'Warehouse Layout',
      description: 'Configure warehouse zones and storage',
      path: '/provider/warehouse',
      icon: '🏭'
    },
    {
      id: 'profile',
      title: 'Provider Profile',
      description: 'Update your profile and settings',
      path: '/provider/profile',
      icon: '👤'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Provider Dashboard</h1>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Welcome back, {userName}!</h2>
          <p className="text-gray-600">Manage your moving services and track your jobs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => navigate(button.path)}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
            >
              <span className="text-3xl mb-4 block">{button.icon}</span>
              <h3 className="text-lg font-semibold mb-2">{button.title}</h3>
              <p className="text-gray-600 text-sm">{button.description}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}