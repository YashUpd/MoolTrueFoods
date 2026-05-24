import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLock, FaShoppingBasket, FaCheckCircle, FaLeaf, FaCreditCard, FaMoneyBillWave, FaMobileAlt } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    paymentMethod: 'cod' // cod, upi, card
  })

  // Coupon State
  const [couponCode, setCouponCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')

  // Order Placement Animation States
  const [checkoutStage, setCheckoutStage] = useState('idle') // idle, processing, success
  const [generatedOrderNo, setGeneratedOrderNo] = useState('')

  if (cartItems.length === 0 && checkoutStage !== 'success') {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center p-8 bg-gray-50">
        <span className="text-6xl mb-4 animate-bounce">🥬</span>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Checkout is Empty</h2>
        <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
          There are no products in your basket. Add some delicious organic items from our market to checkout!
        </p>
        <Link
          to="/shop"
          className="bg-green-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-green-500/20 transform hover:scale-105 transition-all duration-300"
        >
          Browse Shop
        </Link>
      </div>
    )
  }

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle Payment Tab Change
  const handlePaymentSelect = (method) => {
    setFormData({ ...formData, paymentMethod: method })
  }

  // Coupon Applying System
  const handleApplyCoupon = (e) => {
    e.preventDefault()
    setCouponError('')
    setCouponSuccess('')

    const code = couponCode.toUpperCase().trim()
    if (code === 'WELCOME20' || code === 'MOOLTRUE20') {
      setDiscountPercent(20)
      setCouponSuccess('Coupon applied successfully! You got 20% OFF.')
    } else {
      setCouponError('Invalid coupon code. Try WELCOME20 or MOOLTRUE20.')
      setDiscountPercent(0)
    }
  }

  // Form Submitting / Placing Order
  const handlePlaceOrder = (e) => {
    e.preventDefault()
    
    // Set stage to processing
    setCheckoutStage('processing')

    // Generate a random order number
    const orderNo = `MTF-${Math.floor(100000 + Math.random() * 900000)}`
    setGeneratedOrderNo(orderNo)

    // Simulate 2.5 second network delay
    setTimeout(() => {
      setCheckoutStage('success')
      clearCart() // Empty cart upon successful placement
    }, 2500)
  }

  // Derived Pricing Math
  const discountAmount = Math.round((cartTotal * discountPercent) / 100)
  const afterDiscountTotal = cartTotal - discountAmount
  const deliveryFee = cartTotal >= 1000 ? 0 : 60
  const gstTax = Math.round(afterDiscountTotal * 0.05) // 5% Organic GST Tax
  const grandTotal = afterDiscountTotal + deliveryFee + gstTax

  return (
    <div className="bg-gradient-to-b from-white to-green-50/30 min-h-screen py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">Secure Checkout</h1>
          <p className="text-sm text-gray-500 font-semibold flex items-center justify-center lg:justify-start gap-1">
            <FaLock className="text-green-600" /> 256-Bit SSL Encrypted Sourcing Channel
          </p>
        </div>

        {/* Dynamic checkout layout */}
        {checkoutStage !== 'success' ? (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Shipping details and Payments (8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              
              {/* Delivery Addresses */}
              <div className="bg-white border border-green-50/80 rounded-2xl shadow-sm p-6 sm:p-8">
                <h3 className="font-extrabold text-gray-900 text-lg mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-100 text-green-700 font-bold rounded-full flex items-center justify-center text-xs">1</span>
                  Delivery Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      required
                      className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 outline-none text-gray-900"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      required
                      className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 outline-none text-gray-900"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Contact Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 outline-none text-gray-900"
                    />
                  </div>

                  {/* Street Address */}
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Flat, House no, Building, Street, Area"
                      required
                      className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 outline-none text-gray-900"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Bangalore"
                      required
                      className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 outline-none text-gray-900"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="560001"
                      required
                      pattern="[0-9]{6}"
                      title="Please enter a valid 6-digit pin code"
                      className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 outline-none text-gray-900"
                    />
                  </div>

                  {/* State */}
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Karnataka"
                      required
                      className="w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 outline-none text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Payments Section */}
              <div className="bg-white border border-green-50/80 rounded-2xl shadow-sm p-6 sm:p-8">
                <h3 className="font-extrabold text-gray-900 text-lg mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-100 text-green-700 font-bold rounded-full flex items-center justify-center text-xs">2</span>
                  Choose Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => handlePaymentSelect('cod')}
                    className={`flex items-center gap-3 border-2 p-4 rounded-xl font-bold text-sm sm:text-base justify-center sm:justify-start ${
                      formData.paymentMethod === 'cod'
                        ? 'border-green-500 bg-green-50/20 text-green-700'
                        : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    } transition-all duration-300`}
                  >
                    <FaMoneyBillWave className="text-lg" /> Cash On Delivery
                  </button>

                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() => handlePaymentSelect('upi')}
                    className={`flex items-center gap-3 border-2 p-4 rounded-xl font-bold text-sm sm:text-base justify-center sm:justify-start ${
                      formData.paymentMethod === 'upi'
                        ? 'border-green-500 bg-green-50/20 text-green-700'
                        : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    } transition-all duration-300`}
                  >
                    <FaMobileAlt className="text-lg" /> GooglePay / UPI
                  </button>

                  {/* Cards */}
                  <button
                    type="button"
                    onClick={() => handlePaymentSelect('card')}
                    className={`flex items-center gap-3 border-2 p-4 rounded-xl font-bold text-sm sm:text-base justify-center sm:justify-start ${
                      formData.paymentMethod === 'card'
                        ? 'border-green-500 bg-green-50/20 text-green-700'
                        : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    } transition-all duration-300`}
                  >
                    <FaCreditCard className="text-lg" /> Credit / Debit Card
                  </button>
                </div>

                {/* Sub-tab payment options info */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 sm:p-5 text-sm text-gray-600 leading-relaxed font-semibold">
                  {formData.paymentMethod === 'cod' && (
                    <p>📦 <strong>Cash on Delivery:</strong> Pay in cash or scanning delivery executive UPI code when your farm items reach your doorstep. No prepayment necessary!</p>
                  )}
                  {formData.paymentMethod === 'upi' && (
                    <div>
                      <p className="mb-2">⚡ <strong>Instant UPI payment:</strong> Scan or input your VPA address below to securely complete your payment transfer instantly.</p>
                      <input
                        type="text"
                        placeholder="yourname@okhdfcbank"
                        required={formData.paymentMethod === 'upi'}
                        className="w-full sm:w-80 bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-xs outline-none focus:border-green-500"
                      />
                    </div>
                  )}
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-3 max-w-md">
                      <p>💳 <strong>Card Payment:</strong> Securely enter your international or Indian debit/credit card details.</p>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        required={formData.paymentMethod === 'card'}
                        className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-xs outline-none focus:border-green-500"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Card Number"
                          required={formData.paymentMethod === 'card'}
                          className="w-2/3 bg-white border border-gray-200 rounded-lg py-2 px-3 text-xs outline-none focus:border-green-500"
                        />
                        <input
                          type="text"
                          placeholder="MM/YY"
                          required={formData.paymentMethod === 'card'}
                          className="w-1/6 bg-white border border-gray-200 rounded-lg py-2 px-3 text-xs outline-none focus:border-green-500"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength="3"
                          required={formData.paymentMethod === 'card'}
                          className="w-1/6 bg-white border border-gray-200 rounded-lg py-2 px-3 text-xs outline-none focus:border-green-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Order Summary & Promo code (4 cols) */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              {/* Promo Coupon Card */}
              <div className="bg-white border border-green-50/80 rounded-2xl shadow-sm p-5 sm:p-6">
                <label className="block mb-2 text-xs font-bold text-gray-800 uppercase tracking-wider">Promo Coupon</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MOOLTRUE20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-xl px-3 py-2 text-sm outline-none uppercase font-extrabold focus:border-green-500"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-green-500 text-white px-4 rounded-xl font-bold text-xs hover:bg-green-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {/* Feedback Alerts */}
                {couponError && <p className="text-xs text-red-500 font-semibold mt-2">❌ {couponError}</p>}
                {couponSuccess && <p className="text-xs text-green-600 font-bold mt-2">✓ {couponSuccess}</p>}
                <p className="text-[10px] text-gray-400 mt-2.5">Tip: Try code <strong>WELCOME20</strong> for a 20% discount!</p>
              </div>

              {/* Items Summary list & total prices */}
              <div className="bg-white border border-green-50/80 rounded-2xl shadow-sm p-5 sm:p-6">
                <h3 className="font-extrabold text-gray-900 text-base mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <FaShoppingBasket className="text-green-600" /> Order Summary
                </h3>

                {/* Items loop */}
                <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto mb-6 scrollbar-thin">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3 py-3 items-center">
                      <img src={item.image} alt={item.name} className="w-11 h-11 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 truncate">{item.name}</h4>
                        <span className="text-[10px] text-gray-400 font-semibold">Qty: {item.quantity} × ₹{item.price}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Mathematical list */}
                <div className="space-y-2 text-xs font-semibold text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-gray-900">₹{cartTotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Organic Delivery Fee</span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-bold">FREE</span>
                    ) : (
                      <span className="text-gray-900">₹60</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="text-gray-900">₹{gstTax}</span>
                  </div>

                  <div className="border-t border-gray-100 my-2 pt-3 flex justify-between text-gray-950 font-black text-base">
                    <span>Grand Total</span>
                    <span className="text-xl font-black bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/30 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  Place Order (₹{grandTotal})
                </button>
              </div>

            </div>

          </form>
        ) : null}

      </div>

      {/* DYNAMIC SCREEN OVERLAY SHEETS */}
      <AnimatePresence>
        {/* STAGE 1: ORDER PROCESSING SCREEN */}
        {checkoutStage === 'processing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <div className="text-center p-8 max-w-sm">
              {/* Spinning organic loading wheel */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-green-500/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-green-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl">🌱</div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Securing Your Order</h3>
              <p className="text-green-200 text-xs font-semibold mb-1 animate-pulse">Processing secure banking protocols...</p>
              <p className="text-gray-400 text-[10px] leading-relaxed">Please do not refresh this page or click back. We are preparing your fresh farm package!</p>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: SPLENDID SUCCESS SCREEN */}
        {checkoutStage === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-b from-green-50 to-white z-50 flex items-center justify-center p-6 overflow-y-auto"
          >
            {/* Custom leaf fallback falling shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-45">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-[ping_8s_infinite] text-2xl text-green-300"
                  style={{
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 90}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${5 + Math.random() * 6}s`
                  }}
                >
                  🍃
                </div>
              ))}
            </div>

            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white border border-green-100 rounded-3xl p-6 sm:p-10 shadow-2xl text-center max-w-xl w-full z-10"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
                <FaCheckCircle className="text-green-500" size={48} />
              </div>

              <span className="text-green-600 text-xs font-bold uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-full inline-block mb-3.5 border border-green-200/50">
                Order Placed Successfully!
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-gray-950 mb-3 tracking-tight">
                Thank You for Sourcing Organic!
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                We've received your request! Our partner gaushalas and organic farmers are harvesting and packaging your items. A confirmation receipt has been sent to your email.
              </p>

              {/* Receipt details box */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-6 mb-8 text-left text-xs sm:text-sm font-semibold divide-y divide-gray-200/60 max-w-md mx-auto shadow-inner">
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-400">Order Number</span>
                  <span className="text-slate-900 font-extrabold tracking-wide">{generatedOrderNo}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-400">Deliver To</span>
                  <span className="text-gray-900 font-bold truncate max-w-xs">{formData.fullName}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-400">Contact Number</span>
                  <span className="text-gray-900">{formData.phone}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-400">Payment Status</span>
                  <span className="text-green-600 font-bold">
                    {formData.paymentMethod === 'cod' ? 'COD (Pay on Delivery)' : 'Prepaid Verified ✓'}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 text-slate-950 font-black">
                  <span>Grand Total</span>
                  <span className="text-green-600 text-base sm:text-lg font-black">₹{grandTotal}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <Link
                  to="/shop"
                  className="flex-1 border border-green-500 text-green-600 font-bold py-3 px-6 rounded-xl hover:bg-green-50 transition-all duration-300 text-sm"
                >
                  Marketplace Shop
                </Link>
                <Link
                  to="/"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-green-500/20 transform hover:scale-[1.02] transition-all duration-300 text-sm"
                >
                  Return to Home
                </Link>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Checkout
