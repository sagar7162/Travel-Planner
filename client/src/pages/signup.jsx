import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
const API_URL = "http://localhost:7162/api"; // Make sure this port matches your backend

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e, func) => {
    func(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      console.log(response.data);

      if (response.data.message === "User registered successfully") {
        alert("User registered successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        // Handle unexpected success responses (if any)
        console.warn("Unexpected success response:", response.data);
        alert(
          "Registration successful, but an unexpected response was received."
        );
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Display backend error message
      } else {
        alert("Error registering user. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => handleChange(e, setName)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleChange(e, setPassword)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
