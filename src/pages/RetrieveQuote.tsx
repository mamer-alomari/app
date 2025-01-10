import { useState } from 'react';
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
  distance: string;
  eta: string;
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
    distance: '50km',
    eta: '1:30 hr',
    price: '1,200.00',
    status: 'pending'
  }
];

export default function RetrieveQuote() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<'id' | 'email'>('id');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<Quote[]>([]);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const results = mockQuotes.filter(quote => 
      searchType === 'id' 
        ? quote.id.toLowerCase() === searchValue.toLowerCase()
        : quote.id.includes(searchValue)
    );

    if (results.length === 0) {
      setError('No quotes found. Please check your information and try again.');
      setSearchResults([]);
    } else {
      setSearchResults(results);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Retrieve Quote</h1>
      </div>

      <div className="p-4">
        {/* Search Type Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSearchType('id')}
            className={`flex-1 py-2 rounded-lg ${
              searchType === 'id'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black'
            }`}
          >
            Quote ID
          </button>
          <button
            onClick={() => setSearchType('email')}
            className={`flex-1 py-2 rounded-lg ${
              searchType === 'email'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black'
            }`}
          >
            Email
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <input
            type={searchType === 'email' ? 'email' : 'text'}
            placeholder={searchType === 'id' ? 'Enter Quote ID' : 'Enter Email Address'}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full p-4 border rounded-lg mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white text-lg py-4 rounded-lg"
          >
            Search Quote ›
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mb-6">{error}</p>
        )}

        {/* Search Results */}
        {searchResults.map(quote => (
          <div
            key={quote.id}
            className="border rounded-lg p-4 mb-4 cursor-pointer hover:border-black"
            onClick={() => navigate(`/quote/${quote.id}`, { state: { quote } })}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{quote.id}</h3>
                <p className="text-sm text-gray-500">{quote.date}</p>
              </div>
              <span className="font-bold">${quote.price}</span>
            </div>
            
            <div className="mb-2">
              <p className="text-sm text-gray-500">Items:</p>
              <p>{quote.items.map(item => 
                `${item.quantity}x ${item.name}`
              ).join(', ')}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
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
  );
}