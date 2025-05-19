'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
  Sun,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudFog,
  Droplet,
  Umbrella,
  Wind,
  Sunrise,
  Sunset,
  Thermometer,
  Loader2,
} from 'lucide-react';
import { useWeather } from '@/lib/hooks';

const weatherCodeToIcon = (code: number) => {
  if (code === 0) return Sun;
  if (code <= 3) return CloudSun;
  if (code <= 48) return CloudFog;
  if (code <= 67) return CloudRain;
  if (code <= 77) return CloudSnow;
  if (code <= 82) return CloudRain;
  return Sun;
};

type Props = { lat: number; lon: number; name?: string; onRemove?: () => void };

export function WeatherCard({ lat, lon, name, onRemove }: Props) {
  const { data, isLoading, error } = useWeather(lat, lon);

  if (isLoading)
    return (
      <Card className="max-w-lg mx-auto p-6 flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10 opacity-70" />
      </Card>
    );

  if (error || !data)
    return (
      <Card>
        <CardContent>Error fetching weather.</CardContent>
      </Card>
    );

  const { current_weather, daily } = data;
  const CurrentIcon = weatherCodeToIcon(current_weather.weathercode);

  return (
    <Card className="max-w-lg mx-auto space-y-4 p-4 mt-4 mb-10">
      {/* Header with date, sunrise/sunset */}
      <CardHeader className="flex items-center justify-between">
        <div>
          {name && <div className="text-lg font-semibold">{name}</div>}
          <CardTitle className="text-xl">
            {format(new Date(current_weather.time), 'PPP p')}
          </CardTitle>
          <div className="flex items-center space-x-3 text-sm mt-1">
            <Sunrise className="w-5 h-5" />
            <span>{format(new Date(daily.sunrise[0]), 'p')}</span>
            <Sunset className="w-5 h-5" />
            <span>{format(new Date(daily.sunset[0]), 'p')}</span>
          </div>
        </div>
        <CurrentIcon className="w-16 h-16 text-yellow-500" />
      </CardHeader>

      {/* Current stats */}
      <CardContent className="space-y-3">
        <div className="text-5xl font-bold">
          {current_weather.temperature.toFixed(1)}°C
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-1">
            <Droplet className="w-5 h-5" />
            {current_weather.humidity}%
          </div>
          <div className="flex items-center gap-1">
            <Umbrella className="w-5 h-5" />
            {current_weather.precipitation}%
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-5 h-5" />
            {current_weather.windspeed.toFixed(0)} km/h
          </div>
          <div className="flex items-center gap-1">
            <Thermometer className="w-5 h-5" />
            Feels like {current_weather.feelslike.toFixed(1)}°C
          </div>
        </div>

        {/* 7-day grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {daily.time.map((day, i) => {
            const Icon = weatherCodeToIcon(daily.weathercode[i]);
            return (
              <div
                key={day}
                className="flex flex-col items-center bg-white/5 rounded-lg p-3"
              >
                <span className="mb-1">{format(new Date(day), 'EEE')}</span>
                <Icon className="w-8 h-8 mb-1" />
                <span className="text-sm font-medium">
                  {daily.temperature_2m_max[i].toFixed(0)}° /{' '}
                  {daily.temperature_2m_min[i].toFixed(0)}°
                </span>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <Umbrella className="w-4 h-4" />
                  {daily.precipitation_probability_max[i]}%
                </div>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <Sunrise className="w-4 h-4" />
                  {format(new Date(daily.sunrise[i]), 'p')}
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Sunset className="w-4 h-4" />
                  {format(new Date(daily.sunset[i]), 'p')}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* Footer with attribution + Remove button */}
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs opacity-70">Powered by Open-Meteo</span>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
