import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { authAPI } from '../../api/client'
import './Admin.css'

function AdminLogin() {
  const navigate = useNavigate()

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = localStorage.getItem('admin_token')
    if (token) navigate('/admin', { replace: true })
  }, [navigate])

  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    try {
      const result = await authAPI.googleLogin(credentialResponse.credential)
      localStorage.setItem('admin_token', result.token)
      localStorage.setItem('admin_user', JSON.stringify(result.user))
      navigate('/admin', { replace: true })
    } catch (error) {
      alert(error.message || 'Login failed. Your account may not be authorized as admin.')
    }
  }, [navigate])

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg-orb admin-login-bg-orb-1" />
      <div className="admin-login-bg-orb admin-login-bg-orb-2" />

      <div className="admin-login-card">
        <div className="admin-login-logo">
          <span className="admin-login-logo-icon">🌿</span>
          <h1 className="admin-login-brand">
            MoolTrue<span>Foods</span>
          </h1>
          <p className="admin-login-tagline">Admin Console</p>
        </div>

        <div className="admin-login-divider" />

        <h2 className="admin-login-title">Welcome Back</h2>
        <p className="admin-login-subtitle">
          Sign in with your authorized Google account to access the dashboard.
        </p>

        <div className="admin-login-google-wrap">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert('Google login failed. Please try again.')}
            theme="outline"
            size="large"
            width="300"
            text="signin_with"
            shape="rectangular"
          />
        </div>

        <p className="admin-login-footer">
          🔒 Access is restricted to authorized administrators only.
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
