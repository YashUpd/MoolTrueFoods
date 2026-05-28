import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShieldAlt, FaTruck, FaStar } from "react-icons/fa";
import "./Hero.css";

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularSearches = ["Ghee", "Turmeric", "Honey", "Almonds", "Chia Seeds"];

  return (
    <section className="hero">
      {/* Background decorative elements */}
      <div className="hero-bg-orb hero-bg-orb-1"></div>
      <div className="hero-bg-orb hero-bg-orb-2"></div>
      <div className="hero-bg-orb hero-bg-orb-3"></div>
      <div className="hero-bg-pattern"></div>

      <div className="hero-container">
        <div className="hero-grid">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-content"
          >
            <div className="hero-badge animate-fade-in">
              🌿 Premium Quality Organic Foods
            </div>
            <h1 className="hero-title">
              Taste the <br />
              <span className="hero-title-green">Purity</span>
              <span className="hero-title-dot">.</span>
            </h1>
            <p className="hero-desc">
              Premium whole spices sourced from their true origins. No additives, no artificial colours and flavours, no stress for you.
            </p>



            <div className="hero-ctas">
              <Link
                to="/shop"
                className="btn btn-secondary hero-btn-main"
              >
                Shop Collection
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="hero-btn-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="hero-stats-row"
            >
              <div className="hero-stat">
                <span className="hero-stat-value">10K+</span>
                <span className="hero-stat-label">Happy Customers</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-value">100%</span>
                <span className="hero-stat-label">Organic Certified</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-value">50+</span>
                <span className="hero-stat-label">Farm Partners</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hero-visual"
          >
            <div className="hero-visual-card">
               <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80" alt="Organic Indian Spices and Ghee" />
               <div className="hero-overlay"></div>
            </div>
            
            {/* Floating Glass-morphic Card - Bottom Left */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="glass-panel hero-floating-card"
            >
              <div className="hero-floating-icon">🌿</div>
              <div>
                <p className="hero-floating-title">100% Organic</p>
                <p className="hero-floating-desc">Pure & Natural</p>
              </div>
            </motion.div>

            {/* Second Floating Card - Top Right */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="glass-panel hero-floating-card-2"
            >
              <div className="hero-floating-icon-2">⭐</div>
              <div>
                <p className="hero-floating-title">4.9 Rating</p>
                <p className="hero-floating-desc">10K+ Reviews</p>
              </div>
            </motion.div>

            {/* Third Floating Card - Mid Right */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="glass-panel hero-floating-card-3"
            >
              <FaShieldAlt className="hero-floating-shield" />
              <span className="hero-floating-title-sm">Lab Tested</span>
            </motion.div>

            {/* Decorative spinning element */}
            <div className="hero-spin-decor animate-spin-slow">
              <span>✦</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
