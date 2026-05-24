import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import prisma from '../db.js'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// POST /api/auth/google
// Body: { credential: "google-id-token" }
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

    // Check if email is in the allowed admins list
    const allowedEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())

    if (!allowedEmails.includes(email.toLowerCase())) {
      return res.status(403).json({
        error: 'Access denied. Your Google account is not authorized as an admin.',
      })
    }

    // Upsert the admin user in the database
    const user = await prisma.user.upsert({
      where: { email },
      update: { name, picture },
      create: { email, name, picture, role: 'admin' },
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

// GET /api/auth/me — Validate current session token
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
