import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  icon: string;
  name: string;
  size: string;
  quantity: number;
  cubicFeet: number;
  selected: boolean;
}

export default function Quote() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([
    { 
      id: 1, 
      icon: "🛋️", 
      name: "Arm Chairs", 
      size: "Small", 
      quantity: 1,
      cubicFeet: 20,
      selected: false 
    },
    { 
      id: 2, 
      icon: "🛋️", 
      name: "3 Seater Sofa", 
      size: "Large", 
      quantity: 1,
      cubicFeet: 50,
      selected: false 
    },
    { 
      id: 3, 
      icon: "💡", 
      name: "Desk Lamp", 
      size: "Medium", 
      quantity: 1,
      cubicFeet: 3,
      selected: false 
    },
    { 
      id: 4, 
      icon: "🛋️", 
      name: "Throw Pillows", 
      size: "Small", 
      quantity: 1,
      cubicFeet: 2,
      selected: false 
    }
  ]);

  const handleQuantityChange = (id: number, change: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleToggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const selectedItems = items.filter(item => item.selected);
  const totalCubicFeet = selectedItems.reduce((total, item) => 
    total + (item.cubicFeet * item.quantity), 0
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Select Items</h1>
      </div>

      <div className="p-4">
        {/* Volume Estimate */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Estimated Volume</h2>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Total cubic feet:</p>
            <p className="text-2xl font-bold">{totalCubicFeet.toFixed(1)} ft³</p>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {items.map(item => (
            <div 
              key={item.id} 
              className={`border rounded-lg p-4 ${
                item.selected ? 'border-black' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.size}</p>
                    <p className="text-sm text-gray-500">{item.cubicFeet} ft³ per unit</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleItem(item.id)}
                  className={`w-8 h-8 rounded-full ${
                    item.selected 
                      ? 'bg-black text-white' 
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {item.selected ? '×' : '+'}
                </button>
              </div>

              {item.selected && (
                <div className="mt-4 flex items-center justify-end">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="w-8 h-8 bg-gray-200 rounded-full"
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Manual Add Item Button */}
        <button
          onClick={() => navigate('/add-custom-item')}
          className="w-full bg-gray-100 text-black text-lg py-4 rounded-lg mt-6"
        >
          + Add Custom Item
        </button>

        {/* Continue Button */}
        {selectedItems.length > 0 && (
          <button
            onClick={() => navigate('/cart', { 
              state: { 
                cartItems: selectedItems.map(item => ({
                  id: item.id,
                  icon: item.icon,
                  name: item.name,
                  size: item.size,
                  quantity: item.quantity,
                  cubicFeet: item.cubicFeet
                }))
              }
            })}
            className="w-full bg-black text-white text-lg py-4 rounded-lg mt-6"
          >
            Continue with {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} ›
          </button>
        )}
      </div>
    </div>
  );
}