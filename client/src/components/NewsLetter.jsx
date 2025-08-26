import React from "react";
import "../css/NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter-container">
      <h1 className="newsletter-title">Never Miss a Deal!</h1>
      <p className="newsletter-subtitle">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>
      <form className="newsletter-form">
        <input
          className="newsletter-input"
          type="email"
          placeholder="Enter your email id"
          required
        />
        <button type="submit" className="newsletter-button">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
