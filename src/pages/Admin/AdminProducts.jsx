import { useState, useEffect, useCallback } from 'react'
import { productsAPI } from '../../api/client'
import './Admin.css'

const CATEGORIES = [
  'Ghee & Oils', 'Honey & Sweeteners', 'Grains & Staples',
  'Nuts & Seeds', 'Spices & Herbs'
]

const EMPTY_FORM = {
  name: '', category: '', price: '', weight: '',
  description: '', sourcing: '', rating: '4.5',
  reviewsCount: '0', isAvailable: true,
  nutrition: '{ "calories": 0, "protein": "0g", "carbs": "0g", "fat": "0g", "fiber": "0g" }',
}

function ProductModal({ product, onClose, onSaved }) {
  const [form, setForm] = useState(product ? {
    ...product,
    price: String(product.price),
    rating: String(product.rating),
    reviewsCount: String(product.reviewsCount),
    nutrition: JSON.stringify(product.nutrition || {}, null, 2),
    isAvailable: product.isAvailable,
  } : EMPTY_FORM)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(product?.image || null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k !== 'image' && k !== 'imagePublicId') {
          fd.append(k, v)
        }
      })
      if (imageFile) fd.append('image', imageFile)

      let result
      if (product) {
        result = await productsAPI.update(product.id, fd)
      } else {
        result = await productsAPI.create(fd)
      }

      onSaved(result.data)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="admin-product-form" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="admin-image-upload-area">
            <label className="admin-image-label">
              <input
                type="file" accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="admin-image-preview" />
              ) : (
                <div className="admin-image-placeholder">
                  <span>📷</span>
                  <p>Click to upload product image</p>
                  <p className="admin-image-hint">JPEG, PNG or WebP · Max 5MB</p>
                </div>
              )}
            </label>
            {imagePreview && (
              <button
                type="button"
                className="admin-image-change-btn"
                onClick={() => document.querySelector('input[type=file]').click()}
              >
                Change Image
              </button>
            )}
          </div>

          {/* Fields Grid */}
          <div className="admin-form-grid">
            <div className="admin-field admin-field-full">
              <label>Product Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Organic A2 Gir Cow Ghee" />
            </div>

            <div className="admin-field">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="admin-field">
              <label>Price (₹) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required min="1" />
            </div>

            <div className="admin-field">
              <label>Weight / Size *</label>
              <input name="weight" value={form.weight} onChange={handleChange} required placeholder="e.g. 500g" />
            </div>

            <div className="admin-field">
              <label>Rating (0–5)</label>
              <input name="rating" type="number" value={form.rating} onChange={handleChange} min="0" max="5" step="0.1" />
            </div>

            <div className="admin-field">
              <label>Review Count</label>
              <input name="reviewsCount" type="number" value={form.reviewsCount} onChange={handleChange} min="0" />
            </div>

            <div className="admin-field admin-field-full">
              <label>Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={4} />
            </div>

            <div className="admin-field admin-field-full">
              <label>Sourcing Info *</label>
              <input name="sourcing" value={form.sourcing} onChange={handleChange} required placeholder="e.g. Sourced from farms in Rajasthan" />
            </div>

            <div className="admin-field admin-field-full">
              <label>Nutrition JSON</label>
              <textarea
                name="nutrition"
                value={form.nutrition}
                onChange={handleChange}
                rows={5}
                className="admin-json-textarea"
                spellCheck="false"
              />
              <p className="admin-field-hint">Enter a valid JSON object for nutritional values.</p>
            </div>

            <div className="admin-field">
              <label className="admin-toggle-label">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={form.isAvailable}
                  onChange={handleChange}
                />
                <span>Available for purchase</span>
              </label>
            </div>
          </div>

          {error && <p className="admin-form-error">⚠️ {error}</p>}

          <div className="admin-form-actions">
            <button type="button" className="admin-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="admin-btn-save" disabled={saving}>
              {saving ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalProduct, setModalProduct] = useState(undefined) // undefined=closed, null=add new, object=edit
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      const result = await productsAPI.getAll()
      setProducts(result.data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadProducts() }, [loadProducts])

  const handleProductSaved = (savedProduct) => {
    setProducts((prev) => {
      const exists = prev.find(p => p.id === savedProduct.id)
      if (exists) return prev.map(p => p.id === savedProduct.id ? savedProduct : p)
      return [savedProduct, ...prev]
    })
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await productsAPI.delete(deleteTarget.id)
      setProducts((prev) => prev.filter(p => p.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (e) {
      alert(e.message)
    } finally {
      setDeleting(false)
    }
  }

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCategory === 'All' || p.category === filterCategory
    return matchSearch && matchCat
  })

  return (
    <div className="admin-products">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-subtitle">{products.length} total products in store</p>
        </div>
        <button className="admin-btn-primary" onClick={() => setModalProduct(null)}>
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <input
          className="admin-search-input"
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="admin-filter-select"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="admin-loading"><div className="admin-spinner" /></div>
      ) : error ? (
        <div className="admin-error"><p>⚠️ {error}</p></div>
      ) : filteredProducts.length === 0 ? (
        <div className="admin-empty">
          <p>No products found. {search ? 'Try a different search.' : 'Click "Add Product" to get started.'}</p>
        </div>
      ) : (
        <div className="admin-products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="admin-product-card">
              <div className="admin-product-img-wrap">
                <img src={product.image} alt={product.name} />
                {!product.isAvailable && (
                  <span className="admin-unavailable-badge">Hidden</span>
                )}
              </div>
              <div className="admin-product-info">
                <span className="admin-product-category">{product.category}</span>
                <h3 className="admin-product-name">{product.name}</h3>
                <div className="admin-product-meta">
                  <span className="admin-product-price">₹{product.price}</span>
                  <span className="admin-product-weight">{product.weight}</span>
                </div>
                <p className="admin-product-rating">⭐ {product.rating} ({product.reviewsCount} reviews)</p>
              </div>
              <div className="admin-product-actions">
                <button
                  className="admin-btn-edit"
                  onClick={() => setModalProduct(product)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="admin-btn-delete"
                  onClick={() => setDeleteTarget(product)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalProduct !== undefined && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(undefined)}
          onSaved={handleProductSaved}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Product?</h3>
            <p>Are you sure you want to delete <strong>{deleteTarget.name}</strong>?<br />This action cannot be undone.</p>
            <div className="admin-confirm-actions">
              <button className="admin-btn-cancel" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="admin-btn-delete-confirm" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
