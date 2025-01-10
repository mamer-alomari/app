import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

interface EarningsSummary {
  today: string;
  thisWeek: string;
  thisMonth: string;
  totalJobs: number;
  completionRate: number;
}

interface EarningsDetail {
  id: string;
  date: string;
  jobId: string;
  customerName: string;
  amount: string;
  status: 'completed' | 'pending';
}

const mockSummary: EarningsSummary = {
  today: '150.00',
  thisWeek: '850.00',
  thisMonth: '3,200.00',
  totalJobs: 28,
  completionRate: 98
};

const mockEarnings: EarningsDetail[] = [
  {
    id: 'EARN-1234',
    date: '2024-02-20',
    jobId: 'MOV-1234',
    customerName: 'John Smith',
    amount: '150.00',
    status: 'completed'
  },
  {
    id: 'EARN-5678',
    date: '2024-02-20',
    jobId: 'MOV-5678',
    customerName: 'Sarah Johnson',
    amount: '280.00',
    status: 'pending'
  }
];

export default function Earnings() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<EarningsSummary | null>(null);
  const [earnings, setEarnings] = useState<EarningsDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSummary(mockSummary);
      setEarnings(mockEarnings);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <button onClick={() => navigate('/provider/dashboard')} className="text-2xl mr-4">‹</button>
            <h1 className="text-2xl font-bold">Earnings</h1>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Today's Earnings</h3>
            <p className="text-3xl font-bold mt-2">${summary?.today}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">This Week</h3>
            <p className="text-3xl font-bold mt-2">${summary?.thisWeek}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">This Month</h3>
            <p className="text-3xl font-bold mt-2">${summary?.thisMonth}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Jobs</h3>
              <p className="text-2xl font-bold mt-1">{summary?.totalJobs}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
              <p className="text-2xl font-bold mt-1">{summary?.completionRate}%</p>
            </div>
          </div>
        </div>

        {/* Recent Earnings */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent Earnings</h2>
          </div>
          <div className="divide-y">
            {earnings.map(earning => (
              <div key={earning.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{earning.customerName}</h3>
                    <p className="text-sm text-gray-500">Job ID: {earning.jobId}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(earning.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${earning.amount}</p>
                    <span className={`text-sm ${
                      earning.status === 'completed' 
                        ? 'text-green-500' 
                        : 'text-yellow-500'
                    }`}>
                      {earning.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}