import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface Zone {
  id: string;
  name: string;
  type: 'storage' | 'loading' | 'staging' | 'office';
  capacity: number;
  occupancy: number;
  items: string[];
}

interface Section {
  id: string;
  name: string;
  zones: Zone[];
}

const mockSections: Section[] = [
  {
    id: 'S1',
    name: 'Section A',
    zones: [
      {
        id: 'Z1',
        name: 'Storage Zone 1',
        type: 'storage',
        capacity: 100,
        occupancy: 65,
        items: ['Furniture', 'Boxes', 'Electronics']
      },
      {
        id: 'Z2',
        name: 'Loading Bay 1',
        type: 'loading',
        capacity: 50,
        occupancy: 20,
        items: ['Outbound Deliveries']
      }
    ]
  },
  {
    id: 'S2',
    name: 'Section B',
    zones: [
      {
        id: 'Z3',
        name: 'Staging Area',
        type: 'staging',
        capacity: 75,
        occupancy: 40,
        items: ['Pending Deliveries', 'New Arrivals']
      }
    ]
  }
];

export default function WarehouseLayout() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const [showAddZone, setShowAddZone] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSections(mockSections);
      setLoading(false);
    }, 1000);
  }, []);

  const getZoneTypeColor = (type: Zone['type']) => {
    switch (type) {
      case 'storage': return 'bg-blue-100 text-blue-800';
      case 'loading': return 'bg-green-100 text-green-800';
      case 'staging': return 'bg-yellow-100 text-yellow-800';
      case 'office': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleAddZone = (sectionId: string) => {
    setSelectedSection(sectionId);
    setShowAddZone(true);
  };

  const handleSaveZone = (zone: Zone) => {
    if (editingZone) {
      // Update existing zone
      setSections(sections.map(section => ({
        ...section,
        zones: section.zones.map(z => 
          z.id === editingZone.id ? zone : z
        )
      })));
      toast.success('Zone updated successfully');
    } else {
      // Add new zone
      setSections(sections.map(section => 
        section.id === selectedSection
          ? {
              ...section,
              zones: [...section.zones, { ...zone, id: `Z${Date.now()}` }]
            }
          : section
      ));
      toast.success('Zone added successfully');
    }
    setEditingZone(null);
    setShowAddZone(false);
  };

  const handleDeleteZone = (zoneId: string) => {
    setSections(sections.map(section => ({
      ...section,
      zones: section.zones.filter(zone => zone.id !== zoneId)
    })));
    toast.success('Zone deleted successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <button onClick={() => navigate('/provider/dashboard')} className="text-2xl mr-4">‹</button>
            <h1 className="text-2xl font-bold">Warehouse Layout</h1>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {sections.map(section => (
          <div key={section.id} className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{section.name}</h2>
                <button
                  onClick={() => handleAddZone(section.id)}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm"
                >
                  Add Zone
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.zones.map(zone => (
                <div key={zone.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{zone.name}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${getZoneTypeColor(zone.type)}`}>
                        {zone.type.charAt(0).toUpperCase() + zone.type.slice(1)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingZone(zone)}
                        className="text-blue-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteZone(zone.id)}
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Occupancy</span>
                      <span>{zone.occupancy}/{zone.capacity}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-full rounded-full ${getOccupancyColor(zone.occupancy, zone.capacity)}`}
                        style={{ width: `${(zone.occupancy / zone.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Items:</p>
                    <div className="flex flex-wrap gap-2">
                      {zone.items.map((item, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Add/Edit Zone Modal */}
      {(showAddZone || editingZone) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingZone ? 'Edit Zone' : 'Add New Zone'}
            </h2>
            <ZoneForm
              initialData={editingZone}
              onSubmit={handleSaveZone}
              onCancel={() => {
                setEditingZone(null);
                setShowAddZone(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface ZoneFormProps {
  initialData: Zone | null;
  onSubmit: (zone: Zone) => void;
  onCancel: () => void;
}

function ZoneForm({ initialData, onSubmit, onCancel }: ZoneFormProps) {
  const [formData, setFormData] = useState<Partial<Zone>>(
    initialData || {
      name: '',
      type: 'storage',
      capacity: 0,
      occupancy: 0,
      items: []
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.capacity) {
      toast.error('Please fill in all required fields');
      return;
    }
    onSubmit(formData as Zone);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Zone Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as Zone['type'] })}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="storage">Storage</option>
          <option value="loading">Loading</option>
          <option value="staging">Staging</option>
          <option value="office">Office</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Capacity
        </label>
        <input
          type="number"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
          className="w-full p-2 border rounded-lg"
          min="1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Occupancy
        </label>
        <input
          type="number"
          value={formData.occupancy}
          onChange={(e) => setFormData({ ...formData, occupancy: parseInt(e.target.value) })}
          className="w-full p-2 border rounded-lg"
          min="0"
          max={formData.capacity}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Items (comma-separated)
        </label>
        <input
          type="text"
          value={formData.items?.join(', ')}
          onChange={(e) => setFormData({
            ...formData,
            items: e.target.value.split(',').map(item => item.trim())
          })}
          className="w-full p-2 border rounded-lg"
          placeholder="e.g., Furniture, Boxes, Electronics"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="flex-1 bg-black text-white py-2 rounded-lg"
        >
          {initialData ? 'Update Zone' : 'Add Zone'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-black py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}