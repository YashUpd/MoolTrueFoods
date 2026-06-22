import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart, FaSeedling, FaUsers, FaGraduationCap, FaRecycle, FaHandsHelping, FaLeaf } from "react-icons/fa";
import "./CSR.css";

function CSR() {
  const pillars = [
    {
      icon: <FaSeedling size={22} />,
      iconClass: "green",
      title: "Sustainable Sourcing",
      description:
        "We work directly with local farmers and cooperatives, ensuring fair trade practices and promoting organic farming methods that protect the soil and biodiversity.",
    },
    {
      icon: <FaUsers size={22} />,
      iconClass: "blue",
      title: "Farmer Empowerment",
      description:
        "We provide training programs, quality seed distribution, and financial support to small-scale spice farmers, helping them improve yields and secure better livelihoods.",
    },
    {
      icon: <FaRecycle size={22} />,
      iconClass: "orange",
      title: "Eco-Friendly Packaging",
      description:
        "We are committed to reducing our environmental footprint by transitioning to recyclable and biodegradable packaging materials across our product range.",
    },
    {
      icon: <FaGraduationCap size={22} />,
      iconClass: "purple",
      title: "Education & Skill Development",
      description:
        "We support educational initiatives in farming communities, including scholarships, vocational training, and digital literacy programs for rural youth.",
    },
    {
      icon: <FaHandsHelping size={22} />,
      iconClass: "yellow",
      title: "Community Welfare",
      description:
        "We contribute to community health camps, clean water initiatives, and women's self-help groups in the regions where our spices are grown and processed.",
    },
    {
      icon: <FaLeaf size={22} />,
      iconClass: "green",
      title: "Zero Waste Manufacturing",
      description:
        "Our manufacturing facility aims to minimize waste through efficient processing methods, recycling by-products, and responsible disposal of all waste materials.",
    },
  ];

  return (
    <div className="csr-page">
      {/* Hero */}
      <section className="csr-hero">
        <div className="csr-hero-decor-1"></div>
        <div className="csr-hero-decor-2"></div>
        <div className="csr-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="csr-hero-icon">
              <FaHandHoldingHeart size={32} />
            </div>
            <h1 className="csr-hero-title">
              Corporate Social{" "}
              <span className="csr-hero-title-green">Responsibility</span>
            </h1>
            <div className="csr-hero-underline"></div>
            <p className="csr-hero-desc">
              At MoolTrue Foods, we believe that great taste and great values go
              hand in hand. Our commitment extends beyond quality spices — to
              the people and planet that make it all possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Pillars */}
      <section className="csr-section csr-section-white">
        <div className="csr-section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="csr-center-header"
          >
            <h2 className="csr-center-title">Our CSR Pillars</h2>
            <p className="csr-center-subtitle">
              Six core areas that guide our social responsibility initiatives
            </p>
            <div className="csr-center-underline"></div>
          </motion.div>

          <div className="csr-pillars-grid">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="csr-pillar-card"
              >
                <div className={`csr-pillar-icon ${pillar.iconClass}`}>
                  {pillar.icon}
                </div>
                <h3 className="csr-pillar-title">{pillar.title}</h3>
                <p className="csr-pillar-desc">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="csr-section">
        <div className="csr-section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="csr-center-header"
          >
            <h2 className="csr-center-title">Our Commitment</h2>
            <p className="csr-center-subtitle">
              Making a positive impact on society and the environment
            </p>
            <div className="csr-center-underline"></div>
          </motion.div>

          <div className="csr-commitment-grid">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="csr-commitment-card"
            >
              <div className="csr-commitment-emoji">🌿</div>
              <h3 className="csr-commitment-title">For Our Planet</h3>
              <p className="csr-commitment-desc">
                We are working towards carbon-neutral operations by 2030. From
                solar-powered manufacturing to water conservation systems, every
                step we take is designed to leave a lighter footprint on our
                planet. We believe that the spices that come from the earth
                should give back to it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="csr-commitment-card alt"
            >
              <div className="csr-commitment-emoji">🤝</div>
              <h3 className="csr-commitment-title">For Our People</h3>
              <p className="csr-commitment-desc">
                Every spice in your kitchen represents the hard work of
                thousands of farmers. We ensure fair compensation, safe working
                conditions, and growth opportunities for every person in our
                supply chain. We're building a future where quality food also
                means quality lives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="csr-cta">
        <div className="csr-section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="csr-cta-content"
          >
            <h2 className="csr-cta-title">
              Join Us in Making a Difference
            </h2>
            <p className="csr-cta-desc">
              Every purchase you make supports sustainable farming, fair trade,
              and community development. Together, we can build a better future.
            </p>
            <Link to="/shop" className="csr-cta-btn">
              Shop With Purpose
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default CSR;
