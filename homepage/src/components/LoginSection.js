import React from "react";

function LoginSection() {
  const roles = ["Students", "Lecturers", "Academic Staff", "Lab Keepers"];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Logins</h2>
      <div style={styles.roles}>
        {roles.map((role, index) => (
          <div key={index} style={styles.card} onClick={() => alert(`${role} Login Clicked!`)}>
            <img
              src="https://via.placeholder.com/50" // Placeholder for profile icon
              alt="Profile Icon"
              style={styles.icon}
            />
            <p>{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    margin: "20px",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  roles: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  card: {
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    margin: "10px",
    textAlign: "center",
    width: "120px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  icon: {
    width: "50px",
    height: "50px",
    marginBottom: "10px",
  },
};

export default LoginSection;
