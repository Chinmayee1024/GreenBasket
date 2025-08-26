// MainBanner.jsx
import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import "../css/MainBanner.css";

const MainBanner = () => {
  return (
    <div className="main-banner">
      <img
        src={assets.main_banner_bg}
        alt="MainBanner"
        className="main-banner-img desktop"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="MainBanner"
        className="main-banner-img mobile"
      />
      <div className="main-banner-content">
        <h1 className="main-banner-heading">
          Freshness You Can Trust, Savings You will Love!
        </h1>

        <div className="main-banner-buttons">
          <Link to="/products" className="shop-now">
            Shop Now
            <img
              className="arrow-icon mobile"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
          <Link to="/products" className="explore-deals">
            Explore Deals
            <img
              className="arrow-icon desktop"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
