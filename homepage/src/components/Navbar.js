import React from "react";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <a href="#home" style={styles.link}>Home</a>
        </li>
        <li style={styles.navItem}>
          <a href="#availability" style={styles.link}>Availability</a>
        </li>
        <li style={styles.navItem}>
          <a href="#notifications" style={styles.link}>Notifications</a>
        </li>
        <li style={styles.navItem}>
          <a href="#navigation-map" style={styles.link}>Navigation Map</a>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#4169E1", // Royal Blue color
    padding: "10px 0",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 10px",
  },
  link: {
    color: "#FFFFFF", // White color for hyperlinks
    textDecoration: "none",
    fontSize: "1rem",
  },
};

export default Navbar;

