import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Navbar from '../../assets/components/navbar';


function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get parameter id from the URL
        const url = window.location.href;
        const userId = url.split('=')[1];
        console.log(userId);

        const response = await axios.get(`https://auth-server-production-84ee.up.railway.app/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const user = response.data.user;
        setUser(user);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
    <Navbar />
    <Container maxWidth="sm">
      <Box
      
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)',
          borderRadius: '10px',
          padding: '20px',
          marginTop: '30vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            marginBottom: '20px',
          }}
        >
          {/* Replace the 'user.avatar' with the actual avatar image URL or icon component */}
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" />
          ) : (
            <AccountCircleIcon /> // Replace this with your own default avatar icon
          )}
        </Avatar>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          User Profile
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          Name: {user.name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          Email: {user.email}
        </Typography>
        {/* Add additional user details as needed */}
      </Box>
    </Container>
    </>
  );
}

export default UserProfile;
