import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    axios
      .post('http://localhost:3000/login', { email, password })
      .then(response => {
        // Handle successful login (e.g., set authentication token, navigate to dashboard, etc.)
        console.log('Login successful');
        // Redirect user to user profile with their ID
        const token = response.data.token;
        //save token to local storage
        localStorage.setItem('token', token);
        const user = JSON.parse(atob(token.split('.')[1]));
        window.location.href = `/profile?id=${user.userId}`;
      })
      .catch(error => {
        // Handle login error
        setLoginError('Invalid email or password');
      });
  };
  

  return (
    <div>
      <h1>Login Form</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      {loginError && <p>{loginError}</p>}
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginForm;
