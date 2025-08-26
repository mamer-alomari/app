export const distanceService = {
  async getCoordinates(address: string): Promise<{ lat: number; lng: number }> {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
          key: GOOGLE_MAPS_API_KEY
        }
      });

      const data = response.data;
      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        return {
          lat: location.lat,
          lng: location.lng
        };
      } else {
        throw new Error(`Error in geocoding response: ${data.status}`);
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  }
};
