import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h2 className="about-heading">About CloudLiness</h2>
      <div className="about-sections">
        <div className="about-section">
          <img 
            src="https://placehold.co/400x300" 
            alt="Our Mission illustration"
            className="about-image"
          />
          <h3>Our Mission</h3>
          <p>
            To provide reliable and affordable storage solutions to our
            customers. We are committed to delivering excellent products and
            customer service.
          </p>
        </div>
        <div className="about-section">
          <img 
            src="https://placehold.co/400x300" 
            alt="Our Vision illustration"
            className="about-image"
          />
          <h3>Our Vision</h3>
          <p>
            To be the leading provider of high-quality hard drives, empowering
            individuals and businesses with the best storage solutions.
          </p>
        </div>
        <div className="about-section">
          <img 
            src="https://placehold.co/400x300" 
            alt="Our Values illustration"
            className="about-image"
          />
          <h3>Our Values</h3>
          <p>
            Integrity, quality, and customer satisfaction are at the core of
            everything we do. We strive to exceed expectations in every
            interaction.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
