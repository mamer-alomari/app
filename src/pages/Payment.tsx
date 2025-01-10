import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key');

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  expMonth: number;
  expYear: number;
  brand: string;
}

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { price } = location.state || { price: '1,200.00' };
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [savedMethods, setSavedMethods] = useState<PaymentMethod[]>([
    {
      id: 'pm_1234',
      type: 'card',
      last4: '4242',
      expMonth: 12,
      expYear: 2024,
      brand: 'Visa'
    }
  ]);

  const handlePayment = async () => {
    try {
      // In a real app, this would create a payment intent on your backend
      // and confirm the payment with Stripe
      
      // Simulate payment processing
      const processingTime = 2000;
      await new Promise(resolve => setTimeout(resolve, processingTime));
      
      navigate('/payment/success');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Payment</h1>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Amount Due</h2>
          <p className="text-3xl font-bold">${price}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          
          {savedMethods.map(method => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`border rounded-lg p-4 mb-4 cursor-pointer ${
                selectedMethod === method.id ? 'border-black' : ''
              }`}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 rounded-full mr-4 flex items-center justify-center">
                  {selectedMethod === method.id && (
                    <div className="w-3 h-3 bg-black rounded-full" />
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">
                    {method.brand === 'Visa' ? '💳' : '💳'}
                  </span>
                  <div>
                    <p className="font-semibold">{method.brand} •••• {method.last4}</p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate('/payment-methods')}
            className="w-full bg-gray-100 text-black text-lg py-4 rounded-lg"
          >
            Add Payment Method
          </button>
        </div>

        <button
          onClick={handlePayment}
          disabled={!selectedMethod}
          className={`w-full text-lg py-4 rounded-lg ${
            selectedMethod
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Pay ${price} ›
        </button>
      </div>
    </div>
  );
}