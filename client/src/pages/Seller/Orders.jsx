// src/components/Orders/Orders.jsx
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets, dummyOrders } from "../../assets/assets";
import "../../css/seller/Orders.css";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <div className="orders-wrapper">
        <h2 className="orders-heading">Orders List</h2>
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="order-details">
              <img className="order-icon" src={assets.box_icon} alt="boxIcon" />
              <div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <p className="item-name">
                      {item.product.name}{" "}
                      <span className="item-qty">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="address-info">
              <p>
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city},
              </p>
              <p>
                {order.address.state}, {order.address.zipcode},{" "}
                {order.address.country}
              </p>
              <p>{order.address.phone}</p>
            </div>

            <p className="order-amount">
              {currency}
              {order.amount}
            </p>

            <div className="order-meta">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdA).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
