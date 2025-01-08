import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Discover the Power of Reliable Storage</h1>
        <p>
          Explore our curated selection of high-performance hard drives, designed
          to meet your every storage need.
        </p>
        <Link to="/products" className="hero-button">
          Shop Now
        </Link>
      </div>
      {/* other homepage content goes here */}
    </div>
  );
}

export default HomePage;
