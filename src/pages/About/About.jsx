import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLeaf, FaTruck, FaHeart, FaAward } from "react-icons/fa";
import "./About.css";

function About() {
  const values = [
    {
      icon: <FaLeaf size={32} />,
      title: "Pure Organic",
      description: "Certified 100% organic products from trusted farms",
    },
    {
      icon: <FaTruck size={32} />,
      title: "Fast Delivery",
      description: "Fresh products delivered to your door in 24 hours",
    },
    {
      icon: <FaHeart size={32} />,
      title: "Quality First",
      description: "We never compromise on quality and freshness",
    },
    {
      icon: <FaAward size={32} />,
      title: "Award Winning",
      description: "Recognized for excellence in organic farming",
    },
  ];

  const team = [
    { name: "Rahul Sharma", role: "Founder & CEO", emoji: "👨‍🌾" },
    { name: "Priya Singh", role: "Head of Quality", emoji: "👩‍🔬" },
    { name: "Arjun Patel", role: "Supply Chain Lead", emoji: "👨‍💼" },
    { name: "Neha Gupta", role: "Community Manager", emoji: "👩‍💻" },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-decor-1"></div>
        <div className="about-hero-decor-2"></div>

        <div className="about-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="about-hero-title">
              Our <span className="about-hero-title-green">Story</span>
            </h1>
            <div className="about-hero-underline"></div>
            <p className="about-hero-desc">
              Since 1982, MoolTrue Foods has been on a mission to bring 100% pure, authentic Indian spices to your kitchen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-section">
        <div className="about-section-container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="about-grid-two-col"
          >
            <div className="about-order-mobile-2">
              <h2 className="about-section-title">
                Taste the purity
              </h2>
              <p className="about-section-desc">
                Long before the world was as connected as it is today, humans’ insatiable appetite for flavour forged the very first international trade routes, driving commerce for many millenia. And at the heart of this trade was — and still is — India, the fabled land of spices.
              </p>
              <p className="about-section-desc">
                But even though Indian spices continue to season food in kitchens around the world, Indians themselves often complain about the options available to them at home. A recent survey found that 72% of Indians are concerned about the quality of spices they consume.
              </p>
              <p className="about-section-desc">
                At Mool, we hold a simple belief: in the spice capital of the world, you shouldn’t have to worry about what you’re putting in your plate of food. That is why we focus on the fundamentals.
              </p>
              <p className="about-section-desc">
                Our range of premium whole spices are sourced from their true origins, selected for finest quality and taste, and cleaned and processed with the highest standards of hygiene. No additives, no artificial colours and flavours, no stress for you. Mool: Taste the purity.
              </p>
            </div>
            <div className="about-order-mobile-1">
              <div className="about-legacy-card">
                <div className="about-legacy-icon">🏭</div>
                <h3 className="about-legacy-title">
                  Legacy Since 1982
                </h3>
                <div className="about-legacy-list">
                  <p className="about-legacy-item">
                    <strong>40+ Years</strong> of Excellence
                  </p>
                  <p className="about-legacy-item">
                    <strong>FSSAI & ISO</strong> Certified
                  </p>
                  <p className="about-legacy-item">
                    <strong>5+</strong> Global Markets
                  </p>
                  <p className="about-legacy-item">
                    <strong>100%</strong> Pure & Sterilized
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="about-section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-center-header"
          >
            <h2 className="about-center-title">
              Our Core Values
            </h2>
            <p className="about-center-subtitle">
              These principles guide every decision we make
            </p>
            <div className="about-center-underline"></div>
          </motion.div>

          <div className="about-values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="about-value-card"
              >
                <div className="about-value-icon">
                  {value.icon}
                </div>
                <h3 className="about-value-title">
                  {value.title}
                </h3>
                <p className="about-value-desc">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-section">
        <div className="about-section-container">
          <div className="about-split-grid">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="about-mission-card"
            >
              <h3 className="about-split-title">
                🎯 Our Mission
              </h3>
              <p className="about-split-desc">
                To ensure that the authentic taste of Indian spices reaches every household in its purest and safest form. We aim to revolutionize the spice industry through advanced sterilization technologies and strict quality control without compromising on natural aroma.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="about-vision-card"
            >
              <h3 className="about-split-title">
                🌍 Our Vision
              </h3>
              <p className="about-split-desc">
                To be the world's most trusted name in Indian Spices by setting global benchmarks in purity, hygiene, and authentic flavors, ensuring that culinary traditions are passed down safely for generations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="about-section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-center-header"
          >
            <h2 className="about-center-title">
              Meet Our Team
            </h2>
            <p className="about-center-subtitle">
              Passionate people dedicated to your health
            </p>
            <div className="about-center-underline"></div>
          </motion.div>

          <div className="about-team-grid">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="about-team-card"
              >
                <div className="about-team-img-container">
                  <div className="about-team-emoji">{member.emoji}</div>
                </div>
                <h3 className="about-team-name">
                  {member.name}
                </h3>
                <p className="about-team-role">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-cta-content"
          >
            <h2 className="about-cta-title">
              Join the Organic Revolution
            </h2>
            <p className="about-cta-desc">
              Experience the difference of fresh, farm-to-table organic food
            </p>
            <Link
              to="/shop"
              className="about-cta-btn"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;
