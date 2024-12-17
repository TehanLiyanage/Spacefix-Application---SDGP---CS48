import React, { useState } from 'react';
import './SignUpPage.css';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log('Name:', name, 'Email:', email, 'Password:', password, 'Category:', category);
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit} className="signup-form">
      <h1>SignUp</h1> 
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
            minLength="2"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Select Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        <div className="login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;