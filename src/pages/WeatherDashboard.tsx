import { AlertCircle, MapPin, RefreshCw } from 'lucide-react';

import CurrentWeather from '@/components/CurrentWeather';
import HourlyTemperature from '@/components/HourlyTemperature';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FavoriteCities } from '@/components/ui/favorite-cities';
import WeatherDetails from '@/components/WeatherDetails';
import WeatherForecast from '@/components/WeatherForecast';
import WeatherSkeleton from '@/components/WeatherSkeleton';
import { useGeolocation } from '@/hooks/useGeolocation';
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from '@/hooks/useWeather';

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationError) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p>{locationError}</p>
          <Button onClick={getLocation} variant='outline' className='w-fit'>
            <MapPin className='h-4 w-4' />
            Already changed the location access?
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Weather Error</AlertTitle>
        <AlertDescription>
          <p>{weatherQuery.error?.message}</p>
          <Button onClick={handleRefresh} variant='outline' className='w-fit'>
            <RefreshCw className='h-4 w-4' />
            Refresh Weather
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='space-y-4'>
      <FavoriteCities />
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleRefresh}
          disabled={
            locationLoading ||
            weatherQuery.isFetching ||
            forecastQuery.isFetching
          }
        >
          <RefreshCw
            className={`h-4 w-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`}
          />
        </Button>
      </div>

      {locationLoading ||
      weatherQuery.isFetching ||
      forecastQuery.isFetching ? (
        <WeatherSkeleton />
      ) : (
        <div className='grid gap-6'>
          <div className='flex flex-col gap-4 lg:flex-row'>
            {/* current weather */}
            {weatherQuery.data && (
              <CurrentWeather
                data={weatherQuery.data}
                locationName={locationName}
              />
            )}
            {/* hourly temperature */}
            {forecastQuery.data && (
              <HourlyTemperature data={forecastQuery.data} />
            )}
          </div>
          <div className='grid items-start gap-6 md:grid-cols-2'>
            {/* Detail */}
            {weatherQuery.data && <WeatherDetails data={weatherQuery.data} />}
            {/* Forecast */}
            {forecastQuery.data && (
              <WeatherForecast data={forecastQuery.data} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
