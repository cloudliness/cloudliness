import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" ref={menuRef}>
      <Link to="/" className="navbar-brand" onClick={closeMenu}>
        CloudLiness
      </Link>

      <div className="mobile-icons">
        <Link to="/cart" className="cart-icon" onClick={closeMenu}>
          <div style={{ position: 'relative' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#ff4757',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
        </Link>
        <button className="navbar-toggler" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/about" className="navbar-link" onClick={closeMenu}>
          About
        </Link>
        <Link to="/products" className="navbar-link" onClick={closeMenu}>
          Products
        </Link>
        <Link to="/support" className="navbar-link" onClick={closeMenu}>
          Support
        </Link>
        <Link to="/contact" className="navbar-link" onClick={closeMenu}>
          Contact Us
        </Link>
        <Link to="/cart" className="navbar-link cart-icon-desktop" onClick={closeMenu}>
          <div style={{ position: 'relative' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#ff4757',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
