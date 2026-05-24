import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      {/* Image Container */}
      <div className="product-card-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
        />

        {/* Overlay on hover */}
        <div className="product-card-overlay"></div>

        {/* Organic Badge */}
        <div className="product-card-organic-badge">
          🌿 Organic
        </div>

        {/* Wishlist Button */}
        <button className="product-card-wishlist">
          <FaHeart size={16} />
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
              (4.8)
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h2 className="product-card-title">
          {product.name}
        </h2>

        {/* Description */}
        <p className="product-card-desc">
          Farm fresh & pesticide-free
        </p>

        {/* Price & Button Row */}
        <div className="product-card-footer">
          <div className="product-card-price-col">
            <span className="product-card-price-label">Price</span>
            <span className="product-card-price-val">
              ₹{product.price}
            </span>
          </div>

          <Link 
            to={`/product/${product.id}`}
            className="product-card-view-btn"
          >
            View
            <span className="product-card-view-btn-arrow">
              →
            </span>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="product-card-sold-info">
          <p className="product-card-sold-text">
            <span className="product-card-sold-text-green">100+ sold</span> this month
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
