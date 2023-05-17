import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import logo from "../../images/logo.png";

function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        {/* add logo */}
        <img src={logo} alt="logo" style={{ width: "60px", height: "50px" }} /> 
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>    
        {!isAuthenticated && (
          <Button color="inherit" size="large" component={Link} to="/register" sx={{ marginLeft: "auto" }} >
            Register
          </Button>
        )}
        {!isAuthenticated && (
          <Button color="success" variant="contained" component={Link} to="/login">
            Login
          </Button>
        )}
    
        {isAuthenticated && (
          <Button color="error" size="medium" variant="contained" onClick={handleLogout} sx={{ marginLeft: "auto" }} >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
