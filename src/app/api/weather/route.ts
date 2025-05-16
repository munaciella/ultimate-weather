import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat or lon" }, { status: 400 });
  }

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set("current_weather", "true");
  url.searchParams.set(
    "hourly",
    "relativehumidity_2m,precipitation_probability,apparent_temperature"
  );
  url.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,weathercode"
  );
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url.toString());
  if (!res.ok) {
    return NextResponse.json(
      { error: "Open-Meteo fetch failed" },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
