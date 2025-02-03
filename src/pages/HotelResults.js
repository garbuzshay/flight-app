// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const LOAD_COUNT = 5; // Number of hotels to show initially and to load on each click

// function HotelResults() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Base results from search (assumed to be in response.data.hotels)
//   const [baseHotels, setBaseHotels] = useState([]);
//   // Additional filters: star rating and amenities
//   const [starFilter, setStarFilter] = useState(""); // "", "1", "2", "3", "4", "5"
//   const [amenitiesFilter, setAmenitiesFilter] = useState("");

//   // Final filtered results after applying additional filters
//   const [finalHotels, setFinalHotels] = useState([]);
//   // For load more functionality
//   const [visibleCount, setVisibleCount] = useState(LOAD_COUNT);

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Load initial hotel search results
//   useEffect(() => {
//     const loadResults = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         let response;
//         // Retrieve results from router state if available; otherwise, fallback to localStorage.
//         if (location.state?.searchResults) {
//           response = location.state.searchResults;
//         } else {
//           const stored = localStorage.getItem("hotelSearchResults");
//           if (stored) {
//             response = JSON.parse(stored);
//           } else {
//             throw new Error("No search results found");
//           }
//         }
//         // In our API, hotels are in response.data.hotels
//         setBaseHotels(response.data.hotels || []);
//       } catch (err) {
//         console.error("Error loading hotel results:", err);
//         setError("Unable to load hotel results. Please try searching again.");
//         localStorage.removeItem("hotelSearchResults");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadResults();
//   }, [location.state]);

//   // Apply additional filters (star rating, amenities)
//   useEffect(() => {
//     const applyAdditionalFilters = () => {
//       let filtered = [...baseHotels];

//       filtered = filtered.filter((hotel) => {
//         // Filter by star rating using hotel.stars
//         if (starFilter && hotel.stars !== parseInt(starFilter, 10)) {
//           return false;
//         }

//         // Filter by amenities (if available)
//         // Here we assume that if the hotel object has an amenities property, it's an array of strings.
//         if (amenitiesFilter) {
//           if (
//             !hotel.amenities ||
//             !hotel.amenities.some((amenity) =>
//               amenity.toLowerCase().includes(amenitiesFilter.toLowerCase())
//             )
//           ) {
//             return false;
//           }
//         }
//         return true;
//       });

//       setFinalHotels(filtered);
//       // Reset visible count whenever filters change.
//       setVisibleCount(LOAD_COUNT);
//     };

//     applyAdditionalFilters();
//   }, [baseHotels, starFilter, amenitiesFilter]);

//   // Render loading spinner while data is loading.
//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto p-4">
//         <h2 className="text-2xl font-semibold mb-4">Loading Hotel Results</h2>
//         <div className="flex items-center justify-center p-12">
//           <svg
//             className="animate-spin h-8 w-8 text-blue-600"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//         </div>
//       </div>
//     );
//   }

//   // If there's an error, display it.
//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto p-4">
//         <h2 className="text-2xl font-semibold mb-4">Hotel Search Results</h2>
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <p>{error}</p>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-2 text-blue-600 hover:text-blue-800"
//           >
//             Return to Search
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // If no hotels were loaded at all, show a full-page message.
//   if (baseHotels.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto p-4">
//         <h2 className="text-2xl font-semibold mb-4">Hotel Search Results</h2>
//         <p>No hotels found for your search criteria.</p>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-2 text-blue-600 hover:text-blue-800"
//         >
//           Try Another Search
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl min-h-screen mx-auto p-4">
//       <button
//         onClick={() => navigate("/hotels")}
//         className="mb-4 text-blue-600 hover:text-blue-800"
//       >
//         &larr; Back to Hotel Search
//       </button>

//       <h2 className="text-2xl font-semibold mb-4">Hotel Search Results</h2>
//       <p className="mb-4">
//         Found {baseHotels.length} hotels for your criteria
//       </p>

//       {/* Additional Filters */}
//       <div className="mb-6 p-4 border rounded bg-gray-50">
//         <h3 className="text-lg font-medium mb-2">Additional Filters</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Star Rating Filter */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium">Star Rating</label>
//             <select
//               value={starFilter}
//               onChange={(e) => setStarFilter(e.target.value)}
//               className="border border-gray-300 p-2 rounded"
//             >
//               <option value="">All</option>
//               {[1, 2, 3, 4, 5].map((stars) => (
//                 <option key={stars} value={stars}>
//                   {stars} Stars
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Amenities Filter */}
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium">Amenities</label>
//             <input
//               type="text"
//               placeholder="e.g., WiFi, Pool"
//               value={amenitiesFilter}
//               onChange={(e) => setAmenitiesFilter(e.target.value)}
//               className="border border-gray-300 p-2 rounded"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Hotel Results */}
//       <div className="grid grid-cols-1 gap-4">
//         {finalHotels.slice(0, visibleCount).map((hotel) => (
//           <div
//             key={hotel.hotelId}
//             className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
//           >
//             <div className="flex flex-col md:flex-row md:items-center">
//               {/* Hotel Hero Image */}
//               {hotel.heroImage && (
//                 <div className="mb-4 md:mb-0 md:mr-4">
//                   <img
//                     src={hotel.heroImage}
//                     alt={hotel.name}
//                     className="w-full h-36 object-cover rounded-lg md:w-24 md:h-24"
//                   />
//                 </div>
//               )}
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold">{hotel.name}</h3>
//                 <p className="text-gray-600">{hotel.distance}</p>
//                 <p className="text-sm text-gray-600">
//                   ⭐ {hotel.stars} Stars
//                 </p>
//               </div>
//               <div className="mt-4 md:mt-0 text-right">
//                 <p className="text-2xl font-bold text-blue-600">
//                   {hotel.price}
//                 </p>
//                 <Link
//                   to={`/hotel-details/${hotel.hotelId}`}
//                   state={{ hotelDetails: hotel }}
//                   className="mt-2 block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Load More Button */}
//       {finalHotels.length > visibleCount && (
//         <div className="mt-6 text-center">
//           <button
//             onClick={() => setVisibleCount(visibleCount + LOAD_COUNT)}
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default HotelResults;



