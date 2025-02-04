// import React, { useEffect, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getFlightDetails } from "../services/flightApi";

// // Helper functions for formatting
// function formatDateTime(dateTimeStr) {
//   const date = new Date(dateTimeStr);
//   return date.toLocaleString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// function formatDuration(minutes) {
//   const hours = Math.floor(minutes / 60);
//   const mins = minutes % 60;
//   return `${hours}h ${mins}m`;
// }

// function FlightDetails() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   // Destructure passed state from the search results
//   const { itineraryId, legs, sessionId, price } = state || {};

//   // Local state for details, loading, and errors
//   const [details, setDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch flight details on mount (if parameters exist)
//   useEffect(() => {
//     if (!itineraryId || !legs || !sessionId) {
//       setError("Missing flight details or session info.");
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);
//     getFlightDetails(legs, itineraryId, sessionId)
//       .then((response) => {
//         setDetails(response);
//       })
//       .catch((err) => {
//         console.error("Error fetching flight details:", err);
//         setError("Failed to fetch flight details.");
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [itineraryId, legs, sessionId]);

//   // Unconditionally define defaults for later use
//   const itinerary = details?.data?.itinerary || {};
//   const mainLeg =
//     itinerary.legs && itinerary.legs.length > 0 ? itinerary.legs[0] : null;

//   // Format segments if available
//   const formattedSegments = useMemo(() => {
//     if (!mainLeg || !mainLeg.segments) return [];
//     return mainLeg.segments.map((segment) => ({
//       origin: segment.origin.displayCode,
//       destination: segment.destination.displayCode,
//       departure: formatDateTime(segment.departure),
//       arrival: formatDateTime(segment.arrival),
//       flightNumber: segment.flightNumber,
//       airline: segment.marketingCarrier?.name,
//     }));
//   }, [mainLeg]);

//   // Show skeleton/loading state
//   if (isLoading) {
//     return (
//       <div className="p-4">
//         <p>Loading Flight Details...</p>
//         <div className="animate-pulse space-y-4 mt-4">
//           <div className="h-6 bg-gray-300 rounded w-1/2"></div>
//           <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//           <div className="h-4 bg-gray-300 rounded w-full"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         <p className="text-red-600">{error}</p>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-2 text-blue-600 hover:text-blue-800"
//         >
//           Return to Search
//         </button>
//       </div>
//     );
//   }

//   if (!details || !details.data?.itinerary) {
//     return <div className="p-4">No flight details found.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">Flight Details</h2>

//       {/* Display the price immediately if available from the search */}

//       {mainLeg && (
//         <div className="border p-4 rounded bg-white shadow-sm">
//           <h3 className="text-lg font-bold mb-2">
//             {mainLeg.origin.displayCode} → {mainLeg.destination.displayCode}
//           </h3>
//           <p className="text-gray-600">
//             Depart: <strong>{formatDateTime(mainLeg.departure)}</strong>
//           </p>
//           <p className="text-gray-600">
//             Arrive: <strong>{formatDateTime(mainLeg.arrival)}</strong>
//           </p>
//           <p className="text-gray-600">
//             Duration: <strong>{formatDuration(mainLeg.duration)}</strong>
//           </p>
//           <p className="text-gray-600">
//             Stops:{" "}
//             <strong>
//               {mainLeg.stopCount === 0
//                 ? "Direct"
//                 : `${mainLeg.stopCount} stop${
//                     mainLeg.stopCount > 1 ? "s" : ""
//                   }`}
//             </strong>
//           </p>
//           {price && (
//             <div className="my-4">
//               <h3 className="text-lg font-medium">
//                 Price: {price.formatted || `$${price}`}{" "}
//               </h3>
//             </div>
//           )}
//           {formattedSegments.length > 0 && (
//             <div className="mt-4">
//               <p className="font-medium mb-1">Segments:</p>
//               {formattedSegments.map((segment, idx) => (
//                 <div key={idx} className="text-sm mb-2">
//                   <strong>{segment.origin}</strong> ({segment.departure}) →{" "}
//                   <strong>{segment.destination}</strong> ({segment.arrival})
//                   <br />
//                   Flight Number: {segment.flightNumber} <br />
//                   Airline: {segment.airline}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       <button
//         onClick={() => navigate(-1)}
//         className="my-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Back to Flights
//       </button>

//       {/* Pricing Options from details if available */}
//       {itinerary.pricingOptions && itinerary.pricingOptions.length > 0 ? (
//         <div className="border p-4 rounded bg-white shadow-sm">
//           <h3 className="text-lg font-bold mb-2">Pricing & Booking Options</h3>
//           <ul className="space-y-3">
//             {itinerary.pricingOptions.map((option) => (
//               <li
//                 key={option.id}
//                 className="p-3 border rounded hover:shadow transition"
//               >
//                 <p className="text-xl font-semibold text-blue-700">
//                   ${option.totalPrice?.toFixed(2)}
//                 </p>
//                 {option.agents?.map((agent) => (
//                   <div key={agent.id} className="mt-2 text-sm">
//                     <p className="font-medium">{agent.name}</p>
//                     <p>Price: {agent.price && `$${agent.price.toFixed(2)}`}</p>
//                     {agent.url && (
//                       <a
//                         href={agent.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-block mt-1 text-blue-600 hover:underline"
//                       >
//                         Book on {agent.name}
//                       </a>
//                     )}
//                   </div>
//                 ))}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p className="text-gray-600 mt-2">
//           No pricing options available for this flight.
//         </p>
//       )}
//     </div>
//   );
// }

