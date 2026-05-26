import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./CategorySection.css";

function CategorySection() {
  const categories = [
    {
      name: "Premium Spices",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
      link: "/shop?category=spices"
    },
    {
      name: "Pure Golden Ghee",
      image: "https://images.unsplash.com/photo-1589154737229-b68e59275b1c?auto=format&fit=crop&w=800&q=80",
      link: "/shop?category=ghee"
    },
    {
      name: "Organic Raw Honey",
      image: "https://images.unsplash.com/photo-1587049352847-4d4b126a41f8?auto=format&fit=crop&w=800&q=80",
      link: "/shop?category=honey"
    }
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">
        {/* Section Header */}
        <div className="categories-header">
          <h2 className="categories-title">Shop by Category</h2>
          <div className="categories-underline"></div>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index}>
              <Link to={category.link} className="category-card">
                <div className="category-image-wrapper glass-panel">
                  <img src={category.image} alt={category.name} className="category-image" />
                </div>
                <h3 className="category-name">{category.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
