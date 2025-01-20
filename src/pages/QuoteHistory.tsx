import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';

interface Quote {
  id: string;
  created_at: string;
  customer_name: string;
  source_address: string;
  destination_address: string;
  items: QuoteItem[];
  status: 'pending' | 'accepted' | 'expired';
  total_price: number;
}

interface QuoteItem {
  name: string;
  size: string;
  quantity: number;
}

export default function QuoteHistory() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (err) {
      setError('Failed to fetch quotes');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Quote History</h1>
      <div className="grid gap-6">
        {quotes.map((quote) => (
          <div 
            key={quote.id}
            className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-lg"
            onClick={() => navigate(`/quotes/${quote.id}`)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{quote.customer_name}</h2>
                <p className="text-gray-600 mt-1">Created: {new Date(quote.created_at).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                quote.status === 'accepted' ? 'bg-green-100 text-green-800' :
                quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">From: {quote.source_address}</p>
              <p className="text-gray-600">To: {quote.destination_address}</p>
              <p className="text-gray-600 mt-2">Items: {quote.items.length}</p>
              <p className="font-semibold mt-2">Total: ${quote.total_price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}