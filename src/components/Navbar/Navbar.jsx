import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { productsAPI } from "../../api/client";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productsAPI.getAll();
        if (res && res.data && res.data.length > 0) {
          setAllProducts(res.data);
        }
      } catch (e) {
        // Silent fail
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  const handleSuggestionClick = (productName) => {
    setSearchQuery(productName);
    navigate(`/shop?search=${encodeURIComponent(productName)}`);
    setIsSearchFocused(false);
  };

  // Compute suggestions when typing 2 or more characters
  const suggestions = searchQuery.length >= 2
    ? allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

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
          <div className="navbar-search-container" ref={searchRef}>
            <form onSubmit={handleSearch} className="navbar-search-group">
              <input
                type="text"
                placeholder="Search brands & products..."
                className="navbar-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              <button type="submit" className="navbar-search-button">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {isSearchFocused && suggestions.length > 0 && (
              <div className="navbar-search-suggestions">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    className="navbar-search-suggestion-item"
                    onClick={() => handleSuggestionClick(product.name)}
                  >
                    <img src={product.image} alt={product.name} className="navbar-suggestion-img" />
                    <div className="navbar-suggestion-info">
                      <p className="navbar-suggestion-name">{product.name}</p>
                      <p className="navbar-suggestion-cat">{product.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="navbar-menu-items">
            <Link to="/" className="navbar-link">
              Home
              <span className="navbar-link-indicator"></span>
            </Link>
            <Link to="/shop" className="navbar-link">
              Shop
              <span className="navbar-link-indicator"></span>
            </Link>
            <Link to="/about" className="navbar-link">
              About
              <span className="navbar-link-indicator"></span>
            </Link>
            <Link to="/contact" className="navbar-link">
              Contact
              <span className="navbar-link-indicator"></span>
            </Link>

            {/* Wishlist Trigger */}
            <Link to="/wishlist" className="navbar-wishlist-trigger" aria-label="Open wishlist">
              <FaHeart className="navbar-wishlist-icon" />
              {wishlistCount > 0 && (
                <span className="navbar-wishlist-badge">
                  {wishlistCount}
                </span>
              )}
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

            {/* User Dropdown */}
            {isAuthenticated ? (
              <div className="navbar-profile-wrap">
                <button
                  className="navbar-avatar-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-label="Toggle user menu"
                >
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} className="navbar-avatar-img" />
                  ) : (
                    <div className="navbar-avatar-initials">
                      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="navbar-dropdown">
                    <div className="navbar-dropdown-header">
                      <p className="navbar-dropdown-name">{user.name}</p>
                      <p className="navbar-dropdown-email">{user.email}</p>
                      <span className={`navbar-role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </div>
                    <Link
                      to="/wishlist"
                      onClick={() => setIsDropdownOpen(false)}
                      className="navbar-dropdown-item"
                    >
                      ❤️ My Wishlist
                    </Link>
                    {(user.role === 'admin' || user.role === 'superadmin') && (
                      <Link
                        to="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="navbar-dropdown-item admin-link-item"
                      >
                        ⚙️ Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout()
                        setIsDropdownOpen(false)
                      }}
                      className="navbar-dropdown-item logout-btn"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="navbar-auth-btn">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Icons & Hamburger */}
        <div className="navbar-mobile-actions">
          {/* Mobile Wishlist Icon */}
          <Link to="/wishlist" className="navbar-wishlist-trigger-mobile" aria-label="Wishlist">
            <FaHeart className="navbar-wishlist-icon-mobile" />
            {wishlistCount > 0 && (
              <span className="navbar-wishlist-badge-mobile">
                {wishlistCount}
              </span>
            )}
          </Link>

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
            {/* Mobile Search */}
            <form onSubmit={(e) => { handleSearch(e); closeMenu(); }} className="navbar-mobile-search-form">
              <input
                type="text"
                placeholder="Search products..."
                className="navbar-mobile-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="navbar-mobile-search-submit">
                Search
              </button>
            </form>

            <Link to="/" onClick={closeMenu} className="navbar-mobile-link">
              Home
            </Link>
            <Link to="/shop" onClick={closeMenu} className="navbar-mobile-link">
              Shop
            </Link>
            <Link to="/wishlist" onClick={closeMenu} className="navbar-mobile-link">
              ❤️ Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            <Link to="/about" onClick={closeMenu} className="navbar-mobile-link">
              About
            </Link>
            <Link to="/contact" onClick={closeMenu} className="navbar-mobile-link">
              Contact
            </Link>

            {/* Mobile Auth Items */}
            {isAuthenticated ? (
              <div className="navbar-mobile-auth-section">
                <div className="navbar-mobile-user-card">
                  <p className="navbar-mobile-user-name">👤 {user.name}</p>
                  <p className="navbar-mobile-user-email">{user.email}</p>
                </div>
                {(user.role === 'admin' || user.role === 'superadmin') && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="navbar-mobile-link admin-link-item"
                    style={{ borderTop: '1px solid var(--color-border)' }}
                  >
                    ⚙️ Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                  className="navbar-mobile-logout-btn"
                >
                  🚪 Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="navbar-mobile-link"
                style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-primary)', fontWeight: 700 }}
              >
                👤 Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
