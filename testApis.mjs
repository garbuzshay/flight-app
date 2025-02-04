// // // testApis.mjs
// // import {
// //   getNearByAirports,
// //   searchAirport,
// //   searchFlightsComplete,
// //   getFlightDetails,
// //   getPriceCalendar,
// //   searchFlightsMultiStops,
// //   searchFlightEverywhere,
// //   searchFlightEverywhereV1,
// //   searchFlightsWebComplete,
// //   searchFlightV2,
// // }from './src/services/flightApi.js';

// // async function runTests() {
// //   try {
// //     // console.log('--- Test: getNearByAirports ---');
// //     // const nearby = await getNearByAirports(19.242218017578125, 72.85846156046128);
// //     // console.log('getNearByAirports result:\n', nearby, '\n');

// //     console.log('--- Test: searchAirport ---');
// //     const airportSearch = await searchAirport('new');
// //     console.log('searchAirport result:\n', airportSearch, '\n');

// //     // console.log('--- Test: searchFlightsComplete ---');
// //     // const flightsComplete = await searchFlightsComplete('LOND', 'NYCA', '2024-12-15');
// //     // console.log('searchFlightsComplete result:\n', flightsComplete, '\n');

// //     // console.log('--- Test: getFlightDetails (dummy legs) ---');
// //     // const legs = [{ origin: 'LAXA', destination: 'LOND', date: '2024-12-15' }];
// //     // const flightDetails = await getFlightDetails(legs);
// //     // console.log('getFlightDetails result:\n', flightDetails, '\n');

// //     // console.log('--- Test: getPriceCalendar ---');
// //     // const priceCalendar = await getPriceCalendar('BOM', 'JFK', '2024-06-10');
// //     // console.log('getPriceCalendar result:\n', priceCalendar, '\n');

// //     // console.log('--- Test: searchFlightsMultiStops ---');
// //     // const multiLegs = [
// //     //   {
// //     //     origin: 'AMD',
// //     //     originEntityId: '95673366',
// //     //     destination: 'STV',
// //     //     destinationEntityId: '128667060',
// //     //     date: '2025-02-07',
// //     //   },
// //     //   {
// //     //     origin: 'STV',
// //     //     originEntityId: '128667060',
// //     //     destination: 'BOM',
// //     //     destinationEntityId: '95673320',
// //     //     date: '2025-02-12',
// //     //   },
// //     // ];
// //     // const multiStops = await searchFlightsMultiStops(multiLegs);
// //     // console.log('searchFlightsMultiStops result:\n', multiStops, '\n');

// //     // console.log('--- Test: searchFlightEverywhere ---');
// //     // const everywhere = await searchFlightEverywhere('95673320'); // e.g. "BOM" entity
// //     // console.log('searchFlightEverywhere result:\n', everywhere, '\n');

// //     // console.log('--- Test: searchFlightEverywhereV1 ---');
// //     // const everywhereV1 = await searchFlightEverywhereV1('BOM');
// //     // console.log('searchFlightEverywhereV1 result:\n', everywhereV1, '\n');

// //     // console.log('--- Test: searchFlightsWebComplete ---');
// //     // const flightsWeb = await searchFlightsWebComplete('JFK', 'MIA', '2024-12-15');
// //     // console.log('searchFlightsWebComplete result:\n', flightsWeb, '\n');

// //     console.log('All tests finished.');
// //   } catch (error) {
// //     console.error('Error running tests:', error);
// //   }
// // }

// // runTests();


// import axios from 'axios';
// import {
//   getNearByAirports,
//   searchAirport,
//   searchFlightsComplete,
//   getFlightDetails,
//   getPriceCalendar,
//   searchFlightsMultiStops,
//   searchFlightEverywhere,
//   searchFlightEverywhereV1,
//   searchFlightsWebComplete,
//   searchFlightV2,
// } from './src/services/flightApi.js';

// async function testSearchFlightV2() {
//   console.log('--- Test: searchFlightV2 ---');

//   const options = {
//     method: 'GET',
//     url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights',
//     params: {
//       originSkyId: 'LOND',
//       destinationSkyId: 'NYCA',
//       originEntityId: '27544008',
//       destinationEntityId: '27537542',
//       date: '2025-03-25',
//       cabinClass: 'economy',
//       adults: '1',
//       sortBy: 'best',
//       limit: '10',
//       currency: 'USD',
//       market: 'en-US',
//       countryCode: 'US'
//     },
//     headers: {
//       'x-rapidapi-key': 'ad5348c7d3mshb6e9370e8e1586fp126542jsnbe9150a269af',
//       'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await axios.request(options);

//     console.log('searchFlightV2 result:\n', JSON.stringify(response.data, null, 2), '\n');

//     if (response.data?.data?.itineraries) {
//       console.log('\n---- EXPANDED ITINERARIES ----');
//       response.data.data.itineraries.forEach((itinerary, index) => {
//         console.log(`Itinerary #${index + 1}:`);
//         console.log(JSON.stringify(itinerary, null, 2), '\n');
//       });
//     }

//   } catch (error) {
//     console.error('Error in searchFlightV2:', error);
//   }
// }

// async function runTests() {
//   try {
//     console.log('--- Test: searchAirport ---');
//     const airportSearch = await searchAirport('new');
//     console.log('searchAirport result:\n', JSON.stringify(airportSearch, null, 2), '\n');

//     // await testSearchFlightV2(); // Run the fixed searchFlightV2 test

//     console.log('All tests finished.');
//   } catch (error) {
//     console.error('Error running tests:', error);
//   }
// }

// runTests();
