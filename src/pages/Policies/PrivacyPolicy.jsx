import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaDatabase, FaLock, FaCookieBite, FaUserCog, FaShareAlt, FaEnvelope } from "react-icons/fa";
import "./PolicyPage.css";

function PrivacyPolicy() {
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
              <FaShieldAlt size={28} />
            </div>
            <h1 className="policy-hero-title">
              Privacy <span className="policy-hero-title-green">Policy</span>
            </h1>
            <div className="policy-hero-underline"></div>
            <p className="policy-hero-desc">
              Your privacy matters to us. This policy explains how MoolTrue Foods collects, uses, and protects your personal information.
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
                <div className="policy-section-icon green"><FaDatabase size={18} /></div>
                <h2 className="policy-section-title">Information We Collect</h2>
              </div>
              <p className="policy-text">We collect information that you provide directly to us when you:</p>
              <ul className="policy-list">
                <li>Create an account or sign in using Google</li>
                <li>Place an order or make a purchase</li>
                <li>Subscribe to our newsletter or promotional communications</li>
                <li>Contact our customer support team</li>
                <li>Participate in surveys, contests, or promotions</li>
              </ul>
              <p className="policy-text">
                This information may include your name, email address, phone number, delivery address, and payment details. We may also collect device information, browsing behaviour, and IP addresses automatically when you visit our website.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon blue"><FaUserCog size={18} /></div>
                <h2 className="policy-section-title">How We Use Your Information</h2>
              </div>
              <p className="policy-text">We use the collected information for the following purposes:</p>
              <ul className="policy-list">
                <li>Processing and fulfilling your orders, including delivery and payment processing</li>
                <li>Sending order confirmations, shipping updates, and delivery notifications</li>
                <li>Providing customer support and responding to your inquiries</li>
                <li>Personalising your shopping experience and showing relevant product recommendations</li>
                <li>Improving our website, products, and services through analytics</li>
                <li>Sending promotional offers and marketing communications (with your consent)</li>
                <li>Detecting and preventing fraud and ensuring the security of our platform</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon orange"><FaShareAlt size={18} /></div>
                <h2 className="policy-section-title">Information Sharing</h2>
              </div>
              <p className="policy-text">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only with:
              </p>
              <ul className="policy-list">
                <li><strong>Service Providers:</strong> Trusted partners who assist us in operating our website, processing payments, and delivering orders (e.g., payment gateways, logistics partners)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental regulation</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
              <p className="policy-text">
                All third-party partners are contractually obligated to protect your information and use it only for the purposes specified by us.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon yellow"><FaCookieBite size={18} /></div>
                <h2 className="policy-section-title">Cookies & Tracking</h2>
              </div>
              <p className="policy-text">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies help us:
              </p>
              <ul className="policy-list">
                <li>Remember your preferences and login sessions</li>
                <li>Analyse website traffic and usage patterns</li>
                <li>Deliver personalised content and advertisements</li>
                <li>Maintain your shopping cart between visits</li>
              </ul>
              <p className="policy-text">
                You can manage cookie preferences through your browser settings. Please note that disabling cookies may affect certain functionalities of the website.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon red"><FaLock size={18} /></div>
                <h2 className="policy-section-title">Data Security</h2>
              </div>
              <p className="policy-text">
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="policy-list">
                <li>SSL/TLS encryption for all data transmitted between your browser and our servers</li>
                <li>PCI-DSS compliant payment processing through certified payment gateways</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Restricted access to personal information on a need-to-know basis</li>
              </ul>
              <div className="policy-highlight">
                <p>
                  We never store your complete credit/debit card details on our servers. All payment data is handled by our PCI-DSS compliant payment partners.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="policy-section">
              <div className="policy-section-header">
                <div className="policy-section-icon purple"><FaUserCog size={18} /></div>
                <h2 className="policy-section-title">Your Rights</h2>
              </div>
              <p className="policy-text">You have the right to:</p>
              <ul className="policy-list">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your account and associated data</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Withdraw consent for data processing where applicable</li>
              </ul>
              <p className="policy-text">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:support@mooltruefoods.in" className="policy-email-link">support@mooltruefoods.in</a>
              </p>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
            <div className="policy-cta">
              <FaEnvelope size={20} style={{ color: '#15803d', marginBottom: '0.75rem' }} />
              <h3 className="policy-cta-title">Privacy Concerns?</h3>
              <p className="policy-cta-desc">
                If you have any questions or concerns about our privacy practices, we're here to help.
              </p>
              <Link to="/contact" className="policy-cta-btn">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
