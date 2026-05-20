function CategorySection() {
  const categories = [
    {
      name: "Organic Vegetables",
      icon: "🥬",
      desc: "Fresh, pesticide-free veggies",
    },
    { name: "Spices & Grains", icon: "🌾", desc: "Premium quality staples" },
    {
      name: "Healthy Snacks",
      icon: "🥗",
      desc: "Nutritious & delicious bites",
    },
    { name: "Dairy & Milk", icon: "🥛", desc: "Pure & natural dairy products" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white to-green-50 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-green-100 rounded-full opacity-30 blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 text-gray-900">
            Shop by Category
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Browse our carefully curated collection of organic, farm-fresh
            products
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mt-4 sm:mt-6"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* Card Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100 group-hover:from-green-100 group-hover:via-green-50 group-hover:to-green-200 transition-all duration-500"></div>

              {/* Border effect */}
              <div className="absolute inset-0 border-2 border-green-200 group-hover:border-green-400 rounded-xl sm:rounded-2xl transition-colors duration-500"></div>

              {/* Content */}
              <div className="relative p-5 sm:p-8 md:p-10 text-center h-full flex flex-col justify-center items-center cursor-pointer transform group-hover:-translate-y-3 transition-transform duration-500">
                {/* Icon Container */}
                <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500">
                  <span className="text-4xl sm:text-5xl md:text-6xl">
                    {category.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  {category.desc}
                </p>

                {/* Badge */}
                <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-semibold group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                  100% Organic & Fresh
                </div>

                {/* Arrow indicator */}
                <div className="mt-4 sm:mt-6 text-green-400 text-xl sm:text-2xl group-hover:translate-x-1 transition-transform duration-300">
                  →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300">
            Explore All Products
          </button>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
