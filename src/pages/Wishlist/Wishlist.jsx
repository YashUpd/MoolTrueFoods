import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { productsAPI } from "../../api/client";
import productsData from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import "./Wishlist.css";

function Wishlist() {
  const { wishlistItems, clearWishlist, wishlistCount } = useWishlist();
  const [allProducts, setAllProducts] = useState(productsData);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productsAPI.getAll();
        if (res && res.data && res.data.length > 0) {
          setAllProducts(res.data);
        }
      } catch (e) {
        // Fallback to static data
      }
    };
    fetchProducts();
  }, []);

  const wishlistedProducts = allProducts.filter((p) =>
    wishlistItems.includes(p.id)
  );

  return (
    <div className="wishlist-page">
      {/* Hero Header */}
      <section className="wishlist-hero">
        <div className="wishlist-hero-decor-1"></div>
        <div className="wishlist-hero-decor-2"></div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="wishlist-hero-content"
        >
          <span className="wishlist-hero-badge">
            <FaHeart size={12} /> Your Favorites
          </span>
          <h1 className="wishlist-hero-title">
            My <span className="wishlist-hero-title-accent">Wishlist</span>
          </h1>
          <p className="wishlist-hero-subtitle">
            {wishlistCount > 0
              ? `You have ${wishlistCount} item${wishlistCount > 1 ? "s" : ""} saved for later`
              : "Your wishlist is waiting to be filled with organic goodness"}
          </p>
        </motion.div>
      </section>

      <div className="wishlist-container">
        {wishlistedProducts.length > 0 ? (
          <>
            {/* Actions Bar */}
            <div className="wishlist-actions-bar">
              <span className="wishlist-count-label">
                {wishlistedProducts.length} item{wishlistedProducts.length > 1 ? "s" : ""}
              </span>
              <button onClick={clearWishlist} className="wishlist-clear-btn">
                <FaTrash size={12} /> Clear All
              </button>
            </div>

            {/* Products Grid */}
            <motion.div layout className="wishlist-products-grid">
              {wishlistedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="wishlist-empty"
          >
            <div className="wishlist-empty-icon-wrap">
              <FaHeart size={40} />
            </div>
            <h2 className="wishlist-empty-title">Your Wishlist is Empty</h2>
            <p className="wishlist-empty-desc">
              Tap the heart icon on any product to save it here for later. Start
              exploring our organic collection!
            </p>
            <Link to="/shop" className="wishlist-empty-btn">
              Browse Shop →
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
