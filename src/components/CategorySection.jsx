import { Link } from "react-router-dom";
import "./CategorySection.css";

function CategorySection() {
  const categories = [
    {
      name: "Whole Spices",
      icon: "🌶️",
      count: "40+ Items",
      description: "Authentic whole spices for rich flavor bases"
    },
    {
      name: "Blended Spices",
      icon: "🍛",
      count: "25+ Items",
      description: "Perfectly balanced ready-to-cook masalas"
    },
    {
      name: "Ground Spices",
      icon: "🧂",
      count: "30+ Items",
      description: "Finely ground pure spices for everyday cooking"
    },
    {
      name: "Premium Saffron",
      icon: "🌸",
      count: "15+ Items",
      description: "Pure, high-grade saffron for royal dishes"
    },
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">
        {/* Section Header */}
        <div className="categories-header">
          <h2 className="categories-title">
            Our Product Range
          </h2>
          <div className="categories-underline"></div>
          <p className="categories-subtitle">
            Discover the finest selection of authentic Indian spices, rigorously tested and packaged for purity.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link
              to="/shop"
              key={index}
              className="category-card"
            >
              {/* Icon Container */}
              <div className="category-icon-wrap">
                <span className="category-icon">
                  {category.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="category-card-title">
                {category.name}
              </h3>

              {/* Description */}
              <p className="category-card-desc">
                {category.description}
              </p>

              {/* Explore Link */}
              <span className="category-card-explore">
                Explore <span className="category-card-explore-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
