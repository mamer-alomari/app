import { useLocation, useNavigate } from 'react-router-dom';

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
  distance: string;
  eta: string;
  price: string;
  status: 'pending' | 'accepted' | 'expired';
}

export default function QuoteDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const quote = location.state?.quote as Quote;

  if (!quote) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center p-4 border-b">
          <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
          <h1 className="text-2xl font-bold">Quote Details</h1>
        </div>
        <div className="p-4 text-center">
          <p>Quote not found.</p>
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold">Quote Details</h1>
      </div>

      <div className="p-4">
        <div className="border rounded-lg p-4 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-bold text-xl">{quote.id}</h2>
              <p className="text-sm text-gray-500">{quote.date}</p>
            </div>
            <span className={`${getStatusColor(quote.status)} text-white px-3 py-1 rounded-full text-sm`}>
              {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Items</h3>
              <div className="space-y-2">
                {quote.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.size}</p>
                    </div>
                    <span className="text-gray-700">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">From</h3>
                <p className="text-gray-700">{quote.source}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">To</h3>
                <p className="text-gray-700">{quote.destination}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Distance</h3>
                <p className="text-gray-700">{quote.distance}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ETA</h3>
                <p className="text-gray-700">{quote.eta}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Total Price</h3>
                <p className="text-2xl font-bold">${quote.price}</p>
              </div>
            </div>
          </div>
        </div>

        {quote.status === 'pending' && (
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/payment', { state: { amount: quote.price } })}
              className="flex-1 bg-black text-white text-lg py-4 rounded-lg"
            >
              Accept Quote ›
            </button>
            <button
              onClick={() => navigate('/quote')}
              className="flex-1 bg-gray-200 text-black text-lg py-4 rounded-lg"
            >
              Request New Quote
            </button>
          </div>
        )}
      </div>
    </div>
  );
}