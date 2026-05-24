import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { FaCheckCircle, FaLeaf, FaTruck, FaUndo } from "react-icons/fa";

function Home() {
  const benefits = [
    {
      icon: <FaLeaf size={28} />,
      title: "Origin & Sourcing",
      desc: "Handpicked from the finest spice farms across India for authentic regional flavors.",
    },
    {
      icon: <FaCheckCircle size={28} />,
      title: "MoolTrue Advantage",
      desc: "Processed with caution, 100% fungus-free, unadulterated, and packed with purity.",
    },
    {
      icon: <FaUndo size={28} />,
      title: "Flavour Profile",
      desc: "Preserving natural essential oils for rich aroma and deep, vibrant colors.",
    },
    {
      icon: <FaTruck size={28} />,
      title: "Cooking Uses",
      desc: "Perfect for tempering, marinades, curries, and elevating everyday meals.",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Verma",
      text: "Best quality vegetables I've ever had. So fresh and organic!",
    },
    {
      name: "Priya Sharma",
      text: "Amazing service and delivery. Keep coming back for more.",
    },
    {
      name: "Amit Patel",
      text: "Finally found a place for truly organic food. Highly recommended!",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group text-center p-6 md:p-8 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-500 border border-green-100"
              >
                <div className="text-green-600 mb-4 group-hover:scale-110 group-hover:text-green-500 transition-all duration-300 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Section */}
      <CategorySection />

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Best Sellers & Blends
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover the most loved masalas and fresh spices, sourced with care to bring authentic flavors to your kitchen.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mt-8"></div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mt-12 md:mt-16"
          >
            <Link
              to="/shop"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 text-center cursor-pointer inline-block"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* State-of-the-art Process Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Science of Pure <span className="text-green-600">Spices</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our manufacturing facilities ensure that every grain of spice that reaches your kitchen is 100% safe, aromatic, and packed with its natural oils. We follow a rigorous 5-step process:
              </p>

              <div className="space-y-4">
                {[
                  "Advanced Cleaning & Grading",
                  "ETM Sterilization for 100% safety",
                  "Cold-grinding to preserve natural oils",
                  "Zero added colors or preservatives",
                  "FSSAI & ISO Certified Facilities",
                  "Tamper-proof aroma-lock packaging",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      ✓
                    </div>
                    <span className="text-gray-700 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-12 shadow-xl"
            >
              <div className="text-center">
                <div className="text-7xl mb-6">⚙️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Uncompromised Purity
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  From rigorous lab testing to advanced processing technology. We bring the safest spices to India.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers enjoying fresh, organic food
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mt-8"></div>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-md border border-green-100 hover:shadow-lg transition-all duration-500"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-green-600 text-sm">Verified Customer</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Start Your Organic Journey Today
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Experience the difference of fresh, farm-to-table organic food. Your
              first order comes with a special welcome discount.
            </p>
            <Link
              to="/shop"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 text-center cursor-pointer inline-block"
            >
              Shop Now & Get 20% Off
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
