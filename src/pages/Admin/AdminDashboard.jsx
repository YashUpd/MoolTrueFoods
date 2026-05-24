import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ordersAPI } from '../../api/client'
import './Admin.css'

const STATUS_COLORS = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444',
  paid: '#10b981',
  failed: '#ef4444',
}

function StatCard({ icon, label, value, color, suffix = '' }) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-icon" style={{ backgroundColor: color + '20', color }}>
        {icon}
      </div>
      <div className="admin-stat-info">
        <p className="admin-stat-label">{label}</p>
        <p className="admin-stat-value">{suffix}{value?.toLocaleString('en-IN')}</p>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await ordersAPI.getStats()
        setStats(result.data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-error">
        <p>⚠️ {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <StatCard
          icon="💰"
          label="Total Revenue"
          value={stats.totalRevenue}
          color="#10b981"
          suffix="₹"
        />
        <StatCard
          icon="📦"
          label="Total Orders"
          value={stats.totalOrders}
          color="#3b82f6"
        />
        <StatCard
          icon="⏳"
          label="Pending Orders"
          value={stats.pendingOrders}
          color="#f59e0b"
        />
        <StatCard
          icon="✅"
          label="Delivered Orders"
          value={stats.deliveredOrders}
          color="#8b5cf6"
        />
        <StatCard
          icon="🌿"
          label="Active Products"
          value={stats.totalProducts}
          color="#06b6d4"
        />
      </div>

      {/* Quick Actions */}
      <div className="admin-quick-actions">
        <Link to="/admin/products" className="admin-quick-btn">
          <span>➕</span> Add New Product
        </Link>
        <Link to="/admin/orders" className="admin-quick-btn secondary">
          <span>📋</span> View All Orders
        </Link>
      </div>

      {/* Recent Orders Table */}
      <div className="admin-section-card">
        <div className="admin-section-header">
          <h2 className="admin-section-title">Recent Orders</h2>
          <Link to="/admin/orders" className="admin-section-link">View all →</Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <p className="admin-empty-msg">No orders yet. Share the store link to start getting orders!</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="admin-order-num">{order.orderNumber}</td>
                    <td>{order.customerName}</td>
                    <td>₹{order.grandTotal?.toLocaleString('en-IN')}</td>
                    <td>
                      <span
                        className="admin-status-badge"
                        style={{ backgroundColor: STATUS_COLORS[order.orderStatus] + '20', color: STATUS_COLORS[order.orderStatus] }}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td>
                      <span
                        className="admin-status-badge"
                        style={{ backgroundColor: STATUS_COLORS[order.paymentStatus] + '20', color: STATUS_COLORS[order.paymentStatus] }}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
