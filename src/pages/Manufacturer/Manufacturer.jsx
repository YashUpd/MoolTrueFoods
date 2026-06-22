import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaIndustry, FaMapMarkerAlt, FaIdCard, FaCheckCircle, FaTimesCircle, FaBoxOpen, FaShieldAlt, FaBuilding } from "react-icons/fa";
import "./Manufacturer.css";

const MANUFACTURERS = {
  A: {
    name: "GOODLIFE FOODS CORP",
    parentCompany: "Emaart India Corp",
    address:
      "Plot No. 1196, Block C, SGM Nagar, NIT Faridabad, Faridabad, Haryana – 121001",
    fssai: "10823003000548",
    batchPrefix: "A",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.032!2d77.312!3d28.412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI0JzQzLjIiTiA3N8KwMTgnNDMuMiJF!5e0!3m2!1sen!2sin!4v1",
  },
};

function Manufacturer() {
  const [batchChars, setBatchChars] = useState(["", "", ""]);
  const [result, setResult] = useState(null); // { found: true, data } or { found: false }
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null)];

  const handleInputChange = (index, value) => {
    // Allow only single alphanumeric character
    const char = value.replace(/[^a-zA-Z0-9]/g, "").slice(-1).toUpperCase();
    const newChars = [...batchChars];
    newChars[index] = char;
    setBatchChars(newChars);

    // Auto-focus next input
    if (char && index < 2) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !batchChars[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const firstChar = batchChars[0];
    if (!firstChar) return;

    setIsVerifying(true);
    setResult(null);

    // Simulate verification delay
    setTimeout(() => {
      const manufacturer = MANUFACTURERS[firstChar];
      if (manufacturer) {
        setResult({ found: true, data: manufacturer });
      } else {
        setResult({ found: false });
      }
      setIsVerifying(false);
    }, 1200);
  };

  const handleReset = () => {
    setBatchChars(["", "", ""]);
    setResult(null);
    inputRefs[0].current?.focus();
  };

  const allFilled = batchChars.every((c) => c !== "");

  return (
    <div className="mfr-page">
      {/* Hero Section */}
      <section className="mfr-hero">
        <div className="mfr-hero-decor-1"></div>
        <div className="mfr-hero-decor-2"></div>
        <div className="mfr-hero-decor-3"></div>

        <div className="mfr-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mfr-hero-icon">
              <FaIndustry size={40} />
            </div>
            <h1 className="mfr-hero-title">
              Manufacturing{" "}
              <span className="mfr-hero-title-green">Unit Details</span>
            </h1>
            <div className="mfr-hero-underline"></div>
            <p className="mfr-hero-desc">
              Identify your manufacturing unit by reading the first character of
              your batch number. We believe in complete transparency about where
              your food comes from.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to Find Section */}
      <section className="mfr-section">
        <div className="mfr-section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mfr-howto-card"
          >
            <div className="mfr-howto-icon-wrap">
              <FaBoxOpen size={24} />
            </div>
            <div className="mfr-howto-text">
              <h3 className="mfr-howto-title">
                How to find your Batch Code?
              </h3>
              <p className="mfr-howto-desc">
                Look at the bottom or back of your{" "}
                <strong>MoolTrue Foods</strong> product pack. The batch number
                is printed near the manufacturing date. Enter the{" "}
                <strong>first three characters</strong> below.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Verification Section */}
      <section className="mfr-section mfr-section-verify">
        <div className="mfr-section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mfr-verify-card"
          >
            <div className="mfr-verify-shield">
              <FaShieldAlt size={28} />
            </div>
            <h2 className="mfr-verify-title">Code Verification</h2>
            <p className="mfr-verify-subtitle">
              Enter the first three characters of the batch number on your pack
            </p>

            <div className="mfr-verify-inputs">
              {batchChars.map((char, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={char}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`mfr-verify-input ${char ? "filled" : ""}`}
                  placeholder="—"
                  id={`batch-input-${index}`}
                />
              ))}
            </div>

            <div className="mfr-verify-actions">
              <button
                onClick={handleVerify}
                disabled={!allFilled || isVerifying}
                className={`mfr-verify-btn ${allFilled && !isVerifying ? "active" : ""}`}
              >
                {isVerifying ? (
                  <span className="mfr-verify-spinner"></span>
                ) : (
                  "VERIFY AND PROCEED"
                )}
              </button>
              {result && (
                <button onClick={handleReset} className="mfr-reset-btn">
                  Try Another
                </button>
              )}
            </div>
          </motion.div>

          {/* Result Section */}
          <AnimatePresence>
            {result && result.found && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mfr-result-card"
              >
                <div className="mfr-result-header">
                  <div className="mfr-result-check">
                    <FaCheckCircle size={28} />
                  </div>
                  <div>
                    <h3 className="mfr-result-title">
                      Manufacturing Unit Identified
                    </h3>
                    <p className="mfr-result-batch">
                      Batch Prefix:{" "}
                      <strong>{batchChars.join("")}</strong>
                    </p>
                  </div>
                </div>

                <div className="mfr-result-body">
                  <div className="mfr-result-info-grid">
                    <div className="mfr-result-info-item">
                      <div className="mfr-result-info-icon">
                        <FaBuilding size={18} />
                      </div>
                      <div>
                        <p className="mfr-result-info-label">Manufacturer</p>
                        <p className="mfr-result-info-value">
                          {result.data.name}
                        </p>
                        <p className="mfr-result-info-sub">
                          ({result.data.parentCompany})
                        </p>
                      </div>
                    </div>

                    <div className="mfr-result-info-item">
                      <div className="mfr-result-info-icon">
                        <FaMapMarkerAlt size={18} />
                      </div>
                      <div>
                        <p className="mfr-result-info-label">
                          Manufacturing Unit Address
                        </p>
                        <p className="mfr-result-info-value">
                          {result.data.address}
                        </p>
                      </div>
                    </div>

                    <div className="mfr-result-info-item">
                      <div className="mfr-result-info-icon fssai-icon">
                        <FaIdCard size={18} />
                      </div>
                      <div>
                        <p className="mfr-result-info-label">
                          FSSAI Licence No.
                        </p>
                        <p className="mfr-result-info-value fssai-value">
                          {result.data.fssai}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {result && !result.found && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mfr-result-card mfr-result-notfound"
              >
                <div className="mfr-result-header">
                  <div className="mfr-result-check mfr-result-error">
                    <FaTimesCircle size={28} />
                  </div>
                  <div>
                    <h3 className="mfr-result-title">
                      No Match Found
                    </h3>
                    <p className="mfr-result-batch">
                      We couldn't find a manufacturing unit matching batch prefix{" "}
                      <strong>{batchChars.join("")}</strong>
                    </p>
                  </div>
                </div>
                <p className="mfr-result-notfound-desc">
                  Please double-check the batch code on your product packaging.
                  If the issue persists, contact us at{" "}
                  <a href="mailto:support@mooltruefoods.in">
                    support@mooltruefoods.in
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* All Units Info Section */}
      <section className="mfr-section mfr-section-units">
        <div className="mfr-section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mfr-units-header"
          >
            <h2 className="mfr-units-title">Our Manufacturing Units</h2>
            <p className="mfr-units-subtitle">
              All our facilities are FSSAI certified and maintain the highest
              standards of food safety and hygiene
            </p>
            <div className="mfr-units-underline"></div>
          </motion.div>

          <div className="mfr-units-grid">
            {Object.entries(MANUFACTURERS).map(([prefix, mfr], index) => (
              <motion.div
                key={prefix}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="mfr-unit-card"
              >
                <div className="mfr-unit-badge">
                  Batch Prefix: <strong>{prefix}</strong>
                </div>

                <div className="mfr-unit-content">
                  <div className="mfr-unit-icon-wrap">
                    <FaIndustry size={24} />
                  </div>
                  <h3 className="mfr-unit-name">{mfr.name}</h3>
                  <p className="mfr-unit-parent">({mfr.parentCompany})</p>

                  <div className="mfr-unit-details">
                    <div className="mfr-unit-detail-row">
                      <FaMapMarkerAlt
                        className="mfr-unit-detail-icon"
                        size={14}
                      />
                      <p className="mfr-unit-detail-text">{mfr.address}</p>
                    </div>
                    <div className="mfr-unit-detail-row">
                      <FaIdCard
                        className="mfr-unit-detail-icon fssai-icon"
                        size={14}
                      />
                      <p className="mfr-unit-detail-text">
                        FSSAI Licence No.{" "}
                        <strong className="fssai-value">{mfr.fssai}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust CTA */}
      <section className="mfr-cta">
        <div className="mfr-section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mfr-cta-content"
          >
            <h2 className="mfr-cta-title">
              Quality You Can Trust
            </h2>
            <p className="mfr-cta-desc">
              Every MoolTrue product is manufactured in FSSAI-certified
              facilities with the highest standards of hygiene and quality
              control.
            </p>
            <Link to="/shop" className="mfr-cta-btn">
              Explore Our Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Manufacturer;
