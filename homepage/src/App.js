import React from "react";
import Navbar from "./components/Navbar";
import LoginSection from "./components/LoginSection";

function App() {
  return (
    <div>
      <Navbar />
      <header style={styles.header}>
        <h1>Reserve Your Perfect Study Spot</h1>
      </header>
      <LoginSection />
    </div>
  );
}

const styles = {
  header: {
    textAlign: "center",
    margin: "20px 0",
    fontSize: "2rem",
  },
};

export default App;

