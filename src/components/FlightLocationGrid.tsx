import { useEffect, useState } from "react";

import type { FlightData } from "types";

export default function FlightLocationGrid() {
  const [locations, setLocations] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const url =
        "https://sky-scrapper.p.rapidapi.com/api/v1/hotels/getHotelDetails?hotelId=106005202&entityId=27537542&currency=USD&market=en-US&countryCode=US";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "34a04bdc75msh63aafe2635ce593p1d6111jsn1acc0da0a0e2",
          "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        },
      };

      try {
        const res = await fetch(url, options);
        const data = await res.json();
        const imageUrl =
          data?.data?.propertyGallery?.images?.[0]?.image?.url ||
          "/fallback-image.jpg";

        // Mock 6 destinations using this same data
        const fakeDestinations: FlightData[] = Array.from({ length: 6 }).map(
          (_, i) => ({
            destination: `City ${i + 1}`,
            imageUrl: imageUrl,
            price: `NGN ${(1_500_000 + i * 100_000).toLocaleString()}`,
            dateRange: "Aug 14 — Aug 21",
            flightInfo: "1 stop · 14 hr 5 min · Ethiopian",
          })
        );

        setLocations(fakeDestinations);
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
    <section className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Popular trips from Lagos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((loc, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-[#202124] p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
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
