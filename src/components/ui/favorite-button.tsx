import { Star } from 'lucide-react';
import { toast } from 'sonner';

import { WeatherData } from '@/api/types';
import { useFavorite } from '@/hooks/useFavorite';

import { Button } from './button';

interface FavoriteButtonProps {
  data: WeatherData;
}
const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  const { addToFavorites, isFavorite, removeFavorite } = useFavorite();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from favorites`);
    } else {
      addToFavorites.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to favorites`);
    }
  };

  return (
    <div>
      <Button
        variant={isCurrentlyFavorite ? 'default' : 'outline'}
        size={'icon'}
        className={
          isCurrentlyFavorite ? 'bg-yellow-500 hover:bg-yellow-600' : ''
        }
        onClick={handleToggleFavorite}
      >
        <Star
          className={`h-4 w-4 ${isCurrentlyFavorite ? 'fill-current' : ''}`}
        />
      </Button>
    </div>
  );
};
export default FavoriteButton;
