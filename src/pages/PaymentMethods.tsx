import PaymentMethodList from '../components/billing/PaymentMethodList';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethods() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Payment Methods</h1>
      </div>

      <div className="p-4">
        <PaymentMethodList />
      </div>
    </div>
  );
}