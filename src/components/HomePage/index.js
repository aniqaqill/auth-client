import React from "react";
import { Container, Typography } from "@mui/material";
import Navbar from "../../assets/components/navbar";

function Home() {
  return (
    <>
    <Navbar />
        <Container maxWidth="sm">
            <Typography variant="h3" align="center" sx={{ mt: 10 }}>
                Welcome to Regov Assessment!
            </Typography>
            <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                This is a simple home page.
            </Typography>
        </Container>
    </>
  );
}

export default Home;
