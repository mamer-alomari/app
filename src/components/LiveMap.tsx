import { useCallback, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import type { Location } from '../types/job';

interface LiveMapProps {
  currentLocation: Location;
  source: Location;
  destination: Location;
}

const mapContainerStyle = {
  width: '100%',
  height: '200px'
};

export default function LiveMap({ currentLocation, source, destination }: LiveMapProps) {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      }
    );
  }, [source, destination]);

  if (!isLoaded) return <div className="animate-pulse bg-gray-200 rounded-lg" style={mapContainerStyle} />;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={currentLocation}
      zoom={12}
      onLoad={onLoad}
    >
      <Marker
        position={currentLocation}
        icon={{
          url: '/truck-icon.png',
          scaledSize: new google.maps.Size(40, 40)
        }}
      />
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}