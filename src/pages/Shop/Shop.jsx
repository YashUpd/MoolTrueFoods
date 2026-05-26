import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { FaSearch, FaSlidersH, FaTimes, FaUndo } from 'react-icons/fa'
import ProductCard from '../../components/ProductCard/ProductCard'
import { productsAPI } from '../../api/client'
import products from '../../data/products'
import "./Shop.css"

function Shop() {
  const [searchParams] = useSearchParams()
  const [productsList, setProductsList] = useState(products)
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productsAPI.getAll()
        if (res && res.data && res.data.length > 0) {
          setProductsList(res.data)
        }
      } catch (e) {
        console.error("Failed to fetch products from API, falling back to static data:", e)
      } finally {
        setLoadingProducts(false)
      }
    }
    fetchProducts()
  }, [])

  // Read search param from URL (set by Home search bar or Navbar)
  const urlSearch = searchParams.get('search') || ''
  const [searchQuery, setSearchQuery] = useState(urlSearch)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(1600)
  const [sortBy, setSortBy] = useState('popular')
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Sync searchQuery when URL param changes (e.g. new navigation from Home)
  useEffect(() => {
    const newSearch = searchParams.get('search') || ''
    if (newSearch) {
      setSearchQuery(newSearch)
    }
  }, [searchParams])

  const categories = ['All', 'Ghee & Oils', 'Honey & Sweeteners', 'Grains & Staples', 'Nuts & Seeds', 'Spices & Herbs']

  // Find the actual price limits in data dynamically
  const maxProductPrice = useMemo(() => {
    return Math.max(...productsList.map(p => p.price), 1500)
  }, [productsList])

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...productsList]
    const query = searchQuery.toLowerCase().trim()

    // Search query filter
    if (query !== '') {
      result = result.filter(
        p => p.name.toLowerCase().includes(query) || 
             (p.description && p.description.toLowerCase().includes(query)) ||
             (p.category && p.category.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Price filter
    result = result.filter(p => p.price <= maxPrice)

    // Sorting
    result.sort((a, b) => {
      // 1. If searching, prioritize exact matches first
      if (query !== '') {
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()
        
        // Exact match gets highest priority
        const aExact = aName === query ? 1 : 0
        const bExact = bName === query ? 1 : 0
        if (aExact !== bExact) return bExact - aExact
        
        // Starts with gets second priority
        const aStartsWith = aName.startsWith(query) ? 1 : 0
        const bStartsWith = bName.startsWith(query) ? 1 : 0
        if (aStartsWith !== bStartsWith) return bStartsWith - aStartsWith
        
        // Includes in name gets third priority
        const aNameMatch = aName.includes(query) ? 1 : 0
        const bNameMatch = bName.includes(query) ? 1 : 0
        if (aNameMatch !== bNameMatch) return bNameMatch - aNameMatch
      }
      
      // 2. Normal sorting
      if (sortBy === 'price-low') {
        return a.price - b.price
      } else if (sortBy === 'price-high') {
        return b.price - a.price
      } else if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0)
      } else {
        // 'popular' sorting by reviewsCount
        return (b.reviewsCount || 0) - (a.reviewsCount || 0)
      }
    })

    return result
  }, [productsList, searchQuery, selectedCategory, maxPrice, sortBy])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setMaxPrice(maxProductPrice)
    setSortBy('popular')
  }

  return (
    <div className="shop-page">
      {/* Hero Header */}
      <section className="shop-hero">
        <div className="shop-hero-decor-1"></div>
        <div className="shop-hero-decor-2"></div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="shop-hero-content"
        >
          <span className="shop-hero-badge">
            100% Certified Organic Foods
          </span>
          <h1 className="shop-hero-title">
            MoolTrue <span className="shop-hero-title-gradient">Marketplace</span>
          </h1>
          <p className="shop-hero-subtitle">
            Nourish your family with fresh, chemical-free ghee, wild forest honey, native spices, and premium grains.
          </p>
        </motion.div>
      </section>

      {/* Main Container */}
      <div className="shop-container">
        <div className="shop-layout">
          
          {/* DESKTOP SIDEBAR FILTERS (Sticky on scroll) */}
          <aside className="shop-sidebar">
            <div className="shop-sidebar-header">
              <h3 className="shop-sidebar-title">
                <FaSlidersH /> Filters
              </h3>
              <button
                onClick={handleResetFilters}
                className="shop-sidebar-reset"
              >
                <FaUndo size={10} /> Reset
              </button>
            </div>

            {/* Search Bar */}
            <div className="shop-filter-group">
              <label className="shop-filter-label">
                Search Products
              </label>
              <div className="shop-search-input-wrap">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="shop-search-input"
                />
                <FaSearch className="shop-search-icon" size={14} />
              </div>
            </div>

            {/* Categories */}
            <div className="shop-filter-group">
              <label className="shop-filter-label">
                Categories
              </label>
              <div className="shop-categories-list">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`shop-category-btn ${
                      selectedCategory === category ? 'active' : 'inactive'
                    }`}
                  >
                    <span>{category}</span>
                    {selectedCategory !== category && (
                      <span className="shop-category-count">
                        {category === 'All'
                          ? productsList.length
                          : productsList.filter(p => p.category === category).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="shop-filter-group">
              <div className="shop-price-header">
                <label className="shop-filter-label">
                  Max Price
                </label>
                <span className="shop-price-val">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max={maxProductPrice}
                step="20"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="shop-price-slider"
              />
              <div className="shop-price-limits">
                <span>Min: ₹100</span>
                <span>Max: ₹{maxProductPrice}</span>
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID AREA */}
          <main className="shop-main">
            
            {/* Top Sort & Filter Bar */}
            <div className="shop-top-bar">
              <div className="shop-showing-count">
                Showing <span>{filteredProducts.length}</span> of <span>{productsList.length}</span> fresh products
              </div>
              
              <div className="shop-top-actions">
                {/* Mobile Filters Toggle Button */}
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="shop-mobile-filters-trigger"
                >
                  <FaSlidersH /> Filters
                </button>

                {/* Sort Dropdown */}
                <div className="shop-sort-wrap">
                  <label className="shop-sort-label">Sort By:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="shop-sort-select"
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
            <motion.div layout className="shop-products-grid">
              <AnimatePresence mode="popLayout">
                {loadingProducts ? (
                  <div className="admin-loading" style={{ gridColumn: '1/-1', py: 8 }}><div className="admin-spinner" /></div>
                ) : filteredProducts.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="shop-empty-view"
                  >
                    <span className="shop-empty-icon">🌾</span>
                    <h3 className="shop-empty-title">No Fresh Products Found</h3>
                    <p className="shop-empty-desc">
                      We couldn't find any products matching your specific combinations. Try resetting filters or adjust your price ceiling.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="shop-empty-btn"
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
              className="cart-overlay"
            />

            {/* Mobile Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="shop-mobile-drawer"
            >
              <div className="shop-sidebar-header">
                <h3 className="shop-sidebar-title">
                  <FaSlidersH /> Filters
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="cart-close-btn"
                  style={{ color: 'var(--color-gray-400)', backgroundColor: 'var(--color-gray-50)' }}
                >
                  <FaTimes size={14} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="shop-filter-group">
                <label className="shop-filter-label">
                  Search Products
                </label>
                <div className="shop-search-input-wrap">
                  <input
                    type="text"
                    placeholder="Search organic items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="shop-search-input"
                  />
                  <FaSearch className="shop-search-icon" size={14} />
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="shop-filter-group">
                <label className="shop-filter-label">
                  Categories
                </label>
                <div className="shop-categories-list">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsMobileFiltersOpen(false) // Close drawer on selection for convenience
                      }}
                      className={`shop-category-btn ${
                        selectedCategory === category ? 'active' : 'inactive'
                      }`}
                    >
                      <span>{category}</span>
                      {selectedCategory !== category && (
                        <span className="shop-category-count">
                          {category === 'All'
                            ? productsList.length
                            : productsList.filter(p => p.category === category).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Filter */}
              <div className="shop-filter-group">
                <div className="shop-price-header">
                  <label className="shop-filter-label">
                    Max Price
                  </label>
                  <span className="shop-price-val">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max={maxProductPrice}
                  step="20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="shop-price-slider"
                />
                <div className="shop-price-limits">
                  <span>Min: ₹100</span>
                  <span>Max: ₹{maxProductPrice}</span>
                </div>
              </div>

              {/* Drawer Action buttons */}
              <div className="cart-summary-actions" style={{ marginTop: 'auto' }}>
                <button
                  onClick={handleResetFilters}
                  className="cart-summary-btn-add"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="cart-summary-btn-checkout"
                >
                  Apply
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