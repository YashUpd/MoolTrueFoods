import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleLogin } from '@react-oauth/google'
import { FaLock, FaEnvelope, FaUser, FaArrowLeft, FaCheck } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  
  const { login, signup, googleLogin, isAuthenticated, loading } = useAuth()

  // Tab State: 'signin' | 'signup'
  const [activeTab, setActiveTab] = useState('signin')
  
  // Credentials Form States
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [processing, setProcessing] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(redirect, { replace: true })
    }
  }, [isAuthenticated, loading, navigate, redirect])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setFormError('')
    setFormSuccess('')
    setPassword('')
    setName('')
  }

  // Handle Credentials Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')
    setProcessing(true)

    try {
      if (activeTab === 'signin') {
        await login(email, password)
        setFormSuccess('Signed in successfully!')
        setTimeout(() => navigate(redirect, { replace: true }), 1000)
      } else {
        await signup(name, email, password)
        setFormSuccess('Account created successfully!')
        setTimeout(() => navigate(redirect, { replace: true }), 1000)
      }
    } catch (err) {
      setFormError(err.message || 'Authentication failed. Please check your credentials.')
    } finally {
      setProcessing(false)
    }
  }

  // Handle Google OAuth Success
  const handleGoogleSuccess = async (response) => {
    setFormError('')
    setProcessing(true)
    try {
      await googleLogin(response.credential)
      setFormSuccess('Google Sign-In successful!')
      setTimeout(() => navigate(redirect, { replace: true }), 1000)
    } catch (err) {
      setFormError(err.message || 'Google Authentication failed.')
    } finally {
      setProcessing(false)
    }
  }

  const handleGoogleError = () => {
    setFormError('Google Login initialization was cancelled or failed.')
  }

  return (
    <div className="login-page">
      {/* Decorative blurred background shapes */}
      <div className="login-blur-accent-1"></div>
      <div className="login-blur-accent-2"></div>

      <div className="login-container">
        {/* Back Link */}
        <Link to="/" className="login-back-link">
          <FaArrowLeft size={10} /> Back to Market
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="login-card"
        >
          {/* Header */}
          <div className="login-header">
            <span className="login-badge">MoolTrue Foods</span>
            <h1 className="login-title">
              {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="login-subtitle">
              {activeTab === 'signin' 
                ? 'Sign in to access your secure checkout and track farm orders.' 
                : 'Join us to source authentic, lab-tested chemical-free foods.'}
            </p>
          </div>

          {/* Alert messages */}
          <AnimatePresence mode="wait">
            {formError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="login-alert login-alert-error"
              >
                ⚠️ {formError}
              </motion.div>
            )}
            {formSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="login-alert login-alert-success"
              >
                <FaCheck size={10} style={{ marginRight: '6px' }} /> {formSuccess}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom Tabs */}
          <div className="login-tabs">
            <button
              onClick={() => handleTabChange('signin')}
              className={`login-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabChange('signup')}
              className={`login-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            >
              Register
            </button>
          </div>

          {/* Main Credentials Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {activeTab === 'signup' && (
              <div className="login-field-wrap">
                <label className="login-label">Full Name</label>
                <div className="login-input-icon-wrap">
                  <FaUser className="login-input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="login-input"
                  />
                </div>
              </div>
            )}

            <div className="login-field-wrap">
              <label className="login-label">Email Address</label>
              <div className="login-input-icon-wrap">
                <FaEnvelope className="login-input-icon" />
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                />
              </div>
            </div>

            <div className="login-field-wrap">
              <div className="login-password-label-row">
                <label className="login-label">Password</label>
              </div>
              <div className="login-input-icon-wrap">
                <FaLock className="login-input-icon" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                />
              </div>
              {activeTab === 'signup' && (
                <p className="login-field-hint">Must be at least 6 characters long.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="login-submit-btn"
            >
              {processing ? 'Processing Securely...' : activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {/* Separator */}
          <div className="login-separator">
            <span>Or continue with</span>
          </div>

          {/* Third Party Google Sign-In */}
          <div className="login-google-btn-wrap">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="outline"
              size="large"
              shape="rectangular"
              text="continue_with"
              width="100%"
            />
          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default Login
