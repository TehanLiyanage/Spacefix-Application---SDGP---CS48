import React from "react";
import './LoginSection.css'; // Import the CSS file

function LoginSection() {
  const roles = ["Students", "Lecturers", "Academic Staff", "Lab Keepers"];

  return (
    <div className="container">
      <h2 className="heading">Logins</h2>
      <div className="roles">
        {roles.map((role, index) => (
          <div key={index} className="card" onClick={() => alert(`${role} Login Clicked!`)}>
            <img
              src="https://via.placeholder.com/50" // Placeholder for profile icon
              alt="Profile Icon"
              className="icon"
            />
            <p>{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoginSection;
