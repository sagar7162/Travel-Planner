import React, { useState } from "react";
import axios from "../utils/axios"; // Using configured axios
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e, func) => {
    func(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Use our configured axios instance with withCredentials: true
      const response = await axios.post("/login", {
        email,
        password,
      });

      if (response.data.message === "login successful" && response.data.token) {
        // Store the token in both localStorage and as a cookie
        localStorage.setItem("token", response.data.token);
        
        // Set the cookie using js-cookie
        Cookies.set("authToken", response.data.token, { 
          expires: 1, // 1 day
          path: '/'
        });
        
        console.log("Login successful, token saved");
        navigate("/dashboard");
      } else {
        console.error("Unexpected login response:", response.data);
        alert("Login successful, but an unexpected response was received from the server.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else if (error.message === "Network Error") {
        alert("Network error. Please check your connection.");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login In</h2>
        <form onSubmit={handleSubmit}>
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

export default Login;
