import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <h1 className="text-2xl font-bold">Payment Successful</h1>
      </div>

      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <span className="text-white text-3xl">✓</span>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p className="text-gray-600 text-center mb-8">
          Your payment has been processed successfully.<br />
          We'll send you an email with the booking details.
        </p>

        <button
          onClick={() => navigate(user?.id === 'guest' ? '/' : '/dashboard')}
          className="w-full max-w-md bg-black text-white text-lg py-4 rounded-lg"
        >
          {user?.id === 'guest' ? 'Back to Home' : 'View Dashboard'}
        </button>
      </div>
    </div>
  );
}