import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/support">Support</a>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
           <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </a>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} CloudLiness. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