// export default FlightDetails;
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFlightDetails } from "../services/flightApi";

// Helper functions for formatting
function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function FlightDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Destructure passed state from the search results
  // presentation is expected to be an object like { title: "New York", subtitle: "United States" }
  const { itineraryId, legs, sessionId, price } = state || {};

  // Local state for details, loading, and errors
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch flight details on mount (if parameters exist)
  useEffect(() => {
    if (!itineraryId || !legs || !sessionId) {
      setError("Missing flight details or session info.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getFlightDetails(legs, itineraryId, sessionId)
      .then((response) => {
        setDetails(response);
      })
      .catch((err) => {
        console.error("Error fetching flight details:", err);
        setError("Failed to fetch flight details.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [itineraryId, legs, sessionId]);

  // Unconditionally define defaults for later use
  const itinerary = details?.data?.itinerary || {};
  const mainLeg =
    itinerary.legs && itinerary.legs.length > 0 ? itinerary.legs[0] : null;

  // Format segments if available: include display code and city names
  const formattedSegments = useMemo(() => {
    if (!mainLeg || !mainLeg.segments) return [];
    return mainLeg.segments.map((segment) => ({
      origin: segment.origin.displayCode,
      originCity: segment.origin.city, // full city name for origin
      destination: segment.destination.displayCode,
      destinationCity: segment.destination.city, // full city name for destination
      departure: formatDateTime(segment.departure),
      arrival: formatDateTime(segment.arrival),
      flightNumber: segment.flightNumber,
      airline: segment.marketingCarrier?.name,
    }));
  }, [mainLeg]);

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4">
        <p className="text-xl mb-4">Loading Flight Details...</p>
        <div className="animate-pulse space-y-4 mt-4">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Return to Search
        </button>
      </div>
    );
  }

  if (!details || !details.data?.itinerary) {
    return <div className="p-4">No flight details found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Flight Details</h2>

      {/* Flight Route Card */}
      {mainLeg && (
        <div className="border p-4 rounded bg-white shadow-sm">
          <div className="space-y-1 pb-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-gray-900">
                {mainLeg.origin.displayCode}
              </span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-900">
                {mainLeg.destination.displayCode}
              </span>
            </h3>
            <div className="text-sm text-gray-600">
              <span>{mainLeg.origin.name}</span>
              <span className="mx-2">→</span>
              <span>{mainLeg.destination.name}</span>
            </div>
          </div>
          <p className="text-gray-600">
            Depart: <strong>{formatDateTime(mainLeg.departure)}</strong>
          </p>
          <p className="text-gray-600">
            Arrive: <strong>{formatDateTime(mainLeg.arrival)}</strong>
          </p>
          <p className="text-gray-600">
            Duration: <strong>{formatDuration(mainLeg.duration)}</strong>
          </p>
          <p className="text-gray-600">
            Stops:{" "}
            <strong>
              {mainLeg.stopCount === 0
                ? "Direct"
                : `${mainLeg.stopCount} stop${mainLeg.stopCount > 1 ? "s" : ""}`}
            </strong>
          </p>
          {price && (
            <div className="my-4">
              <h3 className="text-lg font-medium">
                Price: {price.formatted || `$${price}`}
              </h3>
            </div>
          )}
          {formattedSegments.length > 0 && (
            <div className="mt-4">
              <p className="font-medium mb-1">Segments:</p>
              {formattedSegments.map((segment, idx) => (
                <div key={idx} className="text-sm mb-3 border-b pb-2">
                  <div>
                    <strong>{segment.origin}</strong> ({segment.originCity}){" "}
                    → <strong>{segment.destination}</strong> (
                    {segment.destinationCity})
                  </div>
                  <div className="mt-1 text-gray-600">
                    {segment.departure} → {segment.arrival}
                  </div>
                  <div className="mt-1">
                    Flight Number: <strong>{segment.flightNumber}</strong>
                    <br />
                    Airline: <strong>{segment.airline}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="my-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Flights
      </button>

      {/* Pricing Options Section */}
      {itinerary.pricingOptions && itinerary.pricingOptions.length > 0 ? (
        <div className="border p-4 rounded bg-white shadow-sm">
          <h3 className="text-lg font-bold mb-2">Pricing & Booking Options</h3>
          <ul className="space-y-3">
            {itinerary.pricingOptions.map((option) => (
              <li
                key={option.id}
                className="p-3 border rounded hover:shadow transition"
              >
                <p className="text-xl font-semibold text-blue-700">
                  ${option.totalPrice?.toFixed(2)}
                </p>
                {option.agents?.map((agent) => (
                  <div key={agent.id} className="mt-2 text-sm">
                    <p className="font-medium">{agent.name}</p>
                    <p>Price: {agent.price && `$${agent.price.toFixed(2)}`}</p>
                    {agent.url && (
                      <a
                        href={agent.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-1 text-blue-600 hover:underline"
                      >
                        Book on {agent.name}
                      </a>
                    )}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-600 mt-2">
          No pricing options available for this flight.
        </p>
      )}
    </div>
  );
}

export default FlightDetails;
