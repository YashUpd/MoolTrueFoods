import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLeaf, FaTruck, FaHeart, FaAward } from "react-icons/fa";

function About() {
  const values = [
    {
      icon: <FaLeaf size={32} />,
      title: "Pure Organic",
      description: "Certified 100% organic products from trusted farms",
    },
    {
      icon: <FaTruck size={32} />,
      title: "Fast Delivery",
      description: "Fresh products delivered to your door in 24 hours",
    },
    {
      icon: <FaHeart size={32} />,
      title: "Quality First",
      description: "We never compromise on quality and freshness",
    },
    {
      icon: <FaAward size={32} />,
      title: "Award Winning",
      description: "Recognized for excellence in organic farming",
    },
  ];

  const team = [
    { name: "Rahul Sharma", role: "Founder & CEO", emoji: "👨‍🌾" },
    { name: "Priya Singh", role: "Head of Quality", emoji: "👩‍🔬" },
    { name: "Arjun Patel", role: "Supply Chain Lead", emoji: "👨‍💼" },
    { name: "Neha Gupta", role: "Community Manager", emoji: "👩‍💻" },
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
              About{" "}
              <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
                MoolTrue Foods
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed max-w-2xl mx-auto">
              From Raw Spice to Your Kitchen: Delivering Pure Authentic Flavours Since 1982
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Journey
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                MoolTrue Foods was born from a simple belief: that Indian spices should reach the world in their purest, most authentic form. Founded in 1982, we started as a small local mill and have grown into a premier spice manufacturer.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Today, our spices are processed in state-of-the-art FSSAI & ISO certified facilities. We meticulously clean, grade, roast, and cold-grind our spices to ensure the natural essential oils are preserved, providing you with unmatched flavor and aroma.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our commitment is unwavering: 100% pure, unadulterated, and sterilized spices that bring the rich culinary heritage of India straight to your kitchen.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 shadow-2xl">
                <div className="text-6xl text-center mb-4">🏭</div>
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  Legacy Since 1982
                </h3>
                <div className="bg-white rounded-2xl p-6 space-y-3">
                  <p className="text-gray-700">
                    <span className="font-bold text-green-600">40+ Years</span>{" "}
                    of Excellence
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold text-green-600">FSSAI & ISO</span>{" "}
                    Certified
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold text-green-600">5+</span>{" "}
                    Global Markets
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold text-green-600">100%</span>{" "}
                    Pure & Sterilized
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-green-100"
              >
                <div className="text-green-600 mb-4 group-hover:scale-110 group-hover:text-green-500 transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-10 border-2 border-green-200"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                🎯 Our Mission
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To ensure that the authentic taste of Indian spices reaches every household in its purest and safest form. We aim to revolutionize the spice industry through advanced sterilization technologies and strict quality control without compromising on natural aroma.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-10 border-2 border-green-200"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                🌍 Our Vision
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the world's most trusted name in Indian Spices by setting global benchmarks in purity, hygiene, and authentic flavors, ensuring that culinary traditions are passed down safely for generations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate people dedicated to your health
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-8 mb-4 group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <div className="text-6xl mb-4">{member.emoji}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-green-600 font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the Organic Revolution
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Experience the difference of fresh, farm-to-table organic food
            </p>
            <Link
              to="/shop"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center cursor-pointer inline-block"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;
