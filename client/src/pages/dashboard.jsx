import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Main from "../components/main";
import Chatbox from "../components/chatbox";
import Cookies from "js-cookie";


function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null); // Store the selected trip

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
        error.response?.data?.error ||
          error.message ||
          "Error fetching trips"
      );
      setTrips([]);
    }
  };

  // Fetch trips on mount
  useEffect(() => {
    fetchTrips();
  }, []);

  // Automatically select the first trip if none is selected
  useEffect(() => {
    if (!selectedTrip && trips.length > 0) {
      setSelectedTrip(trips[0]);
    }
  }, [trips, selectedTrip]);

  // Retrieve the userId from local storage or your authentication context.
  // Ensure that you set this value when the user logs in.
  const cookie = Cookies.get("authToken"); // Adjust this as needed
  //console.log("Cookie:{frontend}", cookie);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex grow">
        <div className="w-1/5">
          <Sidebar 
            trips={trips} 
            error={error} 
            selectedTrip={selectedTrip} 
            onSelectTrip={setSelectedTrip}
            refreshTrips={fetchTrips}
          />
        </div>
        <div className="grow">
          <Main selectedTrip={selectedTrip} refreshTrips={fetchTrips} />
        </div>
        <div className="w-1/5">
          <Chatbox selectedTrip={selectedTrip} cookie={cookie} />
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;
