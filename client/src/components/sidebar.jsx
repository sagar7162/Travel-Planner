import React, { useState, useEffect } from "react";
import axios from "axios";

function Sidebar() {
  const [trips, setTrips] = useState([]);
  const API_URL = "http://localhost:7162/api";

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios
          .get(`${API_URL}/trip`, {
            withCredentials: true, // Crucial for sending cookies
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });

        setTrips(response.data.trips);
      } catch (error) {
        console.error("Error fetching trips:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert(error.response.data.error);
        } else if (error.message === "Network Error") {
          alert("Network error. Please check your connection.");
        } else {
          alert("Error fetching trips. Please try again.");
        }
      }
    };

    fetchTrips();
  }, []);

  return (
    <div>
      <div className="fixed top-[70px] left-0 h-[calc(100vh-64px)] w-1/5 p-4 border border-r-2 border-b-2 border-t-2 border-black box-border flex flex-col rounded">
        <div className="flex flex-col flex-1 overflow-y-auto gap-y-2 items-center mt-2">
          {trips.length > 0 ? (
            trips.map((trip, index) => (
              <button
                key={index}
                className="w-3/4 shadow-md border-2 border-gray rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {trip}
              </button>
            ))
          ) : (
            <p>No trips available.</p>
          )}
        </div>

        <button className="mt-4 border rounded border-2 border-sky-400 bg-sky-400 text-white font-bold p-2">
          New Trip
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
