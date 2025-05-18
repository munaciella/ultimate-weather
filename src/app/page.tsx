import Link from "next/link";
import { Sun, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex flex-col items-center justify-center text-white text-center p-6">
      <div className="space-y-6">
        <div className="flex flex-col items-center mx-auto max-w-7xl px-6 lg:px-8 mb-20">
  <div className="mx-auto max-w-2xl text-center space-y-6 px-6 lg:px-8">
    <p
      role="alert"
      className="inline-block bg-red-100 px-4 py-2 rounded-md text-red-700 font-medium text-md"
    >
      <span className="mr-1">⚠️</span>
      <strong>Demo Notice:</strong>{" "}
      <span className="font-light">
        This demo is provided solely for testing and development
        purposes. Functionality may be limited or subject to
        sudden service restrictions. Use at your own risk.
      </span>
    </p>
  </div>
    </div>
        <div className="flex justify-center space-x-6">
          <Sun className="w-16 h-16 text-yellow-300 animate-pulse" />
          <CloudRain className="w-16 h-16 text-white animate-bounce" />
        </div>
        <h1 className="text-5xl font-extrabold">The Meteo</h1>
        <p className="max-w-lg mx-auto text-lg opacity-90">
          View current weather, forecast, and more for all your favourite cities
          in one place.
        </p>
        <Link href="/weather">
          <Button size="lg" className="mt-4 bg-yellow-400 hover:bg-amber-500 text-gray-600">
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
