import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';

interface QuoteDetails {
  id: string;
  created_at: string;
  customer_name: string;
  source_address: string;
  destination_address: string;
  items: Array<{
    name: string;
    size: string;
    quantity: number;
  }>;
  status: 'pending' | 'accepted' | 'expired';
  total_price: number;
}

export default function QuoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<QuoteDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuoteDetails();
  }, [id]);

  async function fetchQuoteDetails() {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setQuote(data);
      } else {
        setError('Quote not found');
      }
    } catch (err) {
      setError('Failed to fetch quote details');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!quote) return <ErrorMessage message="Quote not found" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">Quote Details</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
            <p className="text-gray-600">Name: {quote.customer_name}</p>
            <p className="text-gray-600">Quote ID: {quote.id}</p>
            <p className="text-gray-600">
              Created: {new Date(quote.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Status</h2>
            <span className={`px-3 py-1 rounded-full text-sm ${
              quote.status === 'accepted' ? 'bg-green-100 text-green-800' :
              quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Location Details</h2>
          <p className="text-gray-600">From: {quote.source_address}</p>
          <p className="text-gray-600">To: {quote.destination_address}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Items</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            {quote.items.map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <span>{item.quantity}x {item.name} ({item.size})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Price:</span>
            <span className="text-xl font-bold">${quote.total_price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}