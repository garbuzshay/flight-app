import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  searchDestinationOrHotel,
  searchHotels,
} from "../services/hotelApi";

function HotelSearch() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Get the destination entity for the provided location.
      const destinationResponse = await searchDestinationOrHotel(location);
      if (!destinationResponse.status || !destinationResponse.data.length) {
        throw new Error("No destination found for the location provided");
      }
      // Prefer an item with entityType "city" (if available) or use the first result.
      const destinationEntity =
        destinationResponse.data.find(
          (item) => item.entityType.toLowerCase() === "city"
        ) || destinationResponse.data[0];

      const locationEntityId = destinationEntity.entityId;

      // 2. Search for hotels using the obtained entity ID.
      const hotelsResponse = await searchHotels(
        locationEntityId,
        checkInDate,
        checkOutDate,
        guests,
        1 // room count; adjust if needed.
      );

      // If the API indicates an error (e.g. checkin in the past), throw an error with the message.
      if (!hotelsResponse.status) {
        const apiMessage = Array.isArray(hotelsResponse.message)
          ? hotelsResponse.message.join(", ")
          : hotelsResponse.message;
        throw new Error(apiMessage || "Invalid response from searchHotels API");
      }

      // 3. Save results and navigate to the results page.
      localStorage.setItem("hotelSearchResults", JSON.stringify(hotelsResponse));
      navigate("/hotel-results", {
        state: {
          hotelSearchResults: hotelsResponse,
          searchParams: { location, checkInDate, checkOutDate, guests },
        },
      });
    } catch (err) {
      console.error("Error searching hotels:", err);
      setError(err.message || "Failed to search hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Find Your Perfect Hotel
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Destination Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Destination
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York"
              required
            />
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
                <path d="M3 10l6 6 9-12"></path>
              </svg>
            </span>
          </div>
        </div>

        {/* Check-in and Check-out Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Check-in Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                required
              />
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
                 
                </svg>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Check-out Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                required
              />
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
                 
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Guests Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Guests
          </label>
          <div className="relative">
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>

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
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </span>
          ) : (
            "Search Hotels"
          )}
        </button>
      </form>
    </section>
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
}

export default HotelSearch;
