import Razorpay from 'razorpay'
import crypto from 'crypto'
import prisma from '../db.js'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

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

    const order = await razorpay.orders.create(options)

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

    // Create expected signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
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
