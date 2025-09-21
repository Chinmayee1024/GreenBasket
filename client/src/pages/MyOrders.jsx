/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import "../css/MyOrder.css"; // Import the CSS file here
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="my-orders-container">
      <div className="header">
        <p className="header-title">My Order</p>
        <div className="header-underline"></div>
      </div>

      {myOrders.map((order, index) => (
        <div key={index} className="order-card">
          <p className="order-summary">
            <span>OrderId: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>
              Total Amount: {currency}
              {order.amount}
            </span>
          </p>

          {order.items.map((item, idx) => (
            <div
              key={idx}
              className={`order-item ${
                order.items.length !== idx + 1 ? "with-border" : ""
              }`}
            >
              <div className="item-left">
                <div className="item-image-wrapper">
                  <img
                    src={item.product.image[0]}
                    alt=""
                    className="item-image"
                  />
                </div>
                <div className="item-details">
                  <h2 className="item-name">{item.product.name}</h2>
                  <p>Category: {item.product.category}</p>
                </div>
              </div>

              <div className="item-meta">
                <p>Quantity: {item.quantity || "1"}</p>
                <p>Status: {order.status || "1"}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <p className="item-amount">
                Amount: {currency}
                {item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
