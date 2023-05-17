import React, { useState } from 'react';
import axios from 'axios';


import { Container, Box, Typography, Button, Grid, TextField, Snackbar,Alert,Avatar  } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import logo from '../../assets/images/logo.png';


const PWD_REGEX = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function RegistrationForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const validateInputs = () => {
    if (!name.trim() || !password.trim() || !email.trim()) {
      setErrorMessage('Please fill in all fields');
      setSnackbarOpen(true);
      return false;
    }

    if (!PWD_REGEX.test(password)) {
      setErrorMessage(
        'Password must be at least 6 characters long, contain at least one uppercase letter, and at least one number'
      );
      setSnackbarOpen(true);
      return false;
    }


    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  const handleRegistration = () => {
    if (!validateInputs()) {
      return;
    }
  
    const API_ENDPOINT = 'http://localhost:8080/register';
  
    axios
      .post(API_ENDPOINT, { name, password, email })
      .then(response => {
        if (response.status === 201) {
          console.log('Registration successful');
          setSuccessMessage(response.data.message); // Assuming the server response has a 'message' field
          setErrorMessage('');
          setSnackbarOpen(true);
          //delay redirect to login page
          setTimeout(() => {
          window.location.href = '/login';
          }, 3000);
        } else {
          console.error('Registration failed', response.data.error);
          setErrorMessage('Failed to register user. Please try again.');
          setSuccessMessage('');
          setSnackbarOpen(true);
        }
      })
      .catch(error => {
        console.error('Registration failed', error);
        setErrorMessage('Failed to register user. Please try again.');
        setSuccessMessage('');
        setSnackbarOpen(true);
      });
  };
  
  



  return (
    <div>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)',
            borderRadius: '10px',
            padding: '20px',
            marginTop: '10vh',
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
            Registration Form
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  type="text"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
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
                  autoComplete="password"
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
                  onClick={handleRegistration}
                  color="success"
                  variant="contained"
                  fullWidth
                >
                Register
                </Button>
              </Grid>
              <Grid item xl={12}>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {"Already have an account? "}
                    <a href="/login">login</a>
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
              severity={errorMessage ? 'error' : 'success'}
              sx={{ width: '100%' }}
            >
              {errorMessage || successMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </div>
  );
}

export default RegistrationForm;
