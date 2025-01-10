import { useState } from 'react';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: 'addr1',
    label: 'Home',
    street: '940 Strooman Key. Apt 334',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true
  },
  {
    id: 'addr2',
    label: 'Office',
    street: '123 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    isDefault: false
  }
];

export default function AddressBook() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({});

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `addr${addresses.length + 1}`;
    setAddresses([...addresses, { ...newAddress, id, isDefault: false } as Address]);
    setShowAddForm(false);
    setNewAddress({});
  };

  return (
    <div className="space-y-4">
      {addresses.map(address => (
        <div key={address.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold flex items-center">
                {address.label}
                {address.isDefault && (
                  <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-600">{address.street}</p>
              <p className="text-sm text-gray-600">
                {address.city}, {address.state} {address.zipCode}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(address.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="text-blue-500 text-sm"
                >
                  Set as Default
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setShowAddForm(true)}
        className="w-full bg-black text-white text-lg py-4 rounded-lg"
      >
        Add New Address
      </button>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Address</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label (e.g., Home, Office)
                </label>
                <input
                  type="text"
                  value={newAddress.label || ''}
                  onChange={e => setNewAddress({ ...newAddress, label: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={newAddress.street || ''}
                  onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={newAddress.city || ''}
                    onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={newAddress.state || ''}
                    onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={newAddress.zipCode || ''}
                  onChange={e => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-2 rounded-lg"
                >
                  Add Address
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-black py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}