// testApis.mjs
import {
  getNearByAirports,
  searchAirport,
  searchFlightsComplete,
  getFlightDetails,
  getPriceCalendar,
  searchFlightsMultiStops,
  searchFlightEverywhere,
  searchFlightEverywhereV1,
  searchFlightsWebComplete,
}from './src/services/flightApi.js';

async function runTests() {
  try {
    console.log('--- Test: getNearByAirports ---');
    const nearby = await getNearByAirports(19.242218017578125, 72.85846156046128);
    console.log('getNearByAirports result:\n', nearby, '\n');

    console.log('--- Test: searchAirport ---');
    const airportSearch = await searchAirport('new');
    console.log('searchAirport result:\n', airportSearch, '\n');

    console.log('--- Test: searchFlightsComplete ---');
    const flightsComplete = await searchFlightsComplete('LOND', 'NYCA', '2024-12-15');
    console.log('searchFlightsComplete result:\n', flightsComplete, '\n');

    console.log('--- Test: getFlightDetails (dummy legs) ---');
    const legs = [{ origin: 'LAXA', destination: 'LOND', date: '2024-12-15' }];
    const flightDetails = await getFlightDetails(legs);
    console.log('getFlightDetails result:\n', flightDetails, '\n');

    console.log('--- Test: getPriceCalendar ---');
    const priceCalendar = await getPriceCalendar('BOM', 'JFK', '2024-06-10');
    console.log('getPriceCalendar result:\n', priceCalendar, '\n');

    console.log('--- Test: searchFlightsMultiStops ---');
    const multiLegs = [
      {
        origin: 'AMD',
        originEntityId: '95673366',
        destination: 'STV',
        destinationEntityId: '128667060',
        date: '2025-02-07',
      },
      {
        origin: 'STV',
        originEntityId: '128667060',
        destination: 'BOM',
        destinationEntityId: '95673320',
        date: '2025-02-12',
      },
    ];
    const multiStops = await searchFlightsMultiStops(multiLegs);
    console.log('searchFlightsMultiStops result:\n', multiStops, '\n');

    console.log('--- Test: searchFlightEverywhere ---');
    const everywhere = await searchFlightEverywhere('95673320'); // e.g. "BOM" entity
    console.log('searchFlightEverywhere result:\n', everywhere, '\n');

    console.log('--- Test: searchFlightEverywhereV1 ---');
    const everywhereV1 = await searchFlightEverywhereV1('BOM');
    console.log('searchFlightEverywhereV1 result:\n', everywhereV1, '\n');

    console.log('--- Test: searchFlightsWebComplete ---');
    const flightsWeb = await searchFlightsWebComplete('JFK', 'MIA', '2024-12-15');
    console.log('searchFlightsWebComplete result:\n', flightsWeb, '\n');

    console.log('All tests finished.');
  } catch (error) {
    console.error('Error running tests:', error);
  }
}

runTests();
