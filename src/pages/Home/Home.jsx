import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import CategorySection from "../../components/CategorySection/CategorySection";
import ProductCard from "../../components/ProductCard/ProductCard";
import products from "../../data/products";
import "./Home.css";

function Home() {
  const wholeSpices = products.filter(p => p.category === "Whole Spices").slice(0, 4);
  const blendedSpices = products.filter(p => p.category === "Blended Spices").slice(0, 4);

  const finestReasons = [
    {
      icon: "🔬",
      title: "27 Quality Checks",
      desc: "Every batch is rigorously tested in our state-of-the-art labs to ensure maximum purity and safety.",
    },
    {
      icon: "🛡️",
      title: "ETO Sterilized",
      desc: "We use ETO sterilization technology to make our spices 100% safe from harmful bacteria.",
    },
    {
      icon: "🌱",
      title: "Fumigation Free",
      desc: "Our spices are processed without harmful chemicals, preserving natural essential oils.",
    },
    {
      icon: "🌍",
      title: "Sourced from Origin",
      desc: "Handpicked from the finest spice farms across India for authentic regional flavors.",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Category Section (Our Product Range) */}
      <CategorySection />

      {/* Whole Spices Section */}
      <section className="home-section bg-white border-bottom">
        <div className="home-container">
          <div className="home-section-header">
            <div>
              <h2 className="home-section-title">Our Whole Spices</h2>
              <div className="home-section-underline"></div>
            </div>
            <Link to="/shop" className="home-view-all-desktop">
              View All →
            </Link>
          </div>
          
          <div className="home-products-grid">
            {wholeSpices.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <div className="home-view-all-mobile-container">
            <Link to="/shop" className="home-view-all-mobile-btn">
              View All Whole Spices
            </Link>
          </div>
        </div>
      </section>

      {/* Blended Spices Section */}
      <section className="home-section bg-gray border-bottom">
        <div className="home-container">
          <div className="home-section-header">
            <div>
              <h2 className="home-section-title">Blended Spices</h2>
              <div className="home-section-underline"></div>
            </div>
            <Link to="/shop" className="home-view-all-desktop">
              View All →
            </Link>
          </div>
          
          <div className="home-products-grid">
            {blendedSpices.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we are the Finest Spices Section */}
      <section className="home-section py-24 bg-white">
        <div className="home-container">
          <div className="home-center-header">
            <h2 className="home-center-title">
              Why we are the <span className="home-center-title-green">Finest Spices</span> of India?
            </h2>
            <div className="home-center-underline"></div>
          </div>

          <div className="home-reasons-grid">
            {finestReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="home-reason-card"
              >
                <div className="home-reason-icon-wrap">
                  {reason.icon}
                </div>
                <h3 className="home-reason-title">
                  {reason.title}
                </h3>
                <p className="home-reason-desc">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta-section">
        {/* Decor */}
        <div className="home-cta-decor-1"></div>
        <div className="home-cta-decor-2"></div>
        
        <div className="home-cta-container">
          <h2 className="home-cta-title">
            Start Your Pure Spices Journey
          </h2>
          <p className="home-cta-desc">
            Experience the difference of authentic, lab-tested Indian spices. Your first order comes with a special welcome discount.
          </p>
          <Link
            to="/shop"
            className="home-cta-btn"
          >
            Shop Now & Get 20% Off
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
