"use client";

import React, { useState, useEffect } from 'react';
import './selection.css';
import { useRouter } from 'next/navigation';
import LogoutButton from '../logoutButton/logoutButton.jsx';
import Form from '../form.jsx'

const GameModeSelection = ({ onModeSelect }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/check-auth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();
      if (response.ok && data.loggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleSelection = (mode) => {
    if (mode === 'online') {
      router.push('/onlineSelection'); 
      
    } else if (mode === 'friend') {
      router.push('/game'); 

    }else if (mode ==='system') {
      router.push('/system'); 
    } else {
      console.log('Invalid mode selected');
    }
  };

  return (
    <div className="selection-container">
      { !isLoggedIn ? (
        <>
        <Form onsubmit={checkAuth} />
      </>
        
      ) : (
        <>
          <div>
            <h1>Select Game Mode</h1>
            <button onClick={() => handleSelection('friend')}>Play with Friend</button>
            <button onClick={() => handleSelection('system')}>Play with System</button>
            <button onClick={() => handleSelection('online')}>Play Online</button>
          </div>
          <LogoutButton onsubmit={checkAuth}/>
        </>
      )}
    </div>
  );
};

export default GameModeSelection;
