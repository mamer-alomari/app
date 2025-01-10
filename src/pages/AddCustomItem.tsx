import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddCustomItem() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const calculateVolume = () => {
    if (length && width && height) {
      const cubicFeet = (parseFloat(length) * parseFloat(width) * parseFloat(height)) / 1728;
      return cubicFeet.toFixed(1);
    }
    return '0';
  };

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.stop(); // Stop the stream immediately as we'll use the input element
      setShowCamera(true);
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Please allow camera access to capture item image');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem = {
      name,
      cubicFeet: parseFloat(calculateVolume()),
      quantity: parseInt(quantity),
      dimensions: {
        length,
        width,
        height
      },
      image
    };

    navigate('/quote', { state: { newItem } });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button 
          onClick={() => navigate('/quote')} 
          className="text-2xl mr-4"
        >
          ‹
        </button>
        <h1 className="text-2xl font-bold">Add Custom Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Item Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Item Image
          </label>
          <div className="space-y-4">
            {image ? (
              <div className="relative">
                <img 
                  src={image} 
                  alt="Item preview" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleCameraCapture}
                  className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black"
                >
                  <span className="text-2xl">📸</span>
                  <span className="text-sm font-medium">Take Photo</span>
                </button>
                <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black cursor-pointer">
                  <span className="text-2xl">📁</span>
                  <span className="text-sm font-medium">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageCapture}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Item Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Item Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Coffee Table"
            className="w-full p-4 border rounded-lg"
            required
          />
        </div>

        {/* Dimensions */}
        <div>
          <h2 className="text-sm font-medium text-gray-700 mb-2">
            Dimensions (inches)
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Length</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full p-4 border rounded-lg"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Width</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full p-4 border rounded-lg"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Height</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-4 border rounded-lg"
                min="1"
                required
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Estimated volume: {calculateVolume()} ft³
          </p>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-4 border rounded-lg"
            min="1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white text-lg py-4 rounded-lg mt-6"
        >
          Add Item ›
        </button>
      </form>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <div className="relative">
              <video
                autoPlay
                playsInline
                className="w-full h-64 object-cover rounded-lg bg-black"
              />
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageCapture}
                className="absolute inset-0 opacity-0"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowCamera(false)}
                className="bg-gray-200 text-black px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}