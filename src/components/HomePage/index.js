import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return <div>Home Page
    <Link to="/register">Register</Link>
    </div>;
    }

export default HomePage;