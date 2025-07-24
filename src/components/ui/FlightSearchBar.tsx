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
import { Calendar as CalendarIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export default function FlightSearchBar() {
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Flight Search Form */}
      <div className="bg-[#2d2d2f] p-4 rounded-xl flex flex-wrap gap-2 justify-between items-center text-white">
        {/* From */}
        <div className="flex items-center gap-2 bg-[#3c3c3e] px-4 py-2 rounded-md w-full sm:w-auto flex-1 h-10">
          <MapPin className="w-4 h-4" />
          <Select>
            <SelectTrigger className="bg-transparent border-none focus:ring-0 text-white h-full">
              <SelectValue placeholder="Lagos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lagos">Lagos</SelectItem>
              <SelectItem value="abuja">Abuja</SelectItem>
              <SelectItem value="portharcourt">Port Harcourt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* To */}
        <div className="flex items-center gap-2 bg-[#3c3c3e] px-4 py-2 rounded-md w-full sm:w-auto flex-1 h-10">
          <MapPin className="w-4 h-4" />
          <Select>
            <SelectTrigger className="bg-transparent border-none focus:ring-0 text-white h-full">
              <SelectValue placeholder="Where to?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="london">London</SelectItem>
              <SelectItem value="paris">Paris</SelectItem>
              <SelectItem value="newyork">New York</SelectItem>
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
                <span>Mon, Aug 4</span>
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

      <Button className="absolute left-1/2 -translate-x-1/2 top-full mt-4 bg-[#8ab4f8] text-black font-semibold px-6 py-2 rounded-full shadow-md hover:bg-[#8ab4f8] hover:text-black">
        Explore
      </Button>
    </div>
  );
}
