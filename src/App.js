import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FlightSearch from "./components/FlightSearch";
import FlightResults from "./pages/FlightResults";
import FlightDetails from "./pages/FlightDetails";
import HomePage from "./pages/Home.js";
import HotelSearch from "./components/HotelSearch.js";
import HotelResults from "./pages/HotelResults.js";
import HotelDetails from "./pages/HotelDetails.js";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header/Nav */}
        <Header />

        {/* Main Content */}
        <div className="flex-grow container mx-auto  min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/flights" element={<FlightSearch />} />
            <Route path="/hotels" element={<HotelSearch />} />
            <Route path="/results" element={<FlightResults />} />
            <Route path="/hotel-results" element={<HotelResults />} />
            <Route path="/hotel-details/:hotelId" element= {<HotelDetails/>}/>
            <Route path="/details/:flightId" element={<FlightDetails />} />
          </Routes>
        </div>

        {/* Footer (optional) */}
        <footer className="p-4 bg-gray-100 text-center text-sm">
          <p>
            Built by{" "}
            <a
              href="https://portfolio-garbuz.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Shay Garbuz
            </a>
            . © 2025 Flights App Demo.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
