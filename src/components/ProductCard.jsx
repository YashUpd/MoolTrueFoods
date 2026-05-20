import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";

function ProductCard({ product }) {
  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-green-100 hover:border-green-300">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-200 h-48 sm:h-56 md:h-64">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>

        {/* Organic Badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-green-400 to-green-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          🌿 Organic
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white shadow-md hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <FaHeart size={16} className="sm:size-18" />
        </button>

        {/* Stock Status */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white/90 backdrop-blur px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold text-green-600">
          ✓ In Stock
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Category & Rating Row */}
        <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
          <span className="text-xs font-bold text-green-600 uppercase tracking-wider bg-green-50 px-2 py-1 rounded flex-shrink-0">
            {product.category}
          </span>
          <div className="flex items-center gap-0.5">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={10} className="sm:w-3 sm:h-3" />
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-0.5 sm:ml-1 whitespace-nowrap">
              (4.8)
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
          Farm fresh & pesticide-free
        </p>

        {/* Price & Button Row */}
        <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-100 gap-3">
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-gray-500 mb-0.5 sm:mb-1">Price</span>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
          </div>

          <Link to={`/product/${product.id}`}>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 transform transition-all duration-300 flex items-center gap-1 sm:gap-2 group/btn whitespace-nowrap flex-shrink-0">
              View
              <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-green-600">100+ sold</span> this
            month
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
