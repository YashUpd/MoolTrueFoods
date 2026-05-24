import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";

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
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-5 sticky top-0 z-50 shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent flex-shrink-0 cursor-pointer">
            MoolTrueFoods
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          <Link
            to="/"
            className="text-sm lg:text-base font-medium hover:text-green-400 transition-colors duration-300 relative group whitespace-nowrap"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/shop"
            className="text-sm lg:text-base font-medium hover:text-green-400 transition-colors duration-300 relative group whitespace-nowrap"
          >
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/about"
            className="text-sm lg:text-base font-medium hover:text-green-400 transition-colors duration-300 relative group whitespace-nowrap"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/contact"
            className="text-sm lg:text-base font-medium hover:text-green-400 transition-colors duration-300 relative group whitespace-nowrap"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Shopping Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative focus:outline-none flex items-center justify-center p-1.5"
            aria-label="Open cart"
          >
            <FaShoppingCart className="text-xl lg:text-2xl cursor-pointer hover:text-green-400 hover:scale-110 transition-all duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-green-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Icons & Hamburger */}
        <div className="flex md:hidden items-center gap-4">
          {/* Shopping Cart Trigger Mobile */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative focus:outline-none flex items-center justify-center p-1.5"
            aria-label="Open cart"
          >
            <FaShoppingCart className="text-lg cursor-pointer hover:text-green-400 hover:scale-110 transition-all duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-green-500 text-white font-extrabold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-slate-900 shadow-md">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="text-2xl hover:text-green-400 transition-colors duration-300 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gradient-to-b from-slate-900 to-slate-800 border-b border-slate-700 md:hidden">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-base font-medium hover:text-green-400 transition-colors duration-300 py-2 border-b border-slate-700"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={closeMenu}
              className="text-base font-medium hover:text-green-400 transition-colors duration-300 py-2 border-b border-slate-700"
            >
              Shop
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="text-base font-medium hover:text-green-400 transition-colors duration-300 py-2 border-b border-slate-700"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="text-base font-medium hover:text-green-400 transition-colors duration-300 py-2"
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
