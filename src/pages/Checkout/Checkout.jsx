import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLock, FaShoppingBasket, FaCheckCircle, FaLeaf, FaCreditCard, FaMoneyBillWave, FaMobileAlt } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import "./Checkout.css"

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
      <div className="cart-empty-container" style={{ minHeight: '70vh', backgroundColor: 'var(--color-gray-50)' }}>
        <span className="cart-empty-emoji">🥬</span>
        <h2 className="cart-empty-title">Checkout is Empty</h2>
        <p className="cart-empty-desc">
          There are no products in your basket. Add some delicious organic items from our market to checkout!
        </p>
        <Link
          to="/shop"
          className="cart-empty-btn"
          style={{ textDecoration: 'none' }}
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
    <div className="checkout-page">
      <div className="checkout-container">
        
        {/* Header Title */}
        <div className="checkout-header">
          <h1 className="checkout-title">Secure Checkout</h1>
          <p className="checkout-subtitle">
            <FaLock /> 256-Bit SSL Encrypted Sourcing Channel
          </p>
        </div>

        {/* Dynamic checkout layout */}
        {checkoutStage !== 'success' ? (
          <form onSubmit={handlePlaceOrder} className="checkout-grid">
            
            {/* LEFT: Shipping details and Payments (8 cols) */}
            <div className="checkout-form-col">
              
              {/* Delivery Addresses */}
              <div className="checkout-form-card">
                <h3 className="checkout-card-heading">
                  <span className="checkout-step-num">1</span>
                  Delivery Information
                </h3>
                
                <div className="checkout-fields-grid">
                  {/* Full Name */}
                  <div className="checkout-field-full">
                    <label className="checkout-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      required
                      className="checkout-input"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="checkout-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      required
                      className="checkout-input"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="checkout-label">Contact Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                      className="checkout-input"
                    />
                  </div>

                  {/* Street Address */}
                  <div className="checkout-field-full">
                    <label className="checkout-label">Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Flat, House no, Building, Street, Area"
                      required
                      className="checkout-input"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="checkout-label">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Bangalore"
                      required
                      className="checkout-input"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="checkout-label">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="560001"
                      required
                      pattern="[0-9]{6}"
                      title="Please enter a valid 6-digit pin code"
                      className="checkout-input"
                    />
                  </div>

                  {/* State */}
                  <div className="checkout-field-full">
                    <label className="checkout-label">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Karnataka"
                      required
                      className="checkout-input"
                    />
                  </div>
                </div>
              </div>

              {/* Payments Section */}
              <div className="checkout-form-card">
                <h3 className="checkout-card-heading">
                  <span className="checkout-step-num">2</span>
                  Choose Payment Method
                </h3>

                <div className="checkout-payment-methods">
                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => handlePaymentSelect('cod')}
                    className={`checkout-payment-btn ${
                      formData.paymentMethod === 'cod' ? 'active' : 'inactive'
                    }`}
                  >
                    <FaMoneyBillWave size={18} /> Cash On Delivery
                  </button>

                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() => handlePaymentSelect('upi')}
                    className={`checkout-payment-btn ${
                      formData.paymentMethod === 'upi' ? 'active' : 'inactive'
                    }`}
                  >
                    <FaMobileAlt size={18} /> GooglePay / UPI
                  </button>

                  {/* Cards */}
                  <button
                    type="button"
                    onClick={() => handlePaymentSelect('card')}
                    className={`checkout-payment-btn ${
                      formData.paymentMethod === 'card' ? 'active' : 'inactive'
                    }`}
                  >
                    <FaCreditCard size={18} /> Credit / Debit Card
                  </button>
                </div>

                {/* Sub-tab payment options info */}
                <div className="checkout-payment-details">
                  {formData.paymentMethod === 'cod' && (
                    <p style={{ margin: 0 }}>📦 <strong>Cash on Delivery:</strong> Pay in cash or scanning delivery executive UPI code when your farm items reach your doorstep. No prepayment necessary!</p>
                  )}
                  {formData.paymentMethod === 'upi' && (
                    <div>
                      <p className="mb-2" style={{ margin: 0, marginBottom: '8px' }}>⚡ <strong>Instant UPI payment:</strong> Scan or input your VPA address below to securely complete your payment transfer instantly.</p>
                      <input
                        type="text"
                        placeholder="yourname@okhdfcbank"
                        required={formData.paymentMethod === 'upi'}
                        className="checkout-input"
                        style={{ width: '100%', maxWidth: '20rem', padding: '0.625rem 0.75rem' }}
                      />
                    </div>
                  )}
                  {formData.paymentMethod === 'card' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '28rem' }}>
                      <p style={{ margin: 0 }}>💳 <strong>Card Payment:</strong> Securely enter your international or Indian debit/credit card details.</p>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        required={formData.paymentMethod === 'card'}
                        className="checkout-input"
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          placeholder="Card Number"
                          required={formData.paymentMethod === 'card'}
                          className="checkout-input"
                          style={{ width: '66.6%', padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}
                        />
                        <input
                          type="text"
                          placeholder="MM/YY"
                          required={formData.paymentMethod === 'card'}
                          className="checkout-input"
                          style={{ width: '16.6%', padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength="3"
                          required={formData.paymentMethod === 'card'}
                          className="checkout-input"
                          style={{ width: '16.6%', padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Order Summary & Promo code (4 cols) */}
            <div className="checkout-summary-col">
              
              {/* Promo Coupon Card */}
              <div className="checkout-summary-card">
                <label className="checkout-label">Promo Coupon</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="MOOLTRUE20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="checkout-input"
                    style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.875rem', textTransform: 'uppercase', fontWeight: 800 }}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="checkout-coupon-btn"
                  >
                    Apply
                  </button>
                </div>
                {/* Feedback Alerts */}
                {couponError && <p className="checkout-coupon-alert-error">❌ {couponError}</p>}
                {couponSuccess && <p className="checkout-coupon-alert-success">✓ {couponSuccess}</p>}
                <p className="checkout-coupon-tip">Tip: Try code <strong>WELCOME20</strong> for a 20% discount!</p>
              </div>

              {/* Items Summary list & total prices */}
              <div className="checkout-summary-card">
                <h3 className="checkout-card-heading" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                  <FaShoppingBasket className="text-green-600" /> Order Summary
                </h3>

                {/* Items loop */}
                <div className="checkout-summary-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="checkout-summary-item">
                      <img src={item.image} alt={item.name} className="checkout-summary-item-img" />
                      <div className="checkout-summary-item-info">
                        <h4 className="checkout-summary-item-name">{item.name}</h4>
                        <span className="checkout-summary-item-qty">Qty: {item.quantity} × ₹{item.price}</span>
                      </div>
                      <span className="checkout-summary-item-price">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Mathematical list */}
                <div className="checkout-summary-pricing">
                  <div className="checkout-summary-pricing-row">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="checkout-summary-pricing-row discount">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="checkout-summary-pricing-row delivery-free">
                    <span>Organic Delivery Fee</span>
                    {deliveryFee === 0 ? (
                      <span>FREE</span>
                    ) : (
                      <span>₹60</span>
                    )}
                  </div>
                  <div className="checkout-summary-pricing-row">
                    <span>GST (5%)</span>
                    <span>₹{gstTax}</span>
                  </div>

                  <div className="checkout-summary-total-row">
                    <span>Grand Total</span>
                    <span className="checkout-summary-total-val">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="checkout-place-btn"
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
            className="checkout-stage-processing"
          >
            <div className="checkout-processing-box">
              {/* Spinning organic loading wheel */}
              <div className="checkout-spinner-wrap">
                <div className="checkout-spinner-ring1"></div>
                <div className="checkout-spinner-ring2"></div>
                <div className="checkout-spinner-leaf">🌱</div>
              </div>
              
              <h3 className="checkout-processing-title">Securing Your Order</h3>
              <p className="checkout-processing-status">Processing secure banking protocols...</p>
              <p className="checkout-processing-disclaimer">Please do not refresh this page or click back. We are preparing your fresh farm package!</p>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: SPLENDID SUCCESS SCREEN */}
        {checkoutStage === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="checkout-stage-success"
          >
            {/* Custom leaf fallback falling shapes */}
            <div className="checkout-leaves-falling">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="checkout-falling-leaf"
                  style={{
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 90}%`,
                    animation: `ping ${5 + Math.random() * 6}s infinite`,
                    animationDelay: `${Math.random() * 4}s`
                  }}
                >
                  🍃
                </div>
              ))}
            </div>

            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="checkout-success-card"
            >
              <div className="checkout-success-icon-wrap">
                <FaCheckCircle size={48} />
              </div>

              <span className="checkout-success-badge">
                Order Placed Successfully!
              </span>

              <h2 className="checkout-success-title">
                Thank You for Sourcing Organic!
              </h2>

              <p className="checkout-success-desc">
                We've received your request! Our partner gaushalas and organic farmers are harvesting and packaging your items. A confirmation receipt has been sent to your email.
              </p>

              {/* Receipt details box */}
              <div className="checkout-receipt-box">
                <div className="checkout-receipt-row">
                  <span className="checkout-receipt-label">Order Number</span>
                  <span className="checkout-receipt-val order-no">{generatedOrderNo}</span>
                </div>
                <div className="checkout-receipt-row">
                  <span className="checkout-receipt-label">Deliver To</span>
                  <span className="checkout-receipt-val" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '12rem' }}>{formData.fullName}</span>
                </div>
                <div className="checkout-receipt-row">
                  <span className="checkout-receipt-label">Contact Number</span>
                  <span className="checkout-receipt-val">{formData.phone}</span>
                </div>
                <div className="checkout-receipt-row">
                  <span className="checkout-receipt-label">Payment Status</span>
                  <span className="checkout-receipt-val prepaid">
                    {formData.paymentMethod === 'cod' ? 'COD (Pay on Delivery)' : 'Prepaid Verified ✓'}
                  </span>
                </div>
                <div className="checkout-receipt-row grand-total">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="checkout-success-actions">
                <Link
                  to="/shop"
                  className="checkout-success-btn-shop"
                >
                  Marketplace Shop
                </Link>
                <Link
                  to="/"
                  className="checkout-success-btn-home"
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
