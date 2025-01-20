import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';

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
  const [quoteId, setQuoteId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('id')
        .eq('id', quoteId)
        .single();

      if (error) throw error;
      if (data) {
        navigate(`/quotes/${quoteId}`);
      } else {
        setError('Quote not found');
      }
    } catch (err) {
      setError('Failed to retrieve quote');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Retrieve Quote</h1>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="quoteId" className="block text-gray-700 mb-2">
            Quote ID
          </label>
          <input
            type="text"
            id="quoteId"
            value={quoteId}
            onChange={(e) => setQuoteId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your quote ID"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Retrieve Quote
        </button>
      </form>
    </div>
  );
}