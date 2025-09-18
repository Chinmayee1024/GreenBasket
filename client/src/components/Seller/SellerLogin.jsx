/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import "../../css/seller/SellerLogin.css"; // Import external stylesheet
import axios from "axios";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post("/seller/login", {
        email,
        password,
      });
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter Your Email"
              className="seller-input"
              required
            />
          </div>
          <div className="seller-input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter Your Password"
              className="seller-input"
              required
            />
          </div>
          <button type="submit" className="seller-login-button">
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
