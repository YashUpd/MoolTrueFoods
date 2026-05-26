import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const cartItem = cartItems.find(item => item.id === product.id);
  const navigate = useNavigate();

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleWishlist(product.id);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {/* Image Container */}
      <div className="product-card-img-wrap">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'}
          alt={product.name}
          className="product-card-img"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800' }}
        />

        {/* Overlay on hover */}
        <div className="product-card-overlay"></div>

        {/* Organic Badge */}
        <div className="product-card-organic-badge">
          🌿 Organic
        </div>

        {/* Wishlist Button */}
        <button
          className={`product-card-wishlist ${wishlisted ? 'wishlisted' : ''} ${isAnimating ? 'animate-heart-pulse' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlisted ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
        </button>

        {/* Stock Status */}
        <div className="product-card-stock-badge">
          ✓ In Stock
        </div>
      </div>

      {/* Content Container */}
      <div className="product-card-content">
        {/* Category & Rating Row */}
        <div className="product-card-meta-row">
          <span className="product-card-cat-badge">
            {product.category}
          </span>
          <div className="product-card-rating">
            <div className="product-card-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={10} />
              ))}
            </div>
            <span className="product-card-rating-val">
              ({product.rating || 4.8})
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h2 className="product-card-title">
          {product.name}
        </h2>

        {/* Description */}
        <p className="product-card-desc">
          {product.weight ? `${product.weight} • ` : ''}Farm fresh & pesticide-free
        </p>

        {/* Price & Button Row */}
        <div className="product-card-footer">
          <div className="product-card-price-col">
            <span className="product-card-price-label">Price</span>
            <span className="product-card-price-val">
              ₹{product.price}
            </span>
          </div>

          <div className="product-card-actions">
            {!cartItem ? (
              <button
                className="product-card-add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Add To Cart
              </button>
            ) : (
              <div className="product-card-qty-ctrl" onClick={(e) => e.stopPropagation()}>
                <button
                  className="product-card-qty-btn"
                  onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                >
                  -
                </button>
                <span className="product-card-qty-val">{cartItem.quantity}</span>
                <button
                  className="product-card-qty-btn"
                  onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                >
                  +
                </button>
              </div>
            )}
            <Link
              to={`/product/${product.id}`}
              className="product-card-view-btn"
              onClick={(e) => e.stopPropagation()}
            >
              View
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="product-card-sold-info">
          <p className="product-card-sold-text">
            <span className="product-card-sold-text-green">{product.reviewsCount || 100}+ sold</span> this month
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
