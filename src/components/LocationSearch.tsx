'use client';

import { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

type Props = {
  onLocate: (lat: number, lon: number, name: string) => void;
};

export function LocationSearch({ onLocate }: Props) {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const searchCity = async () => {
    const query = city.trim();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}`
      );
      const { results } = await res.json();
      if (results?.length) {
        const { latitude, longitude, name, country } = results[0];
        onLocate(latitude, longitude, `${name}, ${country}`);
        setCity('');
      }
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchCity();
    }
  };

  const useGeolocation = () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`
        );
        const { name, country } = (await res.json()).results?.[0] || {};
        onLocate(
          latitude,
          longitude,
          name ? `${name}, ${country}` : 'My Location'
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
  };

  return (
    <div className="flex gap-2 justify-center max-w-4xl mx-auto">
      <Input
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={onKeyDown}
        className='placeholder-gray-700 
          placeholder:text-lg 
          placeholder:font-semibold 
          focus:placeholder-opacity-50'
      />

      <Button onClick={searchCity} disabled={loading} className="bg-green-500 hover:bg-green-600 text-gray-800">
        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Search'}
      </Button>

      <Button onClick={useGeolocation} disabled={loading} className="bg-yellow-400 hover:bg-yellow-500 text-gray-800">
        {loading ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          'Use My Location'
        )}
      </Button>
    </div>
  );
}
