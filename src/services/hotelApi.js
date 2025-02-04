import axios from "axios";

// const RAPIDAPI_KEY = "ad5348c7d3mshb6e9370e8e1586fp126542jsnbe9150a269af";
// const RAPIDAPI_HOST = "sky-scrapper.p.rapidapi.com";

const RAPIDAPI_KEY = '0b92a659c0mshcb21b579996d88ep1e38bbjsn3e005347a349';
const RAPIDAPI_HOST = 'sky-scrapper.p.rapidapi.com';
const HEADERS = {
  "x-rapidapi-key": RAPIDAPI_KEY,
  "x-rapidapi-host": RAPIDAPI_HOST,
};

// ----------------------------------------------------------
// Search for a destination or specific hotel
// ----------------------------------------------------------
export async function searchDestinationOrHotel(query) {
  const url = `https://${RAPIDAPI_HOST}/api/v1/hotels/searchDestinationOrHotel`;
  try {
    const response = await axios.get(url, {
      headers: HEADERS,
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error in searchDestinationOrHotel:", error);
    throw error;
  }
}

// ----------------------------------------------------------
// Search for hotels in a destination
// ----------------------------------------------------------
// export async function searchHotels(locationEntityId, checkIn, checkOut, adults = 1, rooms = 1) {
//   const url = `https://${RAPIDAPI_HOST}/api/v1/hotels/searchHotels`;
//   try {
//     const response = await axios.get(url, {
//       headers: HEADERS,
//       params: {
//         entityId: locationEntityId,
//         checkin: checkIn,
//         checkout: checkOut,
//         adults: adults.toString(),
//         rooms: rooms.toString(),
//         limit: "30",
//         sorting: "-relevance",
//         currency: "USD",
//         market: "en-US",
//         countryCode: "US",
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error("Error in searchHotels:", error);
//     throw error;
//   }
// }
export async function searchHotels(locationEntityId, checkIn, checkOut, adults = 1, rooms = 1) {
    const url = `https://${RAPIDAPI_HOST}/api/v1/hotels/searchHotels`;
    try {
      const response = await axios.get(url, {
        headers: HEADERS,
        params: {
          entityId: locationEntityId,
          checkin: checkIn,
          checkout: checkOut,
          adults: adults.toString(),
          rooms: rooms.toString(),
          limit: "30",
          sorting: "-relevance",
          currency: "USD",
          market: "en-US",
          countryCode: "US",
        },
        responseType: "text" // Ensure we get a text response to parse as JSON
      });
      const data = JSON.parse(response.data);
      return data;
    } catch (error) {
      console.error("Error in searchHotels:", error);
      throw error;
    }
  }
// ----------------------------------------------------------
// Get hotel details
// ----------------------------------------------------------
export async function getHotelDetails(hotelId, entityId) {
  const url = `https://${RAPIDAPI_HOST}/api/v1/hotels/getHotelDetails`;
  try {
    const response = await axios.get(url, {
      headers: HEADERS,
      params: {
        hotelId,
        entityId,
        currency: "USD",
        market: "en-US",
        countryCode: "US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getHotelDetails:", error);
    throw error;
  }
}

// ----------------------------------------------------------
// Get hotel prices
// ----------------------------------------------------------
export async function getHotelPrices(hotelId, entityId, checkIn, checkOut, adults = 1, rooms = 1) {
  const url = `https://${RAPIDAPI_HOST}/api/v1/hotels/getHotelPrices`;
  try {
    const response = await axios.get(url, {
      headers: HEADERS,
      params: {
        hotelId,
        entityId,
        checkin: checkIn,
        checkout: checkOut,
        adults: adults.toString(),
        rooms: rooms.toString(),
        currency: "USD",
        market: "en-US",
        countryCode: "US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getHotelPrices:", error);
    throw error;
  }
}

// ----------------------------------------------------------
// Get hotel reviews
// ----------------------------------------------------------
export async function getHotelReviews(hotelId) {
  const url = `https://${RAPIDAPI_HOST}/api/v1/hotels/getHotelReviews`;
  try {
    const response = await axios.get(url, {
      headers: HEADERS,
      params: {
        hotelId,
        currency: "USD",
        market: "en-US",
        countryCode: "US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getHotelReviews:", error);
    throw error;
  }
}

// ----------------------------------------------------------
// Get similar hotels
// ----------------------------------------------------------
export async function getSimilarHotels(hotelId, checkIn, checkOut, adults = 1, rooms = 1) {
  const url = `https://${RAPIDAPI_HOST}/api/v1/hotels/similarHotels`;
  try {
    const response = await axios.get(url, {
      headers: HEADERS,
      params: {
        hotelId,
        checkin: checkIn,
        checkout: checkOut,
        adults: adults.toString(),
        rooms: rooms.toString(),
        currency: "USD",
        market: "en-US",
        countryCode: "US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getSimilarHotels:", error);
    throw error;
  }
}

// ----------------------------------------------------------
// Find hotels nearby a location on a map
// ----------------------------------------------------------
export async function getNearbyHotels(cityId, latitude, longitude) {
  const url = `https://${RAPIDAPI_HOST}/api/v1/hotels/nearbyMap`;
  try {
    const response = await axios.get(url, {
      headers: HEADERS,
      params: {
        cityId,
        latitude,
        longitude,
        currency: "USD",
        market: "en-US",
        countryCode: "US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getNearbyHotels:", error);
    throw error;
  }
}
