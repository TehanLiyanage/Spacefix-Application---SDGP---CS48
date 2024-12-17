import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import logo from '../assets/logo.png'; 

const WelcomePage = () => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-page">
      <div className="content">
        <h1 className="welcome-text">Welcome to Spacefix!</h1> {/* Welcome message */}
        <img src={logo} alt="Spacefix Logo" className="image" />

        <p className="description">Your go-to solution for all your space needs. Join us and start your journey today.</p>

        <button
          className={isHovered ? 'button button-hover' : 'button'}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
