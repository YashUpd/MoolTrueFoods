import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import './Admin.css'

function AdminLayout() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('admin_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login', { replace: true })
  }

  const navLinks = [
    { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
    { to: '/admin/products', label: 'Products', icon: '🌿' },
    { to: '/admin/orders', label: 'Orders', icon: '📦' },
    { to: '/admin/support', label: 'Live Support', icon: '💬' },
  ]

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">
            <span>🌿</span>
            <span>MoolTrue Admin</span>
          </div>
          <button
            className="admin-sidebar-close"
            onClick={() => setIsSidebarOpen(false)}
          >✕</button>
        </div>

        <nav className="admin-sidebar-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="admin-nav-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          {user && (
            <div className="admin-user-info">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="admin-user-avatar"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="admin-user-details">
                <p className="admin-user-name">{user.name}</p>
                <p className="admin-user-email">{user.email}</p>
              </div>
            </div>
          )}
          <button className="admin-logout-btn" onClick={handleLogout}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="admin-content">
        {/* Top Bar */}
        <header className="admin-topbar">
          <button
            className="admin-menu-toggle"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="admin-topbar-right">
            {user && (
              <div className="admin-topbar-user">
                {user.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="admin-topbar-avatar"
                    referrerPolicy="no-referrer"
                  />
                )}
                <span className="admin-topbar-name">{user.name}</span>
              </div>
            )}
          </div>
        </header>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
