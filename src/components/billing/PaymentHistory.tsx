import { useNavigate } from 'react-router-dom';

interface Payment {
  id: string;
  date: string;
  amount: string;
  method: string;
  invoiceId: string;
  status: 'successful' | 'failed' | 'refunded';
}

const mockPayments: Payment[] = [
  {
    id: 'PAY-1234',
    date: '2024-02-15',
    amount: '1,200.00',
    method: '•••• 4242',
    invoiceId: 'INV-1234',
    status: 'successful'
  },
  {
    id: 'PAY-5678',
    date: '2024-02-10',
    amount: '950.00',
    method: '•••• 4242',
    invoiceId: 'INV-5678',
    status: 'successful'
  }
];

export default function PaymentHistory() {
  const navigate = useNavigate();

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'successful': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'refunded': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {mockPayments.map(payment => (
        <div
          key={payment.id}
          className="border rounded-lg p-4"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold">{payment.id}</h3>
              <p className="text-sm text-gray-500">{payment.date}</p>
            </div>
            <span className="font-bold">${payment.amount}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Method: {payment.method}</p>
              <p className="text-sm text-gray-500">Invoice: {payment.invoiceId}</p>
            </div>
            <span className={`text-sm ${getStatusColor(payment.status)}`}>
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}