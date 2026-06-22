import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTruck, FaBoxOpen, FaClock, FaMapMarkedAlt, FaRupeeSign, FaExclamationCircle, FaEnvelope } from "react-icons/fa";
import "./PolicyPage.css";

function ShippingPolicy() {
  return (
    <div className="policy-page">
      {/* Hero */}
      <section className="policy-hero">
        <div className="policy-hero-decor-1"></div>
        <div className="policy-hero-decor-2"></div>
        <div className="policy-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="policy-hero-icon">
              <FaTruck size={28} />
            </div>
            <h1 className="policy-hero-title">
              Shipping <span className="policy-hero-title-green">Policy</span>
            </h1>
            <div className="policy-hero-underline"></div>
            <p className="policy-hero-desc">
              We deliver fresh, authentic spices right to your doorstep. Here's everything you need to know about our shipping process.
            </p>
            <p className="policy-hero-date">Last Updated: June 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="policy-content">
        <div className="policy-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon green"><FaMapMarkedAlt size={18} /></div>
                <h2 className="policy-section-title">Shipping Coverage</h2>
              </div>
              <p className="policy-text">
                MoolTrue Foods currently ships across India. We deliver to all major cities, towns, and most pin codes served by our logistics partners.
              </p>
              <ul className="policy-list">
                <li><strong>Metro Cities:</strong> Delhi NCR, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad</li>
                <li><strong>Tier 2 & 3 Cities:</strong> All serviceable pin codes across India</li>
                <li><strong>Remote Areas:</strong> Delivery may take additional time for remote or hard-to-reach locations</li>
              </ul>
              <p className="policy-text">
                Pin code serviceability is checked at checkout. If your area is not serviceable, we'll notify you immediately.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon blue"><FaClock size={18} /></div>
                <h2 className="policy-section-title">Delivery Timelines</h2>
              </div>
              <p className="policy-text">Estimated delivery timelines after order confirmation:</p>
              <ul className="policy-list">
                <li><strong>Metro Cities:</strong> 3–5 business days</li>
                <li><strong>Other Cities & Towns:</strong> 5–7 business days</li>
                <li><strong>Remote Areas:</strong> 7–10 business days</li>
              </ul>
              <p className="policy-text">
                Please note that delivery times may vary due to factors beyond our control, such as weather conditions, natural disasters, strikes, or public holidays. Orders placed during festive seasons may experience slight delays.
              </p>
              <div className="policy-highlight">
                <p>
                  📦 You will receive a tracking number via email and SMS once your order is dispatched. You can track your shipment in real-time through our logistics partner's website.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon orange"><FaRupeeSign size={18} /></div>
                <h2 className="policy-section-title">Shipping Charges</h2>
              </div>
              <ul className="policy-list">
                <li><strong>Free Shipping:</strong> On all prepaid orders above ₹499</li>
                <li><strong>Standard Shipping:</strong> ₹49 for orders below ₹499</li>
                <li><strong>Cash on Delivery (COD):</strong> Additional ₹30 COD handling fee applies where available</li>
              </ul>
              <p className="policy-text">
                Shipping charges, if applicable, will be clearly displayed at checkout before you complete your purchase. No hidden charges — ever.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon yellow"><FaBoxOpen size={18} /></div>
                <h2 className="policy-section-title">Order Processing</h2>
              </div>
              <p className="policy-text">
                All orders are processed within 1–2 business days after payment confirmation. Orders placed on weekends and public holidays will be processed on the next business day.
              </p>
              <ul className="policy-list">
                <li>You'll receive an order confirmation email immediately after placing your order</li>
                <li>A dispatch notification with tracking details will be sent once your order ships</li>
                <li>Our team carefully inspects and packs each order to ensure quality and freshness</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon red"><FaExclamationCircle size={18} /></div>
                <h2 className="policy-section-title">Damaged or Missing Shipments</h2>
              </div>
              <p className="policy-text">
                If you receive a damaged, tampered, or incorrect shipment, please contact us within 48 hours of delivery with:
              </p>
              <ul className="policy-list">
                <li>Your order number</li>
                <li>Clear photos of the damaged product and packaging</li>
                <li>A brief description of the issue</li>
              </ul>
              <p className="policy-text">
                We will arrange for a replacement or full refund at no extra cost. For missing deliveries, our team will coordinate with the logistics partner to resolve the issue promptly.
              </p>
              <p className="policy-text">
                Contact us at{" "}
                <a href="mailto:support@mooltruefoods.in" className="policy-email-link">support@mooltruefoods.in</a>{" "}
                or call us at <a href="tel:8796443234" className="policy-email-link">8796443234</a>.
              </p>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="policy-cta">
              <FaEnvelope size={20} style={{ color: '#15803d', marginBottom: '0.75rem' }} />
              <h3 className="policy-cta-title">Need Help With Shipping?</h3>
              <p className="policy-cta-desc">
                Our support team is ready to help with any shipping-related queries.
              </p>
              <Link to="/contact" className="policy-cta-btn">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ShippingPolicy;
