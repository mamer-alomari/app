import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

export default function Welcome() {
  const navigate = useNavigate();
  const { showSuccess } = useToast();

  const handleGetStarted = () => {
    showSuccess('Welcome to Moove!');
    navigate('/camera');
  };

  return (
    <div className="min-h-screen bg-slate-700 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-20">
        <h1 className="text-7xl font-bold text-white mb-1">moove</h1>
        <p className="text-lg text-gray-300">let's get you mooving.</p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <button
          onClick={handleGetStarted}
          className="w-full bg-black text-white text-lg py-4 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Get Started ›
        </button>
        
        <div className="text-center">
          <p className="text-gray-300 mb-2">Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-white text-black text-lg py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Log In ›
          </button>
        </div>
      </div>
    </div>
  );
}