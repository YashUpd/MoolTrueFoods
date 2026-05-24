import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPlus, FaMinus, FaStar, FaShieldAlt, FaLeaf, FaTruck, FaAward } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  // Find product in database
  const product = useMemo(() => {
    return products.find(item => item.id === parseInt(id))
  }, [id])

  // Get related products (same category, excluding current product)
  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter(item => item.category === product.category && item.id !== product.id)
      .slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center p-8 bg-gray-50">
        <span className="text-6xl mb-4">🌾</span>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
          The fresh organic item you are looking for might have been harvested, sold out, or removed.
        </p>
        <Link
          to="/shop"
          className="bg-green-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-green-500/20 transform hover:scale-105 transition-all duration-300"
        >
          Browse Marketplace
        </Link>
      </div>
    )
  }

  const handleAdd = () => {
    addToCart(product, quantity)
  }

  const incrementQty = () => setQuantity(prev => prev + 1)
  const decrementQty = () => setQuantity(prev => Math.max(1, prev - 1))

  return (
    <div className="bg-gradient-to-b from-white to-green-50/30 min-h-screen pb-16">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm font-semibold text-gray-500 flex items-center gap-2">
        <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-green-600 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-green-600 truncate">{product.name}</span>
      </div>

      {/* Main Details Panel */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="bg-white border border-green-50 rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: Zoomable Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full relative rounded-2xl overflow-hidden shadow-md group/img border border-gray-100 bg-gray-50"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover group-hover/img:scale-105 transition-transform duration-500"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <FaLeaf size={10} /> Certified Organic
              </span>
              <span className="bg-slate-900/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md w-fit">
                📦 {product.weight || '500g'} Pack
              </span>
            </div>
          </motion.div>

          {/* RIGHT: Product Information Controls */}
          <div>
            <div className="mb-4">
              <span className="text-xs font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-lg inline-block mb-3.5">
                {product.category}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 mb-3 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating Reviews */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-yellow-400 bg-yellow-400/5 px-2.5 py-1 rounded-lg border border-yellow-400/10">
                  <FaStar size={14} />
                  <span className="font-extrabold text-sm text-gray-800">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-500 font-semibold hover:text-green-600 cursor-pointer">
                  ({product.reviewsCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="border-y border-gray-100 py-4 mb-6 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">MoolTrue Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                    ₹{product.price}
                  </span>
                  <span className="text-gray-400 text-sm font-semibold line-through">₹{Math.round(product.price * 1.25)}</span>
                  <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-0.5 rounded">Save 20%</span>
                </div>
              </div>
              <div className="text-right text-xs text-gray-500 font-semibold bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <span className="text-green-600 font-bold">✓ In Stock</span>
                <p className="mt-0.5">Delivered fresh in 24 hrs</p>
              </div>
            </div>

            {/* Micro details Sourcing */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
              <strong>Farm Promise:</strong> "{product.description.slice(0, 140)}..."
            </p>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Qty controller */}
              <div className="flex items-center justify-between border-2 border-gray-100 rounded-xl px-4 py-3 bg-white w-full sm:w-36 flex-shrink-0">
                <button
                  onClick={decrementQty}
                  className="text-gray-400 hover:text-green-600 transition-colors focus:outline-none"
                  aria-label="Decrease quantity"
                >
                  <FaMinus size={12} />
                </button>
                <span className="font-extrabold text-gray-800 text-base w-8 text-center">{quantity}</span>
                <button
                  onClick={incrementQty}
                  className="text-gray-400 hover:text-green-600 transition-colors focus:outline-none"
                  aria-label="Increase quantity"
                >
                  <FaPlus size={12} />
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-green-500/30 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Add To Basket
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </button>
            </div>

            {/* Quality Seals list */}
            <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-6 text-center text-xs text-gray-600 font-semibold">
              <div className="flex flex-col items-center">
                <FaShieldAlt className="text-green-600 mb-1.5 text-base sm:text-lg" />
                <span>Chemical Free</span>
              </div>
              <div className="flex flex-col items-center border-x border-gray-100">
                <FaLeaf className="text-green-600 mb-1.5 text-base sm:text-lg" />
                <span>Pure Sourced</span>
              </div>
              <div className="flex flex-col items-center">
                <FaTruck className="text-green-600 mb-1.5 text-base sm:text-lg" />
                <span>Fresh Delivered</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tabs segment: Description, Nutrition, Sourcing */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="bg-white border border-green-50 rounded-3xl shadow-md p-6 sm:p-10">
          
          {/* Tab buttons header */}
          <div className="flex border-b border-gray-100 mb-8 overflow-x-auto gap-4">
            {[
              { id: 'description', label: 'Full Description' },
              { id: 'nutrition', label: 'Nutrition Facts' },
              { id: 'heritage', label: 'Farm & Heritage' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 font-bold text-sm sm:text-base border-b-2 transition-all duration-300 whitespace-nowrap focus:outline-none ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div className="min-h-[150px]">
            {activeTab === 'description' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-600 leading-relaxed text-sm sm:text-base"
              >
                <p className="mb-4">{product.description}</p>
                <p>By opting for MoolTrue Foods, you're not just choosing a healthier diet for your family—you're also supporting small-scale sustainable farmers in India who utilize ancestral eco-friendly agricultural techniques without synthetic sprays or chemical hormones.</p>
              </motion.div>
            )}

            {activeTab === 'nutrition' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md"
              >
                <h4 className="font-extrabold text-gray-900 text-base mb-4 bg-gray-50 py-2 px-3.5 rounded-lg border-l-4 border-green-500">
                  Nutritional Value (Per 100g)
                </h4>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  {Object.entries(product.nutrition || {}).map(([key, val]) => (
                    <div key={key} className="flex justify-between px-4 py-3 text-sm font-semibold capitalize">
                      <span className="text-gray-500">{key}</span>
                      <span className="text-gray-900">{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'heritage' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-600 leading-relaxed text-sm sm:text-base flex flex-col sm:flex-row gap-6 items-center"
              >
                <div className="text-5xl bg-green-50 p-6 rounded-2xl border border-green-100 flex-shrink-0">🌾</div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-base mb-1.5">Sourcing Heritage & Transparency</h4>
                  <p className="mb-2 text-green-600 font-bold text-xs tracking-wider uppercase">{product.sourcing}</p>
                  <p className="text-sm">We believe that real food should be simple. Every product under our banner carries a 100% farm traceability promise. This means our supply channels are completely transparent, keeping rural economies sustainable and returning fair shares directly to agricultural growers.</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mb-1">Related Organic Gems</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold">Other wholesome additions from our {product.category} collection</p>
            <div className="w-16 h-1 bg-green-500 rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}

export default ProductDetails