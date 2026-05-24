import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaSlidersH, FaTimes, FaUndo } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

function Shop() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(1600)
  const [sortBy, setSortBy] = useState('popular')
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const categories = ['All', 'Ghee & Oils', 'Honey & Sweeteners', 'Grains & Staples', 'Nuts & Seeds', 'Spices & Herbs']

  // Find the actual price limits in data dynamically
  const maxProductPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price), 1500)
  }, [])

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Price filter
    result = result.filter(p => p.price <= maxPrice)

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else {
      // 'popular' sorting by reviewsCount
      result.sort((a, b) => b.reviewsCount - a.reviewsCount)
    }

    return result
  }, [searchQuery, selectedCategory, maxPrice, sortBy])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setMaxPrice(maxProductPrice)
    setSortBy('popular')
  }

  return (
    <div className="bg-gradient-to-b from-white to-green-50/50 min-h-screen pb-16">
      {/* Hero Header */}
      <section className="relative px-6 sm:px-8 py-16 md:py-24 bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 text-white overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <span className="text-green-400 text-xs sm:text-sm font-bold uppercase tracking-widest bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 mb-4 inline-block">
            100% Certified Organic Foods
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight">
            MoolTrue <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">Marketplace</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-xl mx-auto leading-relaxed font-medium">
            Nourish your family with fresh, chemical-free ghee, wild forest honey, native spices, and premium grains.
          </p>
        </motion.div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* DESKTOP SIDEBAR FILTERS (Sticky on scroll) */}
          <aside className="hidden lg:block w-72 bg-white rounded-2xl shadow-md border border-green-50/80 p-6 sticky top-28 flex-shrink-0">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <FaSlidersH className="text-green-600" /> Filters
              </h3>
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-gray-500 hover:text-green-600 flex items-center gap-1 transition-colors duration-300"
              >
                <FaUndo size={10} /> Reset
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">
                Search Products
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-xl py-3 pl-10 pr-4 text-sm font-medium transition-all duration-300 outline-none text-gray-900 placeholder-gray-400"
                />
                <FaSearch className="absolute left-3.5 top-3.5 text-gray-400" size={14} />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">
                Categories
              </label>
              <div className="space-y-1.5">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex justify-between items-center ${
                      selectedCategory === category
                        ? 'bg-green-500 text-white shadow-md shadow-green-500/10'
                        : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                    }`}
                  >
                    <span>{category}</span>
                    {selectedCategory !== category && (
                      <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full">
                        {category === 'All'
                          ? products.length
                          : products.filter(p => p.category === category).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="text-sm font-extrabold text-green-600">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max={maxProductPrice}
                step="20"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-semibold mt-2">
                <span>Min: ₹100</span>
                <span>Max: ₹{maxProductPrice}</span>
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID AREA */}
          <main className="flex-1 w-full">
            
            {/* Top Sort & Filter Bar */}
            <div className="bg-white rounded-2xl border border-green-50/80 p-4 sm:p-5 shadow-sm mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
              <div className="text-sm text-gray-600 font-semibold">
                Showing <span className="text-gray-900 font-extrabold">{filteredProducts.length}</span> of <span className="text-gray-900 font-extrabold">{products.length}</span> fresh products
              </div>
              
              <div className="flex gap-3 w-full sm:w-auto items-center">
                {/* Mobile Filters Toggle Button */}
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
                >
                  <FaSlidersH /> Filters
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:inline">Sort By:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-48 bg-gray-50 border-2 border-gray-100 hover:border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none text-gray-800 cursor-pointer focus:border-green-500 focus:bg-white transition-all duration-300"
                  >
                    <option value="popular">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full bg-white rounded-3xl p-12 text-center shadow-sm border border-green-50 flex flex-col justify-center items-center py-20"
                  >
                    <span className="text-6xl mb-4">🌾</span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No Fresh Products Found</h3>
                    <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
                      We couldn't find any products matching your specific combinations. Try resetting filters or adjust your price ceiling.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/20 transform hover:scale-105 transition-all duration-300"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                ) : (
                  filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </main>
        </div>
      </div>

      {/* MOBILE FILTERS SIDE DRAWER */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden cursor-pointer"
            />

            {/* Mobile Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-full max-w-xs bg-white shadow-2xl z-50 flex flex-col h-full lg:hidden p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <FaSlidersH className="text-green-600" /> Filters
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-gray-100"
                >
                  <FaTimes size={14} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search organic items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 rounded-xl py-3 pl-10 pr-4 text-sm font-medium outline-none text-gray-900"
                  />
                  <FaSearch className="absolute left-3.5 top-3.5 text-gray-400" size={14} />
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Categories
                </label>
                <div className="space-y-1.5">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsMobileFiltersOpen(false) // Close drawer on selection for convenience
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex justify-between items-center ${
                        selectedCategory === category
                          ? 'bg-green-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      <span>{category}</span>
                      {selectedCategory !== category && (
                        <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full">
                          {category === 'All'
                            ? products.length
                            : products.filter(p => p.category === category).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Filter */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Max Price
                  </label>
                  <span className="text-sm font-extrabold text-green-600">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max={maxProductPrice}
                  step="20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-semibold mt-2">
                  <span>Min: ₹100</span>
                  <span>Max: ₹{maxProductPrice}</span>
                </div>
              </div>

              {/* Drawer Action buttons */}
              <div className="mt-auto space-y-3">
                <button
                  onClick={handleResetFilters}
                  className="w-full border border-green-500 text-green-600 py-3.5 rounded-xl font-bold text-sm hover:bg-green-50 transition-all duration-300"
                >
                  Reset All Filters
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 rounded-xl font-bold text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Shop