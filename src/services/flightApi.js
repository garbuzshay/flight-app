// import axios from 'axios';

// const RAPIDAPI_KEY = 'ad5348c7d3mshb6e9370e8e1586fp126542jsnbe9150a269af';
// const RAPIDAPI_HOST = 'sky-scrapper.p.rapidapi.com';

// const HEADERS = {
//   'x-rapidapi-key': RAPIDAPI_KEY,
//   'x-rapidapi-host': RAPIDAPI_HOST,
// };



// // ----------------------------------------------------------
// // Search for an airport by query
// // ----------------------------------------------------------
// export async function searchAirport(query) {
//   const url = `https://${RAPIDAPI_HOST}/api/v1/flights/searchAirport?query=${query}&locale=en-US`;
//   try {
//     const response = await axios.get(url, {
//       headers: HEADERS,
//       responseType: 'text',
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error in searchAirport:', error);
//     throw error;
//   }
// }

// // ----------------------------------------------------------
// // Get near-by airports
// // ----------------------------------------------------------
// export async function getNearByAirports(lat, lng) {
//   const url = `https://${RAPIDAPI_HOST}/api/v1/flights/getNearByAirports?lat=${lat}&lng=${lng}&locale=en-US`;
//   try {
//     const response = await axios.get(url, {
//       headers: HEADERS,
//       responseType: 'text', // Tells axios we want a text response
//     });
//     return response.data; // Return plain text (like .text() in fetch)
//   } catch (error) {
//     console.error('Error in getNearByAirports:', error);
//     throw error;
//   }
// }


// // ----------------------------------------------------------
// // Search flights (Complete version)
// // ----------------------------------------------------------
// export async function searchFlightsComplete(originSkyId, destinationSkyId, date) {
//   const url = `https://${RAPIDAPI_HOST}/api/v2/flights/searchFlightsComplete?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=27544008&destinationEntityId=27537542&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US&date=${date}`;
//   try {
//     const response = await axios.get(url, {
//       headers: HEADERS,
//       responseType: 'text',
//     });
//     // return response.data;
//     const data = JSON.parse(response.data);
//     return data;
//   } catch (error) {
//     console.error('Error in searchFlightsComplete:', error);
//     throw error;
//   }
// }


// // ----------------------------------------------------------
// // Get flight details
// // ----------------------------------------------------------
// export async function getFlightDetails(legs) {
//   const encodedLegs = encodeURIComponent(JSON.stringify(legs));
//   const url = `https://${RAPIDAPI_HOST}/api/v1/flights/getFlightDetails?legs=${encodedLegs}&adults=1&currency=USD&locale=en-US&market=en-US&cabinClass=economy&countryCode=US`;
//   try {
//     const response = await axios.get(url, {
//       headers: HEADERS,
//       responseType: 'text',
//     });
//     // return response.data;
//     const data = JSON.parse(response.data);
//     return data;
//   } catch (error) {
//     console.error('Error in getFlightDetails:', error);
//     throw error;
//   }
// }

// // ----------------------------------------------------------
// // Get price calendar
// // ----------------------------------------------------------
// export async function getPriceCalendar(originSkyId, destinationSkyId, fromDate) {
//   const url = `https://${RAPIDAPI_HOST}/api/v1/flights/getPriceCalendar?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&fromDate=${fromDate}&currency=USD`;
//   try {
//     const response = await axios.get(url, {
//       headers: HEADERS,
//       responseType: 'text',
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error in getPriceCalendar:', error);
//     throw error;
//   }
// }

// // ----------------------------------------------------------
// // Search flights with multiple stops
// // ----------------------------------------------------------
// export async function searchFlightsMultiStops(legs) {
//   const encodedLegs = encodeURIComponent(JSON.stringify(legs));
//   const url = `https://${RAPIDAPI_HOST}/api/v1/flights/searchFlightsMultiStops?legs=${encodedLegs}&cabinClass=economy&adults=1&sortBy=best&currency=USD&countryCode=US&market=en-US`;
//   try {
//     const response = await axios.get(url, {
//       headers: HEADERS,
//       responseType: 'text',
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error in searchFlightsMultiStops:', error);
//     throw error;
//   }
// }

