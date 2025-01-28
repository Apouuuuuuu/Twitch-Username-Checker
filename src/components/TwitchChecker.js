"use client";

import React, { useState } from "react";
import axios from "axios";
import { FaTwitch, FaCheckCircle, FaTimesCircle, FaSearch, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

// Regular expression to validate a Twitch username (4 to 25 characters, letters, numbers, and dashes only)
const usernameRegex = /^[a-zA-Z0-9-]{4,25}$/;

function TwitchChecker() {
  const [username, setUsername] = useState(""); // Stores the username entered by the user
  const [availability, setAvailability] = useState(""); // Stores the result of the availability check
  const [error, setError] = useState(""); // Stores validation errors

  // Function to check Twitch username availability
  const checkTwitchUsername = async () => {
    setError(""); // Reset error message

    if (!username.trim()) {
      setError("Please enter a username!");
      return;
    }

    // Validate username format
    if (!usernameRegex.test(username)) {
      setAvailability(
        <div className="text-red-500 flex justify-center items-center text-center mt-4">
          <FaTimesCircle className="mr-2 text-lg" size={20}/> 4-25 characters, letters, numbers, and dashes only.
        </div>
      );
      return;
    }

    try {
      // Send request to the Next.js API
      const response = await axios.get(`/api/check-twitch?username=${username}`);

      // Handling API response
      if (response.data.error) {
        if (
          response.data.error === "The OAuth token is invalid. Please regenerate the token." || 
          response.status === 401 || 
          (response.data.message && response.data.message.includes("OAuth token"))
        ) {
          setAvailability(
            <div className="text-red-500 flex justify-center items-center text-center mt-4">
              <FaTimesCircle className="mr-2 text-lg" size={20}/> Invalid token. Please regenerate it.
            </div>
          );
        } else {
          setAvailability(
            <div className="text-red-500 flex justify-center items-center text-center mt-4">
              <FaTimesCircle className="mr-2 text-lg" size={20}/> Unknown error.
            </div>
          );
        }
      } else if (response.data.data && response.data.data.length === 0) {
        setAvailability(
          <div className="text-green-500 flex justify-center items-center text-center mt-4">
            <FaCheckCircle className="mr-2 text-lg" size={20}/> Available!
          </div>
        );
      } else {
        setAvailability(
          <div className="text-red-500 flex justify-center items-center text-center mt-4">
            <FaTimesCircle className="mr-2 text-lg" size={20}/> Already taken.
          </div>
        );
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 401) {
        setAvailability(
          <div className="text-red-500 flex justify-center items-center text-center mt-4">
            <FaTimesCircle className="mr-2 text-lg" size={20}/> Invalid token. Please regenerate it.
          </div>
        );
      } else {
        setAvailability(
          <div className="text-red-500 flex justify-center items-center text-center mt-4">
            <FaTimesCircle className="mr-2 text-lg" size={20}/> Server error.
          </div>
        );
      }
    }
  };

  return (
    <div className="container relative flex flex-col items-center">
      {/* Background image */}
      <div className="background-image"></div>

      {/* Main UI */}
      <div className="w-full max-w-lg bg-gray-900 shadow-lg rounded-xl p-8 text-center border border-white relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-purple-400 flex items-center justify-center">
          <FaTwitch className="mr-2"/> Twitch Username Checker
        </h2>

        {/* Error message */}
        {error && (
          <div className="bg-red-600 text-white py-2 px-4 mb-4 rounded-lg flex items-center justify-center transition-opacity duration-500">
            <FaExclamationCircle className="mr-2"/> {error}
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            placeholder="Enter a Twitch username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={checkTwitchUsername}
          className="w-full mt-4 bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105 flex items-center justify-center"
        >
          <FaSearch className="mr-2"/> Check Availability
        </button>
        
        {/* Availability result - Now centered correctly */}
        {availability}

        {/* Username Policy Info */}
        <div className="mt-6 text-gray-400 text-sm flex justify-center items-center">
          <FaInfoCircle className="mr-2"/>
          <p>
            Usernames must follow the 
            <a href="https://safety.twitch.tv/s/article/Usernames" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline ml-1">
              Twitch Username Policy
            </a>.
          </p>
        </div>
      </div>

      {/* Footer - Created by Théo Gagelin */}
      <div className="mt-4 text-gray-400 text-sm">
        <a 
          href="https://github.com/Apouuuuuuu" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-purple-400 transition-colors"
        >
          Created by <span className="font-semibold">Théo Gagelin</span>
        </a>
      </div>
    </div>
  );
}

export default TwitchChecker;
