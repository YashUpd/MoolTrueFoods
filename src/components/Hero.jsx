import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-green-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-green-500 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10 max-w-4xl w-full"
      >
        <motion.div variants={itemVariants}>
          <span className="inline-block text-green-400 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest mb-4 px-3 sm:px-4 py-1.5 sm:py-2 border border-green-400 rounded-full">
            Welcome to MoolTrue Foods
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-tight"
        >
          Fresh,{" "}
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Organic
          </span>{" "}
          Food Delivered
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2"
        >
          Premium organic products from farm to your table. Healthy eating made
          simple, fresh, and delicious.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
        >
          <Link
            to="/shop"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 text-center flex items-center justify-center cursor-pointer"
          >
            Shop Now
          </Link>
          <Link
            to="/about"
            className="border-2 border-green-400 text-green-400 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-green-400 hover:text-white transition-all duration-300 text-center flex items-center justify-center cursor-pointer"
          >
            Learn More
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 sm:mt-12 md:mt-16 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center px-2"
        >
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">
              50K+
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
              Happy Customers
            </p>
          </div>
          <div className="hidden sm:block border-l border-gray-600"></div>
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">
              500+
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
              Organic Products
            </p>
          </div>
          <div className="hidden sm:block border-l border-gray-600"></div>
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">
              24/7
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
              Fresh Delivery
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-gray-400 text-xs sm:text-sm">
            Scroll to explore
          </span>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
