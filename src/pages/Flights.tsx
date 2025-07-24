import FlightLocationGrid from "@/components/FlightLocationGrid";
import Header from "@/components/Header";
import FlightSearchBar from "@/components/ui/FlightSearchBar";

export default function Flights() {
  return (
    <div className="bg-[var(--flight-body-background)] text-white min-h-screen">
      <Header isDark={true} navMenuColor="#202124" />

      <div className="max-w-7xl mx-auto px-8 pb-5">
        <h1 className="text-5xl text-center font-medium my-10">Flights</h1>
        <FlightSearchBar />
        <FlightLocationGrid />
      </div>
    </div>
  );
}
