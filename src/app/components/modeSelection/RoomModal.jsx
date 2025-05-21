// RoomModal.jsx
"use client";

import './modal.css';
import { io } from "socket.io-client";
import React, { useState , useEffect } from 'react';
import Board from '../gameParts/Board';

const RoomModal = ({ isOpen, onClose , onJoinGame }) => {

  const [roomId, setRoomId] = useState(""); // Input for joining room
  const [createdRoomId, setCreatedRoomId] = useState(""); // Show the created room ID
  const [error, setError] = useState(null); // To handle room join errors
  const [actionTaken, setActionTaken] = useState(false); // Track if create or join is triggered
  


  const [socket , setSocket] = useState(null);


  const [playerSymbol, setPlayerSymbol] = useState('');

  // useEffect hook to initialize socket connection
  
  useEffect(() => {
    if (!socket) {
      setSocket(io('http://localhost:5000', { transports: ["websocket"] })); // Connect to the backend server
    }
  }, []);

  if (!isOpen) return null; // Return null if modal isn't open

  const handleCreateRoom = () => {
    if (actionTaken) return; // Ensure only one action is taken
    setActionTaken(true);
    
    socket.emit('create-room', (response) => {
      console.log(response);

      console.log(response.message);
      if (response.success) {
        setPlayerSymbol(response.playerSymbol);
        setCreatedRoomId(response.roomId); // Show created room ID
        onJoinGame(response.roomId); // Navigate to game with roomId
      } else {
        setError("Failed to create room.");
        setActionTaken(false); // Allow another action if failed
      }
    });
  };



  const joinRoom = (response) => {
    console.log(response);

    const { success, playerSymbol, message } = response; // Include message in response
    console.log("Joined room:", success, playerSymbol);

    if (success) {
      setPlayerSymbol(playerSymbol);
      onJoinGame(roomId); // Navigate to game with roomId
    } else {
      console.error("Error joining room:", message);
    }
  };


  const handleJoinRoom = () => {
    if (actionTaken) return; // Ensure only one action is taken
    setActionTaken(true);
    socket.emit('join-room', roomId, joinRoom);
  };

  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Join or Create a Room</h2>

        <div className="modal-actions">
          <button onClick={handleCreateRoom}>Create Room</button>
          {createdRoomId && <p>Room ID: {createdRoomId}</p>}

          <div className="join-room">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button onClick={handleJoinRoom}>Join Room</button>
            {error && <p style={{ color: "red" }}>{error}</p>} 
          </div>
        </div>

        <button onClick={onClose} className="close-modal">
          Close
        </button>
      </div>
    </div>
  );
};

export default RoomModal;
