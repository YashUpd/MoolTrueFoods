import express from 'express'
import { googleLogin, getMe } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// POST /api/auth/google — Login with Google credential token
router.post('/google', googleLogin)

// GET /api/auth/me — Get current logged-in admin info
router.get('/me', protect, getMe)

export default router
