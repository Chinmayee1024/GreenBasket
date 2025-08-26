import React from "react";
import "../css/BestSeller.css";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  // Get 10 in-stock products
  const inStockProducts = products
    .filter((product) => product.inStock)
    .slice(0, 10);

  // Duplicate the list to create an endless loop
  const productsLoop = [...inStockProducts, ...inStockProducts];

  return (
    <div className="best-seller-wrapper">
      <p className="best-seller-title">Best Sellers</p>
      <div className="loop-scroll-container">
        <div className="loop-scroll-track">
          {productsLoop.map((product, index) => (
            <div className="product-card-wrapper" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
