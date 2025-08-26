import React from "react";
import { assets, features } from "../assets/assets";
import "../css/BottomBanner.css";

const BottomBanner = () => {
  return (
    <div className="bottom-banner-container">
    <div className="bottom-banner-image">
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="banner-img desktop-img"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="banner-img mobile-img"
      />
      </div>
      <div className="banner-overlay">
        <div>
          <h1 className="banner-title">Why We Are The Best</h1>
          {features.map((feature, index) => (
            <div key={index} className="banner-feature">
              <img
                src={feature.icon}
                alt={feature.title}
                className="feature-icon"
              />
              <div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