// // ----------------------------------------------------------
// // Search flights "Everywhere"
// // ----------------------------------------------------------
// export async function searchFlightEverywhere(originEntityId) {
//   const url = `https://${RAPIDAPI_HOST}/api/v2/flights/searchFlightEverywhere?originEntityId=${originEntityId}&cabinClass=economy&journeyType=one_way&currency=USD`;
//   try {
//     const response = await axios.get(url, {
//       headers: HEADERS,
//       responseType: 'text',
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error in searchFlightEverywhere:', error);
//     throw error;
//   }
// }

// // ----------------------------------------------------------
// // Another "Everywhere" search variant
// // ----------------------------------------------------------
// export async function searchFlightEverywhereV1() {
//   const url = `https://${RAPIDAPI_HOST}/api/v1/flights/searchFlightEverywhere?currency=USD&market=en-US&countryCode=US`;
//   try {
//     const response = await axios.get(url, {
//       headers: HEADERS,
//       responseType: 'text',
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error in searchFlightEverywhereV1:', error);
//     throw error;
//   }
// }

// // ----------------------------------------------------------
// // Another web-based complete search
// // ----------------------------------------------------------
// export async function searchFlightsWebComplete(originSkyId, destinationSkyId) {
//   const url = `https://${RAPIDAPI_HOST}/api/v2/flights/searchFlightsWebComplete?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=95565058&destinationEntityId=95673821&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US`;
//   try {
//     const response = await axios.get(url, {
//       headers: HEADERS,
//       responseType: 'text',
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error in searchFlightsWebComplete:', error);
//     throw error;
//   }
// }


// export async function searchFlightV2(
//   originSkyId,
//   destinationSkyId,
//   originEntityId,
//   destinationEntityId,
//   date,
//   returnDate = "",
//   cabinClass = "economy",
//   adults = 1,
//   sortBy = "best",
//   currency = "USD",
//   market = "en-US",
//   countryCode = "US"
// ) {
//   const params = {
//     originSkyId,
//     destinationSkyId,
//     originEntityId,
//     destinationEntityId,
//     cabinClass,
//     adults,
//     sortBy,
//     currency,
//     market,
//     countryCode,
//     date,
//   };

//   // Include returnDate only if provided
//   if (returnDate) {
//     params.returnDate = returnDate;
//   }

//   const url = `https://${RAPIDAPI_HOST}/api/v2/flights/searchFlights`;

//   try {
//     const response = await axios.get(url, {
//       headers: HEADERS,
//       params,
//       responseType: "json",
//     });
    
//     return response.data;
//   } catch (error) {
//     console.error("Error in searchFlightV2:", error);
//     throw error;
//   }
// }




import axios from 'axios';

const RAPIDAPI_KEY = '0b92a659c0mshcb21b579996d88ep1e38bbjsn3e005347a349';
const RAPIDAPI_HOST = 'sky-scrapper.p.rapidapi.com';
// const RAPIDAPI_KEY = 'ad5348c7d3mshb6e9370e8e1586fp126542jsnbe9150a269af';
// const RAPIDAPI_HOST = 'sky-scrapper.p.rapidapi.com';

const HEADERS = {
  'x-rapidapi-key': RAPIDAPI_KEY,
  'x-rapidapi-host': RAPIDAPI_HOST,
};

async function fetchData(url, params = {}) {
  try {
    const response = await axios.get(url, {
      headers: HEADERS,
      params,
      responseType: "json", // Ensures we always receive JSON
    });

    return response.data;
  } catch (error) {
    console.error(`❌ Error in API call: ${url}`, error);
    throw error;
  }
}

// ----------------------------------------------------------
// Search for an airport by query
// ----------------------------------------------------------
export function searchAirport(query) {
  return fetchData(`https://${RAPIDAPI_HOST}/api/v1/flights/searchAirport`, { query, locale: "en-US" });
}

// ----------------------------------------------------------
// Get near-by airports
// ----------------------------------------------------------
export function getNearByAirports(lat, lng) {
  return fetchData(`https://${RAPIDAPI_HOST}/api/v1/flights/getNearByAirports`, { lat, lng, locale: "en-US" });
}

