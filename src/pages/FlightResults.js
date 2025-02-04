// C:\Users\Shay\Desktop\flights-app\flights-app\src\pages\FlightResults.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LOAD_COUNT = 5; // Number of flights to show initially and each time 'Load More' is clicked

function FlightResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // Base results after filtering by the user’s search parameters.
  const [baseItineraries, setBaseItineraries] = useState([]);
  // Additional filters
  const [companyFilter, setCompanyFilter] = useState("");
  const [stopCountFilter, setStopCountFilter] = useState("");
  const [tempPriceMin, setTempPriceMin] = useState("");
  const [tempPriceMax, setTempPriceMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  // Final filtered results
  const [finalItineraries, setFinalItineraries] = useState([]);

  // Batching logic
  const [extraBatches, setExtraBatches] = useState(0);
  const visibleCount = LOAD_COUNT + extraBatches * LOAD_COUNT;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // We’ll store the sessionId from search results
  const [sessionId, setSessionId] = useState(null);

  // Load initial results from router state or localStorage
  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let response;
        // Retrieve results
        if (location.state?.searchResults) {
          response = location.state.searchResults;
        } else {
          const stored = localStorage.getItem("searchResults");
          if (stored) {
            response = JSON.parse(stored);
          } else {
            throw new Error("No search results found");
          }
        }

        // Grab sessionId from the search results
        const foundSessionId = response?.data?.context?.sessionId;
        if (foundSessionId) setSessionId(foundSessionId);

        // Grab original search params
        const { origin, destination, date } = location.state?.searchParams || {};

        // Filter the itineraries
        const filtered = response.data.itineraries.filter((itinerary) => {
          const leg = itinerary.legs[0];
          const matchesOrigin = origin
            ? leg.origin.displayCode.toUpperCase() === origin
            : true;
          const matchesDestination = destination
            ? leg.destination.displayCode.toUpperCase() === destination
            : true;
          let matchesDate = true;
          if (date) {
            const flightDate = new Date(leg.departure)
              .toISOString()
              .split("T")[0];
            matchesDate = flightDate === date;
          }
          return matchesOrigin && matchesDestination && matchesDate;
        });

        setBaseItineraries(filtered);
      } catch (err) {
        console.error("Error loading flight results:", err);
        setError("Unable to load flight results. Please try searching again.");
        localStorage.removeItem("searchResults");
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [location.state]);

  // Apply additional filters
  useEffect(() => {
    const applyAdditionalFilters = () => {
      let filtered = [...baseItineraries];

      filtered = filtered.filter((itinerary) => {
        const leg = itinerary.legs[0];

        // Filter by company
        if (companyFilter) {
          if (
            leg.carriers.marketing[0].name.toLowerCase() !==
            companyFilter.toLowerCase()
          ) {
            return false;
          }
        }

        // Filter by price
        const priceNum = parseFloat(
          itinerary.price && itinerary.price.formatted
            ? itinerary.price.formatted.replace(/[^0-9.]/g, "")
            : "0"
        );
        if (priceMin !== "" && priceNum < parseFloat(priceMin)) return false;
        if (priceMax !== "" && priceNum > parseFloat(priceMax)) return false;

        // Filter by stop count
        if (stopCountFilter) {
          if (stopCountFilter === "3+") {
            if (leg.stopCount < 3) return false;
          } else {
            if (leg.stopCount !== parseInt(stopCountFilter, 10)) return false;
          }
        }

        return true;
      });
      setFinalItineraries(filtered);
      setExtraBatches(0);
    };

    applyAdditionalFilters();
  }, [baseItineraries, companyFilter, priceMin, priceMax, stopCountFilter]);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "numeric",
    });
  };

  // Loading
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Loading Flight Results</h2>
        <div className="flex items-center justify-center p-12">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 
              5.373 0 12h4zm2 5.291A7.962 7.962 0 014 
              12H0c0 3.042 1.135 5.824 3 
              7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Flight Search Results</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Return to Search
          </button>
        </div>
      </div>
    );
  }

  // No flights
  if (baseItineraries.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Flight Search Results</h2>
        <p>No flights found for your search criteria.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Try Another Search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/flights")}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        &larr; Back to Flight Search
      </button>

      <h2 className="text-2xl font-semibold mb-4">Flight Search Results</h2>
      <p className="mb-4">
        Found {baseItineraries.length} flights for your criteria
      </p>

      {/* Filters */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Additional Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Company</label>
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="">All</option>
              {Array.from(
                new Set(
                  baseItineraries.map(
                    (itinerary) =>
                      itinerary.legs[0].carriers.marketing[0].name
                  )
                )
              ).map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Stops</label>
            <select
              value={stopCountFilter}
              onChange={(e) => setStopCountFilter(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="">All</option>
              <option value="0">Direct</option>
              <option value="1">1 Stop</option>
              <option value="2">2 Stops</option>
              <option value="3+">3+ Stops</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={tempPriceMin}
                onChange={(e) => setTempPriceMin(e.target.value)}
                className="w-1/2 border border-gray-300 p-2 rounded"
              />
              <input
                type="number"
                placeholder="Max"
                value={tempPriceMax}
                onChange={(e) => setTempPriceMax(e.target.value)}
                className="w-1/2 border border-gray-300 p-2 rounded"
              />
              <button
                onClick={() => {
                  setPriceMin(tempPriceMin);
                  setPriceMax(tempPriceMax);
                }}
                className="px-2 py-2 bg-blue-600 bg-opacity-60 text-white rounded hover:bg-blue-700 whitespace-nowrap"
              >
                Filter by Price
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render results */}
      <div className="min-h-[300px]">
        {finalItineraries.length === 0 ? (
          <div className="border p-4 rounded-lg bg-white">
            <p className="text-center text-gray-600">
              No flights match your filters.
            </p>
            <button
              onClick={() => {
                setCompanyFilter("");
                setPriceMin("");
                setPriceMax("");
                setTempPriceMin("");
                setTempPriceMax("");
                setStopCountFilter("");
              }}
              className="mt-2 block mx-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {finalItineraries.slice(0, visibleCount).map((flight) => {
              const leg = flight.legs[0];

              // Format the legs as required: { origin, destination, date }
              const formattedLegs = flight.legs.map((lg) => ({
                origin: lg.origin.displayCode,        // "LAX", "LOND", etc.
                destination: lg.destination.displayCode,
                date: lg.departure.split("T")[0],     // "YYYY-MM-DD"
              }));

              return (
                <div
                  key={flight.id}
                  className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={leg.carriers.marketing[0].logoUrl}
                          alt={leg.carriers.marketing[0].name}
                          className="w-8 h-8 object-contain"
                        />
                        <span className="font-medium">
                          {leg.carriers.marketing[0].name}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-lg font-bold">
                            {leg.origin.displayCode}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDateTime(leg.departure)}
                          </p>
                          <p className="text-sm">{leg.origin.city}</p>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            {formatDuration(leg.durationInMinutes)}
                          </p>
                          <div className="border-t border-gray-300 my-2"></div>
                          <p className="text-sm text-gray-600">
                            {leg.stopCount === 0
                              ? "Direct"
                              : `${leg.stopCount} stop${
                                  leg.stopCount > 1 ? "s" : ""
                                }`}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold">
                            {leg.destination.displayCode}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDateTime(leg.arrival)}
                          </p>
                          <p className="text-sm">{leg.destination.city}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {flight.price.formatted}
                      </p>

                      {/* Pass itineraryId, legs, and sessionId via state */}
                      <Link
                        to={`/details/${flight.id}`}
                        state={{
                          itineraryId: flight.id,
                          legs: formattedLegs,
                          sessionId: sessionId,
                          price: flight.price,
                        }}
                        className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
                      >
                        Select
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Load More / Show Less */}
      {(finalItineraries.length > visibleCount || extraBatches > 0) && (
        <div className="mt-6 flex justify-center gap-4">
          {finalItineraries.length > visibleCount && (
            <button
              onClick={() => setExtraBatches(extraBatches + 1)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Load More
            </button>
          )}
          {extraBatches > 0 && (
            <button
              onClick={() => setExtraBatches(extraBatches - 1)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FlightResults;
