import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import LoadingOverlay from '../../components/LoadingOverlay';

interface Job {
  id: string;
  customerName: string;
  pickupAddress: string;
  deliveryAddress: string;
  scheduledTime: string;
  status: 'assigned' | 'in_progress' | 'completed';
  items: string[];
  price: string;
  customerLocation?: {
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

export default function ActiveJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingJobId, setProcessingJobId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch jobs
    const fetchJobs = async () => {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockJobs: Job[] = [
          {
            id: 'MOV-1234',
            customerName: 'John Smith',
            pickupAddress: '123 Main St, New York, NY',
            deliveryAddress: '456 Park Ave, New York, NY',
            scheduledTime: '2024-02-20T10:00:00',
            status: 'assigned',
            items: ['2x Arm Chairs', '1x 3 Seater Sofa'],
            price: '350.00',
            customerLocation: {
              lat: 40.7829,
              lng: -73.9654,
              address: '123 Main St, New York, NY'
            }
          },
          {
            id: 'MOV-5678',
            customerName: 'Sarah Johnson',
            pickupAddress: '789 Broadway, New York, NY',
            deliveryAddress: '321 Oak St, New York, NY',
            scheduledTime: '2024-02-20T14:00:00',
            status: 'assigned',
            items: ['1x Dining Table', '4x Dining Chairs'],
            price: '280.00',
            customerLocation: {
              lat: 40.7484,
              lng: -73.9857,
              address: '789 Broadway, New York, NY'
            }
          }
        ];
        setJobs(mockJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleStartJob = (jobId: string) => {
    try {
      navigate(`/provider/jobs/${jobId}/details`);
    } catch (error) {
      console.error('Error starting job:', error);
      toast.error('Failed to start job. Please try again.');
    }
  };

  if (loading) {
    return <LoadingOverlay message="Loading jobs..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <button onClick={() => navigate('/provider/dashboard')} className="text-2xl mr-4">‹</button>
            <h1 className="text-2xl font-bold">Active Jobs</h1>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {jobs.length > 0 ? (
          <div className="space-y-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{job.customerName}</h2>
                    <p className="text-sm text-gray-500">{job.id}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(job.scheduledTime), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    job.status === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : job.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {job.status.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="text-gray-700">{job.pickupAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery</p>
                    <p className="text-gray-700">{job.deliveryAddress}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">Items</p>
                  <p className="text-gray-700">{job.items.join(', ')}</p>
                </div>

                {job.eta && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
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
                        <p className="text-sm text-gray-500">Arrival</p>
                        <p className="font-medium">
                          {format(new Date(job.eta.arrivalTime), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">${job.price}</p>
                  <button
                    onClick={() => handleStartJob(job.id)}
                    disabled={processingJobId === job.id}
                    className={`bg-black text-white px-6 py-2 rounded-lg ${
                      processingJobId === job.id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {processingJobId === job.id ? 'Starting...' : 'Start Job'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No active jobs at the moment</p>
          </div>
        )}
      </main>
    </div>
  );
}