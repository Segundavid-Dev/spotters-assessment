import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Travel from "@/pages/Travel";
import Explore from "@/pages/Explore";
import Flights from "@/pages/Flights";
import Hotels from "@/pages/Hotels";
import Vacation from "@/pages/Vacation";
import PageNotFound from "@/pages/PageNotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to travel route */}
        <Route path="/" element={<Navigate to="/travel" replace />} />

        {/* Travel layout route with nested pages */}
        <Route path="/travel" element={<Travel />} />
        <Route path="/travel/explore" element={<Explore />} />
        <Route path="/travel/flight" element={<Flights />} />
        <Route path="/travel/hotels" element={<Hotels />} />
        <Route path="/travel/vacation" element={<Vacation />} />

        {/* Catch wrong routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
