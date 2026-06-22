import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Checkout from './pages/Checkout/Checkout'
import Login from './pages/Login/Login'
import Wishlist from './pages/Wishlist/Wishlist'
import Manufacturer from './pages/Manufacturer/Manufacturer'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import CartDrawer from './components/CartDrawer/CartDrawer'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminProducts from './pages/Admin/AdminProducts'
import AdminOrders from './pages/Admin/AdminOrders'
import AdminSupport from './pages/Admin/AdminSupport'
import ChatWidget from './components/ChatWidget/ChatWidget'
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

// Reusable Page Transition Wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
)

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Inner Routes Component to access useLocation
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <div className="app-main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
            <Route path="/manufacturer" element={<PageTransition><Manufacturer /></PageTransition>} />
            <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route
              path="/checkout"
              element={
                <ProtectedCheckoutRoute>
                  <PageTransition><Checkout /></PageTransition>
                </ProtectedCheckoutRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
      <CartDrawer />
      <ChatWidget />
    </div>
  )
}

function App() {
  console.log("Vite Google Client ID Loaded:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
  
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <Routes>
                {/* ─── Public Storefront Routes ──────────────────────────── */}
                <Route path="/*" element={<AnimatedRoutes />} />

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
                  <Route path="support" element={<AdminSupport />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
