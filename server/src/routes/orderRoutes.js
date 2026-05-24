import express from 'express'
import {
  createOrder, getOrders, getOrder,
  updateOrderStatus, getOrderStats
} from '../controllers/orderController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.post('/', createOrder)

// Admin protected routes (JWT + Admin role required)
router.get('/stats', protect, adminOnly, getOrderStats)
router.get('/', protect, adminOnly, getOrders)
router.get('/:id', protect, adminOnly, getOrder)
router.patch('/:id/status', protect, adminOnly, updateOrderStatus)

export default router
