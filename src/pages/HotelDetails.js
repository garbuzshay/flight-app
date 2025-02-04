import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getHotelDetails } from "../services/hotelApi";

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function calculateNights(checkIn, checkOut) {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diffTime = Math.abs(outDate - inDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function parsePrice(price) {
  if (typeof price === "number") return price;
  const numeric = price.replace(/[^0-9.]/g, "");
  return parseFloat(numeric);
}

function HotelDetails() {
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [hotelDetails, setHotelDetails] = useState(
    location.state?.hotelDetails || null
  );
  const searchParams = location.state?.searchParams || {};
  const [loading, setLoading] = useState(!hotelDetails);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHotelDetails() {
      if (!hotelDetails) {
        setLoading(true);
        setError(null);
        try {
          const entityId = "27537542";
          const data = await getHotelDetails(hotelId, entityId);
          setHotelDetails(data.data);
        } catch (err) {
          console.error("Error fetching hotel details:", err);
          setError("Unable to fetch hotel details. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    }
    fetchHotelDetails();
  }, [hotelDetails, hotelId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!hotelDetails) {
    return <div className="min-h-screen bg-gray-50 p-6 text-center">No hotel details found.</div>;
  }

  let nights = 1;
  let totalPrice = hotelDetails.price;
  if (searchParams.checkInDate && searchParams.checkOutDate) {
    nights = calculateNights(searchParams.checkInDate, searchParams.checkOutDate);
    const pricePerNight = parsePrice(hotelDetails.price);
    totalPrice = pricePerNight * nights;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>&larr;</span>
          <span>Back to Search Results</span>
        </button>

        <div className="relative h-[40vh] rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={hotelDetails.heroImage}
            alt={hotelDetails.name}
            className="absolute inset-0 w-full h- object-cover"
          />
          {/* Dark gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          {/* Hotel info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {hotelDetails.name}
              </h1>
              <p className="text-xl text-gray-200 drop-shadow-md">
                {hotelDetails.distance || "Location details not available"}
              </p>
              {searchParams.checkInDate && searchParams.checkOutDate && (
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 inline-block">
                  <p className="text-lg">
                    <span className="font-medium">Check-in:</span> {formatDateTime(searchParams.checkInDate)}
                    <span className="mx-3">|</span>
                    <span className="font-medium">Check-out:</span> {formatDateTime(searchParams.checkOutDate)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Rating Section */}
            {hotelDetails.rating && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {hotelDetails.rating.value}/10
                    </h3>
                    <p className="text-gray-600">{hotelDetails.rating.description}</p>
                  </div>
                  {hotelDetails.reviewSummary && (
                    <div className="text-right">
                      <p className="text-lg font-medium">{hotelDetails.reviewSummary.count}</p>
                      <p className="text-gray-600">Reviews</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Amenities Section */}
            {hotelDetails.amenities && hotelDetails.amenities.content && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {hotelDetails.amenities.content.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing Card - Fixed on Desktop */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Price Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Per night</span>
                  <span className="text-xl font-bold">{hotelDetails.price}</span>
                </div>
                {searchParams.checkInDate && searchParams.checkOutDate && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Nights</span>
                      <span className="text-xl">{nights}</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold text-blue-600">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;