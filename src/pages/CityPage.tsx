import { useParams, useSearchParams } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

import CurrentWeather from '@/components/CurrentWeather';
import HourlyTemperature from '@/components/HourlyTemperature';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import FavoriteButton from '@/components/ui/favorite-button';
import WeatherDetails from '@/components/WeatherDetails';
import WeatherForecast from '@/components/WeatherForecast';
import WeatherSkeleton from '@/components/WeatherSkeleton';
import { useForecastQuery, useWeatherQuery } from '@/hooks/useWeather';

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lon = parseFloat(searchParams.get('lon') || '0');

  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className='space-y-4'>
      {/* Favorite Cities */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div>
          <FavoriteButton
            data={{ ...weatherQuery.data, name: params.cityName }}
          />
        </div>
      </div>

      <div className='grid gap-6'>
        <div className='flex flex-col gap-4'>
          {/* current weather */}
          {weatherQuery.data && <CurrentWeather data={weatherQuery.data} />}
          {/* hourly temperature */}
          {forecastQuery.data && (
            <HourlyTemperature data={forecastQuery.data} />
          )}
        </div>
        <div className='grid items-start gap-6 md:grid-cols-2'>
          {/* Detail */}
          {weatherQuery.data && <WeatherDetails data={weatherQuery.data} />}
          {/* Forecast */}
          {forecastQuery.data && <WeatherForecast data={forecastQuery.data} />}
        </div>
      </div>
    </div>
  );
};

export default CityPage;
