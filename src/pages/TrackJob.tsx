import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import LiveMap from '../components/LiveMap';
import Timeline from '../components/Timeline';
import CrewInfo from '../components/CrewInfo';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { Job } from '../types/job';

// Mock data for demonstration
const mockJob: Job = {
  id: 'MOV-1234',
  status: 'in_progress',
  date: '2024-02-15',
  items: ['2x Arm Chairs', '1x 3 Seater Sofa'],
  crew: [
    {
      id: 'C1',
      name: 'John Driver',
      role: 'driver',
      phone: '+1234567890',
      photo: '/driver-photo.jpg'
    },
    {
      id: 'C2',
      name: 'Mike Mover',
      role: 'mover',
      phone: '+1234567891',
      photo: '/mover-photo.jpg'
    }
  ],
  timeline: [
    {
      id: 'T1',
      time: '08:00 AM',
      status: 'Order Confirmed',
      description: 'Your moving request has been confirmed',
      completed: true
    },
    {
      id: 'T2',
      time: '09:00 AM',
      status: 'Crew Assigned',
      description: 'Moving crew has been assigned to your request',
      completed: true
    },
    {
      id: 'T3',
      time: '09:30 AM',
      status: 'En Route to Pickup',
      description: 'Crew is heading to pickup location',
      completed: true
    },
    {
      id: 'T4',
      time: '10:00 AM',
      status: 'Loading Items',
      description: 'Currently loading your items',
      completed: false
    },
    {
      id: 'T5',
      time: '11:00 AM',
      status: 'In Transit',
      description: 'Your items are on the way to destination',
      completed: false
    }
  ],
  tracking: {
    currentLocation: { lat: 40.7128, lng: -74.0060, address: 'Current Location' },
    source: { lat: 40.7282, lng: -73.7949, address: '940 Strooman Key. Apt 334' },
    destination: { lat: 40.7589, lng: -73.9851, address: '123 New Address St.' },
    estimatedArrival: '11:30 AM',
    distance: '5.2 miles',
    timeRemaining: '30 mins'
  }
};

export default function TrackJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJob = async () => {
      try {
        // In a real app, fetch job data from API using the id
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setJob(mockJob);
      } catch (error) {
        console.error('Error loading job:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-40 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="text-center">
          <p className="text-gray-500">No job found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 text-blue-500"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in_progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate('/dashboard')} className="text-2xl mr-4">‹</button>
        <div>
          <h1 className="text-2xl font-bold">{job.id}</h1>
          <p className="text-sm text-gray-500">
            {format(new Date(job.date), 'MMMM d, yyyy')}
          </p>
        </div>
        <span className={`${getStatusColor(job.status)} text-white px-3 py-1 rounded-full text-sm ml-auto`}>
          {job.status.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </span>
      </div>

      <div className="p-4 space-y-6">
        {/* Live Map */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Live Tracking</h2>
          <LiveMap
            currentLocation={job.tracking.currentLocation}
            source={job.tracking.source}
            destination={job.tracking.destination}
          />
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">ETA</p>
              <p className="font-semibold">{job.tracking.estimatedArrival}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Distance</p>
              <p className="font-semibold">{job.tracking.distance}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Time Left</p>
              <p className="font-semibold">{job.tracking.timeRemaining}</p>
            </div>
          </div>
        </section>

        {/* Moving Crew */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Moving Crew</h2>
          <CrewInfo crew={job.crew} />
        </section>

        {/* Items */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Items</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ul className="list-disc list-inside">
              {job.items.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Delivery Timeline</h2>
          <Timeline events={job.timeline} />
        </section>
      </div>
    </div>
  );
}