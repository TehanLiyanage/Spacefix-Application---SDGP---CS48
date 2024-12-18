import React from "react";
import './Navbar.css';  // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navList">
        <li className="navItem">
          <a href="#home" className="link">Home</a>
        </li>
        <li className="navItem">
          <a href="#availability" className="link">Availability</a>
        </li>
        <li className="navItem">
          <a href="#notifications" className="link">Notifications</a>
        </li>
        <li className="navItem">
          <a href="#navigation-map" className="link">Navigation Map</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
