import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Checkout from './pages/Checkout/Checkout'
import Login from './pages/Login/Login'
import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import CartDrawer from './components/CartDrawer/CartDrawer'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminProducts from './pages/Admin/AdminProducts'
import AdminOrders from './pages/Admin/AdminOrders'
import './App.css'

// Protect admin routes — redirect to login if no JWT token
function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem('admin_token')
  return token ? children : <Navigate to="/admin/login" replace />
}

// Protect checkout route — redirect to login with redirect param if guest
function ProtectedCheckoutRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="admin-loading" style={{ minHeight: '80vh' }}><div className="admin-spinner" /></div>
  }

  return isAuthenticated ? children : <Navigate to="/login?redirect=checkout" replace />
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* ─── Public Storefront Routes ──────────────────────────── */}
              <Route
                path="/*"
                element={
                  <div className="app-container">
                    <Navbar />
                    <div className="app-main">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                          path="/checkout"
                          element={
                            <ProtectedCheckoutRoute>
                              <Checkout />
                            </ProtectedCheckoutRoute>
                          }
                        />
                      </Routes>
                    </div>
                    <Footer />
                    <CartDrawer />
                  </div>
                }
              />

              {/* ─── Admin Routes ─────────────────────────────────────── */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
