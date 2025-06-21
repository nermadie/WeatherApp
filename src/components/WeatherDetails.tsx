import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';

import type { WeatherData } from '@/api/types';
import { formatTime } from '@/utils/formatValue';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;

  const getWindDirection = (degree: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index =
      Math.round(
        (degree % 360 < 0 ? 360 + (degree % 360) : degree % 360) / 45,
      ) % 8;
    return directions[index];
  };

  const details = [
    {
      title: 'Sunrise',
      value: formatTime(sys.sunrise, 'hh:mm a'),
      icon: Sunrise,
      color: 'text-orange-500',
    },
    {
      title: 'Sunset',
      value: formatTime(sys.sunset, 'hh:mm a'),
      icon: Sunset,
      color: 'text-orange-500',
    },
    {
      title: 'Wind Derection',
      value: `${getWindDirection(wind.deg)} ${wind.speed} m/s`,
      icon: Compass,
      color: 'text-green-500',
    },
    {
      title: 'Pressure',
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: 'text-red-500',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4'>
          {details.map((detail) => (
            <div
              key={detail.title}
              className='flex items-center gap-3 rounded-lg border p-4'
            >
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className='text-sm leading-none font-medium'>
                  {detail.title}
                </p>
                <p className='text-muted-foreground text-sm'>{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
