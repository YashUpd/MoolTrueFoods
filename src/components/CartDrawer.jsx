import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaPlus, FaMinus, FaTrashAlt, FaShoppingBag } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col h-full border-l border-green-50"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-800 text-white">
              <div className="flex items-center gap-3">
                <FaShoppingBag className="text-green-400 text-xl" />
                <h2 className="text-xl font-bold tracking-tight">Your Fresh Cart</h2>
                <span className="bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-700 text-white flex items-center justify-center transition-colors duration-300"
                aria-label="Close cart"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Free Shipping Tracker */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-green-50 border-b border-green-100 px-6">
                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                  {remainingForFreeShipping > 0 ? (
                    <span className="text-gray-700">
                      Add <strong className="text-green-600">₹{remainingForFreeShipping}</strong> more for <strong className="text-green-600">FREE SHIPPING</strong>
                    </span>
                  ) : (
                    <span className="text-green-600 flex items-center gap-1.5 font-bold">
                      🎉 Congratulations! You qualify for FREE shipping
                    </span>
                  )}
                  <span className="text-xs text-gray-500">Goal: ₹{FREE_SHIPPING_THRESHOLD}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-gray-200">
              <AnimatePresence initial={false}>
                {cartItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-center items-center text-center px-4"
                  >
                    <div className="text-6xl mb-4 animate-bounce">🥬</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Your Cart is Empty</h3>
                    <p className="text-gray-500 text-sm max-w-xs mb-8">
                      Looks like you haven't added any fresh organic products to your basket yet.
                    </p>
                    <button
                      onClick={handleContinueShoppingClick}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-green-500/30 transform hover:scale-105 transition-all duration-300"
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
                      className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300 relative group bg-white"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate mt-1 group-hover:text-green-600 transition-colors duration-300">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 font-medium">Weight: {item.weight || '1 unit'}</p>
                        </div>

                        {/* Price & Quantity Row */}
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold text-green-600 text-base">
                            ₹{item.price}
                          </span>
                          
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-3 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-green-600 transition-colors duration-300 focus:outline-none"
                              aria-label="Decrease quantity"
                            >
                              <FaMinus size={10} />
                            </button>
                            <span className="font-bold text-gray-800 text-xs w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-green-600 transition-colors duration-300 focus:outline-none"
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
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all duration-300 focus:outline-none shadow-sm"
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
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Delivery</span>
                    {cartTotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-green-600 font-bold">FREE</span>
                    ) : (
                      <span className="font-semibold text-gray-800">₹60</span>
                    )}
                  </div>
                  <div className="border-t border-gray-200 my-2 pt-2 flex justify-between text-gray-900 font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent font-extrabold">
                      ₹{cartTotal + (cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 60)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleContinueShoppingClick}
                    className="border border-green-500 text-green-600 py-3.5 rounded-xl font-bold text-sm hover:bg-green-50 transition-all duration-300"
                  >
                    Add More
                  </button>
                  <button
                    onClick={handleCheckoutClick}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-green-500/30 transform hover:scale-105 transition-all duration-300"
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
