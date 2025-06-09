import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import "../css/ProductCategory.css";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="product-category-container">
      {searchCategory && (
        <div className="category-header">
          <p className="category-title">{searchCategory.text.toUpperCase()}</p>
          <div className="category-underline" />
        </div>
      )}

      {filteredProducts.length > 0 ? (
        // Use horizontal scroll container for mobile/tab and grid for desktop
        <div className="category-scroll">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p className="no-products-text">No Products Found In This Category</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
