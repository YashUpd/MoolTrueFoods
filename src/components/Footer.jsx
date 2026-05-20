import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className='bg-gradient-to-r from-slate-900 to-slate-800 text-white'>
      {/* Newsletter Section */}
      <div className='bg-gradient-to-r from-green-500 to-green-600 px-6 sm:px-8 py-12'>
        <div className='max-w-4xl mx-auto text-center'>
          <h3 className='text-2xl sm:text-3xl font-bold mb-3'>Subscribe to Our Newsletter</h3>
          <p className='text-green-100 mb-6'>Get exclusive deals, organic product updates, and healthy recipes delivered to your inbox.</p>
          <div className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-1 px-4 py-3 rounded-lg text-black font-medium focus:outline-none focus:ring-2 focus:ring-green-400'
            />
            <button className='bg-slate-900 text-green-400 px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors duration-300'>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='px-6 sm:px-8 py-16'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
            {/* Brand Section */}
            <div>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4'>MoolTrue Foods</h2>
              <p className='text-gray-400 mb-6 leading-relaxed'>
                Your trusted source for 100% organic, farm-fresh foods delivered to your doorstep.
              </p>
              <div className='flex gap-4'>
                <a href='#' className='w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors duration-300'>
                  <FaFacebook size={18} />
                </a>
                <a href='#' className='w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors duration-300'>
                  <FaTwitter size={18} />
                </a>
                <a href='#' className='w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors duration-300'>
                  <FaInstagram size={18} />
                </a>
                <a href='#' className='w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors duration-300'>
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className='text-xl font-bold mb-6 flex items-center'>
                <span className='w-1 h-6 bg-green-500 mr-3 rounded'></span>
                Quick Links
              </h3>
              <ul className='space-y-3'>
                <li>
                  <a href='#' className='text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center'>
                    <span className='mr-2'>→</span>Home
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center'>
                    <span className='mr-2'>→</span>Shop
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center'>
                    <span className='mr-2'>→</span>About
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center'>
                    <span className='mr-2'>→</span>Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className='text-xl font-bold mb-6 flex items-center'>
                <span className='w-1 h-6 bg-green-500 mr-3 rounded'></span>
                Support
              </h3>
              <ul className='space-y-3'>
                <li>
                  <a href='#' className='text-gray-400 hover:text-green-400 transition-colors duration-300'>Recipes & Tips</a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-green-400 transition-colors duration-300'>Organic Certification</a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-green-400 transition-colors duration-300'>Delivery Info</a>
                </li>
                <li>
                  <a href='#' className='text-gray-400 hover:text-green-400 transition-colors duration-300'>Returns & Refunds</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className='text-xl font-bold mb-6 flex items-center'>
                <span className='w-1 h-6 bg-green-500 mr-3 rounded'></span>
                Contact
              </h3>
              <div className='space-y-4'>
                <div>
                  <p className='text-gray-400 text-sm mb-1'>Email</p>
                  <a href='mailto:support@mooltrue.com' className='text-green-400 hover:text-green-300 transition-colors duration-300 font-semibold'>
                    support@mooltrue.com
                  </a>
                </div>
                <div>
                  <p className='text-gray-400 text-sm mb-1'>Phone</p>
                  <a href='tel:+919876543210' className='text-green-400 hover:text-green-300 transition-colors duration-300 font-semibold'>
                    +91 9876543210
                  </a>
                </div>
                <div>
                  <p className='text-gray-400 text-sm mb-1'>Hours</p>
                  <p className='text-gray-300'>Mon-Sun 8AM-10PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='border-t border-slate-700 pt-8'>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
              <p className='text-gray-400 text-sm'>© 2026 MoolTrue Foods. All rights reserved. Certified Organic.</p>
              <div className='flex gap-6'>
                <a href='#' className='text-gray-400 hover:text-green-400 text-sm transition-colors duration-300'>Privacy Policy</a>
                <a href='#' className='text-gray-400 hover:text-green-400 text-sm transition-colors duration-300'>Terms of Service</a>
                <a href='#' className='text-gray-400 hover:text-green-400 text-sm transition-colors duration-300'>Quality Promise</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer