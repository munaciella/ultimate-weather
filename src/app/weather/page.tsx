"use client";

import { useState, useEffect } from "react";
import { LocationSearch } from "@/components/LocationSearch";
import { WeatherCard } from "@/components/WeatherCard";

type City = { lat: number; lon: number; name: string };

export default function WeatherPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cities");
    if (stored) {
      setCities(JSON.parse(stored));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cities", JSON.stringify(cities));
    }
  }, [cities, loaded]);

  const handleLocate = (lat: number, lon: number, name: string) => {
    if (cities.some(c => c.lat === lat && c.lon === lon && c.name === name)) return;
    setCities(prev => [...prev, { lat, lon, name }]);
  };

  const handleRemove = (name: string, lat: number, lon: number) => {
    setCities(prev =>
      prev.filter(c => !(c.name === name && c.lat === lat && c.lon === lon))
    );
  };

  return (
    <main className="bg-gradient-to-br from-blue-400 to-indigo-600 p-8 space-y-8 pt-12">
      {/* — HEADER — */}
      <header className="text-center text-white space-y-2">
        <h1 className="text-4xl font-extrabold">Your Weather Dashboard</h1>
        <p className="text-lg opacity-90">
          Add cities to see current weather and forecasts all in one place.
        </p>
      </header>

      {/* — SEARCH BAR — */}
      <LocationSearch onLocate={handleLocate} />

      {/* — NO CITIES MESSAGE — */}
      {cities.length === 0 ? (
        <p className="mt-8 text-center text-white text-lg opacity-80">
          Search a city or use your location to view weather.
        </p>
      ) : (
        /* — CARDS GRID — */
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map(city => (
            <WeatherCard
              key={`${city.name}-${city.lat}-${city.lon}`}
              lat={city.lat}
              lon={city.lon}
              name={city.name}
              onRemove={() => handleRemove(city.name, city.lat, city.lon)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
