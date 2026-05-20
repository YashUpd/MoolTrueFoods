import { motion } from "framer-motion";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { FaCheckCircle, FaLeaf, FaTruck, FaRefresh } from "react-icons/fa";

function Home() {
  const benefits = [
    {
      icon: <FaLeaf size={28} />,
      title: "100% Organic",
      desc: "Certified organic, pesticide-free produce",
    },
    {
      icon: <FaTruck size={28} />,
      title: "Fast Delivery",
      desc: "Fresh delivered within 24 hours",
    },
    {
      icon: <FaRefresh size={28} />,
      title: "Money Back",
      desc: "7-day satisfaction guarantee",
    },
    {
      icon: <FaCheckCircle size={28} />,
      title: "Quality Assured",
      desc: "Farm-fresh and carefully inspected",
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
      <section className="px-6 sm:px-8 py-16 md:py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto">
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
      <section className="px-6 sm:px-8 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Organic Products
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Handpicked from trusted farms. Fresh, healthy, and delicious. See
              what's new this season.
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
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300">
              View All Products
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-6 sm:px-8 py-16 md:py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose{" "}
                <span className="text-green-600">MoolTrue Foods?</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                We're committed to bringing you the freshest, most nutritious
                organic produce directly from farms to your table. Every product
                is carefully selected to ensure quality, freshness, and health
                benefits.
              </p>

              <div className="space-y-4">
                {[
                  "100% certified organic products",
                  "Direct from farms to you",
                  "Same-day freshness guarantee",
                  "Expert quality checks",
                  "Sustainable farming practices",
                  "Fair prices for farmers",
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
                <div className="text-7xl mb-6">🌾</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Farm Fresh Quality
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Grown with care, harvested fresh, delivered fast. That's the
                  MoolTrue Foods promise.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 sm:px-8 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
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

      {/* Newsletter Section */}
      <section className="px-6 sm:px-8 py-16 md:py-24 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Fresh Recipes & Organic Tips
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Subscribe to get exclusive recipes, health tips, and special offers
            delivered to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Subscribe
            </button>
          </div>
          <p className="text-green-100 text-sm mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-6 sm:px-8 py-16 md:py-24 bg-gradient-to-b from-white to-green-50">
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
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300">
            Shop Now & Get 20% Off
          </button>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
