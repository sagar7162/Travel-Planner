import React from "react";
import axios from "../utils/axios";
import SubDestinations from "../components/SubDestinations";

function Main({ selectedTrip, refreshTrips }) {
  // Handler for adding users to the currently selected trip
  const handleAddPeople = async () => {
    if (!selectedTrip) {
      alert("Please select a trip from the sidebar first.");
      return;
    }

    // Prompt for emails; expect a comma-separated list
    const emailsStr = prompt("Enter comma-separated email addresses to add:");
    if (!emailsStr) {
      alert("No email addresses provided.");
      return;
    }

    // Split the emails and remove any extra spaces
    const emails = emailsStr
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);

    if (emails.length === 0) {
      alert("No valid email addresses provided.");
      return;
    }

    try {
      console.log("Adding people in this trip (frontend):", selectedTrip);
      const response = await axios.put(`/trip/${selectedTrip._id}/users`, { add: emails });
      alert("Users added successfully!");
      console.log("Add Users response:", response.data);
      // Optionally, refresh trips if the backend updates any data relevant to the UI.
      refreshTrips();
    } catch (error) {
      console.error("Error adding users:", error);
      alert(
        error.response?.data?.message ||
          "Error adding users. Please try again."
      );
    }
  };

  // Handler for adding a new sub-destination to the currently selected trip
  const handleNewSubDestination = async () => {
    if (!selectedTrip) {
      alert("Please select a trip from the sidebar first.");
      return;
    }

    const name = prompt("Enter sub-destination name:");
    if (!name) {
      alert("Sub-destination name is required.");
      return;
    }

    const description = prompt("Enter sub-destination description:");
    if (!description) {
      alert("Sub-destination description is required.");
      return;
    }

    try {
      console.log("Adding sub-destination in this trip (frontend):", selectedTrip);
      const response = await axios.put(`/trip/${selectedTrip._id}/newsubdest`, {
        subDestinations: { name, description },
      });
      alert("Sub-destination added successfully!");
      console.log("Sub-destination response:", response.data);
      // Optionally, refresh trips if needed.
      refreshTrips();
    } catch (error) {
      console.error("Error adding sub-destination:", error);
      alert(
        error.response?.data?.message ||
          "Error adding sub-destination. Please try again."
      );
    }
  };

  return (
    <div className="relative top-[64px] h-[calc(100vh-85px)] flex border-2 border-black ml-2 mt-2 mr-2 rounded-lg">
      <div className="grow border-l border-r p-4 flex flex-col overflow-y-auto">
        <button
          onClick={handleAddPeople}
          className="my-4 border rounded border-2 border-sky-400 bg-sky-400 text-white font-bold p-2"
        >
          Add People
        </button>
        {selectedTrip && <SubDestinations tripId={selectedTrip._id} />}
        <button
          onClick={handleNewSubDestination}
          className="h-[30px] hover:bg-zinc-100 rounded hover:text-black text-transparent"
        >
          Add Sub-Destination
        </button>
        
        <button className="sticky my-4 border rounded border-2 border-sky-400 bg-sky-400 text-white font-bold p-2 mt-auto mb-4">
          Expense Break-Up
        </button>
      </div>
    </div>
  );
}

export default Main;
// The Main component now has a new button to add a sub-destination to the currently selected trip. The button calls a new handler function, handleNewSubDestination, which prompts the user for a name and description for the new sub-destination. The handler then sends a PUT request to the backend API to create the sub-destination.