import { useNavigate, useParams } from 'react-router-dom';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: string;
  amount: string;
}

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: InvoiceItem[];
  subtotal: string;
  tax: string;
  total: string;
  jobId: string;
}

const mockInvoice: Invoice = {
  id: 'INV-1234',
  date: '2024-02-15',
  dueDate: '2024-03-01',
  status: 'pending',
  items: [
    {
      description: 'Moving Service - Small Items',
      quantity: 2,
      rate: '300.00',
      amount: '600.00'
    },
    {
      description: 'Moving Service - Large Items',
      quantity: 1,
      rate: '500.00',
      amount: '500.00'
    }
  ],
  subtotal: '1,100.00',
  tax: '100.00',
  total: '1,200.00',
  jobId: 'MOV-1234'
};

export default function InvoiceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Invoice Details</h1>
      </div>

      <div className="p-4">
        <div className="border rounded-lg p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{mockInvoice.id}</h2>
              <p className="text-sm text-gray-500">
                Issued: {mockInvoice.date}
              </p>
              <p className="text-sm text-gray-500">
                Due: {mockInvoice.dueDate}
              </p>
            </div>
            <span className={`${getStatusColor(mockInvoice.status)} text-white px-3 py-1 rounded-full text-sm`}>
              {mockInvoice.status.charAt(0).toUpperCase() + mockInvoice.status.slice(1)}
            </span>
          </div>

          {/* Job Reference */}
          <div>
            <p className="text-sm text-gray-500">Job Reference:</p>
            <p className="font-medium">{mockInvoice.jobId}</p>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-semibold mb-2">Items</h3>
            <div className="space-y-2">
              {mockInvoice.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 py-2 border-b">
                  <div className="col-span-6">
                    <p className="font-medium">{item.description}</p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p className="text-gray-500">x{item.quantity}</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-gray-500">${item.rate}</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <p>${item.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-500">Subtotal</p>
              <p>${mockInvoice.subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500">Tax</p>
              <p>${mockInvoice.tax}</p>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <p>Total</p>
              <p>${mockInvoice.total}</p>
            </div>
          </div>

          {mockInvoice.status !== 'paid' && (
            <button
              onClick={() => navigate('/payment', { state: { amount: mockInvoice.total } })}
              className="w-full bg-black text-white text-lg py-4 rounded-lg"
            >
              Pay Now ›
            </button>
          )}
        </div>
      </div>
    </div>
  );
}