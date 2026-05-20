import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-lg border-b border-slate-700">
      {/* Logo */}
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent flex-shrink-0">
        MoolTrue Foods
      </h1>

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

        <FaShoppingCart className="text-xl lg:text-2xl cursor-pointer hover:text-green-400 hover:scale-110 transition-all duration-300" />
      </div>

      {/* Mobile Icons & Hamburger */}
      <div className="flex md:hidden items-center gap-4">
        <FaShoppingCart className="text-lg cursor-pointer hover:text-green-400 hover:scale-110 transition-all duration-300" />
        <button
          onClick={toggleMenu}
          className="text-2xl hover:text-green-400 transition-colors duration-300 focus:outline-none"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
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