// ----------------------------------------------------------
// Search flights (Complete version)
// ----------------------------------------------------------
export function searchFlightsComplete(originSkyId, destinationSkyId, date) {
  return fetchData(`https://${RAPIDAPI_HOST}/api/v2/flights/searchFlightsComplete`, {
    originSkyId,
    destinationSkyId,
    originEntityId: "27544008",
    destinationEntityId: "27537542",
    cabinClass: "economy",
    adults: 1,
    sortBy: "best",
    currency: "USD",
    market: "en-US",
    countryCode: "US",
    date,
  });
}

// ----------------------------------------------------------
// Get flight details
// ----------------------------------------------------------
// export function getFlightDetails(legs) {
//   return fetchData(`https://${RAPIDAPI_HOST}/api/v1/flights/getFlightDetails`, {
//     legs: JSON.stringify(legs),
//     adults: 1,
//     currency: "USD",
//     locale: "en-US",
//     market: "en-US",
//     cabinClass: "economy",
//     countryCode: "US",
//   });
// }
export function getFlightDetails(legs, itineraryId, sessionId) {
  return fetchData(`https://${RAPIDAPI_HOST}/api/v1/flights/getFlightDetails`, {
    legs: JSON.stringify(legs),
    itineraryId,  // Add the itineraryId param
    sessionId,    // Add the sessionId param
    adults: 1,
    currency: "USD",
    locale: "en-US",
    market: "en-US",
    cabinClass: "economy",
    countryCode: "US",
  });
}

// ----------------------------------------------------------
// Get price calendar
// ----------------------------------------------------------
export function getPriceCalendar(originSkyId, destinationSkyId, fromDate) {
  return fetchData(`https://${RAPIDAPI_HOST}/api/v1/flights/getPriceCalendar`, {
    originSkyId,
    destinationSkyId,
    fromDate,
    currency: "USD",
  });
}

// ----------------------------------------------------------
// Search flights with multiple stops
// ----------------------------------------------------------
export function searchFlightsMultiStops(legs) {
  return fetchData(`https://${RAPIDAPI_HOST}/api/v1/flights/searchFlightsMultiStops`, {
    legs: JSON.stringify(legs),
    cabinClass: "economy",
    adults: 1,
    sortBy: "best",
    currency: "USD",
    countryCode: "US",
    market: "en-US",
  });
}

// ----------------------------------------------------------
// Search flights "Everywhere"
// ----------------------------------------------------------
export function searchFlightEverywhere(originEntityId) {
  return fetchData(`https://${RAPIDAPI_HOST}/api/v2/flights/searchFlightEverywhere`, {
    originEntityId,
    cabinClass: "economy",
    journeyType: "one_way",
    currency: "USD",
  });
}

// ----------------------------------------------------------
// Another "Everywhere" search variant
// ----------------------------------------------------------
export function searchFlightEverywhereV1() {
  return fetchData(`https://${RAPIDAPI_HOST}/api/v1/flights/searchFlightEverywhere`, {
    currency: "USD",
    market: "en-US",
    countryCode: "US",
  });
}

// ----------------------------------------------------------
// Another web-based complete search
// ----------------------------------------------------------
export function searchFlightsWebComplete(originSkyId, destinationSkyId) {
  return fetchData(`https://${RAPIDAPI_HOST}/api/v2/flights/searchFlightsWebComplete`, {
    originSkyId,
    destinationSkyId,
    originEntityId: "95565058",
    destinationEntityId: "95673821",
    cabinClass: "economy",
    adults: 1,
    sortBy: "best",
    currency: "USD",
    market: "en-US",
    countryCode: "US",
  });
}

// ----------------------------------------------------------
// Search Flights V2 - Custom Search
// ----------------------------------------------------------
export function searchFlightV2(
  originSkyId,
  destinationSkyId,
  originEntityId,
  destinationEntityId,
  date,
  returnDate = "",
  cabinClass = "economy",
  adults = 1,
  sortBy = "best",
  currency = "USD",
  market = "en-US",
  countryCode = "US"
) {
  const params = {
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    cabinClass,
    adults,
    sortBy,
    currency,
    market,
    countryCode,
    date,
  };

  if (returnDate) params.returnDate = returnDate;

  return fetchData(`https://${RAPIDAPI_HOST}/api/v2/flights/searchFlights`, params);
}
