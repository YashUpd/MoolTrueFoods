import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="navbar-logo-link">
          <h1 className="navbar-logo">
            MoolTrue<span className="navbar-logo-orange">Foods</span>
          </h1>
        </Link>

        {/* Desktop Navigation & Search */}
        <div className="navbar-desktop-nav">
          {/* Search Bar */}
          <div className="navbar-search-container">
            <div className="navbar-search-group">
              <input
                type="text"
                placeholder="Search brands & products..."
                className="navbar-search-input"
              />
              <button className="navbar-search-button">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="navbar-menu-items">
            <Link
              to="/"
              className="navbar-link"
            >
              Home
              <span className="navbar-link-indicator"></span>
            </Link>
            <Link
              to="/shop"
              className="navbar-link"
            >
              Shop
              <span className="navbar-link-indicator"></span>
            </Link>
            <Link
              to="/about"
              className="navbar-link"
            >
              About
              <span className="navbar-link-indicator"></span>
            </Link>
            <Link
              to="/contact"
              className="navbar-link"
            >
              Contact
              <span className="navbar-link-indicator"></span>
            </Link>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="navbar-cart-trigger"
              aria-label="Open cart"
            >
              <FaShoppingCart className="navbar-cart-icon" />
              {cartCount > 0 && (
                <span className="navbar-cart-badge">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Icons & Hamburger */}
        <div className="navbar-mobile-actions">
          {/* Mobile Search Icon (Placeholder) */}
          <button className="navbar-mobile-search-trigger">
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
          </button>
          
          {/* Shopping Cart Trigger Mobile */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="navbar-cart-trigger-mobile"
            aria-label="Open cart"
          >
            <FaShoppingCart className="navbar-cart-icon-mobile" />
            {cartCount > 0 && (
              <span className="navbar-cart-badge-mobile">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="navbar-hamburger"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-mobile-menu-inner">
            <Link
              to="/"
              onClick={closeMenu}
              className="navbar-mobile-link"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={closeMenu}
              className="navbar-mobile-link"
            >
              Shop
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="navbar-mobile-link"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="navbar-mobile-link"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
