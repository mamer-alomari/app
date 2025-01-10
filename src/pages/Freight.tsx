import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface CreateAccountModal {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Freight() {
  const navigate = useNavigate();
  const location = useLocation();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [accountInfo, setAccountInfo] = useState<CreateAccountModal>({
    email: location.state?.email || '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const { source, destination, distance, eta, price } = location.state || {
    source: '940 Strooman Key. Apt 334',
    destination: '940 Strooman Key. Apt 334',
    distance: '50km',
    eta: '1:30 hr',
    price: '1,200.00'
  };

  const handleSaveQuote = () => {
    setShowCreateAccount(true);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (accountInfo.password !== accountInfo.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (accountInfo.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Here you would typically create the account and save the quote
    setSaveSuccess(true);
    setShowCreateAccount(false);

    // Navigate to dashboard after short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Freight</h1>
      </div>

      {saveSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Quote saved successfully! Redirecting to dashboard...
        </div>
      )}

      <div className="p-4">
        <div className="mb-8">
          <img src="/fedex-logo.png" alt="FedEx" className="h-16" />
        </div>

        <div className="mb-8">
          <div className="flex items-start mb-2">
            <span className="text-2xl mr-2">📍</span>
            <div>
              <h2 className="text-xl font-semibold">{source}</h2>
              <p className="text-gray-500">Distance: {distance}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold">{destination}</h2>
          <p className="text-gray-500">ETA: {eta}</p>
        </div>

        <div className="text-right mb-8">
          <span className="text-3xl font-bold">${price}</span>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleSaveQuote}
            className="w-full bg-gray-100 text-black text-lg py-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Save Quote
          </button>

          <button
            onClick={() => navigate('/payment', { state: { price } })}
            className="w-full bg-black text-white text-lg py-4 rounded-lg"
          >
            Proceed to Payment ›
          </button>
        </div>
      </div>

      {/* Create Account Modal */}
      {showCreateAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Account to Save Quote</h2>
            <p className="text-gray-600 mb-4">
              Create an account to save your quote and access it later from your dashboard.
            </p>

            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={accountInfo.email}
                  onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  value={accountInfo.password}
                  onChange={(e) => setAccountInfo({ ...accountInfo, password: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={accountInfo.confirmPassword}
                  onChange={(e) => setAccountInfo({ ...accountInfo, confirmPassword: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded-lg"
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateAccount(false)}
                  className="flex-1 bg-gray-200 text-black py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}