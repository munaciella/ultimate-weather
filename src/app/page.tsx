"use client";

import { useState, useEffect } from "react";
import { LocationSearch } from "@/components/LocationSearch";
import { WeatherCard } from "@/components/WeatherCard";

type City = { lat: number; lon: number; name: string };

export default function HomePage() {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cities");
    if (stored) setCities(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const handleLocate = (lat: number, lon: number, name: string) => {
    if (cities.some(c => c.name === name && c.lat === lat && c.lon === lon)) return;
    setCities([...cities, { lat, lon, name }]);
  };

  const handleRemove = (name: string, lat: number, lon: number) => {
    setCities(prev =>
      prev.filter(c => !(c.name === name && c.lat === lat && c.lon === lon))
    );
  };

  return (
    <main className="p-4 space-y-6">
      <LocationSearch onLocate={handleLocate} />

      {cities.length === 0 ? (
        <p className="text-center opacity-70">Search a city or use your location to view weather.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
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
