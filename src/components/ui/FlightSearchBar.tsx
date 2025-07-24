import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import type { Flight } from "types";

// Mapping of IATA codes to city-level SkyId and entityId
const skyIdMap: { [key: string]: string } = {
  LOS: "LAGO", // Lagos
  ABV: "ABJA", // Abuja
  PHC: "PHAR", // Port Harcourt
  LHR: "LOND", // London
  CDG: "PARI", // Paris
  JFK: "NYCA", // New York
};

const entityIdMap: { [key: string]: string } = {
  LOS: "95565058",
  ABV: "95565059",
  PHC: "95565060",
  LHR: "27544008",
  CDG: "27539733",
  JFK: "27537542",
};

export default function FlightSearchBar() {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!origin || !destination || !departureDate) {
      setError(
        "Please fill in all required fields (origin, destination, departure date)."
      );
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (departureDate < today) {
      setError("Departure date cannot be in the past.");
      return;
    }
    if (returnDate && returnDate < departureDate) {
      setError("Return date cannot be before departure date.");
      return;
    }

    setLoading(true);
    setError(null);
    setFlights([]);

    try {
      const originSkyId = skyIdMap[origin.toUpperCase()];
      const destinationSkyId = skyIdMap[destination.toUpperCase()];
      const originEntityId = entityIdMap[origin.toUpperCase()];
      const destinationEntityId = entityIdMap[destination.toUpperCase()];

      if (
        !originSkyId ||
        !destinationSkyId ||
        !originEntityId ||
        !destinationEntityId
      ) {
        throw new Error("Invalid origin or destination airport selected.");
      }

      const params = new URLSearchParams({
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date: format(departureDate, "yyyy-MM-dd"),
        currency: "USD",
        market: "en-US",
        countryCode: "US",
        adults: "1",
        limit: "100",
        cabinClass: "economy",
        ...(returnDate && { returnDate: format(returnDate, "yyyy-MM-dd") }),
      });

      const response = await fetch(
        `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?${params}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "34a04bdc75msh63aafe2635ce593p1d6111jsn1acc0da0a0e2",
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (!data.status) {
        setError(
          data.message?.join(", ") ||
            "An error occurred while fetching flights."
        );
        return;
      }

      // Map API response to Flight type
      const flightData = (data?.data?.itineraries || []).map(
        (itinerary: any) => ({
          airline:
            itinerary.legs[0].carriers.marketing[0]?.name || "Unknown Airline",
          flight_number: itinerary.legs[0].segments[0]?.flightNumber || "N/A",
          price: itinerary.price.raw || 0,
          duration: `${itinerary.legs[0].durationInMinutes} minutes`,
          departure_time: itinerary.legs[0].departure || "N/A",
          arrival_time: itinerary.legs[0].arrival || "N/A",
        })
      );

      setFlights(flightData);
    } catch (err) {
      setError("Failed to fetch flights. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Flight Search Form */}
      <div className="bg-[#2d2d2d] p-4 rounded-xl flex flex-wrap gap-2 justify-between items-center text-white">
        {/* From */}
        <div className="flex items-center gap-2 bg-[#3c3c3e] px-4 py-2 rounded-md w-full sm:w-auto flex-1 h-10">
          <MapPin className="w-4 h-4" />
          <Select onValueChange={setOrigin}>
            <SelectTrigger className="bg-transparent border-none focus:ring-0 text-white h-full">
              <SelectValue placeholder="Lagos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOS">Lagos (LOS)</SelectItem>
              <SelectItem value="ABV">Abuja (ABV)</SelectItem>
              <SelectItem value="PHC">Port Harcourt (PHC)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* To */}
        <div className="flex items-center gap-2 bg-[#3c3c3e] px-4 py-2 rounded-md w-full sm:w-auto flex-1 h-10">
          <MapPin className="w-4 h-4" />
          <Select onValueChange={setDestination}>
            <SelectTrigger className="bg-transparent border-none focus:ring-0 text-white h-full">
              <SelectValue placeholder="Where to?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LHR">London (LHR)</SelectItem>
              <SelectItem value="CDG">Paris (CDG)</SelectItem>
              <SelectItem value="JFK">New York (JFK)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Departure Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 bg-[#3c3c3e] px-4 py-2 rounded-md w-full sm:w-auto flex-1 h-10 text-left font-normal text-white"
            >
              <CalendarIcon className="w-4 h-4" />
              {departureDate ? (
                format(departureDate, "PPP")
              ) : (
                <span>Departure</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white text-black">
            <Calendar
              mode="single"
              selected={departureDate}
              onSelect={setDepartureDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Return Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 bg-[#3c3c3e] px-4 py-2 rounded-md w-full sm:w-auto flex-1 h-10 text-left font-normal text-white"
            >
              <CalendarIcon className="w-4 h-4" />
              {returnDate ? format(returnDate, "PPP") : <span>Return</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white text-black">
            <Calendar
              mode="single"
              selected={returnDate}
              onSelect={setReturnDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button
        onClick={handleSearch}
        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 bg-[#8ab4f8] text-black font-semibold px-6 py-2 rounded-full shadow-md hover:bg-[#8ab4f8] hover:text-black"
      >
        {loading ? "Searching..." : "Explore"}
      </Button>

      {/* Flight Results */}
      <div className="mt-12 w-full max-w-3xl mx-auto">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {flights.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Flight Results</h2>
            {flights.map((flight, index) => (
              <div
                key={index}
                className="bg-[#3c3c3e] p-4 rounded-md text-white"
              >
                <p>
                  <strong>Airline:</strong> {flight.airline}
                </p>
                <p>
                  <strong>Flight Number:</strong> {flight.flight_number}
                </p>
                <p>
                  <strong>Price:</strong> ${flight.price}
                </p>
                <p>
                  <strong>Duration:</strong> {flight.duration}
                </p>
                <p>
                  <strong>Departure:</strong> {flight.departure_time}
                </p>
                <p>
                  <strong>Arrival:</strong> {flight.arrival_time}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <p className="text-center text-white">
              No flights found. Try searching with different parameters.
            </p>
          )
        )}
      </div>
    </div>
  );
}
