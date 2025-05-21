"use client";
import '../index.css';

import React, { useState } from "react";
import LocalGameMode from "./LocalGameMode";
import OnlineGameMode from "./OnlineGameMode";
//import RoomModal from "./modeSelection/RoomModal"; // Component to handle room selection logic
import { useSearchParams } from 'next/navigation';

const Rendersquare = () => {
  //const [gameMode, setGameMode] = useState(null); // State to choose between local or online

  const searchParams = useSearchParams();
  const roomid = searchParams.get('roomId'); // Retrieves the roomId from the query string

  /*const handleRoomJoin = (room) => {
    setRoomId(room);
    setGameMode("online");
  };*/

  return (
    <>  
      
      {roomid ? (
      <OnlineGameMode roomId={roomid} />
      ):(
        <LocalGameMode />
      )
        }
    </>
  );
};

export default Rendersquare;