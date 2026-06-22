import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFileContract, FaUserShield, FaGavel, FaCreditCard, FaExclamationTriangle, FaBan, FaBalanceScale, FaEnvelope } from "react-icons/fa";
import "./PolicyPage.css";

function TermsConditions() {
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
              <FaFileContract size={28} />
            </div>
            <h1 className="policy-hero-title">
              Terms & <span className="policy-hero-title-green">Conditions</span>
            </h1>
            <div className="policy-hero-underline"></div>
            <p className="policy-hero-desc">
              Please read these terms and conditions carefully before using the MoolTrue Foods website and services.
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
                <div className="policy-section-icon green"><FaGavel size={18} /></div>
                <h2 className="policy-section-title">Acceptance of Terms</h2>
              </div>
              <p className="policy-text">
                By accessing and using the MoolTrue Foods website (www.mooltruefoods.in), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this website.
              </p>
              <p className="policy-text">
                MoolTrue Foods reserves the right to update or modify these terms at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the new terms.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon blue"><FaUserShield size={18} /></div>
                <h2 className="policy-section-title">Use of Website</h2>
              </div>
              <p className="policy-text">You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others. Specifically, you agree to:</p>
              <ul className="policy-list">
                <li>Provide accurate and complete information when creating an account or placing an order</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Not use the website for any fraudulent or illegal activity</li>
                <li>Not attempt to interfere with the proper functioning of the website</li>
                <li>Not reproduce, duplicate, or resell any part of the website without express written permission</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon orange"><FaCreditCard size={18} /></div>
                <h2 className="policy-section-title">Orders & Payments</h2>
              </div>
              <p className="policy-text">
                All orders placed through the website are subject to acceptance and availability. MoolTrue Foods reserves the right to refuse or cancel any order for any reason, including product availability, errors in product or pricing information, or issues identified by our fraud detection systems.
              </p>
              <ul className="policy-list">
                <li>Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise</li>
                <li>Payment must be made in full at the time of placing the order</li>
                <li>We accept payments via UPI, credit/debit cards, net banking, and other supported payment methods</li>
                <li>All payment information is processed securely through our certified payment gateway partners</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon yellow"><FaBalanceScale size={18} /></div>
                <h2 className="policy-section-title">Intellectual Property</h2>
              </div>
              <p className="policy-text">
                All content on this website, including but not limited to text, graphics, logos, images, product descriptions, and software, is the property of Mool True Foods LLP and is protected by Indian and international copyright, trademark, and intellectual property laws.
              </p>
              <p className="policy-text">
                The MoolTrue Foods name, logo, and all related product names, design marks, and slogans are trademarks of Mool True Foods LLP. Use of any MoolTrue Foods trademark without prior written consent is strictly prohibited.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon red"><FaExclamationTriangle size={18} /></div>
                <h2 className="policy-section-title">Limitation of Liability</h2>
              </div>
              <p className="policy-text">
                MoolTrue Foods shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of this website or products purchased through it. Our total liability shall not exceed the amount paid by you for the specific product giving rise to the claim.
              </p>
              <p className="policy-text">
                We make every effort to ensure that product descriptions, images, and nutritional information are accurate. However, we do not warrant that the content on the website is error-free or complete.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon purple"><FaBan size={18} /></div>
                <h2 className="policy-section-title">Governing Law & Jurisdiction</h2>
              </div>
              <p className="policy-text">
                These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Gurugram, Haryana.
              </p>
              <div className="policy-highlight">
                <p>
                  By using our website and purchasing our products, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
            <div className="policy-cta">
              <FaEnvelope size={20} style={{ color: '#15803d', marginBottom: '0.75rem' }} />
              <h3 className="policy-cta-title">Have Questions?</h3>
              <p className="policy-cta-desc">
                If you have any questions about these Terms & Conditions, reach out to us.
              </p>
              <Link to="/contact" className="policy-cta-btn">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default TermsConditions;
