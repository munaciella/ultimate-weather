export interface WeatherResponse {
  current_weather: {
    temperature: number;
    feelslike: number;
    windspeed: number;
    weathercode: number;
    time: string;
    humidity: number;
    precipitation: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
    weathercode: number[];
  };
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherResponse> {
  // call your own Next.js API route
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Weather fetch failed");
  const json = await res.json();
  
  // Now extract the “feelslike”, humidity, etc, just like before:
  const { current_weather, hourly, daily } = json;
  const idx = hourly.time.indexOf(current_weather.time);
  const humidity = idx >= 0 ? hourly.relativehumidity_2m[idx] : 0;
  const precipitation = idx >= 0 ? hourly.precipitation_probability[idx] : 0;
  const feelslike = idx >= 0 ? hourly.apparent_temperature[idx] : current_weather.temperature;

  return {
    current_weather: { ...current_weather, humidity, precipitation, feelslike },
    daily,
  };
}
