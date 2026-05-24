import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token') || localStorage.getItem('admin_token'))
  const [loading, setLoading] = useState(true)

  // Verify and fetch user session on startup
  useEffect(() => {
    const initializeAuth = async () => {
      const activeToken = localStorage.getItem('token') || localStorage.getItem('admin_token')
      
      if (!activeToken) {
        setLoading(false)
        return
      }

      try {
        // API getMe uses the token from localStorage automatically via buildHeaders
        const res = await authAPI.getMe()
        if (res && res.success) {
          setUser(res.user)
          setToken(activeToken)
        } else {
          // Token invalid or expired
          handleLogout()
        }
      } catch (e) {
        console.error('Session initialization error:', e)
        handleLogout()
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Helper to handle login success
  const handleAuthSuccess = (data) => {
    setUser(data.user)
    setToken(data.token)
    
    // Save tokens: 'token' for customers, 'admin_token' for backward compatibility with Admin dashboard
    localStorage.setItem('token', data.token)
    localStorage.setItem('admin_token', data.token)
  }

  // Helper to handle logout
  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('admin_token')
  }

  // Credentials login
  const login = async (email, password) => {
    try {
      const res = await authAPI.login(email, password)
      if (res && res.success) {
        handleAuthSuccess(res)
        return res.user
      }
    } catch (e) {
      throw new Error(e.message || 'Credentials authentication failed.')
    }
  }

  // Credentials signup
  const signup = async (name, email, password) => {
    try {
      const res = await authAPI.signup(name, email, password)
      if (res && res.success) {
        handleAuthSuccess(res)
        return res.user
      }
    } catch (e) {
      throw new Error(e.message || 'Credentials registration failed.')
    }
  }

  // Google OAuth Login
  const googleLogin = async (credential) => {
    try {
      const res = await authAPI.googleLogin(credential)
      if (res && res.success) {
        handleAuthSuccess(res)
        return res.user
      }
    } catch (e) {
      throw new Error(e.message || 'Google OAuth failed.')
    }
  }

  const logout = () => {
    handleLogout()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        googleLogin,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
