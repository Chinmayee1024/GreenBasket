import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import "../css/Categories.css";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="categories-wrapper">
      <p className="categories-heading">Categories</p>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="category-img"
            />
            <p className="category-text">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
