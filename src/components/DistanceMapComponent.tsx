import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { distanceService } from '../services/api/distance.service';

interface DistanceMapComponentProps {
  originAddress: string;
  destinationAddress: string;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

const DistanceMapComponent: React.FC<DistanceMapComponentProps> = ({ originAddress, destinationAddress }) => {
  const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const originCoords = await distanceService.getCoordinates(originAddress);
        const destinationCoords = await distanceService.getCoordinates(destinationAddress);
        setOrigin(originCoords);
        setDestination(destinationCoords);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, [originAddress, destinationAddress]);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={origin || { lat: 0, lng: 0 }}
        zoom={10}
      >
        {origin && <Marker position={origin} />}
        {destination && <Marker position={destination} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default DistanceMapComponent; 