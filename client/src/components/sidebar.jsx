import React, { useState, useEffect } from "react";
import axios from "axios";

// Set default axios configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:7162/api";

function Sidebar({ selectedTrip, onSelectTrip }) {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);

  // Fetch trips from backend
  const fetchTrips = async () => {
    try {
      const response = await axios.get("/trip");
      console.log("Trips response:", response.data);
      if (response.data && Array.isArray(response.data.trips)) {
        setTrips(response.data.trips);
      } else {
        console.warn("Unexpected response format:", response.data);
        setTrips([]);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
      setError(
        error.response?.data?.error || error.message || "Error fetching trips"
      );
      setTrips([]);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // Handler for creating a new trip remains the same
  const handleNewTrip = async () => {
    const name = prompt("Enter the trip name:");
    if (!name) return;

    const startDate = prompt("Enter start date (YYYY-MM-DD):");
    const endDate = prompt("Enter end date (YYYY-MM-DD):");

    try {
      const response = await axios.post("/trip/new", {
        name,
        startDate,
        endDate,
      });
      console.log("New trip created:", response.data);
      alert("Trip created successfully!");
      // After successful creation, re-fetch the trips
      fetchTrips();
    } catch (error) {
      console.error("Error creating trip:", error);
      alert(
        error.response?.data?.message ||
          "Error creating trip. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="fixed top-[70px] left-0 h-[calc(100vh-64px)] w-1/5 p-4 border border-r-2 border-b-2 border-t-2 border-black box-border flex flex-col rounded">
        <div className="flex flex-col flex-1 overflow-y-auto gap-y-2 items-center mt-2">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : trips.length > 0 ? (
            // When mapping over trips in Sidebar:
            trips.map((tripObj, index) => (
              <button
                key={index}
                onClick={() => onSelectTrip(tripObj)}
                className={`w-3/4 shadow-md border-2 border-gray rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selectedTrip && selectedTrip._id === tripObj._id
                    ? "bg-blue-200"
                    : ""
                }`}
              >
                {tripObj.trip}
              </button>
            ))
          ) : (
            <p>No trips available.</p>
          )}
        </div>

        <button
          onClick={handleNewTrip}
          className="mt-4 border rounded border-2 border-sky-400 bg-sky-400 text-white font-bold p-2"
        >
          New Trip
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
