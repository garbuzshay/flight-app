  // import React from 'react';
  // import { useParams } from 'react-router-dom';

  // function FlightDetails() {
  //   const { flightId } = useParams();

  //   return (
  //     <div>
  //       <h2 className="text-2xl font-semibold mb-4">Flight Details</h2>
  //       <p className="mb-2">Flight ID: {flightId}</p>
  //       {/* 
  //         Normally, you'd re-fetch flight details or pass them through state/context 
  //         and render all the info about the selected flight here.
  //       */}
  //       <p>(Detailed info about this flight goes here...)</p>
  //     </div>
  //   );
  // }

  // export default FlightDetails;


  import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function FlightDetails() {
  const { flightId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract flight details from the state
  const flightDetails = location.state?.flightDetails;

  if (!flightDetails) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Flight Details</h2>
        <p>No flight details available.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Results
        </button>
      </div>
    );
  }

  const {
    price,
    legs: [leg],
  } = flightDetails;

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Flight Details</h2>
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <p className="mb-2">
          <strong>Flight ID:</strong> {flightId}
        </p>
        <p className="mb-2">
          <strong>Origin:</strong> {leg.origin.name} ({leg.origin.displayCode})
        </p>
        <p className="mb-2">
          <strong>Destination:</strong> {leg.destination.name} (
          {leg.destination.displayCode})
        </p>
        <p className="mb-2">
          <strong>Departure:</strong> {formatDateTime(leg.departure)}
        </p>
        <p className="mb-2">
          <strong>Arrival:</strong> {formatDateTime(leg.arrival)}
        </p>
        <p className="mb-2">
          <strong>Duration:</strong> {formatDuration(leg.durationInMinutes)}
        </p>
        <p className="mb-2">
          <strong>Stops:</strong>{' '}
          {leg.stopCount === 0
            ? 'Direct'
            : `${leg.stopCount} stop${leg.stopCount > 1 ? 's' : ''}`}
        </p>
        <p className="mb-2">
          <strong>Price:</strong> {price?.formatted || 'N/A'}
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Carrier Information</h3>
          {leg.carriers.marketing.map((carrier) => (
            <div key={carrier.id} className="flex items-center gap-2 mt-2">
              <img
                src={carrier.logoUrl}
                alt={carrier.name}
                className="w-8 h-8 object-contain"
              />
              <span>{carrier.name}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Results
        </button>
      </div>
    </div>
  );
}

export default FlightDetails;
