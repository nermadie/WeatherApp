import { useEffect, useState } from 'react';

import { Coordinates } from '@/api/types';

interface GeolocationState {
  coordinates: Coordinates;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: { lat: 0, lon: 0 },
    error: null,
    isLoading: false,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: { lat: 0, lon: 0 },
        error: 'Geolocation is not supported by this browser.',
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationData({
          coordinates: { lat: latitude, lon: longitude },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
        }
        setLocationData({
          coordinates: { lat: 0, lon: 0 },
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { ...locationData, getLocation };
}
