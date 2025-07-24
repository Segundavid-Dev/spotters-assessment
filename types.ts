export type NavLinks = {
  icon: React.ReactNode;
  linkTo: string;
  label: string;
}[];

export type HeaderProps = {
  navMenuColor?: string;
  isDark?: boolean;
};

export type Flight = {
  flight_number: string;
  airline: string;
  price: number;
  duration: string;
  departure_time: string;
  arrival_time: string;
};

export type FlightData = {
  destination: string;
  imageUrl: string;
  price: string;
  dateRange: string;
  flightInfo: string;
};
