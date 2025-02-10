import React, { useState, useEffect } from "react";
import axios from "../utils/axios";

function SubDestinations({ tripId }) {
  const [subDestinations, setSubDestinations] = useState([]);
  const [error, setError] = useState(null);

  const fetchSubDestinations = async () => {
    try {
      const response = await axios.get(`/trip/${tripId}/subdestinations`);
      console.log("Subdestinations response:", response.data);
      if (response.data && Array.isArray(response.data.subdestinations)) {
        setSubDestinations(response.data.subdestinations);
      } else {
        setSubDestinations([]);
      }
    } catch (err) {
      console.error("Error fetching subdestinations:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Error fetching subdestinations"
      );
    }
  };

  useEffect(() => {
    if (tripId) {
      fetchSubDestinations();
    }
  }, [tripId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">Subdestinations</h3>
      {subDestinations.length === 0 ? (
        <p>No subdestinations found.</p>
      ) : (
        <ul className="list-disc pl-4">
          {subDestinations.map((subdest) => (
            <li key={subdest._id}>
              <strong>{subdest.name}</strong>: {subdest.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SubDestinations;
