import express from 'express'
import {
  createOrder, getOrders, getOrder,
  updateOrderStatus, getOrderStats
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.post('/', createOrder)

// Admin protected routes
router.get('/stats', protect, getOrderStats)
router.get('/', protect, getOrders)
router.get('/:id', protect, getOrder)
router.patch('/:id/status', protect, updateOrderStatus)

export default router
