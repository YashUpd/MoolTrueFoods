import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUndo, FaBoxOpen, FaClipboardCheck, FaClock, FaExchangeAlt, FaBan, FaEnvelope } from "react-icons/fa";
import "./PolicyPage.css";

function ReturnPolicy() {
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
              <FaUndo size={28} />
            </div>
            <h1 className="policy-hero-title">
              Return & <span className="policy-hero-title-green">Exchange Policy</span>
            </h1>
            <div className="policy-hero-underline"></div>
            <p className="policy-hero-desc">
              Your satisfaction is our priority. If you're not happy with your purchase, we're here to make it right.
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
                <div className="policy-section-icon green"><FaClipboardCheck size={18} /></div>
                <h2 className="policy-section-title">Return Eligibility</h2>
              </div>
              <p className="policy-text">
                We accept returns and exchanges under the following conditions:
              </p>
              <ul className="policy-list">
                <li>The product is damaged, defective, or spoiled upon delivery</li>
                <li>You received the wrong product or an incorrect quantity</li>
                <li>The product packaging is tampered with or broken</li>
                <li>The product has expired or is nearing its expiry date at the time of delivery</li>
              </ul>
              <div className="policy-highlight">
                <p>
                  📸 Please take clear photos or a short video of the product and packaging when reporting an issue. This helps us process your request faster.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon blue"><FaClock size={18} /></div>
                <h2 className="policy-section-title">Return Window</h2>
              </div>
              <p className="policy-text">
                Returns and exchange requests must be raised within <strong>7 days</strong> of receiving your order. Requests made after this period may not be entertained.
              </p>
              <p className="policy-text">To initiate a return or exchange:</p>
              <ul className="policy-list">
                <li>Email us at <a href="mailto:support@mooltruefoods.in" className="policy-email-link">support@mooltruefoods.in</a> with your order number and photos of the issue</li>
                <li>Or call us at <a href="tel:8796443234" className="policy-email-link">8796443234</a></li>
                <li>Our team will review your request and respond within 24–48 hours</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon orange"><FaExchangeAlt size={18} /></div>
                <h2 className="policy-section-title">Exchange Process</h2>
              </div>
              <p className="policy-text">
                If you wish to exchange a product, we will arrange for:
              </p>
              <ul className="policy-list">
                <li>A pickup of the original product from your delivery address (at no extra cost)</li>
                <li>Dispatch of the replacement product within 2–3 business days after receiving the returned item</li>
                <li>If the exact product is unavailable, you may choose an alternative or opt for a full refund</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon yellow"><FaBoxOpen size={18} /></div>
                <h2 className="policy-section-title">Refund Process</h2>
              </div>
              <p className="policy-text">
                Once your return is approved:
              </p>
              <ul className="policy-list">
                <li><strong>Prepaid Orders:</strong> Refund will be credited to your original payment method within 5–7 business days</li>
                <li><strong>COD Orders:</strong> Refund will be processed via bank transfer (NEFT/IMPS). You'll need to provide your bank details</li>
                <li><strong>Wallet / UPI:</strong> Refund typically reflects within 2–3 business days</li>
              </ul>
              <p className="policy-text">
                Shipping charges, if any, are non-refundable unless the return is due to our error (wrong product, damaged item, etc.).
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon red"><FaBan size={18} /></div>
                <h2 className="policy-section-title">Non-Returnable Items</h2>
              </div>
              <p className="policy-text">
                The following items are not eligible for returns or exchanges:
              </p>
              <ul className="policy-list">
                <li>Products that have been opened, used, or are not in their original packaging</li>
                <li>Items damaged due to misuse, mishandling, or improper storage by the customer</li>
                <li>Products purchased during clearance or flash sales (unless defective)</li>
                <li>Gift cards or promotional vouchers</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon purple"><FaUndo size={18} /></div>
                <h2 className="policy-section-title">Cancellation Policy</h2>
              </div>
              <p className="policy-text">
                You may cancel your order before it has been dispatched. Once shipped, the order cannot be cancelled and will follow the standard return process.
              </p>
              <ul className="policy-list">
                <li>Cancellations made within 2 hours of order placement are processed instantly</li>
                <li>For cancellations after 2 hours but before dispatch, please contact our support team</li>
                <li>Refunds for cancelled orders are processed within 3–5 business days</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
            <div className="policy-cta">
              <FaEnvelope size={20} style={{ color: '#15803d', marginBottom: '0.75rem' }} />
              <h3 className="policy-cta-title">Need to Return Something?</h3>
              <p className="policy-cta-desc">
                Reach out to our support team and we'll guide you through the process.
              </p>
              <Link to="/contact" className="policy-cta-btn">Contact Support</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ReturnPolicy;
