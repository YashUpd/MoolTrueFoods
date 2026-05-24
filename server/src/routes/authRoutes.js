import express from 'express'
import { googleLogin, signup, login, getMe } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// POST /api/auth/google — Login/Signup with Google
router.post('/google', googleLogin)

// POST /api/auth/signup — Normal credentials signup
router.post('/signup', signup)

// POST /api/auth/login — Normal credentials login
router.post('/login', login)

// GET /api/auth/me — Get current logged-in user profile
router.get('/me', protect, getMe)

export default router
