export interface CrewMember {
  id: string;
  name: string;
  role: 'driver' | 'mover';
  phone: string;
  photo: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  status: string;
  description: string;
  completed: boolean;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface TrackingDetails {
  currentLocation: Location;
  source: Location;
  destination: Location;
  estimatedArrival: string;
  distance: string;
  timeRemaining: string;
}

export interface Job {
  id: string;
  status: 'pending' | 'in_progress' | 'completed';
  date: string;
  items: string[];
  crew: CrewMember[];
  timeline: TimelineEvent[];
  tracking: TrackingDetails;
}