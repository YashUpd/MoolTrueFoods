import { useState, useEffect } from "react";
import { FaHandshake, FaIdBadge, FaComments, FaQuestionCircle, FaMapMarkerAlt, FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [activeModal, setActiveModal] = useState(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const inquiryCards = [
    {
      title: "Business Enquiries",
      icon: <FaHandshake size={42} className="text-[#194b82]" />,
      details: [
        { type: "Email", info: "b2b@mooltrue.com" },
        { type: "Phone", info: "+91 9876543210" }
      ]
    },
    {
      title: "Career Enquiries",
      icon: <FaIdBadge size={42} className="text-[#194b82]" />,
      details: [
        { type: "Email", info: "hr@mooltrue.com" },
        { type: "Email", info: "careers@mooltrue.com" }
      ]
    },
    {
      title: "Suggestions & Complaints",
      icon: <FaComments size={42} className="text-[#194b82]" />,
      details: [
        { type: "Email", info: "support@mooltrue.com" }
      ]
    },
    {
      title: "Product Query",
      icon: <FaQuestionCircle size={42} className="text-[#194b82]" />,
      details: [
        { type: "Email", info: "info@mooltrue.com" },
        { type: "Phone", info: "1800-123-4567" }
      ]
    }
  ];

  return (
    <div className="contact-page">
      
      {/* Main Container */}
      <div className="contact-container">
        
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">
            Contact Us
          </h1>
        </div>

        {/* Inquiry Cards Grid */}
        <div className="contact-cards-grid">
          {inquiryCards.map((card, index) => (
            <button
              key={index}
              onClick={() => setActiveModal(card)}
              className={`contact-card ${
                activeModal?.title === card.title ? 'active' : 'inactive'
              }`}
            >
              <div className="contact-card-icon-wrap">
                {/* Simulated Orange Accent */}
                <div className="contact-card-accent-dot"></div>
                {card.icon}
              </div>
              <h3 className="contact-card-title">
                {card.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Visit Us Section */}
        <div>
          <h2 className="contact-visit-title">Visit Us</h2>
          
          <div className="contact-visit-grid">
            
            {/* Left Column: Contact Details */}
            <div className="contact-details-col">
              
              <div className="contact-detail-item">
                <div className="contact-detail-icon-circle blue">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div className="contact-detail-content">
                  <h4 className="contact-detail-heading">Head Office</h4>
                  <p className="contact-detail-text">
                    3rd Floor, B-63 Prashant Vihar Road New Delhi<br />
                    110085, India
                  </p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon-circle blue">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div className="contact-detail-content">
                  <h4 className="contact-detail-heading">Manufacturing Address</h4>
                  <p className="contact-detail-text">
                    Khasra No.9/6, Village Joshi Jat Tehsil Rai,<br />
                    Bahalagarh sonipat haryana, Haryana 131021
                  </p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon-circle yellow">
                  <FaEnvelope size={18} />
                </div>
                <div className="contact-detail-content">
                  <h4 className="contact-detail-heading">Email Us</h4>
                  <a href="mailto:info@mooltrue.com" className="contact-detail-link">
                    info@mooltrue.com
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon-circle orange">
                  <FaPhone size={18} />
                </div>
                <div className="contact-detail-content">
                  <h4 className="contact-detail-heading">Call Us</h4>
                  <a href="tel:01146370000" className="contact-detail-link">
                    011-4637-0000
                  </a>
                </div>
              </div>

              <div className="contact-fssai-padding">
                <div>
                  <h4 className="contact-detail-heading">FSSAI License No</h4>
                  <p className="contact-detail-text">
                    10016064000917
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Google Map */}
            <div className="contact-map-col">
              <div className="contact-map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13997.433890250668!2d77.126588!3d28.718047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d017a41981b95%3A0xc3c5095d33f114c0!2sPrashant%20Vihar%2C%20Sector%2014%2C%20Rohini%2C%20Delhi%2C%20110085!5e0!3m2!1sen!2sin!4v1716541577789!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="contact-modal-overlay">
          <div 
            className="contact-modal-backdrop"
            onClick={() => setActiveModal(null)}
          ></div>
          
          <div className="contact-modal-content">
            {/* Modal Header */}
            <div className="contact-modal-header">
              <h3 className="contact-modal-title">
                {activeModal.title}
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="contact-modal-close"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="contact-modal-body">
              {activeModal.details.map((detail, idx) => (
                <div key={idx} className="contact-detail-item">
                  <div className={`contact-detail-icon-circle ${detail.type === 'Phone' ? 'orange' : 'yellow'}`}>
                    {detail.type === 'Phone' ? <FaPhone size={20} /> : <FaEnvelope size={20} />}
                  </div>
                  <div className="contact-detail-content">
                    <h4 className="contact-detail-heading">{detail.type}</h4>
                    <a 
                      href={detail.type === 'Phone' ? `tel:${detail.info.replace(/[^0-9+]/g, '')}` : `mailto:${detail.info}`}
                      className="contact-detail-link"
                      style={{ marginTop: 0 }}
                    >
                      {detail.info}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Contact;
