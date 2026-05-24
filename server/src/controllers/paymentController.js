import Razorpay from 'razorpay'
import crypto from 'crypto'
import prisma from '../db.js'

// Warn if keys are missing on startup
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn('⚠️ WARNING: RAZORPAY_KEY_ID and/or RAZORPAY_KEY_SECRET are not set in environment variables. Payment features will not function.')
}

let razorpay = null
const getRazorpay = () => {
  if (razorpay) return razorpay

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error('Razorpay keys are not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.')
  }

  razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })

  return razorpay
}

// POST /api/payments/create-order
// Creates a Razorpay order and returns the order_id to frontend
export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body // amount in INR (we convert to paise)

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount.' })
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay uses paise (1 INR = 100 paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    }

    const order = await getRazorpay().orders.create(options)

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID,
      },
    })
  } catch (error) {
    console.error('Create payment order error:', error)
    res.status(500).json({ error: 'Failed to create payment order.' })
  }
}

// POST /api/payments/verify
// Verifies Razorpay payment signature and marks order as PAID in DB
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      internalOrderId, // our DB order ID
    } = req.body

    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) {
      return res.status(500).json({ error: 'Razorpay secret key is not configured.' })
    }

    // Create expected signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed. Invalid signature.' })
    }

    // Update the order in the database
    const updated = await prisma.order.update({
      where: { id: parseInt(internalOrderId) },
      data: {
        paymentStatus: 'paid',
        orderStatus: 'confirmed',
        razorpayPaymentId: razorpay_payment_id,
      },
    })

    res.json({ success: true, message: 'Payment verified successfully.', data: updated })
  } catch (error) {
    console.error('Verify payment error:', error)
    res.status(500).json({ error: 'Payment verification failed.' })
  }
}
