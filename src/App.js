import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import FlightResults from "./pages/FlightResults";
import FlightDetails from "./pages/FlightDetails";
import HomePage from "./pages/Home.js";
import HotelSearch from "./components/HotelSearch.js";
import HotelResults from "./pages/HotelResults.js";
import HotelDetails from "./pages/HotelDetails.js";
import Footer from "./components/Footer.js";
import FlightSearchForm from "./components/FlightSearchForm.js";

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
            <Route path="/home" element={<Navigate replace to="/" />} />
            <Route path="/flights" element={<FlightSearchForm />} />
            <Route path="/hotels" element={<HotelSearch />} />
            <Route path="/results" element={<FlightResults />} />
            <Route path="/hotel-results" element={<HotelResults />} />
            <Route path="/hotel-details/:hotelId" element={<HotelDetails />} />
            <Route path="/details/:flightId" element={<FlightDetails />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
