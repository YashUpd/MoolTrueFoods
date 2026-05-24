import { useState, useEffect, useCallback } from 'react'
import { ordersAPI } from '../../api/client'
import './Admin.css'

const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
const PAYMENT_STATUSES = ['pending', 'paid', 'failed']

const STATUS_COLORS = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444',
  paid: '#10b981',
  failed: '#ef4444',
}

function OrderDetailModal({ order, onClose, onStatusUpdate }) {
  const [orderStatus, setOrderStatus] = useState(order.orderStatus)
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await ordersAPI.updateStatus(order.id, { orderStatus, paymentStatus })
      onStatusUpdate(order.id, { orderStatus, paymentStatus })
      onClose()
    } catch (e) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div>
            <h2>Order {order.orderNumber}</h2>
            <p className="admin-modal-subtext">
              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </div>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="admin-order-modal-body">
          {/* Customer Details */}
          <div className="admin-order-section">
            <h3>Customer Details</h3>
            <div className="admin-order-detail-grid">
              <div><label>Name</label><p>{order.customerName}</p></div>
              <div><label>Email</label><p>{order.customerEmail}</p></div>
              <div><label>Phone</label><p>{order.customerPhone}</p></div>
              <div className="admin-order-detail-full">
                <label>Delivery Address</label>
                <p>{order.deliveryAddress}, {order.city}, {order.state} - {order.pincode}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="admin-order-section">
            <h3>Items Ordered</h3>
            <div className="admin-order-items-list">
              {order.orderItems?.map((item) => (
                <div key={item.id} className="admin-order-item-row">
                  {item.product?.image && (
                    <img src={item.product.image} alt={item.product.name} />
                  )}
                  <div className="admin-order-item-info">
                    <p className="admin-order-item-name">{item.product?.name}</p>
                    <p className="admin-order-item-qty">Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <p className="admin-order-item-total">₹{item.quantity * item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="admin-order-section">
            <h3>Price Breakdown</h3>
            <div className="admin-order-pricing">
              <div><span>Subtotal</span><span>₹{order.totalAmount}</span></div>
              {order.discountAmount > 0 && (
                <div><span>Discount</span><span style={{color: '#10b981'}}>-₹{order.discountAmount}</span></div>
              )}
              <div><span>Delivery Fee</span><span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span></div>
              <div><span>GST (5%)</span><span>₹{order.gstAmount}</span></div>
              <div className="admin-order-grand-total"><span>Grand Total</span><span>₹{order.grandTotal}</span></div>
            </div>
          </div>

          {/* Status Updates */}
          <div className="admin-order-section">
            <h3>Update Status</h3>
            <div className="admin-order-status-row">
              <div className="admin-field">
                <label>Order Status</label>
                <select value={orderStatus} onChange={e => setOrderStatus(e.target.value)}>
                  {ORDER_STATUSES.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="admin-field">
                <label>Payment Status</label>
                <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)}>
                  {PAYMENT_STATUSES.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="admin-btn-save" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Update Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({})
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [page, setPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPayment, setFilterPayment] = useState('')

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true)
      const params = { page, limit: 15 }
      if (filterStatus) params.status = filterStatus
      if (filterPayment) params.paymentStatus = filterPayment
      const result = await ordersAPI.getAll(params)
      setOrders(result.data)
      setPagination(result.pagination)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [page, filterStatus, filterPayment])

  useEffect(() => { loadOrders() }, [loadOrders])

  const handleStatusUpdate = (orderId, newStatuses) => {
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, ...newStatuses } : o
    ))
  }

  return (
    <div className="admin-orders">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Orders</h1>
          <p className="admin-page-subtitle">{pagination.total || 0} total orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <select
          className="admin-filter-select"
          value={filterStatus}
          onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
        >
          <option value="">All Order Statuses</option>
          {ORDER_STATUSES.map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>

        <select
          className="admin-filter-select"
          value={filterPayment}
          onChange={e => { setFilterPayment(e.target.value); setPage(1) }}
        >
          <option value="">All Payment Statuses</option>
          {PAYMENT_STATUSES.map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading"><div className="admin-spinner" /></div>
      ) : error ? (
        <div className="admin-error"><p>⚠️ {error}</p></div>
      ) : orders.length === 0 ? (
        <div className="admin-empty"><p>No orders found matching your filters.</p></div>
      ) : (
        <>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Order Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="admin-order-num">{order.orderNumber}</td>
                    <td>{order.customerName}</td>
                    <td>{order.customerPhone}</td>
                    <td>{order.orderItems?.length || 0} items</td>
                    <td>₹{order.grandTotal?.toLocaleString('en-IN')}</td>
                    <td>
                      <span
                        className="admin-status-badge"
                        style={{ backgroundColor: STATUS_COLORS[order.paymentStatus] + '20', color: STATUS_COLORS[order.paymentStatus] }}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span
                        className="admin-status-badge"
                        style={{ backgroundColor: STATUS_COLORS[order.orderStatus] + '20', color: STATUS_COLORS[order.orderStatus] }}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    <td>
                      <button
                        className="admin-btn-view"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="admin-pagination">
              <button
                className="admin-page-btn"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← Prev
              </button>
              <span className="admin-page-info">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                className="admin-page-btn"
                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  )
}

export default AdminOrders
