import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaPinterest, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa'
import "./Footer.css"

function Footer() {
  return (
    <footer className='footer'>
      {/* Main Footer Content */}
      <div className='footer-inner'>
        <div className='footer-container'>
          <div className='footer-grid'>
            
            {/* Column 1: Brand Section */}
            <div className="footer-brand">
              <Link to="/" className="footer-brand-logo">
                <span>
                  <span className="text-blue-800">Mool</span>True<span className="text-orange-500">Foods</span>
                </span>
              </Link>
              <p className='footer-brand-desc'>
                MoolTrue Spices delivers quality whole spices, powdered spices, blended masalas, and seasonings, ensuring freshness and authentic flavor in every dish.
              </p>
              <div className='footer-socials'>
                <a href='#' className='footer-social-icon text-blue-600'><FaFacebook size={24} /></a>
                <a href='#' className='footer-social-icon text-pink-600'><FaInstagram size={24} /></a>
                <a href='#' className='footer-social-icon text-blue-700'><FaLinkedin size={24} /></a>
                <a href='#' className='footer-social-icon text-red-600'><FaYoutube size={24} /></a>
                <a href='#' className='footer-social-icon text-red-700'><FaPinterest size={24} /></a>
              </div>
            </div>

            {/* Column 2: Products */}
            <div>
              <h3 className='footer-column-heading'>Products</h3>
              <ul className='footer-links-list'>
                <li><Link to='/shop' className='footer-link'>Whole Spices</Link></li>
                <li><Link to='/shop' className='footer-link'>Blended Spices</Link></li>
                <li><Link to='/shop' className='footer-link'>Ground Spices</Link></li>
                <li><Link to='/shop' className='footer-link'>Nutritious</Link></li>
                <li><Link to='/shop' className='footer-link'>Sprinklers</Link></li>
                <li><Link to='/shop' className='footer-link'>Saffron</Link></li>
                <li><Link to='/shop' className='footer-link'>All Products</Link></li>
              </ul>
            </div>

            {/* Column 3: About MoolTrue */}
            <div>
              <h3 className='footer-column-heading'>About MoolTrue Foods</h3>
              <ul className='footer-links-list'>
                <li><Link to='/about' className='footer-link'>About Us</Link></li>
                <li><Link to='/contact' className='footer-link'>Contact Us</Link></li>
                <li><Link to='#' className='footer-link'>Return / Exchange</Link></li>
                <li><Link to='#' className='footer-link'>CSR</Link></li>
              </ul>
            </div>

            {/* Column 4: Customer Services */}
            <div>
              <h3 className='footer-column-heading'>Customer Services</h3>
              <ul className='footer-links-list'>
                <li><Link to='#' className='footer-link'>Terms & Conditions</Link></li>
                <li><Link to='#' className='footer-link'>Privacy Policy</Link></li>
                <li><Link to='#' className='footer-link'>Shipping Policy</Link></li>
                <li><Link to='#' className='footer-link'>Return Policy</Link></li>
              </ul>
            </div>

            {/* Column 5: Contact Us Details */}
            <div>
              <h3 className='footer-column-heading'>Contact Us</h3>
              
              <div className='footer-contact-details'>
                <div>
                  <p className='footer-contact-title'>Mool True Foods LLP</p>
                </div>
                
                <div className="footer-contact-item">
                  <FaMapMarkerAlt className="footer-contact-icon" size={12} />
                  <div>
                    <p className='footer-contact-text-label'>Head Office</p>
                    <p className='footer-contact-text-val'>OFF -704, SS Omnia, Sector-86,<br />Gurugram, (HR) 122004</p>
                  </div>
                </div>

                <div className="footer-contact-item">
                  <FaMapMarkerAlt className="footer-contact-icon" size={12} />
                  <div>
                    <p className='footer-contact-text-label'>Manufacturing Address</p>
                    <p className='footer-contact-text-val'>Khasra No.9/6, Village Joshi Jat<br />Tehsil Rai, Bahalagarh sonipat<br />haryana, Haryana 131021</p>
                    <p className='footer-contact-text-val-fssai'>FSSAI License No -<br />Applied for</p>
                  </div>
                </div>

                <div className="footer-contact-item">
                  <FaEnvelope className="footer-contact-icon" size={12} />
                  <a href='mailto:support@mooltruefoods.in' className='footer-contact-link'>
                    support@mooltruefoods.in
                  </a>
                </div>

                <div className="footer-contact-item">
                  <FaPhone className="footer-contact-icon" size={12} />
                  <a href='tel:8796443234' className='footer-contact-link'>
                    8796443234
                  </a>
                </div>
                
                <div className="footer-cin-container">
                   <p className='footer-cin-label'>LLP No. -</p>
                   <p className='footer-cin-val'>ACW-6923</p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Bottom Bar Divider */}
          <div className='footer-bottom'>
            <div className='footer-bottom-inner'>
              
              {/* Left: Button */}
              <div>
                <Link to="/contact" className="footer-partner-btn">
                  Become Trade Partner
                </Link>
              </div>

              {/* Center: Copyright */}
              <div>
                <p className='footer-copyright'>
                  © 2026 <span className="footer-copyright-orange">MoolTrueFoods.com.</span> All Rights Reserved.
                </p>
              </div>

              {/* Right: Payment Methods & Secure text */}
              <div className="footer-security-container">
                <p className="footer-security-text">All Transactions are 100% Secure.</p>
                <div className='footer-payment-icons'>
                   <span>RuPay</span>
                   <span className="text-blue-600 italic">VISA</span>
                   <span className="text-red-500">mastercard</span>
                   <span className="text-blue-400">Paytm</span>
                   <span className="text-green-600">BHIM UPI</span>
                   <span>NETBANKING</span>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer