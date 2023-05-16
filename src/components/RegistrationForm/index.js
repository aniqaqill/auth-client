import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


function RegistrationForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegistration = () => {
    // Replace 'API_ENDPOINT' with your actual API endpoint for user registration
    const API_ENDPOINT = 'http://localhost:3000/register';

    axios
      .post(API_ENDPOINT, { name, password, email })
      .then(response => {
        // Registration success logic
        console.log('Registration successful');
      })
      .catch(error => {
        // Registration error logic
        console.error('Registration failed', error);
      });
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <button type="button" onClick={handleRegistration}>
          Register
        </button>
      </form>
        <div>
            <Link to="/login">Login</Link>
        </div>
    </div>
  );
}

export default RegistrationForm;

