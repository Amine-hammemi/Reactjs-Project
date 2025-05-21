import React from "react";
import './logoutButton.css'; // Ensure you have this CSS file

function LogoutButton({ onsubmit }) {
  const handleLogOut = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseMessage = await response.text();
      console.log('response: ', responseMessage);

      localStorage.removeItem('jwt');
      onsubmit();
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <div className="logout-logo" onClick={handleLogOut}>
      {/*<img src="/logoutIcon.png" className="logout-image" />*/}
      log out
    </div>
  );
}

export default LogoutButton;
