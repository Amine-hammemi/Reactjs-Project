"use client";

import React, { useState } from 'react';
import './form.css';

const Form = ({onsubmit}) => {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickName, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to create or login player");
      }

      // Store the token in localStorage
      localStorage.setItem('jwt', data.token); // Ensure token is stored here

      setResponseMessage(`Player logged in as ${data.player.nickName}`);
      onsubmit();

    } catch (error) {
      console.error("Error:", error.message);
      setResponseMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Create Player</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p style={{color:'black'}}>NickName</p>
          <input
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            required
          />
        </label>
        <label>
          <p style={{color:'black'}}>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p style={{color: "black"}}>{responseMessage}</p>
    </div>
  );
};

export default Form;
