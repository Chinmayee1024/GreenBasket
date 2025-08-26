import React from "react";
import "../css/ProductCard.css";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          window.scrollTo(0, 0);
        }}
        className="product-card"
      >
        <div className="product-image group">
          <img
            className="product-image-img group-hover:scale-105 transition"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="product-info">
          <p>{product.category}</p>
          <p className="product-title">{product.name}</p>
          <div className="product-rating">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="star-icon"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}
            <p>(4)</p>
          </div>
          <div className="product-footer">
            <p className="product-price">
              {currency}{product.offerPrice}{" "}
              <span className="line-through-price">
                {currency}{product.price}
              </span>
            </p>
            <div onClick={(e) => e.stopPropagation()} className="text-primary">
              {!cartItems[product._id] ? (
                <button
                  className="add-btn"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart_icon" />
                  Add
                </button>
              ) : (
                <div className="counter-box">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="counter-btn"
                  >
                    -
                  </button>
                  <span className="counter-count">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="counter-btn"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
