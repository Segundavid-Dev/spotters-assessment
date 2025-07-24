import { useEffect, useState } from "react";

import type { FlightData } from "types";

export default function FlightLocationGrid() {
  const [locations, setLocations] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const url = "/data/location.json";

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setLocations(data);
      } catch (error) {
        console.error("Error fetching hotel data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <section className="px-4 py-20">
      <h2 className="text-2xl font-semibold mb-4 text-white max-w-3xl mx-auto">
        Popular trips from Lagos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {locations.map((loc, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-lg shadow-md transition-shadow"
          >
            <img
              src={loc.imageUrl}
              alt={loc.destination}
              className="w-32 h-24 object-cover rounded-md"
            />
            <div className="flex flex-col gap-1 text-white">
              <div className="text-lg font-semibold">{loc.destination}</div>
              <div className="text-sm text-gray-300">{loc.dateRange}</div>
              <div className="text-sm text-gray-400">{loc.flightInfo}</div>
              <div className="mt-1 text-base font-bold text-white">
                {loc.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
