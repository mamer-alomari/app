import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { notificationsService } from '../../services/api/notifications.service';
import { locationService } from '../../services/api/location.service';
import LoadingOverlay from '../../components/LoadingOverlay';

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
}

interface JobDetails {
  id: string;
  customerName: string;
  pickupAddress: string;
  deliveryAddress: string;
  scheduledTime: string;
  status: 'assigned' | 'in_progress' | 'completed';
  items: ScannedItem[];
  initialPrice: string;
  finalPrice?: string;
  customerLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  eta?: {
    distance: string;
    duration: string;
    arrivalTime: string;
  };
}

export default function ProviderJobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch job details
    const fetchJob = async () => {
      try {
        // TODO: Replace with actual API call
        const mockJob: JobDetails = {
          id: id || 'MOV-1234',
          customerName: 'John Smith',
          pickupAddress: '123 Main St, New York, NY',
          deliveryAddress: '456 Park Ave, New York, NY',
          scheduledTime: '2024-02-20T10:00:00',
          status: 'assigned',
          items: [],
          initialPrice: '350.00',
          customerLocation: {
            lat: 40.7829,
            lng: -73.9654,
            address: '123 Main St, New York, NY'
          }
        };

        setJob(mockJob);
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const calculateETA = async () => {
    if (!job) return;

    try {
      // Get current location
      const currentLocation = await locationService.getCurrentLocation();
      
      // Calculate ETA
      const eta = await locationService.calculateETA(currentLocation, job.customerLocation);

      // Update job with ETA
      setJob(prev => prev ? { ...prev, eta } : null);

      // Notify customer
      await notificationsService.notifyCustomer(
        job.id,
        `Your moving crew is on the way! ETA: ${eta.duration} (${eta.distance})`
      );

      toast.success('Customer has been notified of ETA');
    } catch (error) {
      console.error('Error calculating ETA:', error);
      toast.error('Failed to calculate ETA');
    }
  };

  const handleScanItems = () => {
    setScanning(true);
    // Navigate to camera view for scanning
    navigate(`/provider/jobs/${id}/scan`, {
      state: { returnTo: `/provider/jobs/${id}` }
    });
  };

  const calculateFinalPrice = async () => {
    if (!job?.items.length) {
      toast.error('Please scan items first');
      return;
    }

    setCalculating(true);
    try {
      // Calculate total cubic feet
      const totalCubicFeet = job.items.reduce((total, item) => 
        total + (item.cubicFeet * item.quantity), 0
      );

      // Mock price calculation
      const baseRate = 35; // $ per cubic foot
      const finalPrice = (totalCubicFeet * baseRate).toFixed(2);

      // Update job with final price
      setJob(prev => prev ? { ...prev, finalPrice } : null);

      // Notify customer of final price
      await notificationsService.notifyCustomer(
        job.id,
        `Your final moving price has been calculated: $${finalPrice}`
      );

      toast.success('Final price calculated and customer notified');
    } catch (error) {
      console.error('Error calculating price:', error);
      toast.error('Failed to calculate final price');
    } finally {
      setCalculating(false);
    }
  };

  if (loading) {
    return <LoadingOverlay message="Loading job details..." />;
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="text-center">
          <p className="text-gray-500">Job not found</p>
          <button
            onClick={() => navigate('/provider/jobs')}
            className="mt-4 text-blue-500"
          >
            Return to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <button onClick={() => navigate('/provider/jobs')} className="text-2xl mr-4">‹</button>
            <div>
              <h1 className="text-2xl font-bold">{job.id}</h1>
              <p className="text-sm text-gray-500">
                {format(new Date(job.scheduledTime), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Customer</h2>
              <p className="text-gray-600">{job.customerName}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Initial Price</h2>
              <p className="text-gray-600">${job.initialPrice}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Pickup Address</h2>
              <p className="text-gray-600">{job.pickupAddress}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
              <p className="text-gray-600">{job.deliveryAddress}</p>
            </div>
          </div>

          {job.eta && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-2">ETA Information</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="font-medium">{job.eta.distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{job.eta.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Arrival Time</p>
                  <p className="font-medium">
                    {format(new Date(job.eta.arrivalTime), 'h:mm a')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Scanned Items */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Scanned Items</h2>
            {job.items.length > 0 ? (
              <div className="space-y-4">
                {job.items.map(item => (
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
                          Dimensions: {item.dimensions.length}" × {item.dimensions.width}" × {item.dimensions.height}"
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

                <div className="mt-4">
                  <p className="text-lg font-semibold">
                    Total Volume: {job.items.reduce((total, item) => 
                      total + (item.cubicFeet * item.quantity), 0
                    ).toFixed(1)} ft³
                  </p>
                  {job.finalPrice && (
                    <p className="text-lg font-semibold text-green-600">
                      Final Price: ${job.finalPrice}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No items scanned yet</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {!job.eta && (
              <button
                onClick={calculateETA}
                className="bg-black text-white py-3 rounded-lg"
              >
                Calculate & Send ETA
              </button>
            )}
            <button
              onClick={handleScanItems}
              disabled={scanning}
              className="bg-blue-500 text-white py-3 rounded-lg disabled:opacity-50"
            >
              {scanning ? 'Scanning...' : 'Scan Items'}
            </button>
            {job.items.length > 0 && !job.finalPrice && (
              <button
                onClick={calculateFinalPrice}
                disabled={calculating}
                className="bg-green-500 text-white py-3 rounded-lg disabled:opacity-50 col-span-2"
              >
                {calculating ? 'Calculating...' : 'Calculate Final Price'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}