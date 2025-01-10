import { useNavigate } from 'react-router-dom';

interface QuoteItem {
  name: string;
  size: string;
  quantity: number;
}

interface Quote {
  id: string;
  date: string;
  items: QuoteItem[];
  source: string;
  destination: string;
  price: string;
  status: 'pending' | 'accepted' | 'expired';
}

const mockQuotes: Quote[] = [
  {
    id: 'QT-1234',
    date: '2024-02-15',
    items: [
      { name: 'Arm Chairs', size: 'Small', quantity: 2 },
      { name: '3 Seater Sofa', size: 'Large', quantity: 1 }
    ],
    source: '940 Strooman Key. Apt 334',
    destination: '123 New Address St.',
    price: '1,200.00',
    status: 'pending'
  },
  {
    id: 'QT-5678',
    date: '2024-02-10',
    items: [
      { name: 'Desk Lamp', size: 'Medium', quantity: 1 },
      { name: 'Bookshelf', size: 'Large', quantity: 2 }
    ],
    source: '555 Old Home Rd.',
    destination: '777 New Home Ave.',
    price: '950.00',
    status: 'accepted'
  },
  {
    id: 'QT-9012',
    date: '2024-02-01',
    items: [
      { name: 'Dining Table', size: 'Large', quantity: 1 },
      { name: 'Dining Chairs', size: 'Medium', quantity: 4 }
    ],
    source: '123 Previous St.',
    destination: '456 Current Ave.',
    price: '1,500.00',
    status: 'expired'
  }
];

export default function QuoteHistory() {
  const navigate = useNavigate();

  const getStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'accepted': return 'bg-green-500';
      case 'expired': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Quote History</h1>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {mockQuotes.map(quote => (
            <div
              key={quote.id}
              onClick={() => navigate(`/quote/${quote.id}`, { state: { quote } })}
              className="border rounded-lg p-4 cursor-pointer hover:border-black transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-bold text-lg">{quote.id}</h2>
                  <p className="text-sm text-gray-500">{quote.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold mb-1">${quote.price}</p>
                  <span className={`${getStatusColor(quote.status)} text-white px-2 py-1 rounded-full text-xs`}>
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Items:</p>
                <p className="text-sm">
                  {quote.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">From:</p>
                  <p className="truncate">{quote.source}</p>
                </div>
                <div>
                  <p className="text-gray-500">To:</p>
                  <p className="truncate">{quote.destination}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}