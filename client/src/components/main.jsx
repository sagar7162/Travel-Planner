import React from "react";
import axios from "../utils/axios";

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
      // Send the PUT request to add users to the selected trip
      console.log("adding in this trip (frontend)",selectedTrip);
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

  return (
    <div className="relative top-[70px] h-[calc(100vh-64px)] flex border-2 border-black ml-2 mt-2 mr-2 rounded-lg">
      <div className="grow border-l border-r p-4 flex flex-col">
        <button
          onClick={handleAddPeople}
          className="my-4 border rounded border-2 border-sky-400 bg-sky-400 text-white font-bold p-2 left-2"
        >
          Add People
        </button>
        <div className="h-[30px] hover:bg-zinc-100 rounded hover:text-black text-transparent">
          Click For New Sub-Destination
        </div>
      </div>
    </div>
  );
}

export default Main;
