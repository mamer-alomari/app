import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface DashboardButton {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('John Doe');

  const dashboardButtons: DashboardButton[] = [
    {
      id: 'retrieve',
      title: 'Retrieve Quote',
      description: 'View or manage your existing quotes',
      path: '/retrieve-quote',
      icon: '📋'
    },
    {
      id: 'track',
      title: 'Track My Job',
      description: 'Track your moving job status',
      path: '/track-job/MOV-1234',
      icon: '🚚'
    },
    {
      id: 'billing',
      title: 'Billing',
      description: 'View and manage your payments',
      path: '/billing',
      icon: '💳'
    },
    {
      id: 'schedule',
      title: 'Job Schedule',
      description: 'View upcoming and past jobs',
      path: '/job-remainder',
      icon: '📅'
    },
    {
      id: 'info',
      title: 'Customer Information',
      description: 'Manage your personal information',
      path: '/customer-info',
      icon: '👤'
    },
    {
      id: 'quotes',
      title: 'Quote History',
      description: 'View all your quotes',
      path: '/quote-history',
      icon: '📝'
    }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const handleButtonClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
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
              onClick={() => handleButtonClick(button.path)}
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