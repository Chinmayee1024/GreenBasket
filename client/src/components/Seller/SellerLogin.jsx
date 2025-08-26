// /* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import "../../css/seller/SellerLogin.css"; // Import external stylesheet

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSeller(true);
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <form onSubmit={onSubmitHandler} className="seller-login-container">
        <div className="seller-login-box">
          <p className="seller-login-heading">
            <span className="text-primary">Seller</span> Login
          </p>
          <div className="seller-input-group">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter Your Email"
              className="seller-input"
              required
            />
          </div>
          <div className="seller-input-group">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter Your Password"
              className="seller-input"
              required
            />
          </div>
          <button className="seller-login-button">Login</button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
