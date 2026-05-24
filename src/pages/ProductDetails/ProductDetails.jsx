import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPlus, FaMinus, FaStar, FaShieldAlt, FaLeaf, FaTruck, FaAward } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import { productsAPI } from '../../api/client'
import products from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const [product, setProduct] = useState(null)
  const [productsList, setProductsList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true)
        const [singleRes, listRes] = await Promise.all([
          productsAPI.getOne(id),
          productsAPI.getAll()
        ])
        if (singleRes && singleRes.data) {
          setProduct(singleRes.data)
        }
        if (listRes && listRes.data) {
          setProductsList(listRes.data)
        }
      } catch (e) {
        console.error("Failed to fetch product dynamically, falling back to static:", e)
        const staticProduct = products.find(item => item.id === parseInt(id))
        setProduct(staticProduct)
        setProductsList(products)
      } finally {
        setLoading(false)
      }
    }
    loadProductData()
  }, [id])

  // Get related products (same category, excluding current product)
  const relatedProducts = useMemo(() => {
    if (!product) return []
    const sourceList = productsList.length > 0 ? productsList : products
    return sourceList
      .filter(item => item.category === product.category && item.id !== product.id)
      .slice(0, 4)
  }, [product, productsList])

  if (!product) {
    return (
      <div className="cart-empty-container" style={{ minHeight: '70vh', backgroundColor: 'var(--color-gray-50)' }}>
        <span className="cart-empty-emoji">🌾</span>
        <h2 className="cart-empty-title">Product Not Found</h2>
        <p className="cart-empty-desc">
          The fresh organic item you are looking for might have been harvested, sold out, or removed.
        </p>
        <Link
          to="/shop"
          className="cart-empty-btn"
          style={{ textDecoration: 'none' }}
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
    <div className="details-page">
      
      {/* Breadcrumb Navigation */}
      <div className="details-breadcrumb">
        <Link to="/" className="details-breadcrumb-link">Home</Link>
        <span>/</span>
        <Link to="/shop" className="details-breadcrumb-link">Shop</Link>
        <span>/</span>
        <span className="details-breadcrumb-current">{product.name}</span>
      </div>

      {/* Main Details Panel */}
      <section className="details-panel-section">
        <div className="details-panel-card">
          
          {/* LEFT: Zoomable Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="details-img-showcase"
          >
            <img
              src={product.image}
              alt={product.name}
              className="details-showcase-img"
            />
            {/* Badges */}
            <div className="details-badge-stack">
              <span className="details-badge-organic">
                <FaLeaf size={10} /> Certified Organic
              </span>
              <span className="details-badge-weight">
                📦 {product.weight || '500g'} Pack
              </span>
            </div>
          </motion.div>

          {/* RIGHT: Product Information Controls */}
          <div>
            <div>
              <span className="details-info-cat">
                {product.category}
              </span>
              
              <h1 className="details-info-title">
                {product.name}
              </h1>

              {/* Rating Reviews */}
              <div className="details-rating-row">
                <div className="details-rating-badge">
                  <FaStar size={14} />
                  <span className="details-rating-val">{product.rating}</span>
                </div>
                <span className="details-reviews-count">
                  ({product.reviewsCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="details-price-row">
              <div>
                <p className="details-price-label">MoolTrue Price</p>
                <div className="details-price-container">
                  <span className="details-price-val">
                    ₹{product.price}
                  </span>
                  <span className="details-price-original">₹{Math.round(product.price * 1.25)}</span>
                  <span className="details-price-save">Save 20%</span>
                </div>
              </div>
              <div className="details-stock-status">
                <span className="details-stock-text">✓ In Stock</span>
                <p style={{ margin: 0, marginTop: '2px' }}>Delivered fresh in 24 hrs</p>
              </div>
            </div>

            {/* Micro details Sourcing */}
            <p className="details-promise-text">
              <strong>Farm Promise:</strong> "{product.description.slice(0, 140)}..."
            </p>

            {/* Quantity Selector & Add to Cart */}
            <div className="details-actions-row">
              {/* Qty controller */}
              <div className="details-quantity-wrap">
                <button
                  onClick={decrementQty}
                  className="details-quantity-btn"
                  aria-label="Decrease quantity"
                >
                  <FaMinus size={12} />
                </button>
                <span className="details-quantity-val">{quantity}</span>
                <button
                  onClick={incrementQty}
                  className="details-quantity-btn"
                  aria-label="Increase quantity"
                >
                  <FaPlus size={12} />
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className="details-add-btn"
              >
                Add To Basket
                <span className="details-add-btn-arrow">→</span>
              </button>
            </div>

            {/* Quality Seals list */}
            <div className="details-seals-grid">
              <div className="details-seal-item">
                <FaShieldAlt className="details-seal-icon" />
                <span>Chemical Free</span>
              </div>
              <div className="details-seal-item details-seal-item border-x">
                <FaLeaf className="details-seal-icon" />
                <span>Pure Sourced</span>
              </div>
              <div className="details-seal-item">
                <FaTruck className="details-seal-icon" />
                <span>Fresh Delivered</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tabs segment: Description, Nutrition, Sourcing */}
      <section className="details-tabs-card">
        <div className="details-tabs-inner">
          
          {/* Tab buttons header */}
          <div className="details-tabs-nav">
            {[
              { id: 'description', label: 'Full Description' },
              { id: 'nutrition', label: 'Nutrition Facts' },
              { id: 'heritage', label: 'Farm & Heritage' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`details-tab-btn ${
                  activeTab === tab.id ? 'active' : 'inactive'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div className="details-tab-pane">
            {activeTab === 'description' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="details-desc-pane"
              >
                <p>{product.description}</p>
                <p>By opting for MoolTrue Foods, you're not just choosing a healthier diet for your family—you're also supporting small-scale sustainable farmers in India who utilize ancestral eco-friendly agricultural techniques without synthetic sprays or chemical hormones.</p>
              </motion.div>
            )}

            {activeTab === 'nutrition' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '28rem' }}
              >
                <h4 className="details-nutrition-heading">
                  Nutritional Value (Per 100g)
                </h4>
                <div className="details-nutrition-table">
                  {Object.entries(product.nutrition || {}).map(([key, val]) => (
                    <div key={key} className="details-nutrition-row">
                      <span className="details-nutrition-key">{key}</span>
                      <span className="details-nutrition-val">{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'heritage' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="details-heritage-pane"
              >
                <div className="details-heritage-icon">🌾</div>
                <div>
                  <h4 className="details-heritage-title">Sourcing Heritage & Transparency</h4>
                  <p className="details-heritage-sourcing">{product.sourcing}</p>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>We believe that real food should be simple. Every product under our banner carries a 100% farm traceability promise. This means our supply channels are completely transparent, keeping rural economies sustainable and returning fair shares directly to agricultural growers.</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="details-related-section">
          <div className="details-related-header">
            <h2 className="details-related-title">Related Organic Gems</h2>
            <p className="details-related-subtitle">Other wholesome additions from our {product.category} collection</p>
            <div className="details-related-underline"></div>
          </div>

          <div className="details-related-grid">
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