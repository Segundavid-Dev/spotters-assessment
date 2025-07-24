import Header from "@/components/Header";

export default function Flights() {
  return (
    <div className="bg-[var(--flight-body-background)] text-white">
      <Header isDark={true} navMenuColor="#202124" />

      <div className="max-w-7xl mx-auto px-8">
        <img
          src="/travel/flights_nc_4.svg"
          alt="Travel hero image"
          className="w-full object-contain h-auto max-sm:h-38 max-sm:object-cover"
        />
      </div>
    </div>
  );
}
