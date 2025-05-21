"use client";

import React, { useState } from "react";
import RoomModal from "./RoomModal"; // Import the RoomModal component
import { useRouter } from 'next/navigation';

const OnlineSelection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleOptionSelect = (option) => {
    if (option === "Room") {
      setModalOpen(true); // Open the modal when "Join Room with Friend" is clicked
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal when needed
  };

  const onJoinGame = (roomId) => {
    // Navigate to the Tic Tac Toe game and pass the roomId
    router.push(`/game?roomId=${roomId}`);
  };

 
  return (
    <div className="selection-container">
      <h1>Select Online Option</h1>
      <button onClick={() => handleOptionSelect("Room")}>Join Room with Friend</button>
      <button onClick={() => console.log("Play Online")}>Play Online</button>

      <RoomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onJoinGame={onJoinGame}
      />
    </div>
  );
};

export default OnlineSelection;
