import { useState } from 'react';

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
  brand: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_1234',
    type: 'card',
    last4: '4242',
    expMonth: 12,
    expYear: 2024,
    isDefault: true,
    brand: 'Visa'
  }
];

export default function PaymentMethodList() {
  const [methods, setMethods] = useState(mockPaymentMethods);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [errors, setErrors] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleSetDefault = (methodId: string) => {
    setMethods(methods.map(method => ({
      ...method,
      isDefault: method.id === methodId
    })));
  };

  const handleDelete = (methodId: string) => {
    setMethods(methods.filter(method => method.id !== methodId));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {
      number: '',
      expiry: '',
      cvc: '',
      name: ''
    };

    if (newCard.number.replace(/\s/g, '').length !== 16) {
      newErrors.number = 'Invalid card number';
    }

    if (newCard.expiry.length !== 5) {
      newErrors.expiry = 'Invalid expiry date';
    }

    if (newCard.cvc.length !== 3) {
      newErrors.cvc = 'Invalid CVC';
    }

    if (!newCard.name) {
      newErrors.name = 'Name is required';
    }

    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    }

    // Mock adding new card
    const last4 = newCard.number.slice(-4);
    const [expMonth, expYear] = newCard.expiry.split('/');
    
    const newMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: 'card',
      last4,
      expMonth: parseInt(expMonth),
      expYear: parseInt('20' + expYear),
      isDefault: methods.length === 0,
      brand: 'Visa' // Mock brand detection
    };

    setMethods([...methods, newMethod]);
    setShowAddForm(false);
    setNewCard({ number: '', expiry: '', cvc: '', name: '' });
  };

  return (
    <div className="space-y-4">
      {methods.map(method => (
        <div key={method.id} className="border rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <span className="text-2xl mr-3">
                {method.brand === 'Visa' ? '💳' : '💳'}
              </span>
              <div>
                <p className="font-semibold">•••• {method.last4}</p>
                <p className="text-sm text-gray-500">
                  Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                </p>
              </div>
            </div>
            {method.isDefault && (
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                Default
              </span>
            )}
          </div>

          <div className="flex gap-4">
            {!method.isDefault && (
              <button
                onClick={() => handleSetDefault(method.id)}
                className="text-sm text-gray-600"
              >
                Set as Default
              </button>
            )}
            <button
              onClick={() => handleDelete(method.id)}
              className="text-sm text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => setShowAddForm(true)}
        className="w-full bg-black text-white text-lg py-4 rounded-lg"
      >
        Add Payment Method ›
      </button>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add Payment Method</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={newCard.number}
                  onChange={(e) => setNewCard({
                    ...newCard,
                    number: formatCardNumber(e.target.value)
                  })}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                {errors.number && (
                  <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={newCard.name}
                  onChange={(e) => setNewCard({
                    ...newCard,
                    name: e.target.value
                  })}
                  placeholder="John Doe"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard({
                      ...newCard,
                      expiry: formatExpiry(e.target.value)
                    })}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    value={newCard.cvc}
                    onChange={(e) => setNewCard({
                      ...newCard,
                      cvc: e.target.value.replace(/\D/g, '').slice(0, 3)
                    })}
                    placeholder="123"
                    maxLength={3}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  {errors.cvc && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded-lg font-medium"
                >
                  Add Card
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-black py-3 rounded-lg font-medium"
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