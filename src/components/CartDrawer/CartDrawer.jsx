import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaPlus, FaMinus, FaTrashAlt, FaShoppingBag } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import "./CartDrawer.css"

function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount
  } = useCart()

  const drawerRef = useRef()
  const navigate = useNavigate()
  const FREE_SHIPPING_THRESHOLD = 1000

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false)
      }
    }
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCartOpen, setIsCartOpen])

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isCartOpen])

  const handleCheckoutClick = () => {
    setIsCartOpen(false)
    navigate('/checkout')
  }

  const handleContinueShoppingClick = () => {
    setIsCartOpen(false)
    navigate('/shop')
  }

  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="cart-overlay"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-drawer"
          >
            {/* Header */}
            <div className="cart-header">
              <div className="cart-header-left">
                <FaShoppingBag className="cart-header-icon" />
                <h2 className="cart-header-title">Your Fresh Cart</h2>
                <span className="cart-header-badge">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="cart-close-btn"
                aria-label="Close cart"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Free Shipping Tracker */}
            {cartItems.length > 0 && (
              <div className="cart-shipping-tracker">
                <div className="cart-shipping-info">
                  {remainingForFreeShipping > 0 ? (
                    <span className="cart-shipping-text-remaining">
                      Add <strong>₹{remainingForFreeShipping}</strong> more for <strong>FREE SHIPPING</strong>
                    </span>
                  ) : (
                    <span className="cart-shipping-text-success">
                      🎉 Congratulations! You qualify for FREE shipping
                    </span>
                  )}
                  <span className="cart-shipping-goal">Goal: ₹{FREE_SHIPPING_THRESHOLD}</span>
                </div>
                <div className="cart-shipping-bar-bg">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="cart-shipping-bar-fill"
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="cart-items-list">
              <AnimatePresence initial={false}>
                {cartItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="cart-empty-container"
                  >
                    <div className="cart-empty-emoji">🥬</div>
                    <h3 className="cart-empty-title">Your Cart is Empty</h3>
                    <p className="cart-empty-desc">
                      Looks like you haven't added any fresh organic products to your basket yet.
                    </p>
                    <button
                      onClick={handleContinueShoppingClick}
                      className="cart-empty-btn"
                    >
                      Start Shopping
                    </button>
                  </motion.div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="cart-item-card"
                    >
                      {/* Product Image */}
                      <div className="cart-item-img-wrap">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-item-img"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="cart-item-info">
                        <div>
                          <span className="cart-item-category">
                            {item.category}
                          </span>
                          <h4 className="cart-item-name">
                            {item.name}
                          </h4>
                          <p className="cart-item-weight">Weight: {item.weight || '1 unit'}</p>
                        </div>

                        {/* Price & Quantity Row */}
                        <div className="cart-item-action-row">
                          <span className="cart-item-price">
                            ₹{item.price}
                          </span>
                          
                          {/* Quantity Selector */}
                          <div className="cart-item-quantity-selector">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="cart-item-quantity-btn"
                              aria-label="Decrease quantity"
                            >
                              <FaMinus size={10} />
                            </button>
                            <span className="cart-item-quantity-val">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="cart-item-quantity-btn"
                              aria-label="Increase quantity"
                            >
                              <FaPlus size={10} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="cart-item-remove-btn"
                        aria-label="Delete item"
                      >
                        <FaTrashAlt size={12} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer Summary (Sticky at bottom) */}
            {cartItems.length > 0 && (
              <div className="cart-summary-footer">
                <div className="space-y-3 mb-6">
                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Delivery</span>
                    {cartTotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <span>₹60</span>
                    )}
                  </div>
                  <div className="cart-summary-total-row">
                    <span>Total Amount</span>
                    <span className="cart-summary-total-val">
                      ₹{cartTotal + (cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 60)}
                    </span>
                  </div>
                </div>

                <div className="cart-summary-actions">
                  <button
                    onClick={handleContinueShoppingClick}
                    className="cart-summary-btn-add"
                  >
                    Add More
                  </button>
                  <button
                    onClick={handleCheckoutClick}
                    className="cart-summary-btn-checkout"
                  >
                    Checkout Now
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
