import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from '../db.js'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// POST /api/auth/google
// Google Sign-In for both customers and admins
export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body

    if (!credential) {
      return res.status(400).json({ error: 'Google credential token is required.' })
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { email, name, picture } = payload

    // Determine the role: if allowed email list contains this, role is admin
    const allowedEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
    const isAllowedAdmin = allowedEmails.includes(email.toLowerCase())
    const role = isAllowedAdmin ? 'admin' : 'customer'

    // Upsert the user in the database
    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: { name, picture, role },
      create: { email: email.toLowerCase(), name, picture, role },
    })

    // Generate JWT session token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Google login error:', error)
    res.status(500).json({ error: 'Google authentication failed.' })
  }
}

// POST /api/auth/signup
// Create a new customer account securely
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' })
    }

    const emailLower = email.toLowerCase().trim()
    const existingUser = await prisma.user.findUnique({
      where: { email: emailLower },
    })

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use.' })
    }

    // Securely hash the password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        name,
        email: emailLower,
        passwordHash,
        role: 'customer',
      },
    })

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Failed to create user account.' })
  }
}

// POST /api/auth/login
// Authenticate using email and password
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    const emailLower = email.toLowerCase().trim()
    const user = await prisma.user.findUnique({
      where: { email: emailLower },
    })

    if (!user || !user.passwordHash) {
      return res.status(400).json({ error: 'Invalid email or password.' })
    }

    // Check credentials password against store hash
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' })
    }

    // Generate JWT session token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Authentication failed.' })
  }
}

// GET /api/auth/me
// Get current logged-in user profile
export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      picture: req.user.picture,
      role: req.user.role,
    },
  })
}
