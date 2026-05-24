import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import { CartProvider } from './context/CartContext'
import CartDrawer from './components/CartDrawer'
import './App.css'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />

          <div className="app-main">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/product/:id' element={<ProductDetails />} />
              <Route path='/checkout' element={<Checkout />} />
            </Routes>
          </div>

          <Footer />
          <CartDrawer />
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
