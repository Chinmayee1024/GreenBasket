/* eslint-disable no-unused-vars */
import React from "react";
import { useAppContext } from "../../context/AppContext";
import "../../css/seller/ProductList.css"; // CSS import

const ProductList = () => {
  const { products, currency,fetchProducts } = useAppContext();

  return (
    <div className="product-list-container">
      <div className="product-list-wrapper">
        <h2 className="product-list-header">All Products</h2>
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th className="hide-on-sm">Selling Price</th>
                <th>In Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="product-name-cell">
                    <div className="product-img-container">
                      <img
                        src={product.image[0]}
                        alt="Product"
                        className="product-img"
                      />
                    </div>
                    <span className="product-name-text">{product.name}</span>
                  </td>
                  <td>{product.category}</td>
                  <td className="hide-on-sm">
                    {currency}
                    {product.offerPrice}
                  </td>
                  <td>
                    <label className="toggle-label">
                      <input type="checkbox" className="toggle-input" />
                      <div className="toggle-track"></div>
                      <span className="toggle-dot"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
