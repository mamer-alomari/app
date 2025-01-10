import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

export default function Camera() {
  const navigate = useNavigate();
  const { showError } = useToast();
  const [isCapturing, setIsCapturing] = useState(false);

  const handleImageCapture = () => {
    setIsCapturing(true);
    // Mock camera capture delay
    setTimeout(() => {
      setIsCapturing(false);
      // Navigate to quote page with mock captured image data
      navigate('/quote', { 
        state: { 
          imageData: 'captured-image',
          source: 'camera'
        }
      });
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showError('Please select an image file');
        return;
      }
      // Mock upload processing
      const reader = new FileReader();
      reader.onloadend = () => {
        // Navigate to quote page with uploaded image data
        navigate('/quote', { 
          state: { 
            imageData: reader.result,
            source: 'upload'
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate('/')} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Scan Items</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Camera Preview</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleImageCapture}
            disabled={isCapturing}
            className="w-full bg-black text-white text-lg py-4 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCapturing ? 'Capturing...' : 'Take Photo'}
          </button>
          
          <label className="w-full bg-gray-200 text-black text-lg py-4 rounded-lg text-center cursor-pointer hover:bg-gray-300 transition-colors">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
}