import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LOAD_COUNT = 5; // Number of hotels to show initially and to load on each click

function HotelResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // Base results from search (assumed to be in response.data.hotels)
  const [baseHotels, setBaseHotels] = useState([]);
  // Additional filters: star rating and amenities
  const [starFilter, setStarFilter] = useState(""); // "", "1", "2", "3", "4", "5"
  const [amenitiesFilter, setAmenitiesFilter] = useState("");

  // Final filtered results after applying additional filters
  const [finalHotels, setFinalHotels] = useState([]);
  // For load more functionality
  const [visibleCount, setVisibleCount] = useState(LOAD_COUNT);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial hotel search results
  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let response;
        // Retrieve results from router state if available; otherwise, fallback to localStorage.
        if (location.state?.searchResults) {
          response = location.state.searchResults;
        } else {
          const stored = localStorage.getItem("hotelSearchResults");
          if (stored) {
            response = JSON.parse(stored);
          } else {
            throw new Error("No search results found");
          }
        }
        // In our API, hotels are in response.data.hotels
        setBaseHotels(response.data.hotels || []);
      } catch (err) {
        console.error("Error loading hotel results:", err);
        setError("Unable to load hotel results. Please try searching again.");
        localStorage.removeItem("hotelSearchResults");
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [location.state]);

  // Apply additional filters (star rating, amenities)
  useEffect(() => {
    const applyAdditionalFilters = () => {
      let filtered = [...baseHotels];

      filtered = filtered.filter((hotel) => {
        // Filter by star rating using hotel.stars
        if (starFilter && hotel.stars !== parseInt(starFilter, 10)) {
          return false;
        }

        // Filter by amenities (if available)
        // Here we assume that if the hotel object has an amenities property, it's an array of strings.
        if (amenitiesFilter) {
          if (
            !hotel.amenities ||
            !hotel.amenities.some((amenity) =>
              amenity.toLowerCase().includes(amenitiesFilter.toLowerCase())
            )
          ) {
            return false;
          }
        }
        return true;
      });

      setFinalHotels(filtered);
      // Reset visible count whenever filters change.
      setVisibleCount(LOAD_COUNT);
    };

    applyAdditionalFilters();
  }, [baseHotels, starFilter, amenitiesFilter]);

  // Render loading spinner while data is loading.
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Loading Hotel Results</h2>
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  // If there's an error, display it.
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Hotel Search Results</h2>
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

  // If no hotels were loaded at all, show a full-page message.
  if (baseHotels.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Hotel Search Results</h2>
        <p>No hotels found for your search criteria.</p>
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
      <button
        onClick={() => navigate("/hotels")}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        &larr; Back to Hotel Search
      </button>

      <h2 className="text-2xl font-semibold mb-4">Hotel Search Results</h2>
      <p className="mb-4">
        Found {baseHotels.length} hotels for your criteria
      </p>

      {/* Additional Filters */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Additional Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Star Rating Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Star Rating</label>
            <select
              value={starFilter}
              onChange={(e) => setStarFilter(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="">All</option>
              {[1, 2, 3, 4, 5].map((stars) => (
                <option key={stars} value={stars}>
                  {stars} Stars
                </option>
              ))}
            </select>
          </div>
          {/* Amenities Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Amenities</label>
            <input
              type="text"
              placeholder="e.g., WiFi, Pool"
              value={amenitiesFilter}
              onChange={(e) => setAmenitiesFilter(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
        </div>
      </div>

      {/* Hotel Results */}
      <div className="grid grid-cols-1 gap-4">
        {finalHotels.slice(0, visibleCount).map((hotel) => (
          <div
            key={hotel.hotelId}
            className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center">
              {/* Hotel Hero Image */}
              {hotel.heroImage && (
                <div className="mb-4 md:mb-0 md:mr-4">
                  <img
                    src={hotel.heroImage}
                    alt={hotel.name}
                    className="w-full h-36 object-cover rounded-lg md:w-24 md:h-24"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                <p className="text-gray-600">{hotel.distance}</p>
                <p className="text-sm text-gray-600">
                  ⭐ {hotel.stars} Stars
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-2xl font-bold text-blue-600">
                  {hotel.price}
                </p>
                <Link
                  to={`/hotel-details/${hotel.hotelId}`}
                  state={{ hotelDetails: hotel }}
                  className="mt-2 block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More / Show Less Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        {finalHotels.length > visibleCount && (
          <button
            onClick={() => setVisibleCount(visibleCount + LOAD_COUNT)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Load More
          </button>
        )}
        {visibleCount > LOAD_COUNT && (
          <button
            onClick={() => setVisibleCount(LOAD_COUNT)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}

export default HotelResults;
