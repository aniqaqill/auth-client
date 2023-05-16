import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          //get parameter id from url
            const url = window.location.href;
            const userId = url.split('=')[1];
            console.log(userId)
  
          const response = await axios.get(`http://localhost:3000/profile/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            );
          const user = response.data.user;
          setUser(user);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      };
  
      fetchUser();
    }, []);
  
    if (!user) {
      return <p>Loading user profile...</p>;
    }
  
    return (
      <div>
        <h1>User Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Display other user details as needed */}
      </div>
    );
  }
  
  export default UserProfile;
  
