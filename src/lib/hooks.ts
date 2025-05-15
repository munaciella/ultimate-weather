import { useQuery } from "@tanstack/react-query";
import { fetchWeather, WeatherResponse } from "./fetchWeather";

export function useWeather(lat: number | null, lon: number | null) {
  return useQuery<WeatherResponse, Error>({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat!, lon!),
    enabled: lat !== null && lon !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
