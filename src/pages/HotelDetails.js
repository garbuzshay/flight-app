// src/pages/HotelDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getHotelDetails } from "../services/hotelApi";

function HotelDetails() {
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Attempt to use hotel details from router state first.
  const [hotelDetails, setHotelDetails] = useState(
    location.state?.hotelDetails || null
  );
  const [loading, setLoading] = useState(!hotelDetails);
  const [error, setError] = useState(null);

  // If details are not passed via state, fetch them from the API.
  useEffect(() => {
    const fetchHotelDetails = async () => {
      if (!hotelDetails) {
        setLoading(true);
        setError(null);
        try {
          // Replace the placeholder entityId with the correct value if available.
          const entityId = "27537542"; // Update as needed.
          const data = await getHotelDetails(hotelId, entityId);
          setHotelDetails(data.data); // Assuming your API returns { data: { ... } }
        } catch (err) {
          console.error("Error fetching hotel details:", err);
          setError("Unable to fetch hotel details. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHotelDetails();
  }, [hotelDetails, hotelId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Loading Hotel Details</h2>
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

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Hotel Details</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:text-blue-800 transition-colors"
      >
        &larr; Back to Results
      </button>

      {/* Hero Image Banner */}
      {hotelDetails.heroImage && (
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-6">
          <img
            src={hotelDetails.heroImage}
            alt={hotelDetails.name}
            className="absolute inset-0 object-cover w-full h-full transform scale-105 transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold">{hotelDetails.name}</h2>
            <p className="mt-1 text-sm md:text-lg">
              {hotelDetails.distance || "Location details not available"}
            </p>
          </div>
        </div>
      )}

      {/* Details Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 text-sm mb-1">
              ⭐ {hotelDetails.stars} Stars
            </p>
            <p className="text-2xl font-bold text-blue-600 mb-3">
              Price: {hotelDetails.price}
            </p>
            {hotelDetails.rating && (
              <div className="mb-3">
                <p className="font-medium">
                  Rating: {hotelDetails.rating.value} -{" "}
                  {hotelDetails.rating.description}
                </p>
                {hotelDetails.reviewSummary && (
                  <p className="text-sm text-gray-600">
                    {hotelDetails.reviewSummary.count} reviews
                  </p>
                )}
              </div>
            )}
            {hotelDetails.location && (
              <p className="text-gray-600 mb-3">
                Address:{" "}
                {hotelDetails.location.shortAddress ||
                  hotelDetails.location.address}
              </p>
            )}
          </div>
          <div>
            {hotelDetails.amenities && hotelDetails.amenities.content && (
              <div>
                <h4 className="text-lg font-bold mb-2">Amenities</h4>
                <ul className="list-disc list-inside space-y-1">
                  {hotelDetails.amenities.content.map((amenity, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
