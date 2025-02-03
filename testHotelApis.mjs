// // testHotelApis.mjs
// import {
//     searchDestinationOrHotel,
//     searchHotels,
//     getHotelDetails,
//     getHotelPrices,
//     getHotelReviews,
//     getSimilarHotels,
//     getNearbyHotels,
//   } from './src/services/hotelApi.js';
  
//   async function runHotelTests() {
//     try {
//       console.log('--- Test: searchDestinationOrHotel ---');
//       const destinationOrHotel = await searchDestinationOrHotel('New York');
//       console.log('searchDestinationOrHotel result:\n', destinationOrHotel, '\n');
  
//       console.log('--- Test: searchHotels ---');
//       // Adjust parameters as needed (e.g., use a valid entity ID for New York)
//       const hotelsSearch = await searchHotels('27537542', '2024-12-01', '2024-12-02', 1, 1);
//       console.log('searchHotels result:\n', hotelsSearch, '\n');
  
//       console.log('--- Test: getHotelDetails ---');
//       // Replace with a valid hotel ID and entity ID from your search results
//       const hotelDetails = await getHotelDetails('106005202', '27537542');
//       console.log('getHotelDetails result:\n', hotelDetails, '\n');
  
//       console.log('--- Test: getHotelPrices ---');
//       // Replace with valid hotel ID and entity ID; adjust check-in/out dates as needed.
//       const hotelPrices = await getHotelPrices('106005202', '27537542', '2024-12-01', '2024-12-02', 1, 1);
//       console.log('getHotelPrices result:\n', hotelPrices, '\n');
  
//       console.log('--- Test: getHotelReviews ---');
//       // Replace with a valid hotel ID.
//       const hotelReviews = await getHotelReviews('106005202');
//       console.log('getHotelReviews result:\n', hotelReviews, '\n');
  
//       console.log('--- Test: getSimilarHotels ---');
//       // Replace with valid parameters for a known hotel.
//       const similarHotels = await getSimilarHotels('106005202', '2024-12-01', '2024-12-02', 1, 1);
//       console.log('getSimilarHotels result:\n', similarHotels, '\n');
  
//       console.log('--- Test: getNearbyHotels ---');
//       // Replace with appropriate cityId, latitude, and longitude (e.g., for New York).
//       const nearbyHotels = await getNearbyHotels('27537542', 40.758144, -73.975359);
//       console.log('getNearbyHotels result:\n', nearbyHotels, '\n');
  
//       console.log('All hotel tests finished.');
//     } catch (error) {
//       console.error('Error running hotel tests:', error);
//     }
//   }
  
//   runHotelTests();
  
// testHotelApis.mjs
import {
    searchDestinationOrHotel,
    searchHotels,
    getHotelDetails,
    getHotelPrices,
    getHotelReviews,
    getSimilarHotels,
  } from "./src/services/hotelApi.js";
  
  // Helper function to get a future date (n days from now)
  function getFutureDate(daysAhead = 1) {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString().split("T")[0];
  }
  
  async function runHotelTests() {
    try {
      console.log("--- Test: searchDestinationOrHotel ---");
      const destinationOrHotel = await searchDestinationOrHotel("New York");
      console.log("searchDestinationOrHotel result:\n", destinationOrHotel, "\n");
  
      console.log("--- Test: searchHotels ---");
      // Use future dates to avoid "checkin in the past" errors.
      const checkIn = getFutureDate(1);
      const checkOut = getFutureDate(2);
      // Use a valid entityId for New York (for example, "27537542").
      const hotelsSearch = await searchHotels("204222293", checkIn, checkOut, 1, 1);
      console.log("searchHotels result:\n", hotelsSearch, "\n");
  
      console.log("--- Test: getHotelDetails ---");
      // Replace with a valid hotelId and entityId from your search results.
      const hotelDetails = await getHotelDetails("106005202", "27537542");
      console.log("getHotelDetails result:\n", hotelDetails, "\n");
  
      console.log("--- Test: getHotelPrices ---");
      const hotelPrices = await getHotelPrices("106005202", "27537542", checkIn, checkOut, 1, 1);
      console.log("getHotelPrices result:\n", hotelPrices, "\n");
  
      console.log("--- Test: getHotelReviews ---");
      const hotelReviews = await getHotelReviews("106005202");
      console.log("getHotelReviews result:\n", hotelReviews, "\n");
  
      console.log("--- Test: getSimilarHotels ---");
      const similarHotels = await getSimilarHotels("106005202", checkIn, checkOut, 1, 1);
      console.log("getSimilarHotels result:\n", similarHotels, "\n");
  
      console.log("All hotel tests finished.");
    } catch (error) {
      console.error("Error running hotel tests:", error);
    }
  }
  
  runHotelTests();
  