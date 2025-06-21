import { format } from 'date-fns';

export const formatTime = (time: number, dateFormat: string) =>
  format(new Date(time * 1000), dateFormat);

export const formatTemp = (temp: number) => `${Math.round(temp)}°`;
