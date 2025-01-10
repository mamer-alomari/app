import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { useUser } from '../contexts/UserContext';

export default function Login() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'customer' | 'provider'>('customer');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      // Mock user data
      const userData = {
        id: `${loginType}_${Date.now()}`,
        email,
        name: email.split('@')[0],
        type: loginType
      };
      
      login(userData);
      showSuccess('Successfully logged in!');
      navigate(loginType === 'provider' ? '/provider/dashboard' : '/dashboard');
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-700 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-300">Sign in to your account</p>
        </div>

        {/* Login Type Toggle */}
        <div className="bg-slate-600 p-1 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setLoginType('customer')}
              className={`py-2 rounded-md text-sm font-medium transition-colors ${
                loginType === 'customer'
                  ? 'bg-white text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Customer Login
            </button>
            <button
              onClick={() => setLoginType('provider')}
              className={`py-2 rounded-md text-sm font-medium transition-colors ${
                loginType === 'provider'
                  ? 'bg-white text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Service Provider
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black text-lg py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In ›'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            ‹ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}