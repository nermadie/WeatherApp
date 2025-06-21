import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/context/ThemeProvider';

import CitySearch from './CitySearch';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-1 w-full border-b py-2 backdrop-blur'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link to={'/'}>
          <img
            src={
              theme === 'dark'
                ? 'https://png.pngtree.com/png-clipart/20230414/ourmid/pngtree-weather-icon-png-image_6685458.png'
                : 'https://i.pinimg.com/736x/77/0b/80/770b805d5c99c7931366c2e84e88f251.jpg'
            }
            alt='Weather App Logo'
            className='h-14'
          />
        </Link>
        <div className='flex gap-4'>
          {/* search */}
          <CitySearch />
          {/* theme toggle */}
          <div
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`flex cursor-pointer items-center transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}
          >
            {isDark ? (
              <Sun className='h-6 w-6 text-yellow-500' />
            ) : (
              <Moon className='h-6 w-6 text-blue-500' />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
