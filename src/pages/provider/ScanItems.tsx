import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { mockItems, MockItem } from '../../data/mockItems';

interface ScannedItem {
  id: string;
  name: string;
  image: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  quantity: number;
  cubicFeet: number;
  category?: string;
}

export default function ScanItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/provider/jobs';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [selectedMockItem, setSelectedMockItem] = useState<MockItem | null>(null);
  const [showMockItems, setShowMockItems] = useState(false);
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [itemDetails, setItemDetails] = useState({
    name: '',
    length: '',
    width: '',
    height: '',
    quantity: '1',
    category: ''
  });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Failed to access camera');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    setCurrentImage(imageData);
    setShowForm(true);
    stopCamera();
    setShowMockItems(true); // Show mock items after capture
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentImage(reader.result as string);
      setShowForm(true);
      setShowMockItems(true); // Show mock items after upload
    };
    reader.readAsDataURL(file);
  };

  const calculateCubicFeet = (l: string, w: string, h: string) => {
    return (
      (parseFloat(l) * parseFloat(w) * parseFloat(h)) / 1728
    ).toFixed(2);
  };

  const handleSelectMockItem = (item: MockItem) => {
    setSelectedMockItem(item);
    setItemDetails({
      name: item.name,
      length: item.defaultDimensions.length.toString(),
      width: item.defaultDimensions.width.toString(),
      height: item.defaultDimensions.height.toString(),
      quantity: item.suggestedQuantity.toString(),
      category: item.category
    });
    setShowMockItems(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentImage) return;

    const newItem: ScannedItem = {
      id: `item_${Date.now()}`,
      name: itemDetails.name,
      image: currentImage,
      dimensions: {
        length: parseFloat(itemDetails.length),
        width: parseFloat(itemDetails.width),
        height: parseFloat(itemDetails.height)
      },
      quantity: parseInt(itemDetails.quantity),
      cubicFeet: parseFloat(calculateCubicFeet(
        itemDetails.length,
        itemDetails.width,
        itemDetails.height
      )),
      category: itemDetails.category
    };

    setScannedItems([...scannedItems, newItem]);
    toast.success('Item added successfully');

    // Reset form
    setItemDetails({
      name: '',
      length: '',
      width: '',
      height: '',
      quantity: '1',
      category: ''
    });
    setCurrentImage(null);
    setShowForm(false);
    setSelectedMockItem(null);
  };

  const handleFinish = () => {
    // TODO: Save all scanned items to the job
    console.log('All scanned items:', scannedItems);
    toast.success(`${scannedItems.length} items added to job`);
    navigate(returnTo);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(returnTo)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Scan Items</h1>
      </div>

      <main className="p-4">
        {scannedItems.length > 0 && !showForm && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Scanned Items</h2>
            <div className="space-y-4">
              {scannedItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.category && `${item.category} • `}
                        {item.dimensions.length}" × {item.dimensions.width}" × {item.dimensions.height}"
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Volume: {item.cubicFeet} ft³
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="font-medium">Total Items: {scannedItems.length}</p>
                  <p className="text-sm text-gray-500">
                    Total Volume: {scannedItems.reduce((total, item) => 
                      total + item.cubicFeet * item.quantity, 0
                    ).toFixed(2)} ft³
                  </p>
                </div>
                <button
                  onClick={handleFinish}
                  className="bg-black text-white px-6 py-2 rounded-lg"
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        )}

        {!showForm ? (
          <div className="space-y-6">
            {!scanning ? (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setScanning(true);
                    startCamera();
                  }}
                  className="bg-black text-white py-4 rounded-lg"
                >
                  Take Photo
                </button>
                <label className="bg-gray-200 text-black py-4 rounded-lg text-center cursor-pointer">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={captureImage}
                    className="bg-black text-white py-4 rounded-lg"
                  >
                    Capture
                  </button>
                  <button
                    onClick={() => {
                      stopCamera();
                      setScanning(false);
                    }}
                    className="bg-gray-200 text-black py-4 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {showMockItems ? (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Select Item Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  {mockItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectMockItem(item)}
                      className="border rounded-lg p-4 text-left hover:border-black"
                    >
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowMockItems(false)}
                  className="w-full bg-gray-200 text-black py-3 rounded-lg mt-4"
                >
                  Custom Item
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {currentImage && (
                  <img
                    src={currentImage}
                    alt="Captured item"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={itemDetails.name}
                    onChange={(e) => setItemDetails({ ...itemDetails, name: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={itemDetails.category}
                    onChange={(e) => setItemDetails({ ...itemDetails, category: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Length (in)
                    </label>
                    <input
                      type="number"
                      value={itemDetails.length}
                      onChange={(e) => setItemDetails({ ...itemDetails, length: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width (in)
                    </label>
                    <input
                      type="number"
                      value={itemDetails.width}
                      onChange={(e) => setItemDetails({ ...itemDetails, width: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (in)
                    </label>
                    <input
                      type="number"
                      value={itemDetails.height}
                      onChange={(e) => setItemDetails({ ...itemDetails, height: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={itemDetails.quantity}
                    onChange={(e) => setItemDetails({ ...itemDetails, quantity: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    min="1"
                    required
                  />
                </div>

                {itemDetails.length && itemDetails.width && itemDetails.height && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Volume: {calculateCubicFeet(
                        itemDetails.length,
                        itemDetails.width,
                        itemDetails.height
                      )} ft³
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="submit"
                    className="bg-black text-white py-3 rounded-lg"
                  >
                    Add Item
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentImage(null);
                      setShowForm(false);
                      setItemDetails({
                        name: '',
                        length: '',
                        width: '',
                        height: '',
                        quantity: '1',
                        category: ''
                      });
                    }}
                    className="bg-gray-200 text-black py-3 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
}