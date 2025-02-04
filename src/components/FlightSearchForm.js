import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchAirport, searchFlightV2 } from "../services/flightApi";

const FlightSearchForm = () => {
  const navigate = useNavigate();
  const [originQuery, setOriginQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [date, setDate] = useState("");
  const [originResults, setOriginResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fetch origin airports while typing
  const handleOriginChange = async (e) => {
    const query = e.target.value;
    setOriginQuery(query);
    if (query.length < 3) return;

    try {
      const response = await searchAirport(query);
      setOriginResults(response?.data || []);
    } catch {
      setError("Error fetching origin airports.");
    }
  };

  // 🔹 Fetch destination airports while typing
  const handleDestinationChange = async (e) => {
    const query = e.target.value;
    setDestinationQuery(query);
    if (query.length < 3) return;

    try {
      const response = await searchAirport(query);
      setDestinationResults(response?.data || []);
    } catch {
      setError("Error fetching destination airports.");
    }
  };

  // 🔹 Select an origin airport
  const handleSelectOrigin = (airport) => {
    const { skyId, entityId, localizedName } = airport.navigation.relevantFlightParams;
    setSelectedOrigin({ skyId, entityId });
    setOriginQuery(`${localizedName} (${skyId})`);
    setOriginResults([]);
  };

  // 🔹 Select a destination airport
  const handleSelectDestination = (airport) => {
    const { skyId, entityId, localizedName } = airport.navigation.relevantFlightParams;
    setSelectedDestination({ skyId, entityId });
    setDestinationQuery(`${localizedName} (${skyId})`);
    setDestinationResults([]);
  };

  // 🔹 Handle flight search
  const handleSearchFlights = async (e) => {
    e.preventDefault();
    if (!selectedOrigin || !selectedDestination || !date) {
      setError("Please select both origin and destination airports and enter a date.");
      return;
    }

    setLoading(true);
    try {
      const response = await searchFlightV2(
        selectedOrigin.skyId,
        selectedDestination.skyId,
        selectedOrigin.entityId,
        selectedDestination.entityId,
        date
      );
      if (!response || !response.status) throw new Error("Invalid response from server.");

      localStorage.setItem("searchResults", JSON.stringify(response));
      navigate("/results", {
        state: { searchResults: response, searchParams: { originQuery, destinationQuery, date } },
      });
    } catch {
      setError("Error fetching flights. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Find Your Perfect Flight
      </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSearchFlights}>
          {/* 🔹 Grid for inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            
            {/* 🔹 Origin Input */}
            <div className="relative space-y-2">
              <label className="block text-sm font-medium text-gray-700">Origin</label>
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  value={originQuery}
                  onChange={handleOriginChange}
                  placeholder="Enter city or airport name"
                  required
                />
                {/* Plane Takeoff Icon */}
                <span className="absolute inset-y-0 right-0 flex items-center pt-5 pr-3 text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* Heroicons 'Paper Airplane' path */}
                    <path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                    </svg>
                </span>
              </div>

              {/* Dropdown for origin selection */}
              {originResults.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
                  {originResults.map((airport) => (
                    <li
                      key={airport.navigation.entityId}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectOrigin(airport)}
                    >
                      {airport.presentation.suggestionTitle}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 🔹 Destination Input */}
            <div className="relative space-y-2">
              <label className="block text-sm font-medium text-gray-700">Destination</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  value={destinationQuery}
                  onChange={handleDestinationChange}
                  placeholder="Enter city or airport name"
                  required
                />
                {/* Arrow Right Icon */}
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* Heroicons 'Arrow Right' path */}
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
                </span>
              </div>

              {/* Dropdown for destination selection */}
              {destinationResults.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
                  {destinationResults.map((airport) => (
                    <li
                      key={airport.navigation.entityId}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectDestination(airport)}
                    >
                      {airport.presentation.suggestionTitle}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* 🔹 Date Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Departure Date</label>
            <div className="relative">
              <input
                type="date"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* 🔹 Search Flights Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                      3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </span>
            ) : (
              "Search Flights"
            )}
          </button>
        </form>
      </section>

      {/* 🔹 Go Back Button */}
      <div className="max-w-4xl mx-auto mt-4 text-center">
        <Link
          to="/"
          className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default FlightSearchForm;
