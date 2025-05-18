# The Meteo

A responsive, authenticated weather dashboard built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. It fetches data from the free Open‑Meteo API and allows users to save multiple cities to their dashboard with localStorage persistence and swipe‑to‑delete animations.

---

## Live Demo
![The Meteo](https://the-meteo.vercel.app/)

---

## Live Demo Disclaimer

Please note that the live demo linked above is intended **only** for development and testing. To keep hosting costs low:
- New user registrations may be restricted or disabled at any time.
- Some features may be unstable or unavailable.
- Use this demo **at your own risk**; do **not** rely on it for production data.

---

## Employer / Hiring Inquiries

If you’re an employer interested in leveraging this project, or if you encounter an issue you’d like me to solve, please reach out!  
Email me at: **francesco.vurchio82@gmail.com** with:
1. A brief description of the problem or feature you need, and  
2. Any relevant deadlines or context.  
I’ll get back to you as soon as possible.

---


## Tech Stack

* **Next.js 14 (App Router)** with TypeScript
* **Tailwind CSS** + **shadcn/ui** for styling and components
* **Clerk** for authentication
* **TanStack Query** for data fetching and caching
* **Open‑Meteo API** for free weather data
* **Framer Motion** for swipe‑to‑delete animations
* **LocalStorage** for client‑side persistence

## Features

* Search cities by name or use browser geolocation
* Display current weather, 7‑day forecast, humidity, precipitation, wind, and feels‑like temperature
* Save multiple city cards to a dashboard with persistence across reloads
* Swipe to delete cards with smooth animations
* Responsive, mobile‑friendly design

## Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your‑username/ultimate-weather.git
   cd ultimate-weather
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root and add your Clerk credentials:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
   CLERK_SECRET_KEY=sk_test_xxx
   ```

   No API key is needed for Open‑Meteo.

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view.

## Scripts

* `npm run dev` – Start in development mode
* `npm run build` – Build for production
* `npm start` – Start the production server

## Project Structure

```
/app
  /api/weather      – Server proxy for Open‑Meteo (avoids CORS)
  /weather/page.tsx – Weather dashboard page
  /page.tsx         – Landing page
/components
  LocationSearch.tsx
  WeatherCard.tsx
  Navbar.tsx
  Providers.tsx     – React Query provider
/lib
  fetchWeather.ts   – API fetch logic
  hooks.ts          – TanStack Query hooks
/pages
  (if using pages router for API)
/public
  logo.png
/styles
  globals.css       – Tailwind base imports
```

## Deployment

Deploy to Vercel for a free, zero‑config experience. Push to GitHub and link your repo in the Vercel dashboard. Environment variables set in Vercel match those in `.env.local`.
