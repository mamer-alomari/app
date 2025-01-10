import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface CartItem {
  id: number;
  icon: string;
  name: string;
  size: string;
  quantity: number;
  cubicFeet: number;
}

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
    }
  }, [location.state]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalCubicFeet = cartItems.reduce((total, item) => 
    total + (item.cubicFeet * item.quantity), 0
  );

  const handleAddMoreItems = () => {
    // Pass current cart items to Quote page
    navigate('/quote', { state: { existingCartItems: cartItems } });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl mr-4">‹</button>
        <h1 className="text-2xl font-bold">Cart</h1>
      </div>

      <div className="p-4">
        {/* Volume Summary */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Total Volume</h2>
          <p className="text-2xl font-bold">{totalCubicFeet.toFixed(1)} ft³</p>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-24">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <span className="text-3xl mr-4">{item.icon}</span>
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.size}</p>
                  <p className="text-sm text-gray-500">{item.cubicFeet} ft³ per unit</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 bg-gray-200 rounded-lg"
                  >
                    -
                  </button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 bg-gray-200 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="w-8 h-8 bg-gray-200 rounded-lg"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="flex gap-4">
          <button
            onClick={handleAddMoreItems}
            className="flex-1 bg-gray-200 text-black text-lg py-4 rounded-lg"
          >
            Add More Items
          </button>
          <button
            onClick={() => navigate('/customer-details', { state: { cartItems } })}
            className="flex-1 bg-black text-white text-lg py-4 rounded-lg"
            disabled={cartItems.length === 0}
          >
            Continue ›
          </button>
        </div>
      </div>
    </div>
  );
}