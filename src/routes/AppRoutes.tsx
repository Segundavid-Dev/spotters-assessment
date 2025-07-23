import Travel from "../components/Travel";
import { BrowserRouter, Routes, Route } from "react-router";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Travel/>} />
      </Routes>
    </BrowserRouter>
  );
}
