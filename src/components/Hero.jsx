import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      {/* Background Decor */}
      <div className="hero-decor-container">
        <div className="hero-decor-1"></div>
        <div className="hero-decor-2"></div>
        <div className="hero-decor-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-grid">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-content"
          >
            <div className="hero-badge">
              Premium Quality Spices
            </div>
            <h1 className="hero-title">
              Pure Authentic <br />
              <span className="hero-title-green">Indian Spices</span>
            </h1>
            <p className="hero-desc">
              Experience the true essence of Indian flavors. Carefully sourced, rigorously tested, and packed with purity to elevate your everyday meals.
            </p>

            <div className="hero-ctas">
              <Link
                to="/shop"
                className="hero-btn-primary"
              >
                Shop Now
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
              <Link
                to="/about"
                className="hero-btn-secondary"
              >
                Our Story
              </Link>
            </div>
            
            <div className="hero-features">
              <div className="hero-feature-item">
                <div className="hero-feature-icon">✓</div>
                <span>FSSAI Certified</span>
              </div>
              <div className="hero-feature-item">
                <div className="hero-feature-icon">✓</div>
                <span>100% Pure</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side Visual (spice image) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hero-visual"
          >
            <div className="hero-visual-bg"></div>
            <div className="hero-visual-card">
               <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80" alt="Indian Spices" />
            </div>
            
            {/* Floating badge */}
            <div className="hero-floating-badge">
              <div className="hero-floating-badge-star">⭐</div>
              <div>
                <p className="hero-floating-badge-title">Top Rated</p>
                <p className="hero-floating-badge-desc">By 10,000+ Chefs</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
