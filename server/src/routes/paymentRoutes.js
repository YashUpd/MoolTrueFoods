import express from 'express'
import { createPaymentOrder, verifyPayment } from '../controllers/paymentController.js'

const router = express.Router()

// POST /api/payments/create-order — Create Razorpay session
router.post('/create-order', createPaymentOrder)

// POST /api/payments/verify — Verify payment signature
router.post('/verify', verifyPayment)

export default router
