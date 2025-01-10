import { useNavigate } from 'react-router-dom';
import PaymentMethodList from '../components/billing/PaymentMethodList';
import PaymentHistory from '../components/billing/PaymentHistory';
import { useState } from 'react';

type TabType = 'overview' | 'history' | 'methods';

export default function Billing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'history', label: 'History' },
    { id: 'methods', label: 'Payment Methods' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Billing</h1>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-center border-b-2 ${
                activeTab === tab.id
                  ? 'border-black text-black font-semibold'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'overview' && <BillingOverview />}
        {activeTab === 'history' && <PaymentHistory />}
        {activeTab === 'methods' && <PaymentMethodList />}
      </div>
    </div>
  );
}

function BillingOverview() {
  const navigate = useNavigate();
  const pendingInvoices = [
    {
      id: 'INV-1234',
      date: '2024-02-15',
      amount: '1,200.00',
      status: 'pending',
      jobId: 'MOV-1234',
      dueDate: '2024-03-01'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-black text-white p-6 rounded-lg">
        <h2 className="text-lg mb-2">Total Outstanding</h2>
        <p className="text-3xl font-bold">$1,200.00</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Pending Invoices</h2>
        {pendingInvoices.map(invoice => (
          <div
            key={invoice.id}
            onClick={() => navigate(`/billing/invoice/${invoice.id}`)}
            className="border rounded-lg p-4 mb-4 cursor-pointer hover:border-black transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{invoice.id}</h3>
                <p className="text-sm text-gray-500">Due {invoice.dueDate}</p>
              </div>
              <span className="font-bold">${invoice.amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Job: {invoice.jobId}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/payment', { state: { amount: invoice.amount } });
                }}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm"
              >
                Pay Now ›
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}