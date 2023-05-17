
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Snackbar,
  Alert,
  Avatar,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Navbar from '../../assets/components/navbar';

import logo from '../../assets/images/logo.png';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    axios
      .post('https://auth-server-production-84ee.up.railway.app/login', { email, password })
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
        console.error('Login failed', error);
        setLoginError('Invalid email or password');
        setSnackbarOpen(true);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)',
            borderRadius: '10px',
            padding: '20px',
            marginTop: '15vh',
          }}
        >
          <Avatar
            sx={{
              width: '100px',
              height: '100px',
              backgroundColor: '#fff',
              
            }}
            alt="logo"
            src={logo}
          />
          <Typography sx={{ mb: 2 }} variant="h3">
            Login Form
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid spacing={1} justifyContent="center" mt={2}>
              <Grid item xl={12}>
                <Button
                  type="button"
                  onClick={handleLogin}
                  color="success"
                  variant="contained"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xl={12}>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {'Don\'t have an account? '}
                    <a href="/register">Register</a>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity="error"
              sx={{ width: '100%' }}
            >
              {loginError}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </>
  );
}

export default LoginForm;
