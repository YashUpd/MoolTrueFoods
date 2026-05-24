import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: <FaPhone size={24} />,
      title: "Customer Care",
      info: "+91 1800-XXX-XXXX",
      subtext: "Mon-Sat 9AM-6PM",
    },
    {
      icon: <FaEnvelope size={24} />,
      title: "Bulk / B2B Orders",
      info: "b2b@mooltrue.com",
      subtext: "For distributors & restaurants",
    },
    {
      icon: <FaMapMarkerAlt size={24} />,
      title: "Corporate Office",
      info: "New Delhi, India",
      subtext: "Global Headquarters",
    },
    {
      icon: <FaMapMarkerAlt size={24} />,
      title: "Manufacturing Unit",
      info: "Haryana, India",
      subtext: "FSSAI Certified Facility",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-32 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Get in{" "}
              <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-green-100"
              >
                <div className="text-green-600 mb-4 group-hover:scale-110 group-hover:text-green-500 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-green-600 font-semibold mb-1">{item.info}</p>
                <p className="text-sm text-gray-600">{item.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-green-100"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 outline-none text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 outline-none text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us how we can help..."
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 outline-none text-gray-900 placeholder-gray-400 resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 mt-8"
                >
                  Send Message
                </button>

                {/* Success Message */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-50 border-2 border-green-400 text-green-700 px-6 py-4 rounded-xl font-semibold text-center"
                  >
                    ✓ Message sent successfully! We'll be in touch soon.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Partner With Us
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Whether you are a retailer, distributor, or a restaurant owner looking for premium sterilized spices in bulk, we have dedicated programs for you. Reach out to our B2B team for special pricing and sample requests.
                </p>
              </div>

              {/* FAQ Section */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Inquiry Types
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      🤝 Distributorship
                    </h4>
                    <p className="text-gray-600">
                      Join our pan-India network of authorized spice distributors.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      🏭 HoReCa & Bulk
                    </h4>
                    <p className="text-gray-600">
                      Special wholesale packaging and pricing for Hotels, Restaurants, and Cafes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      🌍 Export Inquiries
                    </h4>
                    <p className="text-gray-600">
                      We export our ISO-certified spices globally. Contact our export division.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      🛒 Retail Customers
                    </h4>
                    <p className="text-gray-600">
                      For issues with your online retail order, please provide your Order ID in the message.
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  ⏱️ Response Time
                </h3>
                <p className="text-gray-700 mb-4">
                  We aim to respond to all inquiries within:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-green-600 font-bold mr-3">✓</span>{" "}
                    Emails: 24 hours
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 font-bold mr-3">✓</span>{" "}
                    Phone: Immediate
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 font-bold mr-3">✓</span>{" "}
                    Chat: Within 2 hours
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Presence</h2>
            <p className="text-xl text-gray-600">
              Headquartered in New Delhi, manufacturing in Haryana, delivering globally.
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-lg h-96">
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🇮🇳</div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Pan-India Delivery
                </h3>
                <p className="text-gray-600 mt-2">
                  Fresh products delivered to your doorstep anywhere in India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
